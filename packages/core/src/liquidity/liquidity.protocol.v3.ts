import {
  FactoryContractV3,
  QuoterContractV3,
  RouterContractV3,
  PositionManagerContractV3,
  PoolContractV3,
  Erc721Contract,
} from '@dex-toolkit/contracts'
import { DexNumber } from '@dex-toolkit/number'
import type {
  Token,
  PoolReserve,
  DexTag,
  FeeTier,
  DexTransaction,
  TradeFormat,
  UniswapQuoterV3Types,
  UniswapPositionManagerV3Types,
  DexProtocol,
  VersionTag,
  LiquidityPriceRange,
  RemoveLiquidityParamsV3,
  InternalLiquidityContext,
  LiquidityTokenInfo,
  LPTokenInfoV3,
  AddLiquidityParamsV3,
  LiquidityContext,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  transformCoinAddressToWrappedAddress,
  isSameAddress,
  protocolMap,
  calculateSlippageAmount,
  MIN_HEX_STRING,
  MAX_HEX_STRING,
  generateDeadlineUnixTime,
  constructPathV3,
  assertVersionTag,
  assertFeeTier,
  assertDexTag,
  assertIsAddress,
  assertToken,
  assertProtocol,
  assertVersion,
  getVersionTagFromVersion,
  isCoinAddress,
  calculateCurrentShareOfPoolV3,
  calculateExpectedShareAfterRemoveV3,
  calculatePricesV3FromSqrtPriceX96,
  calculateLiquidityAmount,
  calculateExpectedShareAfterAddV3,
} from '@dex-toolkit/utils'
import type {
  Address,
  ContractDetail,
  MethodCall,
} from '@multicall-toolkit/types'
import { v4 as generateId } from 'uuid'

import {
  LiquidityAbstract,
  type LiquidityProtocolArgs,
} from './liquidity.abstract'
import type { TokenContract } from '../token-contract'

/**
 * Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).
 *
 * @template TFormat - The format type.
 */
export class LiquidityProtocolV3<
  TFormat extends TradeFormat,
> extends LiquidityAbstract<TFormat> {
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

  /**
   * Holds cached pool contract factory by dex tag
   * Should not call directly, use `getPoolContract` instead
   */
  protected _poolContractInfoByDex: Record<
    DexTag,
    Record<VersionTag, { [feeTier: string]: PoolContractV3 }>
  > = {}

  /**
   * Initializes a new instance of the LiquidityProtocolV3 class.
   *
   * @param context - Contains internal arguments needed for setting up liquidity in the protocol.
   * @throws DexError - If the required V3 contract details are missing in any DEX config.
   */
  constructor(context: LiquidityProtocolArgs<TFormat>) {
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

        // Pool contracts are created and cached when called on `getPoolContract`
      }
    }
  }

  // ------------------------
  // Getters
  // ------------------------

  get protocol(): DexProtocol {
    return protocolMap.protocolV3
  }

  /**
   * Retrieves the router contract associated with a given DEX tag and version.
   *
   * @param dexTag - Identifier for the specific DEX.
   * @param versionTag - The version of the DEX protocol.
   * @returns RouterContractV3 instance for the specified DEX and version.
   * @throws DexError - If dexTag or versionTag is invalid or if the router contract is not found.
   */
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

  /**
   * Retrieves the factory contract associated with a specific DEX and version.
   *
   * @param dexTag - Identifier for the DEX.
   * @param versionTag - Version of the DEX.
   * @returns FactoryContractV3 instance for the DEX and version.
   * @throws DexError - If dexTag, versionTag, or the factory contract is invalid or not found.
   */
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

  /**
   * Retrieves the quoter contract for a given DEX and version.
   *
   * @param dexTag - DEX identifier.
   * @param versionTag - DEX version.
   * @returns QuoterContractV3 instance for specified DEX and version.
   * @throws DexError - If dexTag or versionTag is invalid or the quoter contract is not found.
   */
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

  /**
   * Fetches the position manager contract for a specified DEX and version.
   *
   * @param dexTag - Identifier for the DEX.
   * @param versionTag - Version of the DEX protocol.
   * @returns PositionManagerContractV3 instance.
   * @throws DexError - If dexTag or versionTag is invalid or the contract is not found.
   */
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

  /**
   * Retrieves or initializes a pool contract for a specified DEX tag, version, and fee tier.
   *
   * @param dexTag - DEX identifier.
   * @param versionTag - Version of the DEX protocol.
   * @param feeTier - Fee tier for the pool.
   * @returns The PoolContractV3 instance for the specified parameters.
   * @throws DexError - If any parameter is missing or invalid, or if pool contract details are unavailable.
   */
  public async getPoolContract(
    dexTag: DexTag,
    versionTag: VersionTag,
    feeTier: FeeTier,
  ): Promise<PoolContractV3> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (this._poolContractInfoByDex[dexTag]?.[versionTag]?.[feeTier]) {
      return this._poolContractInfoByDex[dexTag][versionTag][feeTier]
    }

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, versionTag)

    const { pool } = dexConfig.protocols.protocolV3?.[versionTag] ?? {}
    const { abi, methods } = pool ?? {}

    if (!pool) {
      throw new DexError(
        'V3 pool contract details not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!abi) {
      throw new DexError(
        'V3 pool contract abi not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const factoryContract = this.getFactoryContract(dexTag, versionTag)
    const poolAddress = await factoryContract.getPool(
      this._tokenA.contractAddress,
      this._tokenB.contractAddress,
      feeTier,
    )

    const contractDetail: ContractDetail = {
      address: poolAddress,
      abi,
      methods,
    }

    const poolContract = new PoolContractV3(this._dexProvider, contractDetail)

    this._poolContractInfoByDex[dexTag] ??= {}
    this._poolContractInfoByDex[dexTag][versionTag] ??= {}
    this._poolContractInfoByDex[dexTag][versionTag][feeTier] = poolContract

    return poolContract
  }

  // ------------------------
  // Liquidity
  // ------------------------

  /**
   * Fetches the liquidity pool reserves for a given DEX tag.
   *
   * @param params - The parameters required to fetch the liquidity pool reserves.
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version of the DEX to interact with.
   *
   * @returns An object containing the pool information and total LP token supply.
   */
  public async getLiquidityPoolReserves({
    dexTag,
    versionTag,
  }: {
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<{
    poolInfo: PoolReserve
    totalLPTokenSupply: DexNumber
  }> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const quoterContract = this.getQuoterContractV3(dexTag, versionTag)
    const factoryContract = this.getFactoryContract(dexTag, versionTag)
    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!quoterContract || !factoryContract || !positionManagerContract) {
      throw new DexError(
        `Contracts not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const WETH9 = this.nativeWrappedTokenInfo.contractAddress

    const amountIn = DexNumber.fromUnshifted('1', 18)

    const swapPath = constructPathV3({
      token0: this._tokenA.contractAddress,
      token1: this._tokenB.contractAddress,
      WETH9,
    })

    const quoterCallContext =
      this.dexProvider.createCallContext<UniswapQuoterV3Types.Contract>()({
        contractAddress: quoterContract.contractDetail.address,
        abi: quoterContract.contractDetail.abi,
        calls: {
          quoteExactInput: quoterContract.quoteExactInputCallContext(
            swapPath,
            amountIn.toHexString(),
          ),
        },
      })

    const positionCallContext =
      this.dexProvider.createCallContext<UniswapPositionManagerV3Types.Contract>()(
        {
          contractAddress: positionManagerContract.contractDetail.address,
          abi: positionManagerContract.contractDetail.abi,
          calls: {
            totalSupply: positionManagerContract.totalSupplyCallContext(),
          },
        },
      )

    const callResults = await this.dexProvider.call({
      quoterRef: quoterCallContext,
      positionRef: positionCallContext,
    })

    const reservesResult =
      callResults.contracts.quoterRef.results.quoteExactInput
    const totalSupplyResult =
      callResults.contracts.positionRef.results.totalSupply

    if (!reservesResult?.success || !totalSupplyResult?.success) {
      throw new DexError(
        'Failed to fetch reserves or total supply',
        ErrorCodes.multicallError,
      )
    }

    const reserve0 = amountIn
    const reserve1 = DexNumber.fromShifted(
      reservesResult.value.amountOut,
      this._tokenB.decimals,
    )

    const totalLPTokenSupply = DexNumber.fromShifted(
      totalSupplyResult.value,
      this._nativeWrappedTokenInfo.decimals,
    )

    const poolInfo: PoolReserve = {
      pairAddress: factoryContract.contractDetail.address,
      token0: {
        address: this._tokenA.contractAddress,
        reserve: reserve0,
      },
      token1: {
        address: this._tokenB.contractAddress,
        reserve: reserve1,
      },
    }

    return {
      poolInfo,
      totalLPTokenSupply,
    }
  }

  /**
   * Generates a transaction to create and initialize a Uniswap V3 pool if it does not already exist.
   * This method should be called when adding liquidity to a pool that might not yet exist or is uninitialized.
   *
   * @param params - The parameters required to create and initialize the pool.
   * @param params.token0 - The address of the first token in the pool.
   * @param params.token1 - The address of the second token in the pool.
   * @param params.feeTier - The fee tier for the pool (e.g., 500, 3000, 10000).
   * @param params.sqrtPriceX96 - The initial price of the pool represented as a square root value scaled by 2^96.
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version tag.
   *
   * @returns A DexTransaction object containing the transaction data.
   *
   * @throws Throws an error if the position manager contract is not found for the given DEX tag.
   */
  public async generateCreateAndInitializePoolTransaction({
    token0,
    token1,
    feeTier,
    sqrtPriceX96,
    dexTag,
    versionTag,
  }: {
    token0: Address
    token1: Address
    feeTier: FeeTier
    sqrtPriceX96: DexNumber
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<DexTransaction> {
    assertIsAddress(token0)
    assertIsAddress(token1)
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (!sqrtPriceX96 || sqrtPriceX96.isZero()) {
      throw new DexError('Invalid sqrtPriceX96 value', ErrorCodes.invalidPrice)
    }

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, versionTag)

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    // Call create and initialize pool method on the position manager contract
    const data =
      positionManagerContract.encodeCreateAndInitializePoolIfNecessary(
        token0,
        token1,
        feeTier,
        sqrtPriceX96.toHexString(),
      )

    return {
      to: positionManagerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates a transaction to collect fees from an existing Uniswap V3 liquidity position.
   *
   * @param params - Parameters for collecting fees.
   * @param params.tokenId - The NFT token ID representing the liquidity position.
   * @param params.dexTag - Identifier for the DEX where fees will be collected.
   * @param params.versionTag - The version tag.
   * @param params.amount0Max - Maximum amount of token A to collect.
   * @param params.amount1Max - Maximum amount of token B to collect.
   *
   * @returns The generated transaction object.
   *
   * @throws Throws an error if the position manager contract is not found for the given DEX tag.
   */
  async generateCollectFeesTransaction({
    tokenId,
    dexTag,
    versionTag,
    amount0Max,
    amount1Max,
  }: {
    tokenId: string
    dexTag: DexTag
    versionTag: VersionTag
    amount0Max: DexNumber
    amount1Max: DexNumber
  }): Promise<DexTransaction> {
    if (!tokenId) {
      throw new DexError(
        'LP token ID is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (!amount0Max || amount0Max.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Amount 0 max must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!amount1Max || amount1Max.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Amount 1 max must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const recipient = this._walletAddress

    const data = positionManagerContract.encodeCollect({
      tokenId,
      recipient,
      amount0Max: amount0Max.toHexString(),
      amount1Max: amount1Max.toHexString(),
    })

    return {
      to: positionManagerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates a transaction to approve the router contract to spend the maximum allowance for a token.
   *
   * @param params - Parameters for approving the router contract.
   * @param params.tokenContract - The token factory contract.
   * @param params.dexTag - The identifier/tag for the specific DEX configuration.
   * @param params.versionTag - The version tag.
   * @returns A promise resolving to the transaction data.
   */
  public async generateApproveMaxPositionManagerAllowanceTransaction({
    tokenContract,
    dexTag,
    versionTag,
  }: {
    tokenContract: TokenContract
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<DexTransaction> {
    if (!tokenContract) {
      throw new DexError(
        'tokenContract is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager factory not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const { contractAddress, decimals } = await tokenContract.getToken()

    const data = tokenContract.encodeApproveAllowanceData({
      spender: positionManagerContract.contractDetail.address,
      amount: DexNumber.fromShifted(MAX_HEX_STRING, decimals),
    })

    return {
      to: contractAddress,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Fetches trade pool details for a specified DEX tag, version, fee tier, and trade direction.
   *
   * @param params - Parameters including dexTag, versionTag, feeTier, and trade direction.
   * @returns Object containing various pool details.
   * @throws DexError - If any parameter is invalid or fetching details fails.
   */
  // public async getTradePoolDetails({
  //   dexTag,
  //   versionTag,
  //   priceRange,
  //   feeTier,
  //   tradeDirection,
  // }: {
  //   dexTag: DexTag
  //   versionTag: VersionTag
  //   priceRange?: LiquidityPriceRange
  //   feeTier: FeeTier
  //   tradeDirection: TradeDirection
  // }): Promise<{
  //   currentTick: number
  //   sqrtPriceX96: DexNumber
  //   sqrtPriceLimitX96: DexNumber
  //   tickLower: number
  //   tickUpper: number
  //   feeProtocol: number
  //   observationCardinality: number
  //   observationCardinalityNext: number
  //   observationIndex: number
  //   unlocked: boolean
  // }> {
  // assertDexTag(dexTag)
  // assertVersionTag(versionTag)
  // assertFeeTier(feeTier)

  //   assertTradeDirection(tradeDirection)

  //   const poolContract = await this.getPoolContract(dexTag, versionTag, feeTier)

  //   const slot0 = await poolContract.slot0()

  //   const {
  //     tick: currentTick,
  //     sqrtPriceX96: x96,
  //     feeProtocol,
  //     observationCardinality,
  //     observationCardinalityNext,
  //     observationIndex,
  //     unlocked,
  //   } = slot0
  //   const sqrtPriceX96 = DexNumber.fromShifted(x96.toString())

  //   let tickLower = -887272
  //   let tickUpper = 887272

  //   if (priceRange) {
  //     tickLower = priceRange.tickLower
  //     tickUpper = priceRange.tickUpper
  //   }

  //   const sqrtPriceLimitX96 = this._settings.enablePriceLimit
  //     ? calculateSqrtPriceLimit({
  //         currentTick,
  //         tickLower,
  //         tickUpper,
  //         tradeDirection,
  //       })
  //     : DexNumber.fromUnshifted(0)

  //   return {
  //     sqrtPriceX96,
  //     sqrtPriceLimitX96,
  //     currentTick,
  //     tickLower,
  //     tickUpper,
  //     feeProtocol,
  //     observationCardinality,
  //     observationCardinalityNext,
  //     observationIndex,
  //     unlocked,
  //   }
  // }

  /**
   * Retrieves liquidity pool details for a specific DEX tag, version, and fee tier.
   *
   * @param params - The parameters for obtaining pool details.
   * @returns Object with various pool attributes including liquidity and ticks.
   * @throws DexError - If any parameter is invalid or the pool details retrieval fails.
   */
  public async getLiquidityPoolDetails({
    dexTag,
    versionTag,
    priceRange,
    feeTier,
  }: {
    dexTag: DexTag
    versionTag: VersionTag
    priceRange?: LiquidityPriceRange
    feeTier: FeeTier
  }): Promise<{
    currentTick: number
    sqrtPriceX96: DexNumber
    totalLiquidity: DexNumber
    tickLower: number
    tickUpper: number
    feeProtocol: number
    observationCardinality: number
    observationCardinalityNext: number
    observationIndex: number
    unlocked: boolean
  }> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, versionTag)

    const poolContract = await this.getPoolContract(dexTag, versionTag, feeTier)

    const { results } = await poolContract.call({
      slot0: poolContract.slot0CallContext(),
      liquidity: poolContract.liquidityCallContext(),
    })

    if (!results) {
      throw new DexError(
        'Failed to fetch slot0 or liquidity',
        ErrorCodes.multicallError,
      )
    }

    const slot0Result = results.slot0
    const liquidityResult = results.liquidity

    if (!slot0Result?.success || !liquidityResult?.success) {
      throw new DexError(
        'Failed to fetch slot0 or liquidity',
        ErrorCodes.multicallError,
      )
    }

    const {
      tick: currentTick,
      sqrtPriceX96: x96,
      feeProtocol,
      observationCardinality,
      observationCardinalityNext,
      observationIndex,
      unlocked,
    } = slot0Result.value
    const sqrtPriceX96 = DexNumber.fromShifted(x96.toString())
    const totalLiquidity = DexNumber.fromShifted(liquidityResult.value)

    let tickLower = -887272
    let tickUpper = 887272

    if (priceRange) {
      tickLower = priceRange.tickLower
      tickUpper = priceRange.tickUpper
    }

    return {
      currentTick,
      sqrtPriceX96,
      totalLiquidity,
      tickLower,
      tickUpper,
      feeProtocol,
      observationCardinality,
      observationCardinalityNext,
      observationIndex,
      unlocked,
    }
  }

  /**
   * Fetches the liquidity position by a given tokenId using the Uniswap V3 position manager contract.
   *
   * @param params - The parameters required to fetch the liquidity position.
   * @param params.tokenId - The NFT token ID representing the liquidity position.
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version tag.
   *
   * @returns The liquidity position details if found, otherwise returns undefined.
   * @throws DexError if the position manager contract is not found for the provided dexTag.
   */
  public async getLiquidityPositionByLpTokenId({
    tokenId,
    dexTag,
    versionTag,
  }: {
    tokenId: string
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<
    | {
        nonce: DexNumber
        operator: string
        token0: Address
        token1: Address
        fee: FeeTier
        tickLower: number
        tickUpper: number
        liquidity: DexNumber
        feeGrowthInside0LastX128: DexNumber
        feeGrowthInside1LastX128: DexNumber
        tokensOwed0: DexNumber
        tokensOwed1: DexNumber
      }
    | undefined
  > {
    if (!tokenId) {
      throw new DexError(
        'Token ID is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    try {
      // Fetch position details using Uniswap V3's `positions` method on the position manager contract
      const positionDetails = await positionManagerContract.positions(tokenId)
      // If the liquidity is zero, we assume the position is not active or doesn't exist
      if (DexNumber.fromShifted(positionDetails.liquidity).isZero()) {
        return undefined
      }

      // Return the important details of the position
      return {
        nonce: DexNumber.fromUnshifted(positionDetails.nonce.toString()),
        operator: positionDetails.operator,
        token0: positionDetails.token0,
        token1: positionDetails.token1,
        fee: positionDetails.fee as FeeTier,
        tickLower: positionDetails.tickLower,
        tickUpper: positionDetails.tickUpper,
        liquidity: DexNumber.fromShifted(positionDetails.liquidity),
        feeGrowthInside0LastX128: DexNumber.fromShifted(
          positionDetails.feeGrowthInside0LastX128,
        ),
        feeGrowthInside1LastX128: DexNumber.fromShifted(
          positionDetails.feeGrowthInside1LastX128,
        ),
        tokensOwed0: DexNumber.fromShifted(
          positionDetails.tokensOwed0,
          this._tokenA.decimals,
        ),
        tokensOwed1: DexNumber.fromShifted(
          positionDetails.tokensOwed1,
          this._tokenB.decimals,
        ),
      }
    } catch (error: any) {
      // Handle any errors during the contract call
      throw new DexError(
        `Failed to retrieve liquidity position for tokenId ${tokenId}: ${error?.message ?? ''}`,
        ErrorCodes.contractCallError,
      )
    }
  }

  /**
   * Finds existing liquidity for a given token pair (token0 and token1) using a single multicall.
   *
   * @param params - The parameters required to find the liquidity position.
   * @param params.tokenA - The first token in the pair.
   * @param params.tokenB - The second token in the pair.
   * @param params.feeTier - The fee tier of the pool (e.g., 3000 for 0.3%).
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version of the DEX to interact with.
   *
   * @returns The LP TokenId if found, otherwise returns undefined.
   * @throws DexError if the position manager contract is not found.
   */
  private async findLpTokenIdByTokenPair({
    tokenA,
    tokenB,
    feeTier,
    dexTag,
    versionTag,
  }: {
    tokenA: Token
    tokenB: Token
    feeTier: number
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<string | undefined> {
    assertToken(tokenA)
    assertToken(tokenB)
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, versionTag)

    // Get the position manager contract for the given dexTag
    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const { abi, address: contractAddress } =
      positionManagerContract.contractDetail ?? {}

    if (!abi) {
      throw new DexError(
        `ABI not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    if (!contractAddress) {
      throw new DexError(
        `Contract address not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    try {
      const balance = await positionManagerContract.balanceOf(
        this._walletAddress,
      )

      if (balance.isZero()) {
        return undefined
      }

      // Get the token owners

      const ownerCalls: Record<
        string,
        MethodCall<
          UniswapPositionManagerV3Types.Contract,
          'tokenOfOwnerByIndex'
        >
      > = {}

      for (let i = 0; i < balance.toNumber(); i++) {
        ownerCalls[`tokenId_${i}`] =
          positionManagerContract.tokenOfOwnerByIndexCallContext(
            this._walletAddress,
            i,
          )
      }

      const ownerCallContext =
        this.dexProvider.createCallContext<UniswapPositionManagerV3Types.Contract>()(
          {
            contractAddress: positionManagerContract.contractDetail.address,
            abi: positionManagerContract.contractDetail.abi,
            calls: ownerCalls,
          },
        )

      const ownerResults = await this.dexProvider.call({
        positionRef: ownerCallContext,
      })

      // Get the positions

      const tokenIds = Object.values(
        ownerResults.contracts.positionRef.results ?? {},
      ).map((result) => result.value)

      const positionCalls: Record<
        string,
        MethodCall<UniswapPositionManagerV3Types.Contract, 'positions'>
      > = {}

      tokenIds.forEach((tokenId) => {
        positionCalls[`position_${tokenId}`] =
          positionManagerContract.positionsCallContext(tokenId)
      })

      const positionCallContext =
        this.dexProvider.createCallContext<UniswapPositionManagerV3Types.Contract>()(
          {
            contractAddress: positionManagerContract.contractDetail.address,
            abi: positionManagerContract.contractDetail.abi,
            calls: positionCalls,
          },
        )

      const positionResults = await this.dexProvider.call({
        positionRef: positionCallContext,
      })

      // Get the matching position

      const positionsReturnContext =
        positionResults.contracts.positionRef.results ?? {}

      const token0Address = tokenA.contractAddress
      const token1Address = tokenB.contractAddress

      for (const [reference, result] of Object.entries(
        positionsReturnContext,
      )) {
        const positionData = result.value

        if (
          ((isSameAddress(positionData.token0, token0Address) &&
            isSameAddress(positionData.token1, token1Address)) ||
            (isSameAddress(positionData.token0, token1Address) &&
              isSameAddress(positionData.token1, token0Address))) &&
          positionData.fee === feeTier
        ) {
          // If a matching position is found, return tokenId
          return reference.split('_')[1]
        }
      }

      // No matching position found, return undefined
      return undefined
    } catch (error: any) {
      throw new DexError(
        `Error fetching existing liquidity position for token pair (${tokenA.contractAddress}, ${tokenB.contractAddress}): ${error?.message ?? ''}`,
        ErrorCodes.contractCallError,
      )
    }
  }

  /**
   * Generates an Add Liquidity transaction for Uniswap V3.
   * If liquidity already exists for the pool, it calls `generateIncreaseLiquidityTransaction`.
   * Otherwise, it proceeds with adding a new liquidity position via `encodeMint`.
   *
   * @param params - The parameters required to add liquidity.
   * @param params.tokenAAmount - The amount of token A to add to the pool.
   * @param params.tokenBAmount - The amount of token B to add to the pool.
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version of the DEX to interact with.
   * @param params.feeTier - The fee tier for the Uniswap V3 pool (required if no `tokenId` is provided).
   * @param params.tickLower - The lower tick of the position.
   * @param params.tickUpper - The upper tick of the position.
   * @param params.tokenId - (Optional) The tokenId representing the existing liquidity position.
   *
   * @returns A DexTransaction object containing the transaction data.
   */

  async generateAddLiquidityTransaction({
    tokenA,
    tokenB,
    tokenAAmount,
    tokenBAmount,
    tickLower,
    tickUpper,
    feeTier,
    dexTag,
    versionTag,
    tokenId,
  }: {
    tokenA: Token
    tokenB: Token
    tokenAAmount: DexNumber
    tokenBAmount: DexNumber
    tickLower: number
    tickUpper: number
    feeTier: FeeTier
    dexTag: DexTag
    versionTag: VersionTag
    tokenId?: string
  }): Promise<DexTransaction> {
    assertToken(tokenA)
    assertToken(tokenB)
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, versionTag)

    if (!tokenAAmount || tokenAAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token A amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!tokenBAmount || tokenBAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token B amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (tickLower === undefined || tickUpper === undefined) {
      throw new DexError(
        'Tick lower and tick upper are required',
        ErrorCodes.functionArgumentError,
      )
    }

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)

    if (!tokenId) {
      tokenId = await this.findLpTokenIdByTokenPair({
        tokenA,
        tokenB,
        feeTier,
        dexTag,
        versionTag,
      })
    }

    if (tokenId) {
      const liquidityPosition = await this.getLiquidityPositionByLpTokenId({
        tokenId,
        dexTag,
        versionTag,
      })

      if (!liquidityPosition) {
        throw new DexError(
          `Liquidity position not found for tokenId ${tokenId}`,
          ErrorCodes.liquidityPositionNotFound,
        )
      }

      const data = positionManagerContract.encodeIncreaseLiquidity({
        tokenId,
        amount0Desired: tokenAAmount.toHexString(),
        amount1Desired: tokenBAmount.toHexString(),
        amount0Min: calculateSlippageAmount({
          amount: tokenAAmount,
          slippage: this._settings.slippage,
          isMaximum: false,
        }).toHexString(),
        amount1Min: calculateSlippageAmount({
          amount: tokenBAmount,
          slippage: this._settings.slippage,
          isMaximum: false,
        }).toHexString(),
        deadline,
      })

      return {
        to: positionManagerContract.contractDetail.address,
        from: this._walletAddress,
        data,
        value: MIN_HEX_STRING,
      }
    }

    // No tokenId, create new liquidity position
    const data = positionManagerContract.encodeMint({
      token0: transformCoinAddressToWrappedAddress(tokenA.contractAddress),
      token1: transformCoinAddressToWrappedAddress(tokenB.contractAddress),
      fee: feeTier,
      tickLower,
      tickUpper,
      amount0Desired: tokenAAmount.toHexString(),
      amount1Desired: tokenBAmount.toHexString(),
      amount0Min: calculateSlippageAmount({
        amount: tokenAAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString(),
      amount1Min: calculateSlippageAmount({
        amount: tokenBAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString(),
      recipient: this._settings.recipient || this._walletAddress,
      deadline,
    })

    return {
      to: positionManagerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates a transaction to increase liquidity in an existing Uniswap V3 position.
   *
   * @param params - Parameters for increasing liquidity.
   * @param params.tokenId - The NFT token ID representing the liquidity position.
   * @param params.tokenAAmount - Amount of token A to add to the position.
   * @param params.tokenBAmount - Amount of token B to add to the position.
   * @param params.dexTag - Identifier for the DEX where liquidity will be increased.
   * @param params.versionTag - Identifier for the version of the DEX.
   *
   * @returns The generated transaction object.
   *
   * @throws Throws an error if the position manager contract is not found for the given DEX tag.
   */
  async generateIncreaseLiquidityTransaction({
    tokenId,
    tokenAAmount,
    tokenBAmount,
    dexTag,
    versionTag,
  }: {
    tokenId: string
    tokenAAmount: DexNumber
    tokenBAmount: DexNumber
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<DexTransaction> {
    if (!tokenId) {
      throw new DexError(
        'LP token ID is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!tokenAAmount || tokenAAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token A amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!tokenBAmount || tokenBAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token B amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)

    const data = positionManagerContract.encodeIncreaseLiquidity({
      tokenId,
      amount0Desired: tokenAAmount.toHexString(),
      amount1Desired: tokenBAmount.toHexString(),
      amount0Min: calculateSlippageAmount({
        amount: tokenAAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString(),
      amount1Min: calculateSlippageAmount({
        amount: tokenBAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString(),
      deadline,
    })

    return {
      to: positionManagerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates a Remove Liquidity transaction for Uniswap V3.
   * If the entire liquidity is being removed, it calls `burn` to burn the LP token.
   * If only part of the liquidity is being removed, it calls `generateDecreaseLiquidityTransaction`.
   *
   * @param params - The parameters required to remove liquidity.
   * @param params.tokenId - The NFT token ID representing the liquidity position.
   * @param params.dexTag - The identifier of the DEX to interact with.
   * @param params.versionTag - The version of the DEX to interact with.
   * @param params.liquidityAmount - The amount of liquidity to remove.
   * @param params.minTokenAAmount - The minimum amount of token A to receive.
   * @param params.minTokenBAmount - The minimum amount of token B to receive.
   * @returns A DexTransaction object containing the transaction data.
   */
  async generateRemoveLiquidityTransaction({
    tokenId,
    dexTag,
    versionTag,
    liquidityAmount,
    minTokenAAmount,
    minTokenBAmount,
  }: {
    tokenId: string
    dexTag: DexTag
    versionTag: VersionTag
    liquidityAmount: DexNumber
    minTokenAAmount: DexNumber
    minTokenBAmount: DexNumber
  }): Promise<DexTransaction> {
    if (!tokenId) {
      throw new DexError(
        'LP token ID is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (!liquidityAmount || liquidityAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Liquidity amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenAAmount || minTokenAAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Minimum token A amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenBAmount || minTokenBAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Minimum token B amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Router contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    // Fetch the position details to check total liquidity
    const positionDetails = await this.getLiquidityPositionByLpTokenId({
      tokenId,
      dexTag,
      versionTag,
    })

    if (!positionDetails) {
      throw new DexError(
        `Liquidity position not found for tokenId ${tokenId}`,
        ErrorCodes.liquidityPositionNotFound,
      )
    }

    // If removing all or more liquidity, call burn
    if (liquidityAmount.isGreaterThanOrEqualTo(positionDetails.liquidity)) {
      const data = positionManagerContract.encodeBurn(tokenId)

      return {
        to: positionManagerContract.contractDetail.address,
        from: this._walletAddress,
        data,
        value: MIN_HEX_STRING,
      }
    }

    // Otherwise, call decreaseLiquidity to remove only part of the liquidity
    return this.generateDecreaseLiquidityTransaction({
      tokenId,
      dexTag,
      versionTag,
      liquidityAmount,
      minTokenAAmount,
      minTokenBAmount,
    })
  }

  /**
   * Generates a transaction to decrease liquidity in an existing Uniswap V3 position.
   *
   * @param params - Parameters for decreasing liquidity.
   * @param params.tokenId - The NFT token ID representing the liquidity position.
   * @param params.dexTag - Identifier for the DEX where liquidity will be decreased.
   * @param params.versionTag - Identifier for the version of the DEX protocol.
   * @param params.liquidityAmount - Amount of liquidity to remove from the position.
   * @param params.minTokenAAmount - Minimum amount of token A to receive after removing liquidity.
   * @param params.minTokenBAmount - Minimum amount of token B to receive after removing liquidity.
   *
   * @returns The generated transaction object.
   *
   * @throws Throws an error if the position manager contract is not found for the given DEX tag.
   */
  async generateDecreaseLiquidityTransaction({
    tokenId,
    dexTag,
    versionTag,
    liquidityAmount,
    minTokenAAmount,
    minTokenBAmount,
  }: {
    tokenId: string
    dexTag: DexTag
    versionTag: VersionTag
    liquidityAmount: DexNumber
    minTokenAAmount: DexNumber
    minTokenBAmount: DexNumber
  }): Promise<DexTransaction> {
    if (!tokenId) {
      throw new DexError(
        'LP token ID is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (!liquidityAmount || liquidityAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Liquidity amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenAAmount || minTokenAAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Minimum token A amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenBAmount || minTokenBAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Minimum token B amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    if (!positionManagerContract) {
      throw new DexError(
        `Position manager contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)

    const data = positionManagerContract.encodeDecreaseLiquidity({
      tokenId,
      liquidity: liquidityAmount.toHexString(),
      amount0Min: minTokenAAmount.toHexString(),
      amount1Min: minTokenBAmount.toHexString(),
      deadline,
    })

    return {
      to: positionManagerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates the context required for adding liquidity in a Uniswap V3-style DEX.
   * This method validates token amounts, calculates liquidity based on price ranges (ticks), fetches pool reserves, and prepares the transaction for adding liquidity.
   *
   * @template TFormat - The format in which the numbers should be returned, based on `TradeFormat`.
   *
   * @param params - The parameters required to add liquidity:
   *  - `tokenAAmount`: The amount of token A to add.
   *  - `tokenBAmount`: The amount of token B to add.
   *  - `dexTag`: The identifier for the DEX (e.g., 'uniswapV3').
   *  - `feeTier`: The fee tier for the liquidity pool.
   *  - `priceRange` (optional): The tick range for the liquidity position.
   *  - `lpTokenId` (optional): The token ID for an existing liquidity position.
   * @param id - Optional unique identifier for the context
   *
   * @returns A `InternalLiquidityContext<TFormat>` object with:
   *  - Token information, including balances, allowances, and amounts.
   *  - Calculated liquidity and price information.
   *  - Transactions required to approve allowances or add liquidity.
   *
   * @throws If any parameters are invalid or if pool reserves are missing.
   */
  public async generateAddContextV3(
    params: AddLiquidityParamsV3<'dexnumber'>,
    id?: string,
  ): Promise<InternalLiquidityContext<'dexnumber'>> {
    const protocol = 'protocolV3'

    const {
      dexTag,
      version,
      tokenAAmount,
      tokenBAmount,
      feeTier,
      priceRange,
      lpTokenId,
    } = params

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    const dexConfig = this._dexConfigsByDex[dexTag]

    if (!dexConfig?.protocols.protocolV3) {
      throw new DexError(
        'V3 dex config not provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertFeeTier(feeTier, dexConfig, getVersionTagFromVersion(version))

    if (!tokenAAmount) {
      throw new DexError(
        'Invalid tokenAAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!tokenBAmount) {
      throw new DexError(
        'Invalid tokenBAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!priceRange) {
      throw new DexError(
        'Invalid priceRange provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (tokenAAmount.lte(0)) {
      throw new DexError(
        'tokenAAmount must be a greater than 0',
        ErrorCodes.functionArgumentError,
      )
    }

    if (tokenBAmount.lte(0)) {
      throw new DexError(
        'tokenBAmount must be a greater than 0',
        ErrorCodes.functionArgumentError,
      )
    }

    const versionTag = getVersionTagFromVersion(version)

    const allowancesAndBalanceOf = await this._tokens.getAllowancesAndBalanceOf(
      {
        walletAddress: this._walletAddress,
        tokenContractAddresses: [
          this._tokenA.contractAddress,
          this._tokenB.contractAddress,
        ],
        format: { type: 'dexnumber' },
      },
    )

    const tokenADetails = allowancesAndBalanceOf[this._tokenA.contractAddress]
    const tokenBDetails = allowancesAndBalanceOf[this._tokenB.contractAddress]

    const tokenABalance =
      tokenADetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)

    const tokenAAllowanceV3 =
      tokenADetails?.allowanceInfoByDex?.[dexTag]?.protocolV3?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)

    const tokenBBalance =
      tokenBDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)
    const tokenBAllowanceV3 =
      tokenBDetails?.allowanceInfoByDex?.[dexTag]?.protocolV3?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)

    const tokenAInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenA,
      amount: tokenAAmount,
      balance: tokenABalance,
      allowance: tokenAAllowanceV3,
      hasEnoughBalance: tokenABalance.gte(tokenAAmount),
      hasEnoughAllowance: tokenAAllowanceV3.gte(tokenAAmount),
      isMaxAllowance: tokenAAllowanceV3.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenA.contractAddress),
    }

    const tokenBInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenB,
      amount: tokenBAmount,
      balance: tokenBBalance,
      allowance: tokenBAllowanceV3,
      hasEnoughBalance: tokenBBalance.gte(tokenBAmount),
      hasEnoughAllowance: tokenBAllowanceV3.gte(tokenBAmount),
      isMaxAllowance: tokenBAllowanceV3.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenB.contractAddress),
    }

    const { tickLower, tickUpper, sqrtPriceX96, currentTick, totalLiquidity } =
      await this.getLiquidityPoolDetails({
        dexTag,
        versionTag,
        priceRange,
        feeTier,
      })

    // Calculate the amount of liquidity tokens the user will receive
    const liquidityAmount = calculateLiquidityAmount({
      tokenA: this._tokenA,
      tokenB: this._tokenB,
      tokenAAmount,
      tokenBAmount,
      tickLower,
      tickUpper,
      sqrtPriceX96,
    })

    // Fetch user's current position if lpTokenId is provided
    let currentLiquidity = DexNumber.fromUnshifted(
      0,
      this._nativeWrappedTokenInfo.decimals,
    )

    if (lpTokenId) {
      const currentPosition = await this.getLiquidityPositionByLpTokenId({
        tokenId: lpTokenId,
        dexTag,
        versionTag,
      })

      if (currentPosition) {
        currentLiquidity = currentPosition.liquidity
        // Ensure ticks match
        if (
          currentPosition.tickLower !== tickLower ||
          currentPosition.tickUpper !== tickUpper
        ) {
          throw new DexError(
            'Provided ticks do not match existing position',
            ErrorCodes.liquidityPositionNotFound,
          )
        }
      }
    }

    // Initialize lpTokenInfo
    const lpTokenInfo: LPTokenInfoV3<'dexnumber'> = {
      tokenId: lpTokenId ?? '',
      feeTier,
      priceRange: {
        tickLower,
        tickUpper,
      },
      totalSupply: totalLiquidity,
    }

    const shareOfPool = calculateCurrentShareOfPoolV3({
      positionLiquidity: currentLiquidity,
      tickLower,
      tickUpper,
      currentTick,
      poolLiquidity: totalLiquidity,
      decimals: this._nativeWrappedTokenInfo.decimals,
    })

    const expectedShareOfPool = calculateExpectedShareAfterAddV3({
      positionLiquidity: currentLiquidity,
      tickLower,
      tickUpper,
      currentTick,
      liquidityToAdd: liquidityAmount,
      poolLiquidity: totalLiquidity,
      decimals: this._nativeWrappedTokenInfo.decimals,
    })

    // Calculate prices using Uniswap V3 formulas
    const prices = calculatePricesV3FromSqrtPriceX96(
      sqrtPriceX96,
      this._tokenA,
      this._tokenB,
    )

    // Generate the liquidity transaction
    const transaction = await this.generateAddLiquidityTransaction({
      tokenA: this._tokenA,
      tokenB: this._tokenB,
      tokenAAmount,
      tokenBAmount,
      tickLower,
      tickUpper,
      feeTier,
      dexTag,
      versionTag,
      tokenId: lpTokenId,
    })

    // Handle approvals
    const enableTransactions: LiquidityContext<TFormat>['enableTransactions'] =
      {}

    if (
      !tokenAInfo.hasEnoughAllowance &&
      !isCoinAddress(this._tokenA.contractAddress)
    ) {
      enableTransactions.tokenA =
        await this.generateApproveMaxPositionManagerAllowanceTransaction({
          tokenContract: this._tokenAContract,
          dexTag,
          versionTag,
        })
    }

    if (
      !tokenBInfo.hasEnoughAllowance &&
      !isCoinAddress(this._tokenB.contractAddress)
    ) {
      enableTransactions.tokenB =
        await this.generateApproveMaxPositionManagerAllowanceTransaction({
          tokenContract: this._tokenBContract,
          dexTag,
          versionTag,
        })
    }

    return {
      id: id ?? generateId(),
      dexTag,
      protocol,
      version,
      liquidityDirection: 'add',
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo,
      shareOfPool,
      expectedShareOfPool,
      prices,
      slippage: this._settings.slippage,
      deadline: generateDeadlineUnixTime(this._settings.deadlineMinutes),
      expectedLiquidity: liquidityAmount,
      minLiquidity: calculateSlippageAmount({
        amount: liquidityAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }),
      enableTransactions,
      transaction,
    }
  }

  /**
   * Generates the context required for removing liquidity in a Uniswap V3-style DEX.
   * This method validates liquidity amounts, calculates pool shares and prices, fetches allowances
   * and balances, and prepares the transaction for removing liquidity.
   *
   * @template TFormat - The format in which the numbers should be returned, based on `TradeFormat`.
   *
   * @param params - The parameters required to remove liquidity:
   *  - `lpTokenId`: The token ID of the liquidity position to remove.
   *  - `minTokenAAmount`: The minimum amount of token A to remove from the pool.
   *  - `minTokenBAmount`: The minimum amount of token B to remove from the pool.
   *  - `dexTag`: The identifier for the DEX (e.g., 'uniswapV3').
   * @param id - Optional unique identifier for the context
   *
   * @returns A `InternalLiquidityContext<TFormat>` object containing:
   *  - Token and liquidity pool information.
   *  - Pool share calculations before and after liquidity removal.
   *  - Transactions required to approve the NFT transfer or remove liquidity.
   *
   * @throws If any parameters are invalid or if no liquidity position is found.
   */
  public async generateRemoveContextV3(
    params: RemoveLiquidityParamsV3<'dexnumber'>,
    id?: string,
  ): Promise<InternalLiquidityContext<'dexnumber'>> {
    const protocol = 'protocolV3'

    const {
      dexTag,
      version,
      lpTokenId,
      minTokenAAmount,
      minTokenBAmount,
      liquidityAmount,
    } = params ?? {}

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    if (!lpTokenId) {
      throw new DexError(
        'Invalid lpTokenId provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenAAmount) {
      throw new DexError(
        'Invalid minTokenAAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!minTokenBAmount) {
      throw new DexError(
        'Invalid minTokenBAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!liquidityAmount) {
      throw new DexError(
        'Invalid liquidityAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (minTokenAAmount.lte(0)) {
      throw new DexError(
        'minTokenAAmount must be a positive number',
        ErrorCodes.functionArgumentError,
      )
    }

    if (minTokenBAmount.lte(0)) {
      throw new DexError(
        'minTokenBAmount must be a positive number',
        ErrorCodes.functionArgumentError,
      )
    }

    if (liquidityAmount.lte(0)) {
      throw new DexError(
        'liquidityAmount must be a positive number',
        ErrorCodes.functionArgumentError,
      )
    }

    const versionTag = getVersionTagFromVersion(version)

    const allowancesAndBalanceOf = await this._tokens.getAllowancesAndBalanceOf(
      {
        walletAddress: this._walletAddress,
        tokenContractAddresses: [
          this._tokenA.contractAddress,
          this._tokenB.contractAddress,
        ],
        format: { type: 'dexnumber' },
      },
    )

    const tokenADetails = allowancesAndBalanceOf[this._tokenA.contractAddress]
    const tokenBDetails = allowancesAndBalanceOf[this._tokenB.contractAddress]

    const tokenABalance =
      tokenADetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)
    const tokenAAllowanceV3 =
      tokenADetails?.allowanceInfoByDex?.[dexTag]?.protocolV3?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)

    const tokenBBalance =
      tokenBDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)
    const tokenBAllowanceV3 =
      tokenBDetails?.allowanceInfoByDex?.[dexTag]?.protocolV3?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)

    const tokenAInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenA,
      amount: minTokenAAmount,
      balance: tokenABalance,
      allowance: tokenAAllowanceV3,
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isMaxAllowance: tokenAAllowanceV3.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenA.contractAddress),
    }

    const tokenBInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenB,
      amount: minTokenBAmount,
      balance: tokenBBalance,
      allowance: tokenBAllowanceV3,
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isMaxAllowance: tokenBAllowanceV3.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenB.contractAddress),
    }

    const currentPosition = await this.getLiquidityPositionByLpTokenId({
      tokenId: lpTokenId,
      dexTag,
      versionTag,
    })

    if (!currentPosition) {
      throw new DexError(
        `No liquidity position found for lpTokenId ${lpTokenId}`,
        ErrorCodes.liquidityPositionNotFound,
      )
    }

    const {
      liquidity: currentLiquidity,
      tickLower,
      tickUpper,
      fee: feeTier,
    } = currentPosition

    const { sqrtPriceX96, currentTick, totalLiquidity } =
      await this.getLiquidityPoolDetails({
        dexTag,
        versionTag,
        feeTier,
      })

    const lpTokenInfo: LPTokenInfoV3<'dexnumber'> = {
      tokenId: lpTokenId,
      feeTier,
      priceRange: {
        tickLower,
        tickUpper,
      },
      totalSupply: totalLiquidity,
    }

    const shareOfPool = calculateCurrentShareOfPoolV3({
      positionLiquidity: currentLiquidity,
      tickLower,
      tickUpper,
      currentTick,
      poolLiquidity: totalLiquidity,
      decimals: this._nativeWrappedTokenInfo.decimals,
    })

    const expectedShareOfPool = calculateExpectedShareAfterRemoveV3({
      positionLiquidity: currentLiquidity,
      tickLower,
      tickUpper,
      currentTick,
      liquidityToRemove: liquidityAmount,
      poolLiquidity: totalLiquidity,
      decimals: this._nativeWrappedTokenInfo.decimals,
    })

    const expectedLiquidity = currentLiquidity.minus(liquidityAmount)

    const prices = calculatePricesV3FromSqrtPriceX96(
      sqrtPriceX96,
      this._tokenA,
      this._tokenB,
    )

    const transaction = await this.generateRemoveLiquidityTransaction({
      minTokenAAmount,
      minTokenBAmount,
      liquidityAmount,
      dexTag,
      versionTag,
      tokenId: lpTokenId,
    })

    // Handle approvals
    const enableTransactions: LiquidityContext<'dexnumber'>['enableTransactions'] =
      {}

    // Create an instance of the ERC721 contract for the position manager
    const positionManagerContract = this.getPositionManagerContract(
      dexTag,
      versionTag,
    )

    const erc721Contract = new Erc721Contract(this._dexProvider, {
      address: positionManagerContract.contractDetail.address,
    })

    // Check if the position manager is approved to transfer the NFT
    const approvedAddress = await erc721Contract.getApproved(lpTokenId)

    if (
      !isSameAddress(
        approvedAddress,
        positionManagerContract.contractDetail.address,
      )
    ) {
      // Generate approval transaction
      const approvalData = erc721Contract.encodeApprove(
        positionManagerContract.contractDetail.address,
        lpTokenId,
      )

      enableTransactions.lpToken = {
        to: positionManagerContract.contractDetail.address,
        from: this._walletAddress,
        data: approvalData,
        value: MIN_HEX_STRING,
      }
    }

    return {
      id: id ?? generateId(),
      dexTag,
      protocol,
      version,
      liquidityDirection: 'remove',
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo,
      shareOfPool,
      expectedShareOfPool,
      prices,
      slippage: this._settings.slippage,
      deadline: generateDeadlineUnixTime(this._settings.deadlineMinutes),
      expectedLiquidity,
      minLiquidity: undefined,
      enableTransactions,
      transaction,
    }
  }
}
