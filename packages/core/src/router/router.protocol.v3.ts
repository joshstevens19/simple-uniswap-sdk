import {
  FactoryContractV3,
  QuoterContractV3,
  RouterContractV3,
  PositionManagerContractV3,
} from '@dex-toolkit/contracts'
import { DexNumber } from '@dex-toolkit/number'
import type {
  TradeDirection,
  RoutePath,
  RouteQuoteTradeContext,
  Token,
  Pool,
  TradeInternalArgs,
  PoolReserve,
  DexTag,
  RoutePathsByDex,
  TokenAvailablePools,
  UniswapRouterV3Types,
  TradeFormat,
  UniswapFactoryV3Types,
  UniswapQuoterV3Types,
  RouteQuote,
  DexProtocol,
  VersionTag,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  transformCoinAddressToWrappedAddress,
  isSameAddress,
  isCoinAddress,
  percentToFeeTier,
  tradeDirectionMap,
  ZERO_ADDRESS,
  protocolMap,
  createRouteMulticallReference,
  parseRouteMulticallReference,
  isLiquidityProviderFeePercentV3,
  feeToPercent,
  isUniqueRoute,
  generateDeadlineUnixTime,
  isTradePathFromCoin,
  transformWrappedTokenToCoin,
  isTradePathToCoin,
  getVersionFromVersionTag,
  getVersionTagFromVersion,
  constructPathV3,
  assertTradeDirection,
  assertVersionTag,
  assertDexTag,
  assertIsAddresses,
  calculateSwapPriceLimit,
  isQuoteExactInputResponse,
  isQuoteExactInputSingleResponse,
  isQuoteExactOutputResponse,
  isQuoteExactOutputSingleResponse,
  assertFeeTier,
} from '@dex-toolkit/utils'
import type {
  Address,
  ContractContext,
  MethodCall,
  MethodCallUnion,
  ContractResults,
  MethodResult,
  MulticallResults,
} from '@ethereum-multicall/types'

import { RouterProtocolAbstract } from './router.protocol.abstract'

export class RouterProtocolV3<
  TFormat extends TradeFormat,
> extends RouterProtocolAbstract<TFormat> {
  protected _routerContractByDex: Record<
    DexTag,
    Record<VersionTag, RouterContractV3>
  > = {}

  protected _factoryContractByDex: Record<
    DexTag,
    Record<VersionTag, FactoryContractV3>
  > = {}

  protected _quoterContractByDex: Record<
    DexTag,
    Record<VersionTag, QuoterContractV3>
  > = {}

  protected _positionManagerContractByDex: Record<
    DexTag,
    Record<VersionTag, PositionManagerContractV3>
  > = {}

  constructor(context: TradeInternalArgs<TFormat>) {
    super(context)

    if (
      !Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV3,
      )
    ) {
      throw new DexError(
        'V3 contract details not provided in any dex config',
        ErrorCodes.functionArgumentError,
      )
    }

    for (const [dexTag, dexConfig] of Object.entries(this._dexConfigsByDex)) {
      if (!dexConfig.protocols.protocolV3) {
        throw new DexError(
          'V3 protocol details not provided',
          ErrorCodes.functionArgumentError,
        )
      }

      for (const protocolItem of Object.entries(
        dexConfig.protocols.protocolV3,
      )) {
        const versionTag = protocolItem[0] as VersionTag
        const contractDetails = protocolItem[1]

        assertVersionTag(versionTag)

        if (!contractDetails) {
          throw new DexError(
            'V3 contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        const { router, factory, quoter, positionManager, pool } =
          contractDetails ?? {}

        if (!router) {
          throw new DexError(
            'V3 router contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!factory) {
          throw new DexError(
            'V3 factory contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!quoter) {
          throw new DexError(
            'V3 quoter contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!positionManager) {
          throw new DexError(
            'V3 positionManager contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        if (!pool) {
          throw new DexError(
            'V3 pool contract details not provided',
            ErrorCodes.functionArgumentError,
          )
        }

        // Router
        this._routerContractByDex[dexTag] ??= {}
        this._routerContractByDex[dexTag][versionTag] = new RouterContractV3(
          this._dexProvider,
          contractDetails.router,
        )

        // Factory
        this._factoryContractByDex[dexTag] ??= {}
        this._factoryContractByDex[dexTag][versionTag] = new FactoryContractV3(
          this._dexProvider,
          contractDetails.factory,
        )

        // Quoter
        this._quoterContractByDex[dexTag] ??= {}
        this._quoterContractByDex[dexTag][versionTag] = new QuoterContractV3(
          this._dexProvider,
          contractDetails.quoter,
        )

        // Position Manager
        this._positionManagerContractByDex[dexTag] ??= {}
        this._positionManagerContractByDex[dexTag][versionTag] =
          new PositionManagerContractV3(
            this._dexProvider,
            contractDetails.positionManager,
          )
      }
    }
  }

  // ------------------------
  // Getters
  // ------------------------

  override get protocol(): DexProtocol {
    return protocolMap.protocolV3
  }

  public getRouterContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): RouterContractV3 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const routerContract = this._routerContractByDex[dexTag]?.[versionTag]

    if (!routerContract) {
      throw new DexError(
        `Router contract not found for dexTag ${dexTag} and version ${versionTag}`,
        ErrorCodes.internalError,
      )
    }

    return routerContract
  }

  public getFactoryContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): FactoryContractV3 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const factoryContract = this._factoryContractByDex[dexTag]?.[versionTag]

    if (!factoryContract) {
      throw new DexError(
        `Factory contract not found for dexTag ${dexTag} and version ${versionTag}`,
        ErrorCodes.internalError,
      )
    }

    return factoryContract
  }

  public getQuoterContractV3(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): QuoterContractV3 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const quoterContract = this._quoterContractByDex[dexTag]?.[versionTag]

    if (!quoterContract) {
      throw new DexError(
        `Quoter contract not found for dexTag ${dexTag} and version ${versionTag}`,
        ErrorCodes.internalError,
      )
    }

    return quoterContract
  }

  public getPositionManagerContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): PositionManagerContractV3 {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const positionManagerContract =
      this._positionManagerContractByDex[dexTag]?.[versionTag]

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag} and version ${versionTag}`,
        ErrorCodes.internalError,
      )
    }

    return positionManagerContract
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

    const {
      liquidityProviderFeePercent: liquidityProviderFeePercents,
      routePathAddresses,
    } = routeQuoteTradeContext ?? {}

    if (!isLiquidityProviderFeePercentV3(liquidityProviderFeePercents)) {
      throw new DexError(
        'Liquidity provider fee is not an array',
        ErrorCodes.liquidityProviderFeeNotFound,
      )
    }

    const routerContract = this.getRouterContract(dexTag, versionTag)

    if (!routerContract) {
      throw new DexError(
        `Router contract factory not found for dex type: ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const isOutputCoin = isCoinAddress(this._toToken.contractAddress)
    const isSingle = routePathAddresses.length === 2

    const { recipient } = this._settings
    const outputAddress = recipient || this._walletAddress

    const amountIn = fromAmount.toHexString()
    const amountOutMinimum = toAmount.toHexString()

    const multicallData: string[] = []

    if (isSingle) {
      const liquidProviderFee = liquidityProviderFeePercents[0]

      if (!liquidProviderFee) {
        throw new DexError(
          'Liquidity provider fee not found',
          ErrorCodes.liquidityProviderFeeNotFound,
        )
      }

      const sqrtPriceLimitX96 =
        routeQuoteTradeContext?.sqrtPriceX96AfterOrList &&
        !Array.isArray(routeQuoteTradeContext.sqrtPriceX96AfterOrList) &&
        !this._settings.disablePriceImpact
          ? calculateSwapPriceLimit({
              currentSqrtPriceX96:
                routeQuoteTradeContext.sqrtPriceX96AfterOrList,
              slippageTolerance: this._settings.slippage,
              isExactInput: true,
            })
          : DexNumber.fromUnshifted(0)

      multicallData.push(
        routerContract.encodeExactInputSingle({
          tokenIn: transformCoinAddressToWrappedAddress(
            this._fromToken.contractAddress,
          ),
          tokenOut: transformCoinAddressToWrappedAddress(
            this._toToken.contractAddress,
          ),
          fee: percentToFeeTier(liquidProviderFee),
          recipient: isOutputCoin ? ZERO_ADDRESS : outputAddress,
          amountIn,
          amountOutMinimum,
          sqrtPriceLimitX96: sqrtPriceLimitX96.toHexString(),
        }),
      )
    } else {
      multicallData.push(
        routerContract.encodeExactInput({
          path: this.getEncodedPoolsPath({
            tokenAddresses: routePathAddresses.map((r) =>
              transformCoinAddressToWrappedAddress(r),
            ),
            feePercentages: liquidityProviderFeePercents,
            tradeDirection: tradeDirectionMap.input,
            dexTag,
            versionTag,
          }),
          recipient: isOutputCoin ? ZERO_ADDRESS : outputAddress,
          amountIn,
          amountOutMinimum,
        }),
      )
    }

    if (isOutputCoin) {
      multicallData.push(
        routerContract.encodeUnwrapWETH9(amountOutMinimum, outputAddress),
      )
    }

    return routerContract.encodeMulticall(deadline, multicallData)
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
        'Must provide amount out',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!toAmount) {
      throw new DexError(
        'Must provide toAmount',
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

    const {
      liquidityProviderFeePercent: liquidityProviderFeePercents,
      routePathAddresses,
    } = routeQuoteTradeContext ?? {}

    if (!isLiquidityProviderFeePercentV3(liquidityProviderFeePercents)) {
      throw new DexError(
        'Liquidity provider fee is not an array',
        ErrorCodes.liquidityProviderFeeNotFound,
      )
    }

    const routerContractFactory = this.getRouterContract(dexTag, versionTag)

    if (!routerContractFactory) {
      throw new DexError(
        `Router contract factory not found for dex type: ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const isOutputCoin = isCoinAddress(this._toToken.contractAddress)
    const isSingle = routePathAddresses.length === 2

    const { recipient } = this._settings
    const outputAddress = recipient || this._walletAddress

    const amountOut = toAmount.toHexString()
    const amountInMaximum = fromAmount.toHexString()

    const multicallData: string[] = []

    if (isSingle) {
      const liquidProviderFee = liquidityProviderFeePercents[0]

      if (!liquidProviderFee) {
        throw new DexError(
          'Liquidity provider fee not found',
          ErrorCodes.liquidityProviderFeeNotFound,
        )
      }

      const sqrtPriceLimitX96 =
        routeQuoteTradeContext?.sqrtPriceX96AfterOrList &&
        !Array.isArray(routeQuoteTradeContext.sqrtPriceX96AfterOrList) &&
        !this._settings.disablePriceImpact
          ? calculateSwapPriceLimit({
              currentSqrtPriceX96:
                routeQuoteTradeContext.sqrtPriceX96AfterOrList,
              slippageTolerance: this._settings.slippage,
              isExactInput: false,
            })
          : DexNumber.fromUnshifted(0)

      const params: UniswapRouterV3Types.ExactOutputSingleParamsRequest = {
        tokenIn: transformCoinAddressToWrappedAddress(
          this._fromToken.contractAddress,
        ),
        tokenOut: transformCoinAddressToWrappedAddress(
          this._toToken.contractAddress,
        ),
        fee: percentToFeeTier(liquidProviderFee),
        recipient: isOutputCoin ? ZERO_ADDRESS : outputAddress,
        amountOut,
        amountInMaximum,
        sqrtPriceLimitX96: sqrtPriceLimitX96.toHexString(),
      }

      multicallData.push(routerContractFactory.encodeExactOutputSingle(params))
    } else {
      const params: UniswapRouterV3Types.ExactOutputParamsRequest = {
        path: this.getEncodedPoolsPath({
          tokenAddresses: routePathAddresses,
          feePercentages: liquidityProviderFeePercents,
          tradeDirection: tradeDirectionMap.output,
          dexTag,
          versionTag,
        }),
        recipient: isOutputCoin ? ZERO_ADDRESS : outputAddress,
        amountOut,
        amountInMaximum,
      }

      multicallData.push(routerContractFactory.encodeExactOutput(params))
    }

    if (isOutputCoin) {
      multicallData.push(
        routerContractFactory.encodeUnwrapWETH9(amountOut, outputAddress),
      )
    }

    return routerContractFactory.encodeMulticall(deadline, multicallData)
  }

  // ------------------------
  // Route Paths
  // ------------------------

  override prepareRoutePathsCallContext(): Record<
    string,
    ContractContext<
      UniswapFactoryV3Types.Contract,
      Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
    >
  > {
    const factoryCallContexts: Record<
      string,
      ContractContext<
        UniswapFactoryV3Types.Contract,
        Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
      >
    > = {}

    for (const [dexTag, referencedFactoryContract] of Object.entries(
      this._factoryContractByDex,
    )) {
      const calls: Record<
        string,
        MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>
      > = {}
      for (const factoryItem of Object.entries(referencedFactoryContract)) {
        const versionTag = factoryItem[0] as VersionTag
        const factoryContract = factoryItem[1]

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

            const { feeTiers } =
              this._dexConfigsByDex?.[dexTag]?.protocols.protocolV3?.[
                versionTag
              ] ?? {}

            if (!feeTiers) {
              // continue
              throw new DexError(
                `Fee tiers not found for ${dexTag} ${versionTag}`,
                ErrorCodes.internalError,
              )
            }

            for (const feeTier of feeTiers) {
              const methodCallReference = createRouteMulticallReference({
                dexTag,
                protocol: this.protocol,
                versionTag,
                fromToken: token0,
                toToken: token1,
                feeTier,
              })

              calls[methodCallReference] = factoryContract.getPoolCallContext(
                transformCoinAddressToWrappedAddress(token0.contractAddress),
                transformCoinAddressToWrappedAddress(token1.contractAddress),
                feeTier,
              )
            }
          }
        }

        if (Object.keys(calls).length > 0) {
          const contractReference = createRouteMulticallReference({
            dexTag,
            protocol: this.protocol,
            versionTag,
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
          UniswapFactoryV3Types.Contract,
          Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
        >
      >
    >,
  ): RoutePathsByDex {
    if (!contractCallResults) {
      throw new DexError(
        'contractCallResults is required',
        ErrorCodes.functionArgumentError,
      )
    }

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
            UniswapFactoryV3Types.Contract,
            Record<
              string,
              MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>
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
          versionTag: versionTag as VersionTag,
          dexTag,
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

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig) {
      throw new DexError(
        `DEX configuration not found for ${dexTag}`,
        ErrorCodes.dexConfigNotFound,
      )
    }

    const routes: RoutePath[] = []

    if (!fromTokenAvailablePools.pools || !toTokenAvailablePools.pools) {
      return routes
    }

    // Direct swap (one hop)
    // UNI -> WETH
    //   \   /
    //   Direct
    const directRoute = fromTokenAvailablePools.pools.find((fromPool) =>
      toTokenAvailablePools.pools.some((toPool) =>
        isSameAddress(fromPool.pairAddress, toPool.pairAddress),
      ),
    )

    if (directRoute) {
      assertFeeTier(directRoute.fee, dexConfig, versionTag)

      routes.push({
        route: [fromTokenAvailablePools.token, toTokenAvailablePools.token],
        pairAddresses: [directRoute.pairAddress],
        liquidityProviderFeePercent: [feeToPercent(directRoute.fee)],
        version,
        dexTag,
        protocol: this.protocol,
      })
    }

    if (this._settings.disableMultihops) {
      return routes
    }

    // Two-hop swap (intermediate token)
    // UNI -> WETH -> USDT
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
          assertFeeTier(fromIntermediatePool.fee, dexConfig, versionTag)
          assertFeeTier(toIntermediatePool.fee, dexConfig, versionTag)

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
            liquidityProviderFeePercent: [
              feeToPercent(fromIntermediatePool.fee),
              feeToPercent(toIntermediatePool.fee),
            ],
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
    // UNI -> WETH -> DAI -> USDT
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
          assertFeeTier(fromPool.fee, dexConfig, versionTag)
          assertFeeTier(intermediatePool.fee, dexConfig, versionTag)
          assertFeeTier(toPool.fee, dexConfig, versionTag)

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
            liquidityProviderFeePercent: [
              feeToPercent(fromPool.fee),
              feeToPercent(intermediatePool.fee),
              feeToPercent(toPool.fee),
            ],
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
    string,
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
  > {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    assertTradeDirection(tradeDirection)

    if (!routePathsByDex) {
      throw new DexError(
        'routePathsByDex is required',
        ErrorCodes.functionArgumentError,
      )
    }

    const contractCalls: Record<
      string,
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
    > = {}

    for (const [dexTag, routePathContexts] of Object.entries(routePathsByDex)) {
      for (const routePath of routePathContexts) {
        const versionTag = getVersionTagFromVersion(routePath.version)

        const quoterContract = this.getQuoterContractV3(dexTag, versionTag)
        const { address, abi } = quoterContract.contractDetail

        const calls: Record<
          string,
          MethodCallUnion<
            UniswapQuoterV3Types.Contract,
            | 'quoteExactInput'
            | 'quoteExactInputSingle'
            | 'quoteExactOutput'
            | 'quoteExactOutputSingle'
          >
        > = {}

        if (!routePathContexts) {
          continue
        }

        for (let i = 0; i < routePathContexts.length; i++) {
          const routeCtx = routePathContexts[i]

          if (!routeCtx) {
            continue
          }

          const { liquidityProviderFeePercent: liquidityProviderFeePercents } =
            routeCtx ?? {}

          if (!isLiquidityProviderFeePercentV3(liquidityProviderFeePercents)) {
            throw new DexError(
              'Liquidity provider fee is not an array',
              ErrorCodes.liquidityProviderFeeNotFound,
            )
          }

          const routePathAddresses = routeCtx.route.map((c) => {
            return transformCoinAddressToWrappedAddress(c.contractAddress)
          })

          const reference = `route${i}`

          if (routePathAddresses.length === 2) {
            const liquidProviderFee = liquidityProviderFeePercents[0]

            if (!liquidProviderFee) {
              continue
            }

            switch (tradeDirection) {
              case tradeDirectionMap.input:
                calls[reference] =
                  quoterContract.quoteExactInputSingleCallContext(
                    routePathAddresses[0]!,
                    routePathAddresses[1]!,
                    percentToFeeTier(liquidProviderFee),
                    tokenAmount.toHexString(),
                    0, // Use 0 for unlimited price during quotes
                  )
                break
              case tradeDirectionMap.output:
                calls[reference] =
                  quoterContract.quoteExactOutputSingleCallContext(
                    routePathAddresses[0]!,
                    routePathAddresses[1]!,
                    percentToFeeTier(liquidProviderFee),
                    tokenAmount.toHexString(),
                    0, // Use 0 for unlimited price during quotes
                  )
                break
              default:
                throw new DexError(
                  'Invalid trade direction',
                  ErrorCodes.functionArgumentError,
                )
            }
          } else if (routePathAddresses.length > 2) {
            switch (tradeDirection) {
              case tradeDirectionMap.input:
                calls[reference] = quoterContract.quoteExactInputCallContext(
                  this.getEncodedPoolsPath({
                    tokenAddresses: routePathAddresses,
                    feePercentages: liquidityProviderFeePercents,
                    tradeDirection,
                    dexTag,
                    versionTag,
                  }),
                  tokenAmount.toHexString(),
                )
                break
              case tradeDirectionMap.output:
                calls[reference] = quoterContract.quoteExactOutputCallContext(
                  this.getEncodedPoolsPath({
                    tokenAddresses: routePathAddresses,
                    feePercentages: liquidityProviderFeePercents,
                    tradeDirection,
                    dexTag,
                    versionTag,
                  }),
                  tokenAmount.toHexString(),
                )
                break
              default:
                throw new DexError(
                  'Invalid trade direction',
                  ErrorCodes.functionArgumentError,
                )
            }
          }

          continue
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
          customData: routePathContexts,
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

      if (contractCallReturnContext) {
        const { results, originContext } = contractCallReturnContext

        Object.entries(results).forEach(
          ([methodReference, methodCallResult]) => {
            const routeContext = originContext.customData[methodReference]

            if (!routeContext) {
              throw new DexError(
                'Missing routeContext from customData',
                ErrorCodes.internalError,
              )
            }

            if (!methodCallResult.success) {
              return
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
          },
        )
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
    tokenAmount,
    methodCallResult,
    routeContext,
    tradeDirection,
    dexTag,
  }: {
    tokenAmount: DexNumber
    methodCallResult: MethodResult<
      UniswapQuoterV3Types.Contract,
      MethodCallUnion<
        UniswapQuoterV3Types.Contract,
        | 'quoteExactInput'
        | 'quoteExactInputSingle'
        | 'quoteExactOutput'
        | 'quoteExactOutputSingle'
      >
    >
    routeContext: RoutePath
    tradeDirection: TradeDirection
    dexTag: DexTag
  }): RouteQuote {
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

    const { quote: expectedConvertQuote, sqrtPriceX96After } =
      this.getConvertQuoteUnshifted({
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

    const routePathAddresses = routeContext.route.map(
      (route) => route.contractAddress,
    )

    const hasFeeOnTransfer =
      this._settings.hasFeeOnTransfer ||
      this._fromToken.hasFeeOnTransfer ||
      this._toToken.hasFeeOnTransfer

    const routeQuoteTradeContext: RouteQuoteTradeContext = {
      protocol: this.protocol,
      liquidityProviderFeePercent,
      routePathAddresses,
      hasFeeOnTransfer,
      sqrtPriceX96AfterOrList: sqrtPriceX96After ?? DexNumber.fromUnshifted(0),
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
      UniswapQuoterV3Types.Contract,
      MethodCallUnion<
        UniswapQuoterV3Types.Contract,
        | 'quoteExactInput'
        | 'quoteExactInputSingle'
        | 'quoteExactOutput'
        | 'quoteExactOutputSingle'
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

    assertTradeDirection(tradeDirection)

    switch (tradeDirection) {
      case tradeDirectionMap.input:
      case tradeDirectionMap.output:
        if (isQuoteExactInputResponse(methodCallResult.value)) {
          const { amountOut, sqrtPriceX96AfterList } = methodCallResult.value

          return {
            quote: DexNumber.fromShifted(amountOut, this.fromToken.decimals),
            sqrtPriceX96After: Array.isArray(sqrtPriceX96AfterList)
              ? sqrtPriceX96AfterList.map((price) =>
                  DexNumber.fromShifted(price, 96),
                ) // Map each item in Q64.96 format
              : undefined,
          }
        }

        if (isQuoteExactInputSingleResponse(methodCallResult.value)) {
          const { amountOut, sqrtPriceX96After } = methodCallResult.value

          return {
            quote: DexNumber.fromShifted(amountOut, this.fromToken.decimals),
            sqrtPriceX96After: sqrtPriceX96After
              ? DexNumber.fromShifted(sqrtPriceX96After, 96) // Q64.96 format
              : undefined,
          }
        }

        if (isQuoteExactOutputResponse(methodCallResult.value)) {
          const { amountIn, sqrtPriceX96AfterList } = methodCallResult.value

          return {
            quote: DexNumber.fromShifted(amountIn, this.toToken.decimals),
            sqrtPriceX96After: Array.isArray(sqrtPriceX96AfterList)
              ? sqrtPriceX96AfterList.map((price) =>
                  DexNumber.fromShifted(price, 96),
                ) // Map each item in Q64.96 format
              : undefined,
          }
        }

        if (isQuoteExactOutputSingleResponse(methodCallResult.value)) {
          const { amountIn, sqrtPriceX96After } = methodCallResult.value

          return {
            quote: DexNumber.fromShifted(amountIn, this.toToken.decimals),
            sqrtPriceX96After: sqrtPriceX96After
              ? DexNumber.fromShifted(sqrtPriceX96After, 96) // Q64.96 format
              : undefined,
          }
        }

        throw new DexError(
          `Couldn't determine quote from method call result: ${methodCallResult.value}`,
          ErrorCodes.tradePathIsNotSupported,
        )

      // // quoteExact returns a ContractTransaction, in this case, using in a multicall call, it will return a BigNumber
      // const {} = methodCallResult.value

      // return {
      //   quote: DexNumber.fromShifted(amountResult, this.fromToken.decimals),
      //   sqrtPriceX96After: sqrtPriceX96After
      //     ? DexNumber.fromShifted(sqrtPriceX96After, 96) // Q64.96 format
      //     : undefined,
      // }
      default:
        throw new DexError(
          `Trade direction ${tradeDirection} is not supported`,
          ErrorCodes.tradePathIsNotSupported,
        )
    }
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
        UniswapFactoryV3Types.Contract,
        Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
      >
    >
  }): Pool[] {
    if (!token) {
      throw new DexError('Must provide token', ErrorCodes.functionArgumentError)
    }

    const pools: Pool[] = []

    // Iterate through the valid pair contexts
    for (const contract of Object.values<
      ContractResults<
        UniswapFactoryV3Types.Contract,
        Record<string, MethodCall<UniswapFactoryV3Types.Contract, 'getPool'>>
      >
    >(validPairContexts)) {
      // Iterate though the method calls
      for (const [methodReference, methodResult] of Object.entries(
        contract.results,
      )) {
        const { fromTokenAddress, toTokenAddress, feeTier } =
          parseRouteMulticallReference(methodReference) ?? {}

        if (!fromTokenAddress || !toTokenAddress) {
          continue
        }

        // Check if either token matches the provided token
        if (
          isSameAddress(token.contractAddress, fromTokenAddress) ||
          isSameAddress(token.contractAddress, toTokenAddress)
        ) {
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
            fee: feeTier,
          })
        }
      }
    }

    return pools
  }

  override async getPoolReserves({
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

    const quoterContract = this.getQuoterContractV3(dexTag, versionTag)
    const WETH9 = this.nativeWrappedTokenInfo.contractAddress
    const amountIn = DexNumber.fromUnshifted('1', this._fromToken.decimals)

    const callContexts = pairAddresses.reduce(
      (acc, pairAddress) => {
        acc[pairAddress] =
          this.dexProvider.createCallContext<UniswapQuoterV3Types.Contract>()({
            contractAddress: quoterContract.contractDetail.address,
            abi: quoterContract.contractDetail.abi,
            calls: {
              [`quoteExactInput-${pairAddress}`]:
                quoterContract.quoteExactInputCallContext(
                  constructPathV3({
                    token0: this._fromToken.contractAddress,
                    token1: this._toToken.contractAddress,
                    WETH9,
                  }),
                  amountIn.toHexString(),
                ),
            },
          })
        return acc
      },
      {} as Record<
        string,
        ContractContext<
          UniswapQuoterV3Types.Contract,
          Record<
            string,
            MethodCallUnion<UniswapQuoterV3Types.Contract, 'quoteExactInput'>
          >
        >
      >,
    )

    const callResults = await this.dexProvider.call(callContexts)

    const reserves: PoolReserve[] = []

    for (const pairAddress of pairAddresses) {
      const contractResult = callResults.contracts[pairAddress]

      if (!contractResult) {
        continue
      }

      const { results } = contractResult
      const result = results[`quoteExactInput-${pairAddress}`]

      if (result?.success) {
        const reserve0 = amountIn
        const reserve1 = DexNumber.fromShifted(
          result.value.amountOut,
          this._toToken.decimals,
        )

        const reserve: PoolReserve = {
          pairAddress,
          token0: {
            address: this._fromToken.contractAddress,
            reserve: reserve0,
          },
          token1: {
            address: this._toToken.contractAddress,
            reserve: reserve1,
          },
        }

        reserves.push(reserve)
      }
    }

    return reserves
  }

  /**
   * Converts a V3 route to encoded bytes string to pass it to contract.
   * Structure of encoded string: '0x${tokenAddress_0}${toHex(fee_0)}${tokenAddress_1}${toHex(fee_1)}...${tokenAddress_n}.
   * toHex(fee_i) must be of length 6, so leading zeroes are added.
   *
   * @param params - The parameters required to get the encoded pools path.
   * @param params.tokenAddresses - Token addresses included in route.
   * @param params.feePercentages - Fee percentages, included in route.
   * @param params.tradeDirection - The direction you want to get the quote from
   * @param params.dexTag - The dex tag
   * @param params.versionTag - The version tag
   *
   * @return The encoded string.
   */
  protected getEncodedPoolsPath({
    tokenAddresses,
    feePercentages,
    tradeDirection,
    // dexTag,
    // versionTag,
  }: {
    tokenAddresses: string[]
    feePercentages: number[]
    tradeDirection: TradeDirection
    dexTag: DexTag
    versionTag: VersionTag
  }): string {
    assertIsAddresses(tokenAddresses)
    // assertFeeTierArray(fees, this._dexConfigsByDex[dexTag], versionTag)
    assertTradeDirection(tradeDirection)

    if (
      tokenAddresses.length < 2 ||
      tokenAddresses.length - feePercentages.length !== 1
    ) {
      throw new DexError('Invalid V3 Route', ErrorCodes.tradePathIsNotSupported)
    }

    const convertedTokens =
      tradeDirection === tradeDirectionMap.input
        ? tokenAddresses
        : structuredClone(tokenAddresses).reverse()
    const convertedFees =
      tradeDirection === tradeDirectionMap.input
        ? feePercentages
        : structuredClone(feePercentages).reverse()

    const initialTokenAddress = convertedTokens[0]

    if (!initialTokenAddress) {
      throw new DexError(
        'Could not find initial token address',
        ErrorCodes.internalError,
      )
    }

    let contractPath = initialTokenAddress.slice(2).toLowerCase()

    for (let i = 0; i < convertedFees.length; i++) {
      const fee = convertedFees[i]
      const nextFee = convertedTokens[i + 1]

      if (!fee || !nextFee) {
        throw new DexError(
          'Could not find fee or next fee',
          ErrorCodes.internalError,
        )
      }

      contractPath += percentToFeeTier(fee).toString(16).padStart(6, '0')
      contractPath += nextFee.slice(2).toLowerCase()
    }

    return `0x${contractPath}`
  }
}
