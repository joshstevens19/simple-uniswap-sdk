import {
  FactoryContractV2,
  PairContract,
  RouterContractV2,
} from '@dex-toolkit/contracts'
import { DexNumber } from '@dex-toolkit/number'
import type {
  TradeDirection,
  RoutePath,
  RouteQuoteTradeContext,
  Token,
  TokenAvailablePools,
  Pool,
  TradeInternalArgs,
  DexProtocol,
  PoolReserve,
  RoutePathsByDex,
  DexTag,
  TradeFormat,
  UniswapFactoryV2Types,
  UniswapRouterV2Types,
  UniswapPairV2Types,
  RouteQuote,
  VersionTag,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  transformCoinAddressToWrappedAddress,
  isSameAddress,
  protocolMap,
  tradeDirectionMap,
  createRouteMulticallReference,
  parseRouteMulticallReference,
  tradePathMap,
  getAddress,
  isUniqueRoute,
  generateDeadlineUnixTime,
  ZERO_ADDRESS,
  isTradePathFromCoin,
  isTradePathToCoin,
  transformWrappedTokenToCoin,
  getVersionFromVersionTag,
  getVersionTagFromVersion,
  formatVersionForDisplay,
  assertTradeDirection,
  assertVersionTag,
  assertDexTag,
  assertIsAddresses,
} from '@dex-toolkit/utils'
import type {
  Address,
  ContractContext,
  MethodResult,
  ContractResults,
  MethodCall,
  MethodCallUnion,
  MulticallResults,
} from '@multicall-toolkit/types'
import type { BigNumber } from 'ethers'

import { RouterProtocolAbstract } from './router.protocol.abstract'

export class RouterProtocolV2<
  TFormat extends TradeFormat,
> extends RouterProtocolAbstract<TFormat> {
  protected _liquidityProviderFeeByDex: Record<
    DexTag,
    Record<VersionTag, number>
  > = {}

  protected _routerContractByDex: Record<
    DexTag,
    Record<VersionTag, RouterContractV2>
  > = {}

  protected _factoryContractByDex: Record<
    DexTag,
    Record<VersionTag, FactoryContractV2>
  > = {}

  constructor(context: TradeInternalArgs<TFormat>) {
    super(context)

    if (
      !Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV2,
      )
    ) {
      throw new DexError(
        'V2 contract details not provided in any dex config',
        ErrorCodes.functionArgumentError,
      )
    }

    for (const [dexTag, dexConfig] of Object.entries(this._dexConfigsByDex)) {
      if (!dexConfig.protocols.protocolV2) {
        throw new DexError(
          'V2 protocol details not provided',
          ErrorCodes.functionArgumentError,
        )
      }

      for (const protocolItem of Object.entries(
        dexConfig.protocols.protocolV2,
      )) {
        const versionTag = protocolItem[0] as VersionTag
        const contractDetails = protocolItem[1]

        assertVersionTag(versionTag)

        if (!contractDetails) {
          throw new DexError(
            'V2 contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        const { factory, router, feePercent, pair } = contractDetails ?? {}

        if (!router) {
          throw new DexError(
            'V2 router contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!factory) {
          throw new DexError(
            'V2 factory contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!pair) {
          throw new DexError(
            'V2 pair contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        // Fee
        this._liquidityProviderFeeByDex[dexTag] ??= {}
        this._liquidityProviderFeeByDex[dexTag][versionTag] =
          feePercent || 0.003

        // Router
        this._routerContractByDex[dexTag] ??= {}
        this._routerContractByDex[dexTag][versionTag] = new RouterContractV2(
          this._dexProvider,
          router,
        )

        // Factory
        this._factoryContractByDex[dexTag] ??= {}
        this._factoryContractByDex[dexTag][versionTag] = new FactoryContractV2(
          this._dexProvider,
          factory,
        )
      }
    }
  }

  // ------------------------
  // Getters
  // ------------------------

  override get protocol(): DexProtocol {
    return protocolMap.protocolV2
  }

  public getLiquidityProviderFee(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): number {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const fee = this._liquidityProviderFeeByDex[dexTag]?.[versionTag]

    if (!fee) {
      throw new DexError(
        `Fee not found for dexTag ${dexTag} and version ${formatVersionForDisplay(versionTag)}`,
        ErrorCodes.internalError,
      )
    }

    return fee
  }

  public getRouterContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): RouterContractV2 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const routerContract = this._routerContractByDex[dexTag]?.[versionTag]

    if (!routerContract) {
      throw new DexError(
        `Router contract not found for dexTag ${dexTag} and version ${formatVersionForDisplay(versionTag)}`,
        ErrorCodes.internalError,
      )
    }

    return routerContract
  }

  public getFactoryContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): FactoryContractV2 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const factoryContract = this._factoryContractByDex[dexTag]?.[versionTag]

    if (!factoryContract) {
      throw new DexError(
        `Factory contract not found for dexTag ${dexTag} and version ${formatVersionForDisplay(versionTag)}`,
        ErrorCodes.internalError,
      )
    }

    return factoryContract
  }

  // ------------------------
  // Transaction Data Encoding
  // ------------------------

  override encodeTradeDataForExactInput({
    fromAmount,
    toAmount,
    routeQuoteTradeContext,
    deadline,
    dexTag,
    versionTag,
  }: {
    fromAmount: DexNumber
    toAmount: DexNumber
    routeQuoteTradeContext: RouteQuoteTradeContext
    deadline: string
    dexTag: DexTag
    versionTag: VersionTag
  }): string {
    if (!fromAmount) {
      throw new DexError(
        'Must provide token amount',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!toAmount) {
      throw new DexError(
        'Must provide token amount',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!routeQuoteTradeContext) {
      throw new DexError(
        'Must provide route quote trade context',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!deadline) {
      throw new DexError(
        'Must provide deadline',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const routerContractFactory = this.getRouterContract(dexTag, versionTag)

    if (!routerContractFactory) {
      throw new DexError(
        `Router contract factory not found for dex type: ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const { hasFeeOnTransfer } = routeQuoteTradeContext
    const { recipient } = this._settings

    const fromHex = fromAmount.toHexString()
    const toHex = toAmount.toHexString()
    const path = routeQuoteTradeContext.routePathAddresses.map(
      transformCoinAddressToWrappedAddress,
    )
    const to = recipient || this._walletAddress

    switch (this.tradePath) {
      case tradePathMap.coinToToken: {
        const amountOutMin = toHex

        return hasFeeOnTransfer
          ? routerContractFactory.encodeSwapExactETHForTokensSupportingFeeOnTransferTokens(
              amountOutMin,
              path,
              to,
              deadline,
            )
          : routerContractFactory.encodeSwapExactETHForTokens(
              amountOutMin,
              path,
              to,
              deadline,
            )
      }
      case tradePathMap.tokenToCoin: {
        const amountIn = fromHex
        const amountOutMin = toHex

        return hasFeeOnTransfer
          ? routerContractFactory.encodeSwapExactTokensForETHSupportingFeeOnTransferTokens(
              amountIn,
              amountOutMin,
              path,
              to,
              deadline,
            )
          : routerContractFactory.encodeSwapExactTokensForETH(
              amountIn,
              amountOutMin,
              path,
              to,
              deadline,
            )
      }
      case tradePathMap.tokenToToken: {
        const amountIn = fromHex
        const amountMin = toHex

        return hasFeeOnTransfer
          ? routerContractFactory.encodeSwapExactTokensForTokensSupportingFeeOnTransferTokens(
              amountIn,
              amountMin,
              path,
              to,
              deadline,
            )
          : routerContractFactory.encodeSwapExactTokensForTokens(
              amountIn,
              amountMin,
              path,
              to,
              deadline,
            )
      }
      default:
        throw new DexError(
          'Invalid trade path',
          ErrorCodes.tradePathIsNotSupported,
        )
    }
  }

  override encodeTradeDataForExactOutput({
    fromAmount,
    toAmount,
    routeQuoteTradeContext,
    deadline,
    dexTag,
    versionTag,
  }: {
    fromAmount: DexNumber
    toAmount: DexNumber
    routeQuoteTradeContext: RouteQuoteTradeContext
    deadline: string
    dexTag: DexTag
    versionTag: VersionTag
  }): string {
    if (!fromAmount) {
      throw new DexError(
        'Must provide coin amount in max',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!toAmount) {
      throw new DexError(
        'Must provide token amount out',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!routeQuoteTradeContext) {
      throw new DexError(
        'Must provide route quote trade context',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!deadline) {
      throw new DexError(
        'Must provide deadline',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const routerContractFactory = this.getRouterContract(dexTag, versionTag)

    if (!routerContractFactory) {
      throw new DexError(
        `Router contract factory not found for dex type: ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const { recipient } = this._settings

    const fromHex = fromAmount.toHexString()
    const toHex = toAmount.toHexString()
    const path = routeQuoteTradeContext.routePathAddresses.map(
      transformCoinAddressToWrappedAddress,
    )
    const to = recipient || this._walletAddress

    switch (this.tradePath) {
      case tradePathMap.coinToToken: {
        const amountOut = toHex

        return routerContractFactory.encodeSwapETHForExactTokens(
          amountOut,
          path,
          to,
          deadline,
        )
      }
      case tradePathMap.tokenToCoin: {
        const amountOut = toHex
        const amountInMax = fromHex

        return routerContractFactory.encodeSwapTokensForExactETH(
          amountOut,
          amountInMax,
          path,
          to,
          deadline,
        )
      }
      case tradePathMap.tokenToToken: {
        const amountInMax = fromHex
        const amountOut = toHex

        return routerContractFactory.encodeSwapTokensForExactTokens(
          amountInMax,
          amountOut,
          path,
          to,
          deadline,
        )
      }
      default:
        throw new DexError(
          'Invalid trade path',
          ErrorCodes.tradePathIsNotSupported,
        )
    }
  }

  // ------------------------
  // Route Paths
  // ------------------------

  override prepareRoutePathsCallContext(): Record<
    Address,
    ContractContext<
      UniswapFactoryV2Types.Contract,
      Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
    >
  > {
    const factoryCallContexts: Record<
      Address,
      ContractContext<
        UniswapFactoryV2Types.Contract,
        Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
      >
    > = {}

    for (const [dexTag, referencedFactoryContract] of Object.entries(
      this._factoryContractByDex,
    )) {
      const calls: Record<
        string,
        MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>
      > = {}

      for (const [versionTag, factoryContract] of Object.entries(
        referencedFactoryContract,
      )) {
        const { address, abi } = factoryContract.contractDetail ?? {}

        for (const pair of this.allPairs) {
          if (!pair?.length) {
            continue
          }

          for (const [token0, token1] of pair) {
            if (
              !token0 ||
              !token1 ||
              isSameAddress(token0.contractAddress, token1.contractAddress)
            ) {
              continue
            }

            const methodCallReference = createRouteMulticallReference({
              dexTag,
              protocol: this.protocol,
              versionTag: versionTag as VersionTag,
              fromToken: token0,
              toToken: token1,
            })

            calls[methodCallReference] = factoryContract.getPairCallContext(
              transformCoinAddressToWrappedAddress(token0.contractAddress),
              transformCoinAddressToWrappedAddress(token1.contractAddress),
            )
          }
        }

        if (Object.keys(calls).length > 0) {
          const contractReference = createRouteMulticallReference({
            dexTag,
            protocol: this.protocol,
            versionTag: versionTag as VersionTag,
          })

          factoryCallContexts[contractReference] = {
            contractAddress: address,
            abi,
            calls,
          }
        }
      }
    }

    return factoryCallContexts
  }

  public processRoutePathsCallResults(
    contractCallResults: MulticallResults<
      Record<
        string,
        ContractContext<
          UniswapFactoryV2Types.Contract,
          Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
        >
      >
    >,
  ): RoutePathsByDex {
    const dexTags = Object.keys(this._dexConfigsByDex) as DexTag[]

    // Initialize RoutePathsByDex with empty arrays for each DexTag
    const routePathsByDex: RoutePathsByDex = dexTags.reduce((acc, dexTag) => {
      acc[dexTag] = []
      return acc
    }, {} as RoutePathsByDex)

    // Process each dexTag to generate the possible routes
    for (const dexTag of dexTags) {
      // Collect all valid pair contexts for this dex across all versions
      const validPairContextsByVersion = Object.entries(
        contractCallResults.contracts,
      ).reduce(
        (acc, [reference, contract]) => {
          const contractReference = parseRouteMulticallReference(reference)
          const {
            dexTag: parsedDexTag,
            protocol,
            versionTag,
          } = contractReference ?? {}

          if (parsedDexTag !== dexTag || protocol !== this.protocol) {
            return acc
          }

          assertVersionTag(versionTag)

          const validResults = Object.entries(contract.results).reduce(
            (validMethods, [methodReference, result]) => {
              if (!isSameAddress(result.value, ZERO_ADDRESS)) {
                validMethods[methodReference] = result
              }
              return validMethods
            },
            {} as typeof contract.results,
          )

          if (Object.keys(validResults).length > 0) {
            acc[versionTag] = {
              ...contract,
              results: validResults,
            }
          }

          return acc
        },
        {} as Record<
          VersionTag,
          ContractResults<
            UniswapFactoryV2Types.Contract,
            Record<
              string,
              MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>
            >
          >
        >,
      )

      // Skip if no valid pairs found for any version
      if (!Object.keys(validPairContextsByVersion).length) {
        continue
      }

      // Process each version's pairs
      for (const [versionTag, validPairContexts] of Object.entries(
        validPairContextsByVersion,
      )) {
        const fromTokenAvailablePools: TokenAvailablePools = {
          token: this._fromToken,
          pools: this.getPools({
            token: this._fromToken,
            validPairContexts: { [versionTag]: validPairContexts },
          }),
        }

        const toTokenAvailablePools: TokenAvailablePools = {
          token: this._toToken,
          pools: this.getPools({
            token: this._toToken,
            validPairContexts: { [versionTag]: validPairContexts },
          }),
        }

        const intermediatePools: TokenAvailablePools[] = []
        for (const token of this.allBaseTokens({ includeWrappedToken: true })) {
          const pools = this.getPools({
            token,
            validPairContexts: { [versionTag]: validPairContexts },
          })

          intermediatePools.push({
            token,
            pools,
          })
        }

        const allPossibleRoutes = this.findValidRoutePathConnections({
          fromTokenAvailablePools,
          toTokenAvailablePools,
          intermediatePools,
          dexTag,
          versionTag: versionTag as VersionTag,
        })

        // Append routes for this version to the dex's routes
        routePathsByDex[dexTag] ??= []
        routePathsByDex[dexTag].push(...allPossibleRoutes)
      }
    }

    return routePathsByDex
  }

  override findValidRoutePathConnections({
    fromTokenAvailablePools,
    toTokenAvailablePools,
    intermediatePools,
    dexTag,
    versionTag,
  }: {
    fromTokenAvailablePools: TokenAvailablePools
    toTokenAvailablePools: TokenAvailablePools
    intermediatePools: TokenAvailablePools[]
    dexTag: DexTag
    versionTag: VersionTag
  }): RoutePath[] {
    if (!fromTokenAvailablePools) {
      throw new DexError(
        'Must provide from token routes',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!toTokenAvailablePools) {
      throw new DexError(
        'Must provide to token routes',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!Array.isArray(intermediatePools)) {
      throw new DexError(
        'Must provide all main routes',
        ErrorCodes.functionArgumentError,
      )
    }

    assertVersionTag(versionTag)

    const version = getVersionFromVersionTag(versionTag)

    const routes: RoutePath[] = []

    if (!fromTokenAvailablePools.pools || !toTokenAvailablePools.pools) {
      return routes
    }

    // Direct swap (one hop)
    // UNI -> WPLS
    //   \   /
    //   Direct
    const directRoute = fromTokenAvailablePools.pools.find((fromPool) =>
      toTokenAvailablePools.pools.some((toPool) =>
        isSameAddress(fromPool.pairAddress, toPool.pairAddress),
      ),
    )

    if (directRoute) {
      routes.push({
        route: [fromTokenAvailablePools.token, toTokenAvailablePools.token],
        pairAddresses: [directRoute.pairAddress],
        liquidityProviderFeePercent:
          this._liquidityProviderFeeByDex[dexTag]?.[versionTag] ?? 0.003,
        version,
        dexTag,
        protocol: this.protocol,
      })
    }

    if (this._settings.disableMultihops) {
      return routes
    }

    // Two-hop swap (intermediate token)
    // UNI -> WPLS -> USDT
    //   \   /   \   /
    // fromPool  toPool
    const jointCompatibleRoutes = fromTokenAvailablePools.pools.filter(
      (fromPool) =>
        toTokenAvailablePools.pools.some((toPool) =>
          isSameAddress(
            fromPool.pairedToken.contractAddress,
            toPool.pairedToken.contractAddress,
          ),
        ),
    )

    if (jointCompatibleRoutes && jointCompatibleRoutes.length > 0) {
      for (const jointRoute of jointCompatibleRoutes) {
        const fromIntermediatePool = fromTokenAvailablePools.pools.find(
          (fromPool) =>
            isSameAddress(
              fromPool.pairedToken.contractAddress,
              jointRoute.pairedToken.contractAddress,
            ),
        )
        const toIntermediatePool = toTokenAvailablePools.pools.find((toPool) =>
          isSameAddress(
            toPool.pairedToken.contractAddress,
            jointRoute.pairedToken.contractAddress,
          ),
        )

        if (fromIntermediatePool && toIntermediatePool) {
          const newRoute: RoutePath = {
            route: [
              fromTokenAvailablePools.token,
              jointRoute.pairedToken,
              toTokenAvailablePools.token,
            ],
            pairAddresses: [
              fromIntermediatePool.pairAddress,
              toIntermediatePool.pairAddress,
            ],
            liquidityProviderFeePercent:
              this._liquidityProviderFeeByDex[dexTag]?.[versionTag] ?? 0.003,
            version,
            dexTag,
            protocol: this.protocol,
          }

          if (isUniqueRoute(newRoute, routes)) {
            routes.push(newRoute)
          }
        }
      }
    }

    // Three-hop swap (two intermediate tokens)
    // UNI -> WPLS -> DAI -> USDT
    //   \   /   \   /   \   /
    //   Pool1   Pool2   Pool3
    for (const poolPosition2 of intermediatePools) {
      // Find the first intermediate pool based on token compatibility
      const fromPool = fromTokenAvailablePools.pools.find((fromPool) =>
        isSameAddress(
          fromPool.pairedToken.contractAddress,
          poolPosition2.token.contractAddress,
        ),
      )

      if (!fromPool) {
        continue
      }

      for (const poolPosition3 of intermediatePools) {
        // Find the second intermediate pool
        const intermediatePool = poolPosition2.pools.find((pool) =>
          isSameAddress(
            pool.pairedToken.contractAddress,
            poolPosition3.token.contractAddress,
          ),
        )

        // Find the third intermediate pool for final hop
        const toPool = toTokenAvailablePools.pools.find((pool) =>
          isSameAddress(
            pool.pairedToken.contractAddress,
            poolPosition3.token.contractAddress,
          ),
        )

        if (intermediatePool && toPool) {
          const newRoute: RoutePath = {
            route: [
              fromTokenAvailablePools.token,
              poolPosition2.token,
              poolPosition3.token,
              toTokenAvailablePools.token,
            ],
            pairAddresses: [
              fromPool.pairAddress,
              intermediatePool.pairAddress,
              toPool.pairAddress,
            ],
            liquidityProviderFeePercent:
              this._liquidityProviderFeeByDex[dexTag]?.[versionTag] ?? 0.003,
            version,
            dexTag,
            protocol: this.protocol,
          }

          if (isUniqueRoute(newRoute, routes)) {
            routes.push(newRoute)
          }
        }
      }
    }

    return routes
  }

  // ------------------------
  // Route Quotes
  // ------------------------

  override prepareRouteQuotesCallContext({
    tokenAmount,
    tradeDirection = tradeDirectionMap.input,
    routePathsByDex,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
    routePathsByDex: RoutePathsByDex
  }): Record<
    Address,
    ContractContext<
      UniswapRouterV2Types.Contract,
      Record<
        string,
        MethodCallUnion<
          UniswapRouterV2Types.Contract,
          'getAmountsIn' | 'getAmountsOut'
        >
      >
    >
  > {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    const contractCalls: Record<
      Address,
      ContractContext<
        UniswapRouterV2Types.Contract,
        Record<
          string,
          MethodCallUnion<
            UniswapRouterV2Types.Contract,
            'getAmountsIn' | 'getAmountsOut'
          >
        >,
        Record<string, RoutePath>
      >
    > = {}

    for (const [dexTag, routePathContexts] of Object.entries(routePathsByDex)) {
      for (const routePath of routePathContexts) {
        const versionTag = getVersionTagFromVersion(routePath.version)

        const routerContract = this.getRouterContract(dexTag, versionTag)
        const { address, abi } = routerContract.contractDetail

        const referencedRoutePathContexts: Record<string, RoutePath> = {}

        const calls: Record<
          string,
          MethodCallUnion<
            UniswapRouterV2Types.Contract,
            'getAmountsIn' | 'getAmountsOut'
          >
        > = {}

        if (!routePathContexts) {
          continue
        }

        for (let i = 0; i < routePathContexts.length; i++) {
          const reference = i
          const routePathContext = routePathContexts[reference]

          if (!routePathContext) {
            continue
          }

          referencedRoutePathContexts[reference] = routePathContext

          const routePathAddresses = routePathContext.route.map((t) => {
            return transformCoinAddressToWrappedAddress(t.contractAddress)
          })

          switch (tradeDirection) {
            case tradeDirectionMap.input:
              calls[reference] = routerContract.getAmountsOutCallContext(
                tokenAmount.toHexString(),
                routePathAddresses,
              )
              break
            case tradeDirectionMap.output:
              calls[reference] = routerContract.getAmountsInCallContext(
                tokenAmount.toHexString(),
                routePathAddresses,
              )
              break
            default:
              throw new DexError(
                'Invalid trade direction',
                ErrorCodes.functionArgumentError,
              )
          }
        }

        contractCalls[
          createRouteMulticallReference({
            dexTag,
            protocol: this.protocol,
            versionTag,
          })
        ] = {
          contractAddress: address,
          abi,
          calls,
          customData: referencedRoutePathContexts,
        }
      }
    }

    return contractCalls
  }

  public processRouteQuotesCallResults({
    tokenAmount,
    contractCallResults,
    tradeDirection,
  }: {
    tokenAmount: DexNumber
    contractCallResults: MulticallResults<
      Record<
        string,
        ContractContext<
          UniswapRouterV2Types.Contract,
          Record<
            string,
            MethodCallUnion<
              UniswapRouterV2Types.Contract,
              'getAmountsIn' | 'getAmountsOut'
            >
          >,
          Record<string, RoutePath>
        >
      >
    >
    tradeDirection: TradeDirection
  }): RouteQuote[] {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!contractCallResults) {
      throw new DexError(
        'Must provide contract call results',
        ErrorCodes.functionArgumentError,
      )
    }

    assertTradeDirection(tradeDirection)

    const routeQuotes: RouteQuote[] = []

    for (const [contractReference, contractCallReturnContext] of Object.entries(
      contractCallResults.contracts,
    )) {
      const { dexTag } = parseRouteMulticallReference(contractReference)

      assertDexTag(dexTag)

      if (contractCallReturnContext) {
        const { results, originContext } = contractCallReturnContext

        for (const [methodReference, methodCallResult] of Object.entries(
          results,
        )) {
          const routeContext = originContext.customData[methodReference]

          if (!routeContext) {
            throw new DexError(
              'Missing routeContext from customData',
              ErrorCodes.internalError,
            )
          }

          if (!methodCallResult.success) {
            continue
          }

          routeQuotes.push(
            this.buildRouteQuote({
              tokenAmount,
              methodCallResult,
              routeContext,
              tradeDirection,
              dexTag,
            }),
          )
        }
      }
    }

    return tradeDirection === tradeDirectionMap.input
      ? routeQuotes
          .sort((a, b) =>
            a.expectedConvertQuote.comparedTo(b.expectedConvertQuote),
          )
          .reverse()
      : routeQuotes.sort((a, b) =>
          b.expectedConvertQuote.comparedTo(a.expectedConvertQuote),
        )
  }

  override buildRouteQuote({
    dexTag,
    tokenAmount,
    methodCallResult,
    routeContext,
    tradeDirection,
  }: {
    dexTag: DexTag
    tokenAmount: DexNumber
    methodCallResult: MethodResult<
      UniswapRouterV2Types.Contract,
      MethodCallUnion<
        UniswapRouterV2Types.Contract,
        'getAmountsIn' | 'getAmountsOut'
      >
    >
    routeContext: RoutePath
    tradeDirection: TradeDirection
  }): RouteQuote {
    assertDexTag(dexTag)

    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!methodCallResult) {
      throw new DexError(
        'Must provide call return context',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!routeContext) {
      throw new DexError(
        'Must provide route context',
        ErrorCodes.functionArgumentError,
      )
    }

    assertTradeDirection(tradeDirection)

    const { quote: expectedConvertQuote } = this.getConvertQuoteUnshifted({
      methodCallResult,
      tradeDirection,
    })

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage({
        expectedConvertQuote,
        tradeDirection,
      })

    const { pairAddresses, liquidityProviderFeePercent, version } =
      routeContext ?? {}

    const versionTag = getVersionTagFromVersion(version)

    const tradeExpires = generateDeadlineUnixTime(
      this._settings.deadlineMinutes,
    )

    const routePathAddresses = methodCallResult.methodParameters[1]

    const hasFeeOnTransfer =
      this._settings.hasFeeOnTransfer ||
      this._fromToken.hasFeeOnTransfer ||
      this._toToken.hasFeeOnTransfer

    const routeQuoteTradeContext: RouteQuoteTradeContext = {
      protocol: this.protocol,
      liquidityProviderFeePercent,
      routePathAddresses,
      hasFeeOnTransfer,
    }

    const data = this.encodeTradeData({
      tradeDirection,
      fromAmount: tokenAmount,
      toAmount: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      routeQuoteTradeContext,
      deadline: tradeExpires.toString(),
      dexTag,
      versionTag,
    })

    const transaction = isTradePathFromCoin(this.tradePath)
      ? this.buildUpTransactionCoinDirectionFrom({
          coinAmount:
            tradeDirection === tradeDirectionMap.input
              ? tokenAmount
              : expectedConvertQuote,
          data,
          dexTag,
          versionTag,
        })
      : this.buildUpTransactionTokenDirectionFrom({
          data,
          dexTag,
          versionTag,
        })

    const routeQuote: RouteQuote = {
      dexTag,
      protocol: this.protocol,
      version,
      expectedConvertQuote,
      expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      transaction,
      tradeExpires,
      routePathTokens: routePathAddresses.map(
        (pathAddress: Address, index: number) => {
          const token = structuredClone(
            this.allTokens.find((t) =>
              isSameAddress(t.contractAddress, pathAddress),
            )!,
          )

          if (!token) {
            throw new DexError(
              `Token not found for path address ${pathAddress}`,
              ErrorCodes.internalError,
            )
          }

          if (isTradePathFromCoin(this.tradePath) && index === 0) {
            return transformWrappedTokenToCoin(
              token,
              this._dexProvider.customNetwork?.nativeCurrency,
            )
          } else if (
            isTradePathToCoin(this.tradePath) &&
            index === routePathAddresses.length - 1
          ) {
            return transformWrappedTokenToCoin(
              token,
              this._dexProvider.customNetwork?.nativeCurrency,
            )
          }

          return token
        },
      ),
      routePathText: routePathAddresses
        .map((pathAddress: Address, index: number) => {
          if (
            (isTradePathFromCoin(this.tradePath) && index === 0) ||
            (isTradePathToCoin(this.tradePath) &&
              index === routePathAddresses.length - 1)
          ) {
            return this.nativeCurrency.symbol
          }

          return this.allTokens.find((t) =>
            isSameAddress(t.contractAddress, pathAddress),
          )!.symbol
        })
        .join(' > '),
      routePathAddresses,
      pairAddresses,
      liquidityProviderFeePercent,
      tradeDirection,
    }

    return routeQuote
  }
  override getConvertQuoteUnshifted({
    methodCallResult,
    tradeDirection,
  }: {
    methodCallResult: MethodResult<
      UniswapRouterV2Types.Contract,
      MethodCallUnion<
        UniswapRouterV2Types.Contract,
        'getAmountsIn' | 'getAmountsOut'
      >
    >
    tradeDirection: TradeDirection
  }): {
    quote: DexNumber
    sqrtPriceX96After?: DexNumber | DexNumber[]
  } {
    if (!methodCallResult) {
      throw new DexError(
        'Must provide call return context',
        ErrorCodes.functionArgumentError,
      )
    }

    // if (!Array.isArray(methodCallResult)) {
    //   throw new DexError(
    //     `No routes found for ${this._fromToken.symbol} > ${this._toToken.symbol}`,
    //     ErrorCodes.functionArgumentError,
    //   )
    // }

    assertTradeDirection(tradeDirection)

    let amount: BigNumber | undefined

    switch (tradeDirection) {
      case tradeDirectionMap.input:
        amount = methodCallResult.value[methodCallResult.value.length - 1]
        break
      case tradeDirectionMap.output:
        amount = methodCallResult.value[0]
        break
      default:
        throw new DexError(
          `Trade direction ${tradeDirection} is not supported`,
          ErrorCodes.tradePathIsNotSupported,
        )
    }

    if (!amount) {
      throw new DexError(
        'Missing amount from methodCallResult',
        ErrorCodes.internalError,
      )
    }

    const quote = DexNumber.fromShifted(
      amount.toString(),
      tradeDirection === tradeDirectionMap.input
        ? this.toToken.decimals
        : this.fromToken.decimals,
    ).unshift()

    return { quote }
  }

  // ------------------------
  // Pools
  // ------------------------

  override getPools({
    token,
    validPairContexts,
  }: {
    token: Token
    validPairContexts: Record<
      string,
      ContractResults<
        UniswapFactoryV2Types.Contract,
        Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
      >
    >
  }): Pool[] {
    if (!token) {
      throw new DexError('Must provide token', ErrorCodes.functionArgumentError)
    }

    if (!validPairContexts) {
      throw new DexError(
        'Must provide valid pair contexts',
        ErrorCodes.functionArgumentError,
      )
    }

    const pools: Pool[] = []

    // Iterate through the valid pair contexts
    for (const contract of Object.values<
      ContractResults<
        UniswapFactoryV2Types.Contract,
        Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
      >
    >(validPairContexts)) {
      // Iterate though the method calls
      for (const [methodReference, methodResult] of Object.entries(
        contract.results,
      )) {
        const { fromTokenAddress, toTokenAddress } =
          parseRouteMulticallReference(methodReference) ?? {}

        if (!fromTokenAddress || !toTokenAddress) {
          continue
        }

        // Check if either token matches the provided token
        if (
          !isSameAddress(token.contractAddress, fromTokenAddress) &&
          !isSameAddress(token.contractAddress, toTokenAddress)
        ) {
          continue
        }

        // Identify the paired token (the one that is not the provided token)
        const pairedTokenAddress = isSameAddress(
          token.contractAddress,
          fromTokenAddress,
        )
          ? toTokenAddress
          : fromTokenAddress

        const pairedToken = this.allTokens.find((t) =>
          isSameAddress(t.contractAddress, pairedTokenAddress),
        )

        if (!pairedToken) {
          continue
        }

        const pairAddress = methodResult.value

        pools.push({
          pairedToken,
          pairAddress,
        })
      }
    }

    return pools
  }

  public async getPoolReserves({
    pairAddresses,
    dexTag,
    versionTag,
  }: {
    pairAddresses: Address[]
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<PoolReserve[]> {
    assertIsAddresses(pairAddresses)
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV2) {
      throw new DexError(
        'V2 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const { pair } = dexConfig.protocols.protocolV2?.[versionTag] ?? {}

    const { abi, methods } = pair ?? {}

    if (!pair) {
      throw new DexError(
        'V2 pair contract details not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!abi) {
      throw new DexError(
        'V2 pair contract abi not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const reserves: PoolReserve[] = []
    const pairContracts = await Promise.all(
      pairAddresses.map(async (pairAddress) => {
        const contract = new PairContract(this._dexProvider, {
          address: pairAddress,
          abi,
          methods,
        })

        return contract
      }),
    )

    // Fetch reserves for each pair
    const callContexts = pairAddresses.reduce(
      (acc, pairAddress, i) => {
        const pairContract = pairContracts[i]

        if (!pairContract) {
          throw new DexError(
            `Pair contract for ${pairAddress} not found`,
            ErrorCodes.functionArgumentError,
          )
        }

        acc[pairAddress] =
          this.dexProvider.createCallContext<UniswapPairV2Types.Contract>()({
            contractAddress: getAddress(pairAddress),
            abi: pairContract.contractDetail.abi,
            calls: {
              [`getReserves-${pairAddress}`]:
                pairContract.getReservesCallContext(),
              [`token0-${pairAddress}`]: pairContract.token0CallContext(),
              [`token1-${pairAddress}`]: pairContract.token1CallContext(),
            },
          })
        return acc
      },
      {} as Record<
        string,
        ContractContext<
          UniswapPairV2Types.Contract,
          Record<
            string,
            MethodCallUnion<
              UniswapPairV2Types.Contract,
              'getReserves' | 'token0' | 'token1'
            >
          >
        >
      >,
    )

    // Execute multicall for all pair contracts
    const callResults = await this.dexProvider.call(callContexts)

    // Process results and format PoolReserve objects
    for (const pairAddress of pairAddresses) {
      const contractResult = callResults.contracts[pairAddress]
      if (!contractResult) continue

      const { results } = contractResult
      const reserveCall = results[`getReserves-${pairAddress}`] as MethodResult<
        UniswapPairV2Types.Contract,
        MethodCall<UniswapPairV2Types.Contract, 'getReserves'>
      >
      const token0Call = results[`token0-${pairAddress}`] as MethodResult<
        UniswapPairV2Types.Contract,
        MethodCall<UniswapPairV2Types.Contract, 'token0'>
      >
      const token1Call = results[`token1-${pairAddress}`] as MethodResult<
        UniswapPairV2Types.Contract,
        MethodCall<UniswapPairV2Types.Contract, 'token1'>
      >

      if (reserveCall?.success && token0Call?.success && token1Call?.success) {
        const reservesData = reserveCall.value
        const token0Address = token0Call.value
        const token1Address = token1Call.value

        // Identify token0 and token1 by address
        const [token0, token1] = isSameAddress(
          token0Address,
          this._fromToken.contractAddress,
        )
          ? [this._fromToken, this._toToken]
          : [this._toToken, this._fromToken]

        // Convert raw reserves to adjusted values based on token decimals
        const reserve0 = DexNumber.fromShifted(
          reservesData._reserve0,
          token0.decimals,
        )
        const reserve1 = DexNumber.fromShifted(
          reservesData._reserve1,
          token1.decimals,
        )

        reserves.push({
          pairAddress,
          token0: { address: token0Address, reserve: reserve0 },
          token1: { address: token1Address, reserve: reserve1 },
        })
      }
    }

    return reserves
  }
}
