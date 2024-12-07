import {
  FactoryContractV2,
  PairContract,
  RouterContractV2,
} from '@dex-toolkit/contracts'
import { DexNumber } from '@dex-toolkit/number'
import type {
  DexProtocol,
  PoolReserve,
  DexTag,
  DexTransaction,
  TradeFormat,
  VersionTag,
  AddLiquidityParamsV2,
  InternalLiquidityContext,
  LiquidityTokenInfo,
  LiquidityContext,
  RemoveLiquidityParamsV2,
  RemoveLiquidityPermitOptions,
  RemoveLiquidityPermit,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  transformCoinAddressToWrappedAddress,
  isSameAddress,
  protocolMap,
  calculateSlippageAmount,
  MIN_HEX_STRING,
  isCoinAddress,
  generateDeadlineUnixTime,
  MAX_HEX_STRING,
  ZERO_ADDRESS,
  formatVersionForDisplay,
  assertVersionTag,
  assertDexTag,
  assertIsAddress,
  isAddress,
  assertProtocol,
  assertVersion,
  getVersionTagFromVersion,
  defaultLiquiditySettings,
  calculatePrices,
  calculateCurrentShareOfPoolV2,
  calculateExpectedShareAfterAddV2,
  calculateExpectedShareAfterRemoveV2,
} from '@dex-toolkit/utils'
import type { Address, ContractDetail } from '@ethereum-multicall/types'
import { ethers, type TypedDataDomain, type TypedDataField } from 'ethers'
import { v4 as generateId } from 'uuid'

import {
  LiquidityAbstract,
  type LiquidityProtocolArgs,
} from './liquidity.abstract'
import { TokenContract } from '../token-contract'

/**
 * Information about a pair contract.
 */
export type PairContractInfo = {
  pairContract: PairContract
  lpTokenContract?: TokenContract
}

/**
 * Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).
 *
 * @template TFormat - The format type.
 */
export class LiquidityProtocolV2<
  TFormat extends TradeFormat,
> extends LiquidityAbstract<TFormat> {
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

  /**
   * Holds cached pair contract factory by dex tag
   * Should not call directly, use `getPairContract` instead
   */
  protected _pairContractInfoByDex: Record<
    DexTag,
    Record<VersionTag, PairContractInfo>
  > = {}

  constructor(context: LiquidityProtocolArgs<TFormat>) {
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
          'V2 contract details not provided',
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

        // Pair contracts are created and cached when called on `getPairContract`

        // LP Token contracts are created and cached when called on `getLpTokenContract`
      }
    }
  }

  // ------------------------
  // Getters
  // ------------------------

  public get protocol(): DexProtocol {
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

  public async getPairAndLpTokenContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): Promise<PairContractInfo> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (this._pairContractInfoByDex[dexTag]?.[versionTag]) {
      return this._pairContractInfoByDex[dexTag][versionTag]
    }

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

    const factoryContract = this.getFactoryContract(dexTag, versionTag)

    const lpAddress = await factoryContract.getPair(
      transformCoinAddressToWrappedAddress(this._tokenA.contractAddress),
      transformCoinAddressToWrappedAddress(this._tokenB.contractAddress),
    )

    if (!lpAddress || isSameAddress(lpAddress, ZERO_ADDRESS)) {
      throw new DexError(
        `No LP token (pair address) found for pair (${this._tokenA.symbol}/${this._tokenB.symbol}) ${this._tokenA.contractAddress}/${this._tokenB.contractAddress}`,
        ErrorCodes.internalError,
      )
    }

    const contractDetails: ContractDetail = {
      address: lpAddress,
      abi,
      methods,
    }

    const lpTokenContract = new TokenContract({
      dexProviderContext: this._dexProvider,
      dexContext: dexConfig,
      tokenContractAddress: lpAddress,
      tokenList: this._tokens.tokenList,
    })

    const pairContractInfo: PairContractInfo = {
      lpTokenContract,
      pairContract: new PairContract(this._dexProvider, contractDetails),
    }

    this._pairContractInfoByDex[dexTag] ??= {}
    this._pairContractInfoByDex[dexTag][versionTag] = pairContractInfo

    return pairContractInfo
  }

  public async getPairContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): Promise<PairContractInfo['pairContract']> {
    return (await this.getPairAndLpTokenContract(dexTag, versionTag))
      .pairContract
  }

  public async getLpTokenContract(
    dexTag: DexTag,
    versionTag: VersionTag,
  ): Promise<PairContractInfo['lpTokenContract']> {
    return (await this.getPairAndLpTokenContract(dexTag, versionTag))
      .lpTokenContract
  }

  // ------------------------
  // Liquidity
  // ------------------------

  /**
   * Fetches the reserves of token A and token B for a v2 liquidity pool.
   * Ensures reserves are aligned with the class's tokenA and tokenB order,
   * regardless of their order in the contract.
   *
   * @param params - The parameters required to fetch the liquidity pool reserves.
   * @param params.dexTag - The identifier/tag for the specific DEX configuration.
   * @param params.versionTag - The dex version tag.
   *
   * @returns The pool reserve information and total LP token supply.
   * @throws {DexError} If contracts aren't found or if token addresses don't match
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

    const { pairContract, lpTokenContract } =
      await this.getPairAndLpTokenContract(dexTag, versionTag)

    if (!pairContract) {
      throw new DexError(
        `Contract factory not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    if (!lpTokenContract) {
      throw new DexError(
        `LP token factory not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const { results } = await pairContract.call({
      reserves: pairContract.getReservesCallContext(),
      token0: pairContract.token0CallContext(),
      token1: pairContract.token1CallContext(),
      totalSupply: pairContract.totalSupplyCallContext(),
    })

    const reservesResult = results.reserves
    const token0Result = results.token0
    const token1Result = results.token1
    const totalSupplyResult = results.totalSupply

    if (
      !reservesResult?.success ||
      !token0Result?.success ||
      !token1Result?.success ||
      !totalSupplyResult?.success
    ) {
      throw new DexError(
        'Failed to fetch reserves, token0, token1, or total supply',
        ErrorCodes.multicallError,
      )
    }

    const { _reserve0, _reserve1 } = reservesResult.value
    const token0Address = token0Result.value
    const token1Address = token1Result.value
    const totalLPTokenSupplyRaw = totalSupplyResult.value

    if (
      !_reserve0 ||
      !_reserve1 ||
      !isAddress(token0Address) ||
      !isAddress(token1Address) ||
      !totalLPTokenSupplyRaw
    ) {
      throw new DexError(
        'Failed to fetch reserves, token0, token1, or total supply',
        ErrorCodes.multicallError,
      )
    }

    const tokenAAddress = transformCoinAddressToWrappedAddress(
      this._tokenA.contractAddress,
    )
    const tokenBAddress = transformCoinAddressToWrappedAddress(
      this._tokenB.contractAddress,
    )

    // Check if tokenA matches token0 from contract
    const isTokenAToken0 = isSameAddress(tokenAAddress, token0Address)

    // Validate token matches
    if (!isTokenAToken0 && !isSameAddress(tokenAAddress, token1Address)) {
      throw new DexError(
        `TokenA ${tokenAAddress} not found in pool (token0: ${token0Address}, token1: ${token1Address})`,
        ErrorCodes.internalError,
      )
    }

    if (isTokenAToken0 && !isSameAddress(tokenBAddress, token1Address)) {
      throw new DexError(
        `TokenB ${tokenBAddress} does not match pool token1 ${token1Address}`,
        ErrorCodes.internalError,
      )
    }

    if (!isTokenAToken0 && !isSameAddress(tokenBAddress, token0Address)) {
      throw new DexError(
        `TokenB ${tokenBAddress} does not match pool token0 ${token0Address}`,
        ErrorCodes.internalError,
      )
    }

    // Convert reserves with proper decimals
    const reserve0 = DexNumber.fromShifted(
      _reserve0,
      isTokenAToken0 ? this._tokenA.decimals : this._tokenB.decimals,
    )
    const reserve1 = DexNumber.fromShifted(
      _reserve1,
      isTokenAToken0 ? this._tokenB.decimals : this._tokenA.decimals,
    )

    const totalLPTokenSupply = DexNumber.fromShifted(
      totalLPTokenSupplyRaw,
      this._nativeWrappedTokenInfo.decimals,
    )

    // Construct the pool info with proper token ordering
    const poolInfo: PoolReserve = {
      pairAddress: pairContract.contractDetail.address,
      token0: {
        address: isTokenAToken0 ? tokenAAddress : tokenBAddress,
        reserve: isTokenAToken0 ? reserve0 : reserve1,
      },
      token1: {
        address: isTokenAToken0 ? tokenBAddress : tokenAAddress,
        reserve: isTokenAToken0 ? reserve1 : reserve0,
      },
    }

    return {
      poolInfo,
      totalLPTokenSupply,
    }
  }

  /**
   * Retrieves the LP token allowance for the router contract.
   *
   * @param params - Configuration parameters
   * @param params.dexTag - The identifier/tag for the specific DEX configuration
   * @param params.versionTag - The dex version tag
   * @param params.walletAddress - The user's wallet address
   *
   * @returns Promise resolving to the router allowance
   *
   * @throws {DexError} If configuration is invalid or allowance check fails
   */
  public async getLPTokenRouterAllowance({
    dexTag,
    versionTag,
    walletAddress,
  }: {
    dexTag: DexTag
    versionTag: VersionTag
    walletAddress: Address
  }): Promise<string> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)
    assertIsAddress(walletAddress)

    const dexConfig = this._dexConfigsByDex[dexTag]
    if (!dexConfig) {
      throw new DexError(
        `DEX configuration not found for ${dexTag}`,
        ErrorCodes.dexConfigNotFound,
        { dexTag, versionTag },
      )
    }

    const protocolDetails = dexConfig.protocols[this.protocol]
    if (!protocolDetails) {
      throw new DexError(
        `Protocol ${this.protocol} not supported for ${dexTag}`,
        ErrorCodes.protocolNotSupported,
        { dexTag, protocol: this.protocol, versionTag },
      )
    }

    const versionDetails = protocolDetails[versionTag]
    if (!versionDetails?.router?.address) {
      throw new DexError(
        `Router configuration not found for ${dexTag} ${this.protocol} ${versionTag}`,
        ErrorCodes.contractAddressNotFound,
        { dexTag, protocol: this.protocol, versionTag },
      )
    }

    const lpTokenContract = await this.getLpTokenContract(dexTag, versionTag)
    if (!lpTokenContract) {
      throw new DexError(
        `LP token contract not found for ${dexTag}`,
        ErrorCodes.contractDetailsNotFound,
        { dexTag, versionTag },
      )
    }

    try {
      const allowance = await lpTokenContract.allowanceForRouter({
        protocol: this.protocol,
        dexTag,
        versionTag,
        walletAddress,
        format: { type: 'hex' },
      })

      if (!allowance) {
        throw new DexError(
          'Failed to get LP token allowance',
          ErrorCodes.contractCallError,
          { dexTag, versionTag, walletAddress },
        )
      }

      return allowance
    } catch (error) {
      throw new DexError(
        'Failed to check LP token allowance',
        ErrorCodes.contractCallError,
        {
          dexTag,
          versionTag,
          walletAddress,
          routerAddress: versionDetails.router.address,
        },
        error instanceof Error ? error : undefined,
      )
    }
  }

  /**
   * Generates a transaction to approve the router contract to spend the maximum allowance for a token.
   *
   * @param params - Configuration parameters
   * @param params.dexTag - The identifier/tag for the specific DEX configuration
   * @param params.versionTag - The dex version tag
   * @param params.amount - The amount to approve. If not provided, the maximum amount will be used.
   *
   * @returns Promise resolving to the transaction data
   *
   * @throws {DexError} If configuration is invalid or transaction generation fails
   */
  public async generateLPTokenRouterAllowanceTransaction({
    dexTag,
    versionTag,
    amount,
  }: {
    dexTag: DexTag
    versionTag: VersionTag
    amount?: string
  }): Promise<DexTransaction> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const dexConfig = this._dexConfigsByDex[dexTag]
    if (!dexConfig) {
      throw new DexError(
        `DEX configuration not found for ${dexTag}`,
        ErrorCodes.dexConfigNotFound,
        { dexTag, versionTag },
      )
    }

    const protocolDetails = dexConfig.protocols[this.protocol]
    if (!protocolDetails) {
      throw new DexError(
        `Protocol ${this.protocol} not supported for ${dexTag}`,
        ErrorCodes.protocolNotSupported,
        { dexTag, protocol: this.protocol, versionTag },
      )
    }

    const versionDetails = protocolDetails[versionTag]
    if (!versionDetails?.router?.address) {
      throw new DexError(
        `Router configuration not found for ${dexTag} ${this.protocol} ${versionTag}`,
        ErrorCodes.contractAddressNotFound,
        { dexTag, protocol: this.protocol, versionTag },
      )
    }

    const lpTokenContract = await this.getLpTokenContract(dexTag, versionTag)
    if (!lpTokenContract) {
      throw new DexError(
        `LP token contract not found for ${dexTag}`,
        ErrorCodes.contractDetailsNotFound,
        { dexTag, versionTag },
      )
    }

    try {
      const tokenInfo = await lpTokenContract.getToken()
      if (!tokenInfo || !tokenInfo.decimals) {
        throw new DexError(
          'Invalid LP token information',
          ErrorCodes.contractDetailsNotFound,
          {
            dexTag,
            versionTag,
            tokenAddress: tokenInfo?.contractAddress,
          },
        )
      }

      const approvalAmount = amount
        ? DexNumber.fromUnshifted(amount, tokenInfo.decimals)
        : DexNumber.fromShifted(MAX_HEX_STRING, tokenInfo.decimals)

      const data = lpTokenContract.encodeApproveAllowanceData({
        spender: versionDetails.router.address,
        amount: approvalAmount,
      })

      if (!data) {
        throw new DexError(
          'Failed to encode approval data',
          ErrorCodes.contractCallError,
          {
            dexTag,
            versionTag,
            tokenAddress: tokenInfo.contractAddress,
            spender: versionDetails.router.address,
          },
        )
      }

      return {
        to: tokenInfo.contractAddress,
        from: this._walletAddress,
        data,
        value: MIN_HEX_STRING,
      }
    } catch (error) {
      throw new DexError(
        'Failed to generate LP token approval transaction',
        ErrorCodes.contractCallError,
        {
          dexTag,
          versionTag,
          protocol: this.protocol,
        },
        error instanceof Error ? error : undefined,
      )
    }
  }

  /**
   * Generates a transaction for adding liquidity to the DEX, supporting both Token-Token and Token-ETH pairs. Depending on the tokens involved (Token/Token or Token/ETH), the function encodes the appropriate call to the router contract.
   *
   * @param params - The parameters required to generate the add liquidity transaction.
   * @param params.tokenAAmount - The amount of token A to add to the liquidity pool.
   * @param params.tokenBAmount - The amount of token B or ETH to add to the liquidity pool.
   * @param params.dexTag - The identifier/tag for the specific DEX configuration.
   * @param params.versionTag - The version tag for the specific DEX configuration.
   * @returns A promise that resolves to a DexTransaction object containing the transaction data.
   *
   * @throws DexError - Throws if token amounts are invalid or if the router contract is not found for the specified dexTag.
   */
  async generateAddLiquidityTransaction({
    tokenAAmount,
    tokenBAmount,
    dexTag,
    versionTag,
  }: {
    tokenAAmount: DexNumber
    tokenBAmount: DexNumber
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<DexTransaction> {
    if (!tokenAAmount || tokenAAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token A amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!tokenBAmount || tokenBAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'Token B or ETH amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    const routerContract = this.getRouterContract(dexTag, versionTag)

    if (!routerContract) {
      throw new DexError(
        `Router contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)

    // Check if we are dealing with a token-ETH pool or token-token pool
    const isCoinAndTokenPool =
      isCoinAddress(this._tokenA.contractAddress) ||
      isCoinAddress(this._tokenB.contractAddress)

    let data: string

    if (isCoinAndTokenPool) {
      const [coin, token] = isCoinAddress(this._tokenA.contractAddress)
        ? [this._tokenA, this._tokenB]
        : [this._tokenB, this._tokenA]

      const [coinAmount, tokenAmount] = isCoinAddress(
        this._tokenA.contractAddress,
      )
        ? [tokenAAmount, tokenBAmount]
        : [tokenBAmount, tokenAAmount]

      const amountTokenMin = calculateSlippageAmount({
        amount: tokenAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString()

      const amountETHMin = calculateSlippageAmount({
        amount: coinAmount,
        slippage: this._settings.slippage,
        isMaximum: false,
      }).toHexString()

      data = routerContract.encodeAddLiquidityETH(
        token.contractAddress,
        tokenAmount.toEthersBigNumber(),
        amountTokenMin,
        amountETHMin,
        this._settings.recipient || this._walletAddress,
        deadline,
      )

      return {
        to: routerContract.contractDetail.address,
        from: this._walletAddress,
        data,
        value: ethers.utils
          .parseUnits(coinAmount.toString(), coin.decimals)
          .toHexString(),
      }
    }

    // Token/Token Pool
    const tokenA = this._tokenA
    const tokenB = this._tokenB
    const amountADesired = tokenAAmount.toHexString()
    const amountBDesired = tokenBAmount.toHexString()
    const amountAMin = calculateSlippageAmount({
      amount: tokenAAmount,
      slippage: this._settings.slippage,
      isMaximum: false,
    }).toHexString()
    const amountBMin = calculateSlippageAmount({
      amount: tokenBAmount,
      slippage: this._settings.slippage,
      isMaximum: false,
    }).toHexString()

    data = routerContract.encodeAddLiquidity(
      tokenA.contractAddress,
      tokenB.contractAddress,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      this._settings.recipient || this._walletAddress,
      deadline,
    )

    return {
      to: routerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates a transaction for removing liquidity from a DEX.
   *
   * @param params - The parameters required to generate the remove liquidity transaction.
   * @param params.dexTag - The DEX tag identifier for the specific DEX configuration.
   * @param params.versionTag - The version tag identifier for the specific DEX configuration.
   * @param params.lpTokenAmount - The amount of LP tokens to remove from the liquidity pool.
   * @param params.minTokenAAmount - The minimum amount of token A to receive (non-ETH pair).
   * @param params.minTokenBAmount - The minimum amount of token B or ETH to receive.
   * @param params.permitOptions - The optional permit data, used for approvals with permit signature.
   * @param params.supportFeeOnTransferTokens - Whether to support fee-on-transfer tokens (ETH only).
   *
   * @returns A promise resolving to a `DexTransaction` object containing the transaction data.
   *
   * @throws Throws an error if the LP token amount is less than or equal to zero, if the router or pair contract is not found, or if the LP token is not found.
   */
  async generateRemoveLiquidityTransaction({
    dexTag,
    versionTag,
    lpTokenAmount,
    minTokenAAmount,
    minTokenBAmount,
    permitOptions,
    supportFeeOnTransferTokens = false,
  }: {
    dexTag: DexTag
    versionTag: VersionTag
    lpTokenAmount: DexNumber
    minTokenAAmount: DexNumber
    minTokenBAmount: DexNumber
    permitOptions?: RemoveLiquidityPermitOptions
    supportFeeOnTransferTokens?: boolean
  }): Promise<DexTransaction> {
    assertDexTag(dexTag)
    assertVersionTag(versionTag)

    if (!lpTokenAmount || lpTokenAmount.isLessThanOrEqualTo(0)) {
      throw new DexError(
        'LP token amount must be greater than zero',
        ErrorCodes.functionArgumentError,
      )
    }

    const routerContract = this.getRouterContract(dexTag, versionTag)

    if (!routerContract) {
      throw new DexError(
        `Router contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const lpTokenContract = await this.getLpTokenContract(dexTag, versionTag)

    if (!lpTokenContract) {
      throw new DexError(
        `LP Token contract info not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const lpToken = await lpTokenContract.getToken()

    if (!lpToken) {
      throw new DexError(
        `LP token not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)
    let data: string
    let permit: RemoveLiquidityPermit | undefined

    if (typeof permitOptions === 'boolean') {
      if (permitOptions && this._dexProvider.signer) {
        permit = await this.generatePermitData({
          lpTokenAmount,
          dexTag,
          versionTag,
        })
      }
    } else {
      permit = permitOptions
    }

    if (
      isCoinAddress(this._tokenA.contractAddress) ||
      isCoinAddress(this._tokenB.contractAddress)
    ) {
      const [, token] = isCoinAddress(this._tokenA.contractAddress)
        ? [this._tokenA, this._tokenB]
        : [this._tokenB, this._tokenA]
      const [minCoinAmount, minTokenAmount] = isCoinAddress(
        this._tokenA.contractAddress,
      )
        ? [minTokenAAmount, minTokenBAmount]
        : [minTokenBAmount, minTokenAAmount]

      // Handle ETH with FeeOnTransferTokens and/or Permit

      if (permit) {
        const { approveMax, permitData } = permit

        if (supportFeeOnTransferTokens) {
          data =
            routerContract.encodeRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokens(
              token.contractAddress,
              lpTokenAmount.toEthersBigNumber(),
              minTokenAmount.toEthersBigNumber(),
              minCoinAmount.toEthersBigNumber(),
              this._walletAddress,
              deadline,
              approveMax,
              permitData.v,
              permitData.r,
              permitData.s,
            )
        } else {
          data = routerContract.encodeRemoveLiquidityETHWithPermit(
            token.contractAddress,
            lpTokenAmount.toEthersBigNumber(),
            minTokenAmount.toEthersBigNumber(),
            minCoinAmount.toEthersBigNumber(),
            this._walletAddress,
            deadline,
            approveMax,
            permitData.v,
            permitData.r,
            permitData.s,
          )
        }
      } else {
        if (supportFeeOnTransferTokens) {
          data =
            routerContract.encodeRemoveLiquidityETHSupportingFeeOnTransferTokens(
              token.contractAddress,
              lpTokenAmount.toEthersBigNumber(),
              minTokenAmount.toEthersBigNumber(),
              minCoinAmount.toEthersBigNumber(),
              this._walletAddress,
              deadline,
            )
        } else {
          data = routerContract.encodeRemoveLiquidityETH(
            token.contractAddress,
            lpTokenAmount.toEthersBigNumber(),
            minTokenAmount.toEthersBigNumber(),
            minCoinAmount.toEthersBigNumber(),
            this._walletAddress,
            deadline,
          )
        }
      }
    } else {
      // Handle non-ETH liquidity removal with or without permit
      const tokenA = this._tokenA
      const tokenB = this._tokenB

      if (permit) {
        const { approveMax, permitData } = permit

        data = routerContract.encodeRemoveLiquidityWithPermit(
          tokenA.contractAddress,
          tokenB.contractAddress,
          lpTokenAmount.toEthersBigNumber(),
          minTokenAAmount.toEthersBigNumber(),
          minTokenBAmount.toEthersBigNumber(),
          this._walletAddress,
          deadline,
          approveMax,
          permitData.v,
          permitData.r,
          permitData.s,
        )
      } else {
        data = routerContract.encodeRemoveLiquidity(
          tokenA.contractAddress,
          tokenB.contractAddress,
          lpTokenAmount.toEthersBigNumber(),
          minTokenAAmount.toEthersBigNumber(),
          minTokenBAmount.toEthersBigNumber(),
          this._walletAddress,
          deadline,
        )
      }
    }

    return {
      to: routerContract.contractDetail.address,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Generates the context required for adding liquidity in a Uniswap V2-style DEX.
   * This method performs several validation checks on the provided token amounts, fetches allowance and balance details for the tokens, calculates the expected liquidity based on the pool's reserves, and prepares the transaction for adding liquidity.
   *
   * @template TFormat - The format in which the numbers should be returned, based on `TradeFormat`.
   *
   * @param params - The parameters required to add liquidity:
   *  - `tokenAAmount`: The amount of token A to add to the liquidity pool.
   *  - `tokenBAmount`: The amount of token B to add to the liquidity pool.
   *  - `dexTag`: The identifier for the DEX (e.g., 'uniswap').
   * @param id - Unique identifier for the context
   *
   * @returns A `InternalLiquidityContext<TFormat>` object containing:
   *  - Information about the tokens (balances, allowances, etc.).
   *  - The expected liquidity to be added.
   *  - Slippage and pool share calculations.
   *  - Transactions required to approve allowances or add liquidity.
   *
   * @throws If any of the provided parameters are invalid or if the pool reserves are zero.
   */
  public async generateAddContextV2(
    params: AddLiquidityParamsV2<'dexnumber'>,
    id: string,
  ): Promise<InternalLiquidityContext<'dexnumber'>> {
    const protocol = 'protocolV2'

    const { dexTag, version } = params

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    const versionTag = getVersionTagFromVersion(version)

    const poolReserves = await this.getLiquidityPoolReserves({
      dexTag,
      versionTag,
    })

    const reserveA = poolReserves.poolInfo.token0.reserve
    const reserveB = poolReserves.poolInfo.token1.reserve
    const totalSupply = poolReserves.totalLPTokenSupply

    let calculatedTokenAAmount = params.tokenAAmount
    let calculatedTokenBAmount = params.tokenBAmount

    if (!reserveA.isZero() && !reserveB.isZero()) {
      if (!calculatedTokenAAmount && calculatedTokenBAmount) {
        // Calculate token A from token B
        calculatedTokenAAmount = calculatedTokenBAmount
          .multipliedBy(reserveA)
          .dividedBy(reserveB)
          .adjustForDecimals(this._tokenA.decimals)
      } else if (calculatedTokenAAmount && !calculatedTokenBAmount) {
        // Calculate token B from token A
        calculatedTokenBAmount = calculatedTokenAAmount
          .multipliedBy(reserveB)
          .dividedBy(reserveA)
          .adjustForDecimals(this._tokenB.decimals)
      }
    }

    const pairContractInfo = await this.getPairAndLpTokenContract(
      dexTag,
      versionTag,
    )

    const lpToken = await pairContractInfo?.lpTokenContract?.getToken()

    const allowancesAndBalanceOf = await this._tokens.getAllowancesAndBalanceOf(
      {
        walletAddress: this._walletAddress,
        tokenContractAddresses: [
          this._tokenA.contractAddress,
          this._tokenB.contractAddress,
          ...(lpToken?.contractAddress ? [lpToken.contractAddress] : []),
        ],
        format: { type: 'dexnumber' },
      },
    )

    const tokenADetails = allowancesAndBalanceOf[this._tokenA.contractAddress]
    const tokenBDetails = allowancesAndBalanceOf[this._tokenB.contractAddress]
    const lpTokenDetails = lpToken?.contractAddress
      ? allowancesAndBalanceOf[lpToken.contractAddress]
      : undefined

    const tokenABalance =
      tokenADetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)
    const tokenAAllowanceV2 =
      tokenADetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)

    const tokenBBalance =
      tokenBDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)
    const tokenBAllowanceV2 =
      tokenBDetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)

    const tokenLPDecimals = this._nativeWrappedTokenInfo.decimals
    const tokenLPBalance =
      lpTokenDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, tokenLPDecimals)
    const tokenLPAllowanceV2 =
      lpTokenDetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ?? DexNumber.fromShifted(MIN_HEX_STRING, tokenLPDecimals)

    const tokenAInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenA,
      amount: calculatedTokenAAmount,
      balance: tokenABalance,
      allowance: tokenAAllowanceV2,
      hasEnoughBalance: calculatedTokenAAmount
        ? tokenABalance.gte(calculatedTokenAAmount)
        : false,
      hasEnoughAllowance: calculatedTokenAAmount
        ? tokenAAllowanceV2.gte(calculatedTokenAAmount)
        : false,
      isMaxAllowance: tokenAAllowanceV2.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenA.contractAddress),
    }

    const tokenBInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenB,
      amount: calculatedTokenBAmount,
      balance: tokenBBalance,
      allowance: tokenBAllowanceV2,
      hasEnoughBalance: calculatedTokenBAmount
        ? tokenBBalance.gte(calculatedTokenBAmount)
        : false,
      hasEnoughAllowance: calculatedTokenBAmount
        ? tokenBAllowanceV2.gte(calculatedTokenBAmount)
        : false,
      isMaxAllowance: tokenBAllowanceV2.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenB.contractAddress),
    }

    // Determine if the pool is empty
    const isInitialLiquidity = totalSupply.isZero()

    // Calculate expected liquidity
    let expectedLiquidity: DexNumber = DexNumber.fromUnshifted(
      0,
      tokenLPDecimals,
    )

    if (calculatedTokenAAmount && calculatedTokenBAmount) {
      if (isInitialLiquidity) {
        // Pool is empty, initial liquidity

        const sqrtProduct = calculatedTokenAAmount
          .multipliedBy(calculatedTokenBAmount)
          .sqrt()
        const MINIMUM_LIQUIDITY = DexNumber.fromUnshifted(1000, 0)

        expectedLiquidity = sqrtProduct.minus(MINIMUM_LIQUIDITY)

        if (expectedLiquidity.isNegative()) {
          expectedLiquidity = DexNumber.fromShifted(0, tokenLPDecimals)
        }
      } else {
        // Pool is not empty

        if (reserveA.isZero() || reserveB.isZero()) {
          throw new DexError(
            'Pool reserves cannot be zero when adding liquidity to an existing pool',
            ErrorCodes.poolNotFound,
          )
        }

        const liquidityA = calculatedTokenAAmount
          .multipliedBy(totalSupply)
          .dividedBy(reserveA)
        const liquidityB = calculatedTokenBAmount
          .multipliedBy(totalSupply)
          .dividedBy(reserveB)

        expectedLiquidity = liquidityA.lte(liquidityB) ? liquidityA : liquidityB
      }
    }

    const minLiquidity = expectedLiquidity
      ? calculateSlippageAmount({
          amount: expectedLiquidity,
          slippage: this._settings.slippage,
          isMaximum: false,
        })
      : undefined

    let lpTokenInfo: LiquidityTokenInfo<'dexnumber'> | undefined = undefined

    if (lpToken?.contractAddress) {
      lpTokenInfo = {
        token: lpToken,
        amount: undefined,
        balance: tokenLPBalance,
        allowance: tokenLPAllowanceV2,
        hasEnoughBalance: undefined,
        hasEnoughAllowance: undefined,
        isMaxAllowance: tokenLPAllowanceV2.toHexString() === MAX_HEX_STRING,
        isCoin: false,
      }
    }

    const transaction =
      calculatedTokenAAmount && calculatedTokenBAmount
        ? await this.generateAddLiquidityTransaction({
            tokenAAmount: calculatedTokenAAmount,
            tokenBAmount: calculatedTokenBAmount,
            dexTag,
            versionTag,
          })
        : undefined

    const enableTransactions: LiquidityContext<TFormat>['enableTransactions'] =
      {}

    if (
      calculatedTokenAAmount &&
      !tokenAInfo.hasEnoughAllowance &&
      !isCoinAddress(this._tokenA.contractAddress)
    ) {
      enableTransactions.tokenA =
        await this.generateApproveRouterAllowanceTransaction({
          token: 'A',
          dexTag,
          protocol,
          version,
          amount: this._settings.approveMax
            ? undefined
            : calculatedTokenAAmount
                .multipliedBy(
                  this._settings?.approvalBufferFactor ??
                    defaultLiquiditySettings.approvalBufferFactor,
                )
                .toHexString(),
        })
    }

    if (
      calculatedTokenBAmount &&
      !tokenBInfo.hasEnoughAllowance &&
      !isCoinAddress(this._tokenB.contractAddress)
    ) {
      enableTransactions.tokenB =
        await this.generateApproveRouterAllowanceTransaction({
          token: 'B',
          dexTag,
          protocol,
          version,
          amount: this._settings.approveMax
            ? undefined
            : calculatedTokenBAmount
                .multipliedBy(
                  this._settings?.approvalBufferFactor ??
                    defaultLiquiditySettings.approvalBufferFactor,
                )
                .toHexString(),
        })
    }

    const shareOfPool = calculateCurrentShareOfPoolV2({
      lpTokenBalance: lpTokenInfo?.balance,
      lpTokenDecimals: tokenLPDecimals,
      totalSupply: poolReserves.totalLPTokenSupply,
    })

    const prices = calculatePrices({
      tokenA: tokenAInfo.token,
      tokenB: tokenBInfo.token,
      reserveA,
      reserveB,
    })

    const expectedShareOfPool = calculateExpectedShareAfterAddV2({
      lpTokenBalance: lpTokenInfo?.balance,
      lpTokenDecimals: tokenLPDecimals,
      liquidityToAdd: expectedLiquidity,
      currentTotalSupply: poolReserves.totalLPTokenSupply,
    })

    return {
      id: id ?? generateId(),
      dexTag,
      protocol,
      version,
      liquidityDirection: 'add',
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo: lpToken
        ? {
            token: lpToken,
            amount: undefined,
            balance: tokenLPBalance,
            allowance: tokenLPAllowanceV2,
            hasEnoughBalance: undefined,
            hasEnoughAllowance: undefined,
            isMaxAllowance: tokenLPAllowanceV2.toHexString() === MAX_HEX_STRING,
            totalSupply,
            isCoin: false,
          }
        : undefined,
      shareOfPool,
      expectedShareOfPool,
      prices,
      slippage: this._settings.slippage,
      deadline: generateDeadlineUnixTime(this._settings.deadlineMinutes),
      expectedLiquidity,
      minLiquidity,
      enableTransactions,
      transaction,
    }
  }

  /**
   * Generates the context required for removing liquidity in a Uniswap V2-style DEX.
   * This method validates the provided token amounts and liquidity amounts, fetches allowance and balance details, and prepares the transaction for removing liquidity from the pool.
   *
   * @template TFormat - The format in which the numbers should be returned, based on `TradeFormat`.
   *
   * @param params - The parameters required to remove liquidity:
   *  - `lpTokenAmount`: The amount of liquidity pool tokens to remove.
   *  - `minTokenAAmount`: The minimum amount of token A to remove from the pool.
   *  - `minTokenBAmount`: The minimum amount of token B to remove from the pool.
   *  - `dexTag`: The identifier for the DEX (e.g., 'uniswap').
   *  - `permit` (optional): A permit for LP tokens, if used.
   *  - `supportFeeOnTransferTokens` (optional): Whether to support tokens with transfer fees.
   * @param id - Unique identifier for the context
   *
   * @returns A `InternalLiquidityContext<TFormat>` object containing:
   *  - Information about the tokens and liquidity pool.
   *  - The expected liquidity to be removed.
   *  - Pool share and price calculations.
   *  - Transactions required to approve LP token transfers or remove liquidity.
   *
   * @throws If any of the provided parameters are invalid or if no LP token is found for the pair.
   */
  public async generateRemoveContextV2(
    params: RemoveLiquidityParamsV2<'dexnumber'>,
    id: string,
  ): Promise<InternalLiquidityContext<'dexnumber'>> {
    const protocol = 'protocolV2'

    const { dexTag, version, permit, supportFeeOnTransferTokens } = params

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    if (permit) {
      if (typeof permit === 'boolean') {
        if (!this._dexProvider.signer) {
          throw new DexError(
            'Must provide an `ethersSigner` to the `providerContext` to use auto permit generation',
            ErrorCodes.functionArgumentError,
          )
        }
      } else {
        if (
          !permit.permitData.v ||
          !permit.permitData.r ||
          !permit.permitData.s
        ) {
          throw new DexError(
            'Invalid permit data provided',
            ErrorCodes.functionArgumentError,
          )
        }
      }
    }

    if (!params.minTokenAAmount) {
      throw new DexError(
        'Invalid minTokenAAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!params.minTokenBAmount) {
      throw new DexError(
        'Invalid minTokenBAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!params.lpTokenAmount) {
      throw new DexError(
        'Invalid lpTokenAmount provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const { minTokenAAmount, minTokenBAmount, lpTokenAmount } = params

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

    if (lpTokenAmount.lte(0)) {
      throw new DexError(
        'lpTokenAmount must be a positive number',
        ErrorCodes.functionArgumentError,
      )
    }

    const versionTag = getVersionTagFromVersion(version)

    // Generate remove liquidity transaction
    const transaction = await this.generateRemoveLiquidityTransaction({
      dexTag,
      versionTag,
      lpTokenAmount,
      minTokenAAmount,
      minTokenBAmount,
      permitOptions: permit,
      supportFeeOnTransferTokens,
    })

    const lpTokenContract = await this.getLpTokenContract(dexTag, versionTag)

    if (!lpTokenContract) {
      throw new DexError(
        `LP token contract not found for dexTag ${dexTag}`,
        ErrorCodes.internalError,
      )
    }

    const lpToken = await lpTokenContract.getToken()

    if (
      !lpToken?.contractAddress ||
      isSameAddress(lpToken.contractAddress, ZERO_ADDRESS)
    ) {
      throw new DexError(
        'No LP token found for this pair',
        ErrorCodes.internalError,
      )
    }

    const allowancesAndBalanceOf = await this._tokens.getAllowancesAndBalanceOf(
      {
        walletAddress: this._walletAddress,
        tokenContractAddresses: [
          this._tokenA.contractAddress,
          this._tokenB.contractAddress,
          ...(lpToken?.contractAddress ? [lpToken.contractAddress] : []),
        ],
        format: { type: 'dexnumber' },
      },
    )

    const tokenADetails = allowancesAndBalanceOf[this._tokenA.contractAddress]
    const tokenBDetails = allowancesAndBalanceOf[this._tokenB.contractAddress]
    const lpTokenDetails = lpToken?.contractAddress
      ? allowancesAndBalanceOf[lpToken.contractAddress]
      : undefined

    const tokenABalance =
      tokenADetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)
    const tokenAAllowanceV2 =
      tokenADetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenA.decimals)

    const tokenBBalance =
      tokenBDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)
    const tokenBAllowanceV2 =
      tokenBDetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(MIN_HEX_STRING, this.tokenB.decimals)

    const tokenLPBalance =
      lpTokenDetails?.balanceInfo.balance ??
      DexNumber.fromShifted(
        MIN_HEX_STRING,
        this._nativeWrappedTokenInfo.decimals,
      )
    const tokenLPAllowanceV2 =
      lpTokenDetails?.allowanceInfoByDex?.[dexTag]?.protocolV2?.[versionTag]
        ?.allowance ??
      DexNumber.fromShifted(
        MIN_HEX_STRING,
        this._nativeWrappedTokenInfo.decimals,
      )

    const tokenAInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenA,
      amount: undefined,
      balance: tokenABalance,
      allowance: tokenAAllowanceV2,
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isMaxAllowance: tokenAAllowanceV2.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenA.contractAddress),
    }

    const tokenBInfo: LiquidityTokenInfo<'dexnumber'> = {
      token: this._tokenB,
      amount: undefined,
      balance: tokenBBalance,
      allowance: tokenBAllowanceV2,
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isMaxAllowance: tokenBAllowanceV2.toHexString() === MAX_HEX_STRING,
      isCoin: isCoinAddress(this._tokenB.contractAddress),
    }

    const lpTokenInfo = {
      token: lpToken,
      amount: lpTokenAmount,
      balance: tokenLPBalance,
      allowance: tokenLPAllowanceV2,
      hasEnoughBalance: tokenLPBalance.gte(lpTokenAmount),
      hasEnoughAllowance: tokenLPAllowanceV2.gte(lpTokenAmount),
      isCoin: false,
    }

    const expectedLiquidity = lpTokenAmount
    const minLiquidity = calculateSlippageAmount({
      amount: expectedLiquidity,
      slippage: this._settings.slippage,
      isMaximum: false,
    })

    const enableTransactions: LiquidityContext<TFormat>['enableTransactions'] =
      {}

    if (!permit && !lpTokenInfo?.hasEnoughAllowance) {
      enableTransactions.lpToken =
        await this.generateLPTokenRouterAllowanceTransaction({
          dexTag,
          versionTag,
          amount: this._settings.approveMax
            ? undefined
            : lpTokenAmount
                .multipliedBy(
                  this._settings?.approvalBufferFactor ??
                    defaultLiquiditySettings.approvalBufferFactor,
                )
                .toHexString(),
        })
    }

    // Fetch current pool reserves
    const { poolInfo, totalLPTokenSupply } =
      await this.getLiquidityPoolReserves({
        dexTag,
        versionTag,
      })

    // Calculate current share of the pool and prices
    const shareOfPool = calculateCurrentShareOfPoolV2({
      lpTokenBalance: lpTokenInfo?.balance,
      lpTokenDecimals: this._nativeWrappedTokenInfo.decimals,
      totalSupply: totalLPTokenSupply,
    })

    const prices = calculatePrices({
      tokenA: tokenAInfo.token,
      tokenB: tokenBInfo.token,
      reserveA: poolInfo.token0.reserve,
      reserveB: poolInfo.token1.reserve,
    })

    const expectedShareOfPool = calculateExpectedShareAfterRemoveV2({
      lpTokenBalance: lpTokenInfo?.balance,
      lpTokenDecimals: this._nativeWrappedTokenInfo.decimals,
      liquidityToRemove: expectedLiquidity,
      currentTotalSupply: totalLPTokenSupply,
    })

    return {
      id: id ?? generateId(),
      dexTag,
      protocol,
      version,
      liquidityDirection: 'remove',
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo: lpToken
        ? {
            token: lpToken,
            amount: undefined,
            balance: tokenLPBalance,
            allowance: tokenLPAllowanceV2,
            hasEnoughBalance: undefined,
            hasEnoughAllowance: undefined,
            isMaxAllowance: tokenLPAllowanceV2.toHexString() === MAX_HEX_STRING,
            totalSupply: totalLPTokenSupply,
            isCoin: false,
          }
        : undefined,
      shareOfPool,
      prices,
      expectedShareOfPool,
      slippage: this._settings.slippage,
      deadline: generateDeadlineUnixTime(this._settings.deadlineMinutes),
      expectedLiquidity,
      minLiquidity,
      transaction,
    }
  }

  /**
   * Generates permit data for EIP-2612 permit signatures when removing liquidity.
   * This method creates permit data that allows approving LP token spending without requiring a separate transaction.
   *
   * @param params - The parameters for generating the permit data
   * @param params.lpTokenAmount - The amount of LP tokens to approve
   * @param params.dexTag - The identifier for the DEX (e.g., 'uniswap')
   * @param params.versionTag - The version tag for the DEX
   * @returns A promise that resolves to the permit data required for removing liquidity
   * @throws {DexError} If the signer is not available or if permit generation fails
   */
  protected async generatePermitData({
    lpTokenAmount,
    dexTag,
    versionTag,
  }: {
    lpTokenAmount: DexNumber
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<RemoveLiquidityPermit> {
    if (!this._dexProvider.signer) {
      throw new DexError(
        'Must provide an `ethersSigner` to the `providerContext` to use auto permit generation',
        ErrorCodes.functionArgumentError,
      )
    }

    const deadline = generateDeadlineUnixTime(this._settings.deadlineMinutes)
    const approveMax = this._settings.approveMax ?? true

    try {
      // Get spender (router) address
      const spender = this.getRouterContract(dexTag, versionTag).contractDetail
        .address

      if (!spender) {
        throw new DexError(
          'Failed to get router address',
          ErrorCodes.internalError,
        )
      }

      // Get pair contract
      const pairContract = await this.getPairContract(dexTag, versionTag)

      if (!pairContract) {
        throw new DexError(
          'Failed to get pair contract',
          ErrorCodes.internalError,
        )
      }

      // Get chainId
      const chainId = this._dexProvider.network.chainId
      if (!chainId) {
        throw new DexError('Failed to get chain ID', ErrorCodes.internalError)
      }

      // Use multicall to get nonce and name in a single call
      const { results } = await pairContract.call({
        nonce: pairContract.noncesCallContext(this._walletAddress),
        name: pairContract.nameCallContext(),
      })

      if (!results.nonce?.success || !results.name?.success) {
        throw new DexError(
          'Failed to get nonce or name',
          ErrorCodes.multicallError,
        )
      }

      const nonce = results.nonce.value
      const name = results.name.value

      // Create the domain separator
      const domain: TypedDataDomain = {
        name,
        version: '1',
        chainId,
        verifyingContract: pairContract.contractDetail.address,
      }

      // Create the typed data
      const types: Record<string, Array<TypedDataField>> = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      }

      const message = {
        owner: this._walletAddress,
        spender,
        value: approveMax ? MAX_HEX_STRING : lpTokenAmount.toHexString(),
        nonce: nonce.toNumber(),
        deadline,
      }

      // Create hash of the EIP-712 formatted data
      const domainSeparator = ethers.utils._TypedDataEncoder.hashDomain(domain)
      const hashStruct = ethers.utils._TypedDataEncoder.hashStruct(
        'Permit',
        types,
        message,
      )
      const digest = ethers.utils.keccak256(
        ethers.utils.concat([
          ethers.utils.toUtf8Bytes('\x19\x01'),
          domainSeparator,
          hashStruct,
        ]),
      )

      // Sign the digest
      const signature = await this._dexProvider.signer.signMessage(
        ethers.utils.arrayify(digest),
      )

      // Split signature into v, r, s components
      const sig = ethers.utils.splitSignature(signature)

      return {
        approveMax,
        permitData: {
          v: sig.v,
          r: sig.r,
          s: sig.s,
        },
      }
    } catch (error) {
      throw new DexError(
        'Failed to generate permit data',
        ErrorCodes.internalError,
        undefined,
        error instanceof Error ? error : undefined,
      )
    }
  }
}
