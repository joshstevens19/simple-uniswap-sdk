/* eslint-disable no-await-in-loop */
import { Erc20Contract } from '@dex-toolkit/contracts'
import {
  getAllDexConfigsForChainId,
  getAllTokensForChainId,
  getChainConfig,
  plsMainChainId,
} from '@dex-toolkit/utils'
import type { MethodCall } from '@multicall-toolkit/types'
import { Contract, ethers, providers, utils } from 'ethers'

type NodeTestResult = {
  chainId: number
  chainName: string
  nodeName: string
  url: string
  chunkLimit: {
    actual: number
    configured: number
    passed: boolean
    lastTestedValue: number
    firstFailedValue: number
  }
  callDataLimit?: {
    actual: number
    configured: number
    passed: boolean
    lastTestedValue: number
    firstFailedValue: number
  }
  duration: number
  error?: string
}

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
}

const colorize = {
  cyan: (str: string) => `${colors.cyan}${str}${colors.reset}`,
  yellow: (str: string) => `${colors.yellow}${str}${colors.reset}`,
  green: (str: string) => `${colors.green}${str}${colors.reset}`,
  red: (str: string) => `${colors.red}${str}${colors.reset}`,
  gray: (str: string) => `${colors.gray}${str}${colors.reset}`,
  bold: (str: string) => `${colors.bold}${str}${colors.reset}`,
}

async function probeChainNodes(chainId: number): Promise<NodeTestResult[]> {
  const chainConfig = getChainConfig(chainId)
  if (!chainConfig) {
    return []
  }

  const dexConfig = getAllDexConfigsForChainId(chainId)[0]
  if (!dexConfig) {
    return []
  }

  const protocol =
    dexConfig.protocols.protocolV2 ?? dexConfig.protocols.protocolV3
  if (!protocol) {
    return []
  }

  const factoryAddress = Object.values(protocol)[0]?.factory.address
  if (!factoryAddress) {
    return []
  }

  console.log(
    colorize.cyan(
      `\n🔗 Testing ${chainConfig.displayName} (Chain ID: ${chainId})`,
    ),
  )

  const results: NodeTestResult[] = []

  const nodes = chainConfig.nodes.public
  // const nodes = Object.values(chainConfig.nodes.authenticated!)

  if (nodes) {
    for (const node of nodes) {
      console.log(colorize.yellow(`\n📡 Testing node: ${node.url}`))

      try {
        const provider = node.isWSS
          ? new providers.WebSocketProvider(node.url)
          : new providers.JsonRpcProvider(node.url)

        try {
          const chunkLimit = node.chunkLimit // 100_000
          const blockNumber = await provider.getBlockNumber()
          const fromBlock = blockNumber - chunkLimit

          await provider.getLogs({
            fromBlock,
            toBlock: blockNumber,
            address: factoryAddress,
          })

          console.log(
            colorize.green(
              `✓ Chunk Limit: ${chunkLimit.toLocaleString()} blocks`,
            ),
          )
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error)

          if (errorMessage) {
            console.log(colorize.cyan('Error from large chunk test:'))
            console.log(colorize.gray(errorMessage))
          }
        }
      } catch (error) {
        console.log(
          colorize.red(error instanceof Error ? error.message : String(error)),
        )
      }
    }
  }

  return results
}

async function findExactLimit(
  testFn: (size: number) => Promise<boolean>,
  start: number,
  end: number,
  configuredValue: number,
  step: number = 1000,
  roundTo: number = 1000,
): Promise<{
  limit: number
  lastTested: number
  firstFailed: number
}> {
  let low = start
  let high = end
  let lastSuccess = start
  let firstFail = end

  // Start by testing the configured value
  console.log(
    colorize.yellow(
      `\nTesting configured value: ${configuredValue.toLocaleString()}`,
    ),
  )

  try {
    const configSuccess = await testFn(configuredValue)

    if (configSuccess) {
      console.log(
        colorize.green(
          `Configured value ${configuredValue.toLocaleString()} passed`,
        ),
      )
      lastSuccess = configuredValue

      // Test higher values to see if we can go beyond configured
      console.log(colorize.yellow('\nTesting values above configured:'))
      let currentSize = configuredValue * 2
      let foundUpperLimit = false

      while (currentSize <= end && !foundUpperLimit) {
        console.log(colorize.gray(`Testing ${currentSize.toLocaleString()}`))
        try {
          const success = await testFn(currentSize)
          if (success) {
            console.log(
              colorize.green(`${currentSize.toLocaleString()} passed`),
            )
            lastSuccess = currentSize
            currentSize *= 2
          } else {
            console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
            firstFail = currentSize
            foundUpperLimit = true
          }
        } catch {
          console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
          firstFail = currentSize
          foundUpperLimit = true
        }
      }

      // Set binary search range between last success and first failure
      low = lastSuccess
      high = firstFail
    } else {
      console.log(
        colorize.red(
          `Configured value ${configuredValue.toLocaleString()} failed`,
        ),
      )
      firstFail = configuredValue

      // Test lower values to find working value
      console.log(colorize.yellow('\nTesting values below configured:'))
      let currentSize = Math.floor(configuredValue / 2)
      let foundLowerLimit = false

      while (currentSize >= start && !foundLowerLimit) {
        console.log(colorize.gray(`Testing ${currentSize.toLocaleString()}`))
        try {
          const success = await testFn(currentSize)
          if (success) {
            console.log(
              colorize.green(`${currentSize.toLocaleString()} passed`),
            )
            lastSuccess = currentSize
            foundLowerLimit = true
          } else {
            console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
            firstFail = Math.min(firstFail, currentSize)
            currentSize = Math.floor(currentSize / 2)
          }
        } catch {
          console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
          firstFail = Math.min(firstFail, currentSize)
          currentSize = Math.floor(currentSize / 2)
        }
      }

      // Set binary search range
      low = lastSuccess
      high = firstFail
    }
  } catch (error) {
    console.log(
      colorize.red(
        `Configured value test failed with error, starting from minimum`,
      ),
    )

    // If configured value errors, start from minimum
    console.log(colorize.yellow('\nTesting from minimum value:'))
    let currentSize = start
    let foundLimit = false

    while (currentSize <= end && !foundLimit) {
      console.log(colorize.gray(`Testing ${currentSize.toLocaleString()}`))
      try {
        const success = await testFn(currentSize)
        if (success) {
          console.log(colorize.green(`${currentSize.toLocaleString()} passed`))
          lastSuccess = currentSize
          currentSize *= 2
        } else {
          console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
          firstFail = currentSize
          foundLimit = true
        }
      } catch {
        console.log(colorize.red(`${currentSize.toLocaleString()} failed`))
        firstFail = currentSize
        foundLimit = true
      }
    }

    // Set binary search range
    low = lastSuccess
    high = firstFail
  }

  // Fine tune between last success and first fail
  console.log(colorize.yellow('\nFine tuning the exact limit:'))
  while (high - low > step && high > low) {
    const mid = low + Math.floor((high - low) / 2)
    console.log(colorize.gray(`Testing ${mid.toLocaleString()}`))

    try {
      const success = await testFn(mid)
      if (success) {
        console.log(colorize.green(`${mid.toLocaleString()} passed`))
        lastSuccess = Math.max(lastSuccess, mid)
        low = mid + step
      } else {
        console.log(colorize.red(`${mid.toLocaleString()} failed`))
        firstFail = Math.min(firstFail, mid)
        high = mid - step
      }
    } catch {
      console.log(colorize.red(`${mid.toLocaleString()} failed`))
      firstFail = Math.min(firstFail, mid)
      high = mid - step
    }
  }
  // Before returning, round the limit to the nearest roundTo value
  const roundedLimit = Math.floor(lastSuccess / roundTo) * roundTo

  console.log(colorize.green(`\nFound limit: ${lastSuccess.toLocaleString()}`))
  console.log(colorize.green(`Rounded limit: ${roundedLimit.toLocaleString()}`))
  console.log(
    colorize.gray(`Last tested success: ${lastSuccess.toLocaleString()}`),
  )
  console.log(
    colorize.gray(`First failure point: ${firstFail.toLocaleString()}`),
  )

  return {
    limit: roundedLimit,
    lastTested: lastSuccess,
    firstFailed: firstFail,
  }
}

async function testNode(
  provider: providers.Provider,
  configuredChunkLimit: number,
): Promise<{
  chunkLimit: number
  lastTestedChunk: number
  firstFailedChunk: number
}> {
  const chunkTest = async (size: number) => {
    try {
      await provider.getLogs({
        fromBlock: utils.hexlify(0),
        toBlock: utils.hexlify(size),
        address: undefined,
      })
      console.log(colorize.gray(`  Tested size: ${size.toLocaleString()} ✓`))
      return true
    } catch {
      console.log(colorize.gray(`  Tested size: ${size.toLocaleString()} ✖`))
      return false
    }
  }

  const { limit, lastTested, firstFailed } = await findExactLimit(
    chunkTest,
    1000,
    50000,
    configuredChunkLimit,
    500,
  )

  return {
    chunkLimit: limit,
    lastTestedChunk: lastTested,
    firstFailedChunk: firstFailed,
  }
}

async function testChainNodes(chainId: number): Promise<NodeTestResult[]> {
  const chainConfig = getChainConfig(chainId)
  if (!chainConfig) return []

  console.log(
    colorize.cyan(
      `\n🔗 Testing ${chainConfig.displayName} (Chain ID: ${chainId})`,
    ),
  )

  const results: NodeTestResult[] = []

  if (chainConfig.nodes.public) {
    // Test nodes sequentially instead of in parallel
    for (const node of chainConfig.nodes.public) {
      console.log(colorize.yellow(`\n📡 Testing node: ${node.name}`))
      const startTime = Date.now()

      try {
        const provider = node.isWSS
          ? new providers.WebSocketProvider(node.url)
          : new providers.JsonRpcProvider(node.url)

        // Add timeout to the entire node test
        const testPromise = testNode(provider, node.chunkLimit)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Node test timeout')), 60_000)
        })

        const { chunkLimit, lastTestedChunk, firstFailedChunk } =
          (await Promise.race([testPromise, timeoutPromise])) as any

        // Clean up WebSocket connection if necessary
        if (node.isWSS) {
          await (provider as providers.WebSocketProvider).destroy()
        }

        const result: NodeTestResult = {
          chainId,
          chainName: chainConfig.displayName,
          nodeName: node.name,
          url: node.url,
          chunkLimit: {
            actual: chunkLimit,
            configured: node.chunkLimit,
            passed: chunkLimit === node.chunkLimit,
            lastTestedValue: lastTestedChunk,
            firstFailedValue: firstFailedChunk,
          },
          duration: Date.now() - startTime,
        }

        console.log(
          `${colorize.green(`✓ Chunk Limit: ${chunkLimit.toLocaleString()} blocks`)}` +
            (result.chunkLimit.passed
              ? colorize.red(
                  ` (Configured: ${node.chunkLimit.toLocaleString()})`,
                )
              : colorize.green(` (Correctly configured)`)),
        )

        results.push(result)
      } catch (error) {
        results.push({
          chainId,
          chainName: chainConfig.displayName,
          nodeName: node.name,
          url: node.url,
          error: error instanceof Error ? error.message : String(error),
          chunkLimit: {
            actual: 0,
            configured: node.chunkLimit,
            passed: false,
            lastTestedValue: 0,
            firstFailedValue: 0,
          },
          duration: Date.now() - startTime,
        })
        console.log(
          colorize.red(
            `✖ Error: ${error instanceof Error ? error.message : String(error)}`,
          ),
        )
      }
    }
  }

  return results
}

async function runNodeTests() {
  const chainResults = await Promise.all(
    [plsMainChainId].map((chainId) => testChainNodes(chainId)),
  )

  const results = chainResults.flat()

  console.log(colorize.bold('\n📊 Summary Report'))

  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.chainName]) {
        acc[result.chainName] = []
      }
      acc[result.chainName]!.push(result)
      return acc
    },
    {} as Record<string, NodeTestResult[]>,
  )

  Object.entries(groupedResults).forEach(([chainName, chainResults]) => {
    console.log(colorize.bold(colorize.cyan(`\n${chainName}`)))

    chainResults.forEach((result) => {
      console.log(colorize.yellow(`\n${result.nodeName}`))
      if (result.error) {
        console.log(colorize.red(`✖ Error: ${result.error}`))
        return
      }

      const chunkStatus = result.chunkLimit.passed
        ? colorize.red('✖')
        : colorize.green('✓')

      console.log(
        `${chunkStatus} Chunk Limit: ${result.chunkLimit.actual.toLocaleString()} blocks`,
      )
      if (result.chunkLimit.passed) {
        console.log(
          colorize.yellow(
            `  Current config: ${result.chunkLimit.configured.toLocaleString()}`,
          ),
        )
        console.log(
          colorize.green(
            `  Suggested config: ${result.chunkLimit.actual.toLocaleString()}`,
          ),
        )
      }
      console.log(
        colorize.gray(
          `  Test duration: ${(result.duration / 1000).toFixed(1)}s`,
        ),
      )
    })
  })

  console.log(JSON.stringify(results, null, 2))
}

async function testCallDataSizeDirectly(
  chainId: number,
  provider: providers.BaseProvider,
  callDataSizeToTest: number,
): Promise<boolean> {
  const token = getAllTokensForChainId(chainId)[0]
  if (!token) throw new Error('No tokens found for chain')
  console.log(provider)
  // Initialize Erc20Contract with the provider
  const tokenContract = new Erc20Contract(
    { enableBatching: false, chainId },
    { address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b' },
  )

  try {
    // Calculate how many calls are needed to reach the desired call data size
    const singleCallSize = measureCallDataSize(
      [{ methodName: 'name', methodParameters: [] }],
      tokenContract.contractDetail.abi,
    )

    const numberOfCalls = Math.max(
      1,
      Math.floor(callDataSizeToTest / singleCallSize),
    )

    // Create the specified number of calls
    const calls = Array(numberOfCalls)
      .fill(null)
      .map((_, i) => [`name${i}`, tokenContract.nameCallContext()]) as [
      string,
      MethodCall<Contract, 'name'>,
    ][]

    const callsObj = Object.fromEntries(calls)

    // Measure actual call data size
    const dataSize = measureCallDataSize(
      Object.values(callsObj).map((call) => ({
        methodName: call.methodName,
        methodParameters: call.methodParameters,
      })),
      tokenContract.contractDetail.abi,
    )

    console.log(
      colorize.gray(
        `Testing with call data size: ${dataSize} bytes (Requested: ${callDataSizeToTest} bytes)`,
      ),
    )

    // Try executing the call
    const blah1 = await tokenContract.call({
      ref: {
        methodName: 'name',
        methodParameters: [],
      },
    })
    const blah = await tokenContract.call(callsObj)
    // console.log(callsObj)
    console.log(blah1)
    console.log(blah)

    console.log(
      colorize.green(`Call succeeded with call data size: ${dataSize} bytes`),
    )

    // If the call succeeds, return true
    return true
  } catch (error) {
    console.log(
      colorize.red(
        `Call failed with error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ),
    )
    // If the call fails, return false
    return false
  }
}

async function testCallDataLimit(chainId: number): Promise<NodeTestResult[]> {
  const chainConfig = getChainConfig(chainId)
  if (!chainConfig) return []

  console.log(
    colorize.cyan(
      `\n🔗 Testing Call Data Limit on ${chainConfig.displayName} (Chain ID: ${chainId})`,
    ),
  )

  const results: NodeTestResult[] = []

  if (chainConfig.nodes.public) {
    for (const node of chainConfig.nodes.public) {
      console.log(colorize.yellow(`\n📡 Testing node: ${node.name}`))
      const startTime = Date.now()

      try {
        const provider = node.isWSS
          ? new providers.WebSocketProvider(node.url, {
              chainId: chainConfig.chainId,
              name: chainConfig.name,
            })
          : new providers.JsonRpcProvider(node.url, {
              chainId: chainConfig.chainId,
              name: chainConfig.name,
            })

        const testPromise = testCallDataSizeDirectly(chainId, provider, 500_000)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Node test timeout')), 60_000)
        })

        const { callDataLimit, lastTestedSize, firstFailedSize } =
          (await Promise.race([testPromise, timeoutPromise])) as any

        // Clean up WebSocket connection if necessary
        if (node.isWSS) {
          await (provider as providers.WebSocketProvider).destroy()
        }

        const result: NodeTestResult = {
          chainId,
          chainName: chainConfig.displayName,
          nodeName: node.name,
          url: node.url,
          chunkLimit: {
            actual: 0,
            configured: node.chunkLimit || 0,
            passed: false,
            lastTestedValue: 0,
            firstFailedValue: 0,
          },
          callDataLimit: {
            actual: callDataLimit,
            configured: node.callDataLimit || 0,
            passed: callDataLimit === (node.callDataLimit || 0),
            lastTestedValue: lastTestedSize,
            firstFailedValue: firstFailedSize,
          },
          duration: Date.now() - startTime,
        }

        console.log(
          `${colorize.green(`✓ Call Data Limit: ${callDataLimit} bytes`)}` +
            (result.callDataLimit?.passed
              ? colorize.green(` (Correctly configured)`)
              : colorize.red(
                  ` (Configured: ${node.callDataLimit || 0} bytes)`,
                )),
        )

        results.push(result)
      } catch (error) {
        results.push({
          chainId,
          chainName: chainConfig.displayName,
          nodeName: node.name,
          url: node.url,
          chunkLimit: {
            actual: 0,
            configured: node.chunkLimit || 0,
            passed: false,
            lastTestedValue: 0,
            firstFailedValue: 0,
          },
          callDataLimit: {
            actual: 0,
            configured: node.callDataLimit || 0,
            passed: false,
            lastTestedValue: 0,
            firstFailedValue: 0,
          },
          duration: Date.now() - startTime,
          error: error instanceof Error ? error.message : String(error),
        })
        console.log(
          colorize.red(
            `✖ Error: ${error instanceof Error ? error.message : String(error)}`,
          ),
        )
      }
    }
  }

  return results
}

// async function testCallDataLimitOnNodeWithErc20(
//   chainId: number,
//   provider: providers.BaseProvider,
//   configuredCallDataLimit: number,
// ): Promise<{
//   callDataLimit: number
//   lastTestedSize: number
//   firstFailedSize: number
// }> {
//   const token = getAllTokensForChainId(chainId)[0]
//   if (!token) throw new Error('No tokens found for chain')

//   const tokenContract = new Erc20Contract(
//     { enableBatching: false, ethersProvider: provider },
//     { address: token.contractAddress },
//   )

//   const callDataTest = async (nCalls: number): Promise<boolean> => {
//     try {
//       const calls = Array(nCalls)
//         .fill(null)
//         .map((_, i) => [`name${i}`, tokenContract.nameCallContext()]) as [
//         string,
//         MethodCall<Contract, 'name'>,
//       ][]

//       const callsObj = Object.fromEntries(calls)

//       // Measure call data size
//       const dataSize = measureCallDataSize(
//         Object.values(callsObj).map((call) => ({
//           methodName: call.methodName,
//           methodParameters: call.methodParameters,
//         })),
//         tokenContract.contractDetail.abi,
//       )

//       console.log(
//         colorize.gray(`  Testing with call data size: ${dataSize} bytes`),
//       )

//       await tokenContract.call(callsObj)

//       return true
//     } catch (error) {
//       return false
//     }
//   }

//   // Use findExactLimit to find the maximum number of calls
//   const { lastTested, firstFailed } = await findExactLimit(
//     callDataTest,
//     10, // Start testing with 10 calls
//     5000, // Maximum of 5000 calls
//     Math.floor(configuredCallDataLimit / 256), // Estimate initial N
//     10, // Step size
//     1, // Round to nearest 1
//   )

//   // Calculate the actual call data limit in bytes
//   const lastCallDataSize = measureCallDataSize(
//     Array(lastTested)
//       .fill(null)
//       .map(() => ({ methodName: 'name', methodParameters: [] })),
//     tokenContract.contractDetail.abi,
//   )

//   const firstFailCallDataSize = measureCallDataSize(
//     Array(firstFailed)
//       .fill(null)
//       .map(() => ({ methodName: 'name', methodParameters: [] })),
//     tokenContract.contractDetail.abi,
//   )

//   return {
//     callDataLimit: lastCallDataSize,
//     lastTestedSize: lastCallDataSize,
//     firstFailedSize: firstFailCallDataSize,
//   }
// }

async function custom() {
  // const tokenContract = new Erc20Contract(
  //   {
  //     enableBatching: false,
  //     chainId: 1,
  //     providerType: 'infura',
  //     apiKey: '515c18f92061457183548a0cbda9f0cf',
  //   },
  //   { address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b' },
  // )
  const tokenContract = new Erc20Contract(
    {
      enableBatching: false,
      chainId: 943,
    },
    { address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b' },
  )

  const singleCallSize = measureCallDataSize(
    [{ methodName: 'name', methodParameters: [] }],
    tokenContract.contractDetail.abi,
  )
  const callDataSizeToTest = 110_000
  const numberOfCalls = Math.max(
    1,
    Math.floor(callDataSizeToTest / singleCallSize),
  )

  // Create the specified number of calls
  const calls = Array(numberOfCalls)
    .fill(null)
    .map((_, i) => [`name${i}`, tokenContract.nameCallContext()]) as [
    string,
    MethodCall<Contract, 'name'>,
  ][]

  const callsObj = Object.fromEntries(calls)

  // Measure actual call data size
  const dataSize = measureCallDataSize(
    Object.values(callsObj).map((call) => ({
      methodName: call.methodName,
      methodParameters: call.methodParameters,
    })),
    tokenContract.contractDetail.abi,
  )

  console.log(
    colorize.gray(
      `Testing with call data size: ${dataSize} bytes (Requested: ${callDataSizeToTest} bytes)`,
    ),
  )

  const { batchCount, blockNumber, results } =
    await tokenContract.call(callsObj)
  console.log({
    batchCount,
    blockNumber,
    resultCount: Object.keys(results ?? {}).length,
  })
}

function measureCallDataSize(
  calls: { methodName: string; methodParameters: any[] }[],
  abi: any[],
): number {
  const iface = new ethers.utils.Interface(abi)
  let totalSize = 0

  for (const call of calls) {
    const encodedData = iface.encodeFunctionData(
      call.methodName,
      call.methodParameters,
    )
    const dataSize = Buffer.from(encodedData.slice(2), 'hex').length
    totalSize += dataSize
  }

  return totalSize
}

if (false) runNodeTests().catch(console.error)
if (true) custom()
if (false) testCallDataLimit(plsMainChainId).catch(console.error)
if (false) probeChainNodes(plsMainChainId).catch(console.error)
