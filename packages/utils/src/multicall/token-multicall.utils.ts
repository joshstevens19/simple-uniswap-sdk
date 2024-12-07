import { DexNumber } from '@dex-toolkit/number'
import type {
  AllowancesByDex,
  Erc20Types,
  TokenCallContext,
  TokenCallOption,
  TokenCalls,
  TokenParams,
  TradeFormat,
  TradeFormatValue,
  TradeFormatOptions,
} from '@dex-toolkit/types'
import type { ContractResults, GetReturnType } from '@ethereum-multicall/types'

import {
  createMulticallReference,
  parseMulticallReference,
} from './multicall-utils'
import { MAX_HEX_STRING, MIN_HEX_STRING } from '../utils/constants'
import { assertDexTag, assertProtocol } from '../utils/dex.utils'
import { assertVersionTag } from '../utils/version.utils'

/**
 * Creates a token call context array based on the specified parameters.
 * The call context is used to prepare the contract call requests for various token-related methods
 * like `symbol`, `decimals`, `name`, `balanceOf`, `allowanceV2`, and `allowanceV3`.
 *
 * @param params - An object containing the parameters for creating the call context.
 * @returns An array of `CallContext` objects, each representing a method call to be made on the token contract.
 */
export function prepareTokenCallContext<TOption extends TokenCallOption[]>(
  params: TokenParams<TOption>,
): TokenCallContext<TOption> {
  const {
    includes,
    walletAddress,
    dexTag,
    protocol,
    versionTag,
    routerAddress,
  } = params ?? {}
  const callContext = {} as TokenCallContext<TOption>

  includes.forEach((include) => {
    switch (include) {
      case 'symbol':
        callContext.symbol = {
          methodName: 'symbol',
          methodParameters: [],
        }
        break
      case 'decimals':
        callContext.decimals = {
          methodName: 'decimals',
          methodParameters: [],
        }
        break
      case 'name':
        callContext.name = {
          methodName: 'name',
          methodParameters: [],
        }
        break
      case 'balanceOf':
        callContext.balanceOf = {
          methodName: 'balanceOf',
          methodParameters: [walletAddress],
        }
        break
      case 'allowance':
        {
          assertDexTag(dexTag)
          assertProtocol(protocol)
          assertVersionTag(versionTag)

          const reference = createMulticallReference({
            prefix: 'allowance',
            dexTag,
            protocol,
            versionTag,
          })

          ;(callContext as any)[reference] = {
            methodName: 'allowance',
            methodParameters: [walletAddress, routerAddress],
          }
        }
        break
    }
  })

  return callContext
}

/**
 * Parses the results from a token contract call context, extracting details like symbol, decimals, name, balance, and allowances.
 *
 * @template TFormat - The format type.
 *
 * @param params - The parameters for parsing the token call results.
 * @param params.contractResults - The full results of contract call execution.'
 * @param params.format - The format in which the balance and allowance values are returned. Defaults to `dexnumber` if not provided.
 *
 * @returns An object containing the parsed token details. If `dexTag` is provided, the object will include `allowanceV2` and `allowanceV3`.
 */
export function processTokenCallResults<
  TFormat extends TradeFormat = 'dexnumber',
>({
  contractResults,
  format = { type: 'dexnumber' as TFormat },
}: {
  contractResults: ContractResults<Erc20Types.Contract, TokenCalls<true, true>>
  format?: TradeFormatOptions<TFormat>
}): {
  symbol?: GetReturnType<Erc20Types.Contract, 'symbol'>
  decimals?: GetReturnType<Erc20Types.Contract, 'decimals'>
  name?: GetReturnType<Erc20Types.Contract, 'name'>
  balanceOf?: TradeFormatValue<TFormat>
  allowanceInfoByDex?: AllowancesByDex<TFormat>
} {
  const tokenResults = contractResults.results

  // Basic token results
  const symbol = tokenResults.symbol?.value as GetReturnType<
    Erc20Types.Contract,
    'symbol'
  >
  const decimals = tokenResults.decimals?.value as GetReturnType<
    Erc20Types.Contract,
    'decimals'
  >
  const name = tokenResults.name?.value as GetReturnType<
    Erc20Types.Contract,
    'name'
  >
  const balanceOf = DexNumber.fromShifted(
    (contractResults.results.balanceOf?.value ??
      MIN_HEX_STRING) as GetReturnType<Erc20Types.Contract, 'balanceOf'>,
    decimals,
  ).toTradeFormat(format)

  // Loop through all the allowance results and parse the results
  let allowanceInfoByDex: AllowancesByDex<TFormat> | undefined = undefined

  for (const [methodReference, methodResult] of Object.entries(
    contractResults.results,
  )) {
    const { methodName, value } = methodResult

    if (!methodName.startsWith('allowance')) {
      continue
    }

    const allowance = DexNumber.fromShifted(
      value as GetReturnType<Erc20Types.Contract, 'allowance'>,
      decimals,
    )
    const allowanceValue = allowance.toTradeFormat(format)

    const { dexTag, protocol, versionTag } =
      parseMulticallReference(methodReference)

    allowanceInfoByDex ??= {}
    allowanceInfoByDex[dexTag] ??= {
      protocolV2: {},
      protocolV3: {},
    }
    allowanceInfoByDex[dexTag][protocol][versionTag] = {
      allowance: allowanceValue,
      isMaxAllowance: allowance.toHexString() === MAX_HEX_STRING,
    }
  }

  return {
    symbol,
    decimals,
    name,
    balanceOf,
    allowanceInfoByDex,
  }
}
