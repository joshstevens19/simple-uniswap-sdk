import type { DexNumber } from '@dex-toolkit/number'
import type {
  TradeDirection,
  RouteQuote,
  RouterInternalArgs,
  DexProtocol,
  PoolReserve,
  VersionedRoutePathsByDex,
  DexTag,
  PriceImpactInfo,
  Token,
  TradeFormat,
  UniswapFactoryV2Types,
  UniswapFactoryV3Types,
  UniswapRouterV2Types,
  UniswapQuoterV3Types,
  Version,
  VersionTag,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  protocolMap,
  tradeDirectionMap,
  populateTradeSettings,
  isWrappingCoin,
  isUnwrappingCoin,
  sortRouteQuotes,
  isWrappingOrUnwrappingCoin,
  convertVersionedRoutePathsByDexToRoutePathsByDex,
  parseRouteMulticallReference,
  getVersionTagFromVersion,
  getVersionFromVersionTag,
  assertVersion,
  assertProtocol,
  assertDexTag,
} from '@dex-toolkit/utils'
import type {
  Address,
  ContractContext,
  MethodCall,
  MethodCallUnion,
} from '@ethereum-multicall/types'

import { RouterAbstract } from './router.abstract'
import { RouterProtocolV2 } from './router.protocol.v2'
import { RouterProtocolV3 } from './router.protocol.v3'

export class Router<
  TFormat extends TradeFormat,
> extends RouterAbstract<TFormat> {
  protected _protocolV2?: RouterProtocolV2<TFormat>

  protected _protocolV3?: RouterProtocolV3<TFormat>

  constructor(context: RouterInternalArgs<TFormat>) {
    super(context)

    const settings = populateTradeSettings(context?.settings)

    if (
      Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV2,
      ) &&
      settings?.protocolSettings?.protocolV2?.enabled
    ) {
      this._protocolV2 = new RouterProtocolV2(context)
    }

    if (
      Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV3,
      ) &&
      settings?.protocolSettings?.protocolV3?.enabled
    ) {
      this._protocolV3 = new RouterProtocolV3(context)
    }

    if (!this._protocolV2 && !this._protocolV3) {
      throw new DexError(
        'Must have a compatible `protocol` enabled in settings',
        ErrorCodes.functionArgumentError,
      )
    }
  }

  /**
   * Get protocol v2 factory
   */
  public get protocolV2(): RouterProtocolV2<TFormat> | undefined {
    return this._protocolV2
  }

  /**
   * Get protocol v3 factory
   */
  public get protocolV3(): RouterProtocolV3<TFormat> | undefined {
    return this._protocolV3
  }

  // ------------------------
  // Route Paths
  // ------------------------

  /**
   * Get all possible valid route paths.
   * Will only go up to 4 due to gas increase the more routes you go.
   */
  public async getVersionedRoutePathsByDex(): Promise<VersionedRoutePathsByDex> {
    // Check if wrapping or unwrapping a coin
    if (
      isWrappingOrUnwrappingCoin({
        fromToken: this._fromToken,
        toToken: this._toToken,
        dexProvider: this._dexProvider,
        customNetwork: this._dexProvider.customNetwork,
      })
    ) {
      const allPossibleRoutesByDex = {} as VersionedRoutePathsByDex

      for (const [dexTag, dexConfig] of Object.entries(this._dexConfigsByDex)) {
        // Grab the first versions available for each protocol as it doesn't matter for wrapping/unwrapping

        const versionForV2 = (
          dexConfig.protocols.protocolV2
            ? Object.keys(dexConfig.protocols.protocolV2)?.[0]
            : undefined
        ) as VersionTag

        const versionForV3 = (
          dexConfig.protocols.protocolV3
            ? Object.keys(dexConfig.protocols.protocolV3)?.[0]
            : undefined
        ) as VersionTag

        allPossibleRoutesByDex[dexTag as DexTag] = {
          protocolV2: this._protocolV2
            ? [
                {
                  route: [this._fromToken, this._toToken],
                  pairAddresses: [],
                  liquidityProviderFeePercent: 0,
                  version: (versionForV2
                    ? getVersionFromVersionTag(versionForV2)
                    : undefined) ?? { major: 1, minor: 0, patch: 0 },
                  protocol: 'protocolV2',
                  dexTag,
                },
              ]
            : [],
          protocolV3: this._protocolV3
            ? [
                {
                  route: [this._fromToken, this._toToken],
                  pairAddresses: [],
                  liquidityProviderFeePercent: 0,
                  version: (versionForV3
                    ? getVersionFromVersionTag(versionForV3)
                    : undefined) ?? { major: 1, minor: 0, patch: 0 },
                  protocol: 'protocolV3',
                  dexTag,
                },
              ]
            : [],
        }
      }

      return allPossibleRoutesByDex
    }

    // Prepare multicall contexts
    const calls: {
      v2?: Record<
        DexTag,
        ContractContext<
          UniswapFactoryV2Types.Contract,
          Record<string, MethodCall<UniswapFactoryV2Types.Contract, 'getPair'>>
        >
      >
      v3?: Record<
        DexTag,
        ContractContext<
          UniswapFactoryV3Types.Contract,
          Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
        >
      >
    } = {}

    if (this._protocolV2) {
      calls.v2 = this._protocolV2.prepareRoutePathsCallContext()
    }

    if (this._protocolV3) {
      calls.v3 = this._protocolV3.prepareRoutePathsCallContext()
    }

    // Initialize the structure for all DEX types
    const allPossibleRoutesByDex = {} as VersionedRoutePathsByDex

    for (const dexTag of Object.keys(this._dexConfigsByDex)) {
      allPossibleRoutesByDex[dexTag as DexTag] = {
        protocolV2: [],
        protocolV3: [],
      }
    }

    const contractCallResults = await this.dexProvider.call({
      ...calls.v2,
      ...calls.v3,
    })

    // Populate V2 routes
    if (this._protocolV2) {
      const routePathsByDexV2 =
        this._protocolV2.processRoutePathsCallResults(contractCallResults)

      for (const dexTag of Object.keys(routePathsByDexV2)) {
        const typedDexTag = dexTag as DexTag
        if (allPossibleRoutesByDex[typedDexTag]) {
          allPossibleRoutesByDex[typedDexTag].protocolV2 =
            routePathsByDexV2[typedDexTag] || []
        }
      }
    }

    // Populate V3 routes
    if (this._protocolV3) {
      const routePathsByDexV3 =
        this._protocolV3.processRoutePathsCallResults(contractCallResults)

      for (const dexTag of Object.keys(routePathsByDexV3)) {
        const typedDexTag = dexTag as DexTag
        if (allPossibleRoutesByDex[typedDexTag]) {
          allPossibleRoutesByDex[typedDexTag].protocolV3 =
            routePathsByDexV3[typedDexTag] || []
        }
      }
    }

    return allPossibleRoutesByDex
  }

  // ------------------------
  // Route Quotes
  // ------------------------

  public override async getRouteQuotes({
    tokenAmount,
    tradeDirection = tradeDirectionMap.input,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
  }): Promise<RouteQuote[]> {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    const versionedRoutePathsByDex = await this.getVersionedRoutePathsByDex()

    const isWrapping = isWrappingCoin({
      fromToken: this._fromToken,
      toToken: this._toToken,
      dexProvider: this._dexProvider,
      customNetwork: this._dexProvider.customNetwork,
    })

    const isUnwrapping = isUnwrappingCoin({
      fromToken: this._fromToken,
      toToken: this._toToken,
      dexProvider: this._dexProvider,
      customNetwork: this._dexProvider.customNetwork,
    })

    if (isWrapping || isUnwrapping) {
      // Grab first route context as it doesn't matter which one we use
      const [[dexTag, versions] = []] = Object.entries(versionedRoutePathsByDex)
      const { protocolV2, protocolV3 } = versions ?? {}
      const routeContext = protocolV2?.[0] ?? protocolV3?.[0]

      assertDexTag(dexTag)

      if (!routeContext) {
        throw new DexError(
          'Failed to find route context for dexTag',
          ErrorCodes.functionArgumentError,
        )
      }

      const routeQuote = isWrapping
        ? this.buildRouteQuoteForCoinToWrapped({
            tokenAmount,
            routeContext,
            tradeDirection,
          })
        : this.buildRouteQuoteForWrappedToCoin({
            tokenAmount,
            routeContext,
            tradeDirection,
          })

      return [routeQuote]
    }

    const calls: {
      protocolV2?: Record<
        DexTag,
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
      >
      protocolV3?: Record<
        DexTag,
        ContractContext<
          UniswapQuoterV3Types.Contract,
          Record<
            string,
            MethodCallUnion<
              UniswapQuoterV3Types.Contract,
              | 'quoteExactInput'
              | 'quoteExactInputSingle'
              | 'quoteExactOutput'
              | 'quoteExactOutputSingle'
            >
          >
        >
      >
    } = {}

    if (this._protocolV2) {
      const routePathsByDex = convertVersionedRoutePathsByDexToRoutePathsByDex(
        versionedRoutePathsByDex,
        protocolMap.protocolV2,
      )

      calls.protocolV2 = this._protocolV2.prepareRouteQuotesCallContext({
        tokenAmount,
        tradeDirection,
        routePathsByDex,
      })
    }

    if (this._protocolV3) {
      const routePathsByDex = convertVersionedRoutePathsByDexToRoutePathsByDex(
        versionedRoutePathsByDex,
        protocolMap.protocolV3,
      )

      calls.protocolV3 = this._protocolV3.prepareRouteQuotesCallContext({
        tokenAmount,
        tradeDirection,
        routePathsByDex,
      })
    }

    const routeQuotes: RouteQuote[] = []

    const { contracts, blockNumber, batchCount } = await this.dexProvider.call({
      ...calls.protocolV2,
      ...calls.protocolV3,
    })

    if (this._protocolV2) {
      for (const [contractReference, contractCallResults] of Object.entries(
        contracts,
      )) {
        const { protocol } = parseRouteMulticallReference(contractReference)

        if (protocol !== protocolMap.protocolV2) {
          continue
        }

        const processed = this._protocolV2?.processRouteQuotesCallResults({
          tokenAmount,
          tradeDirection,
          contractCallResults: {
            contracts: {
              [contractReference]: contractCallResults,
            },
            blockNumber,
            batchCount,
          },
        })

        routeQuotes.push(...processed)
      }
    }

    if (this._protocolV3) {
      for (const [contractReference, contractCallResults] of Object.entries(
        contracts,
      )) {
        const { protocol } = parseRouteMulticallReference(contractReference)

        if (protocol !== protocolMap.protocolV3) {
          continue
        }

        routeQuotes.push(
          ...this._protocolV3?.processRouteQuotesCallResults({
            tokenAmount,
            tradeDirection,
            contractCallResults: {
              contracts: {
                [contractReference]: contractCallResults,
              },
              blockNumber,
              batchCount,
            },
          }),
        )
      }
    }

    const sortedQuotes = sortRouteQuotes({ routeQuotes, tradeDirection })

    return sortedQuotes
  }

  // ------------------------
  // Pools
  // ------------------------

  /**
   * @inheritDoc
   *
   * @param params - The parameters required to get pool reserves.
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
   * @param params.versionTag - The version tag.
   */
  public override async getPoolReserves({
    pairAddresses,
    dexTag,
    protocol,
    versionTag,
  }: {
    pairAddresses: Address[]
    dexTag: DexTag
    protocol: DexProtocol
    versionTag: VersionTag
  }): Promise<PoolReserve[]> {
    const reserves: PoolReserve[] = []

    if (this._protocolV2 && protocol === protocolMap.protocolV2) {
      reserves.push(
        ...(await this._protocolV2.getPoolReserves({
          pairAddresses,
          dexTag,
          versionTag,
        })),
      )
    }

    if (this._protocolV3 && protocol === protocolMap.protocolV3) {
      reserves.push(
        ...(await this._protocolV3.getPoolReserves({
          pairAddresses,
          dexTag,
          versionTag,
        })),
      )
    }

    return reserves
  }

  // ------------------------
  // Price Impact
  // ------------------------

  /**
   * @inheritDoc
   *
   * @param protocol - The protocol of the DEX (v2, v3, etc.).
   */
  public override async getPriceImpact({
    tokenAmount,
    expectedConvertQuote,
    pairAddresses,
    routePathTokens,
    liquidityProviderFeePercent,
    dexTag,
    protocol,
    version,
  }: {
    tokenAmount: DexNumber
    expectedConvertQuote: DexNumber
    pairAddresses: Address[]
    routePathTokens: Token[]
    liquidityProviderFeePercent: number | number[]
    dexTag: DexTag
    protocol: DexProtocol
    version: Version
  }): Promise<PriceImpactInfo> {
    assertProtocol(protocol)
    assertVersion(version)

    const versionTag = getVersionTagFromVersion(version)

    switch (protocol) {
      case protocolMap.protocolV2:
        if (!this._protocolV2) {
          throw new DexError(
            `Router factory v2 not found for dexTag ${dexTag}`,
            ErrorCodes.internalError,
          )
        }

        return this._protocolV2.getPriceImpact({
          tokenAmount,
          expectedConvertQuote,
          pairAddresses,
          routePathTokens,
          liquidityProviderFeePercent,
          dexTag,
          versionTag,
        })
      case protocolMap.protocolV3:
        if (!this._protocolV3) {
          throw new DexError(
            `Router factory v3 not found for dexTag ${dexTag}`,
            ErrorCodes.internalError,
          )
        }

        return this._protocolV3.getPriceImpact({
          tokenAmount,
          expectedConvertQuote,
          pairAddresses,
          routePathTokens,
          liquidityProviderFeePercent,
          dexTag,
          versionTag,
        })
      default:
        throw new DexError(
          `Invalid DEX version ${protocol}`,
          ErrorCodes.protocolNotSupported,
        )
    }
  }
}
