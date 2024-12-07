import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  ContractDetailWithAddressContext,
  DexMulticallProviderContext,
  UniswapPoolV3Types,
  ContractTransactionOverrides,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  getDexConfig,
  isContractDetail,
  defaultPoolMethodMapV3,
  isContractDetailForAddress,
  getVersionTagFromVersion,
  formatVersionForDisplay,
  assertChainId,
  assertDexType,
  assertVersion,
  assertIsAddress,
  assertDexConfigBase,
  assertProtocol,
  getAddress,
} from '@dex-toolkit/utils'
import type {
  ContractContext,
  ContractContextOptions,
  DiscriminatedMethodCalls,
  ExecutionResult,
  MethodCall,
  MethodNames,
} from '@multicall-toolkit/types'
import type {
  BigNumberish,
  BytesLike,
  ContractTransaction,
  BigNumber,
} from 'ethers'

export class PoolContractV3
  extends DexProviderBase
  implements UniswapPoolV3Types.Contract
{
  protected _contract: UniswapPoolV3Types.ContractContext

  protected _methodNames: UniswapPoolV3Types.MethodNameMap

  constructor(
    dexProviderContext: DexMulticallProviderContext,
    contractDetailContext: ContractDetailWithAddressContext,
  ) {
    if (!contractDetailContext) {
      throw new DexError(
        'contractDetailContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (isContractDetail(contractDetailContext)) {
      super(dexProviderContext, contractDetailContext)
    } else if (isContractDetailForAddress(contractDetailContext)) {
      const { dexType, chainId, version, address } = contractDetailContext ?? {}

      assertDexType(dexType)
      assertChainId(chainId)
      assertVersion(version)
      assertIsAddress(address)

      const dexConfig = getDexConfig({ dexType, chainId })
      assertDexConfigBase(dexConfig)

      const protocol = dexConfig.protocols.protocolV3
      assertProtocol(protocol)

      const contractDetails = protocol[getVersionTagFromVersion(version)]
      if (!contractDetails) {
        throw new DexError(
          `Version ${formatVersionForDisplay(version)} not supported for ${dexType} V3`,
          ErrorCodes.versionNotSupported,
        )
      }

      const { abi, methods } = contractDetails.pool ?? {}

      if (!abi) {
        throw new DexError(
          `ABI not found for ${dexType} V3 version ${formatVersionForDisplay(version)}`,
          ErrorCodes.contractDetailsNotFound,
        )
      }

      if (!methods) {
        throw new DexError(
          `Methods not found for ${dexType} V3 version ${formatVersionForDisplay(version)}`,
          ErrorCodes.contractDetailsNotFound,
        )
      }

      super(dexProviderContext, {
        address,
        abi,
        methods,
      })
    } else {
      throw new DexError(
        'Invalid contract detail context',
        ErrorCodes.functionArgumentError,
      )
    }

    this._contract =
      this.dexProvider.getContract<UniswapPoolV3Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultPoolMethodMapV3,
      ...this._contractDetail.methods,
    }
  }

  /** Get the pool contract */
  public get poolContract(): UniswapPoolV3Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapPoolV3Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapPoolV3Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPoolV3Types.ContractContext

    if (typeof this._contract[contractMethodName] === 'function') {
      return (this._contract[contractMethodName] as any)(...(values || []))
    } else {
      throw new DexError(
        `Method ${methodName} does not exist on the contract`,
        ErrorCodes.functionArgumentError,
      )
    }
  }

  /**
   * Encodes the function data for the given method name, using custom method names if provided in the contract detail.
   * @param methodName - The method name.
   * @param values - The values to encode.
   * @returns The encoded function data.
   */
  private encodeFunctionData(
    methodName: UniswapPoolV3Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapPoolV3Types.MethodNames,
      values,
    )
  }

  /**
   * Helper function to dynamically prepare a call context based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param methodParameters - The method parameters.
   * @returns The call context.
   */
  protected prepareCallContext<
    TMethod extends keyof UniswapPoolV3Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapPoolV3Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPoolV3Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapPoolV3Types.Contract, TMethod>
    } else {
      throw new DexError(
        `Method ${String(contractMethodName)} does not exist on the contract`,
        ErrorCodes.functionArgumentError,
      )
    }
  }

  /**
   * Helper function to dynamically prepare a contract context based on custom or default method names.
   * @param calls - An object containing method calls, each mapped to its parameters.
   * @param customData - Optional custom data to include in the context.
   * @returns The contract context, including the address, ABI, calls, and optional custom data.
   */
  protected prepareContractContext<
    TCalls extends Record<
      string,
      DiscriminatedMethodCalls<UniswapPoolV3Types.Contract>[MethodNames<UniswapPoolV3Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapPoolV3Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapPoolV3Types.Contract,
      TCalls,
      TCustomData
    > = {
      contractAddress: getAddress(this._contractDetail.address, false),
      abi: this._contractDetail.abi,
      calls,
      ...((customData !== undefined
        ? { customData }
        : {}) as TCustomData extends Record<string, any>
        ? { customData: TCustomData }
        : { customData?: TCustomData }),
    }

    return context
  }

  /**
   * Executes a multicall for the given contract methods.
   *
   * @template TCalls - The type of the calls object.
   *
   * @param calls - An object describing the methods to call and their parameters.
   * @param options - Optional configuration for the contract call.
   * @returns A promise that resolves to an object containing the block number,
   *          origin context, and the results of each method call.
   *
   * @remarks
   * This method allows batch calling of multiple contract methods in a single transaction.
   * It uses the multicall provider to execute all calls efficiently.
   * The results are typed according to the return types of the called methods.
   */
  async call<
    TCalls extends Record<
      string,
      DiscriminatedMethodCalls<UniswapPoolV3Types.Contract>[MethodNames<UniswapPoolV3Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapPoolV3Types.Contract, TCalls>> {
    return super.executeCall<UniswapPoolV3Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new pool contract.
  //  * @param overrides - Optional transaction overrides.
  //  * @returns The contract transaction.
  //  */
  // public async new(
  //   overrides?: ContractTransactionOverrides,
  // ): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [overrides])
  // }

  // /**
  //  * Encodes the function data for initializing a new pool contract.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(): string {
  //   return this.encodeFunctionData('new', [])
  // }

  /**
   * Burns liquidity from the pool.
   * @param tickLower - The lower tick range.
   * @param tickUpper - The upper tick range.
   * @param amount - The amount to burn.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async burn(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('burn', [
      tickLower,
      tickUpper,
      amount,
      overrides,
    ])
  }

  /**
   * Encodes the function data for burning liquidity from the pool.
   * @param tickLower - The lower tick range.
   * @param tickUpper - The upper tick range.
   * @param amount - The amount to burn.
   * @returns The encoded function data.
   */
  public encodeBurn(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
  ): string {
    return this.encodeFunctionData('burn', [tickLower, tickUpper, amount])
  }

  /**
   * Collects fees from the pool.
   * @param recipient - The recipient of the fees.
   * @param tickLower - The lower tick range.
   * @param tickUpper - The upper tick range.
   * @param amount0Requested - The requested amount of token0.
   * @param amount1Requested - The requested amount of token1.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async collect(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('collect', [
      recipient,
      tickLower,
      tickUpper,
      amount0Requested,
      amount1Requested,
      overrides,
    ])
  }

  /**
   * Encodes the function data for collecting fees from the pool.
   * @param recipient - The recipient of the fees.
   * @param tickLower - The lower tick range.
   * @param tickUpper - The upper tick range.
   * @param amount0Requested - The requested amount of token0.
   * @param amount1Requested - The requested amount of token1.
   * @returns The encoded function data.
   */
  public encodeCollect(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
  ): string {
    return this.encodeFunctionData('collect', [
      recipient,
      tickLower,
      tickUpper,
      amount0Requested,
      amount1Requested,
    ])
  }

  /**
   * Collects protocol fees from the pool.
   * @param recipient - The recipient of the fees.
   * @param amount0Requested - The requested amount of token0.
   * @param amount1Requested - The requested amount of token1.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async collectProtocol(
    recipient: string,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('collectProtocol', [
      recipient,
      amount0Requested,
      amount1Requested,
      overrides,
    ])
  }

  /**
   * Encodes the function data for collecting protocol fees from the pool.
   * @param recipient - The recipient of the fees.
   * @param amount0Requested - The requested amount of token0.
   * @param amount1Requested - The requested amount of token1.
   * @returns The encoded function data.
   */
  public encodeCollectProtocol(
    recipient: string,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
  ): string {
    return this.encodeFunctionData('collectProtocol', [
      recipient,
      amount0Requested,
      amount1Requested,
    ])
  }

  /**
   * Returns the factory address.
   * @returns The factory address.
   */
  public async factory(): Promise<string> {
    return this.callContractMethod<string>('factory', [])
  }

  /**
   * Returns the call context for the `factory` method.
   * @returns The call context.
   */
  public factoryCallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Returns the fee for the pool.
   * @returns The fee percentage for the pool.
   */
  public async fee(): Promise<number> {
    return this.callContractMethod<number>('fee', [])
  }

  /**
   * Returns the call context for the `fee` method.
   * @returns The call context.
   */
  public feeCallContext(): MethodCall<UniswapPoolV3Types.Contract, 'fee'> {
    return this.prepareCallContext('fee', [])
  }

  /**
   * Returns the global fee growth of token0.
   * @returns The fee growth of token0.
   */
  public async feeGrowthGlobal0X128(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('feeGrowthGlobal0X128', [])
  }

  /**
   * Returns the call context for the `feeGrowthGlobal0X128` method.
   * @returns The call context.
   */
  public feeGrowthGlobal0X128CallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'feeGrowthGlobal0X128'
  > {
    return this.prepareCallContext('feeGrowthGlobal0X128', [])
  }

  /**
   * Returns the global fee growth of token1.
   * @returns The fee growth of token1.
   */
  public async feeGrowthGlobal1X128(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('feeGrowthGlobal1X128', [])
  }

  /**
   * Returns the call context for the `feeGrowthGlobal1X128` method.
   * @returns The call context.
   */
  public feeGrowthGlobal1X128CallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'feeGrowthGlobal1X128'
  > {
    return this.prepareCallContext('feeGrowthGlobal1X128', [])
  }

  /**
   * Flash loans for token0 and token1.
   * @param recipient - The recipient of the flash loan.
   * @param amount0 - The amount of token0.
   * @param amount1 - The amount of token1.
   * @param data - Any additional data required for the flash loan.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async flash(
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('flash', [
      recipient,
      amount0,
      amount1,
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for flash loans.
   * @param recipient - The recipient of the flash loan.
   * @param amount0 - The amount of token0.
   * @param amount1 - The amount of token1.
   * @param data - Any additional data required for the flash loan.
   * @returns The encoded function data.
   */
  public encodeFlash(
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('flash', [recipient, amount0, amount1, data])
  }

  /**
   * Increases the observation cardinality for the pool.
   * @param observationCardinalityNext - The next observation cardinality.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async increaseObservationCardinalityNext(
    observationCardinalityNext: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'increaseObservationCardinalityNext',
      [observationCardinalityNext, overrides],
    )
  }

  /**
   * Encodes the function data to increase the observation cardinality.
   * @param observationCardinalityNext - The next observation cardinality.
   * @returns The encoded function data.
   */
  public encodeIncreaseObservationCardinalityNext(
    observationCardinalityNext: BigNumberish,
  ): string {
    return this.encodeFunctionData('increaseObservationCardinalityNext', [
      observationCardinalityNext,
    ])
  }

  /**
   * Initializes the pool with the sqrtPriceX96 and tick.
   * @param sqrtPriceX96 - The square root price.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async initialize(
    sqrtPriceX96: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('initialize', [
      sqrtPriceX96,
      overrides,
    ])
  }

  /**
   * Encodes the function data for pool initialization.
   * @param sqrtPriceX96 - The square root price.
   * @param tick - The tick to initialize at.
   * @returns The encoded function data.
   */
  public encodeInitialize(
    sqrtPriceX96: BigNumberish,
    tick: BigNumberish,
  ): string {
    return this.encodeFunctionData('initialize', [sqrtPriceX96, tick])
  }

  /**
   * Fetches the liquidity of the pool.
   * @returns The current liquidity.
   */
  public async liquidity(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('liquidity', [])
  }

  /**
   * Fetches the call context for the `liquidity` method.
   * @returns The call context.
   */
  public liquidityCallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'liquidity'
  > {
    return this.prepareCallContext('liquidity', [])
  }

  /**
   * Fetches the maximum liquidity per tick.
   * @returns The maximum liquidity per tick.
   */
  public async maxLiquidityPerTick(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('maxLiquidityPerTick', [])
  }

  /**
   * Fetches the call context for the `maxLiquidityPerTick` method.
   * @returns The call context.
   */
  public maxLiquidityPerTickCallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'maxLiquidityPerTick'
  > {
    return this.prepareCallContext('maxLiquidityPerTick', [])
  }

  /**
   * Mints liquidity for the given recipient, tick range, and amount.
   * @param recipient - The address of the recipient.
   * @param tickLower - The lower tick of the position.
   * @param tickUpper - The upper tick of the position.
   * @param amount - The amount of liquidity to mint.
   * @param data - Additional data for the mint transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async mint(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('mint', [
      recipient,
      tickLower,
      tickUpper,
      amount,
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for minting liquidity.
   * @param recipient - The address of the recipient.
   * @param tickLower - The lower tick of the position.
   * @param tickUpper - The upper tick of the position.
   * @param amount - The amount of liquidity to mint.
   * @param data - Additional data for the mint transaction.
   * @returns The encoded function data.
   */
  public encodeMint(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('mint', [
      recipient,
      tickLower,
      tickUpper,
      amount,
      data,
    ])
  }

  /**
   * Fetches the observation for a given index.
   * @param parameter0 - The observation index.
   * @returns The observation data.
   */
  public async observations(
    parameter0: BigNumberish,
  ): Promise<UniswapPoolV3Types.ObservationsResponse> {
    return this.callContractMethod<UniswapPoolV3Types.ObservationsResponse>(
      'observations',
      [parameter0],
    )
  }

  /**
   * Fetches the call context for the `observations` method.
   * @param parameter0 - The observation index.
   * @returns The call context.
   */
  public observationsCallContext(
    parameter0: BigNumberish,
  ): MethodCall<UniswapPoolV3Types.Contract, 'observations'> {
    return this.prepareCallContext('observations', [parameter0])
  }

  /**
   * Observes past oracles at different times.
   * @param secondsAgos - Array of seconds ago to query.
   * @returns The observation result.
   */
  public async observe(
    secondsAgos: BigNumberish[],
  ): Promise<UniswapPoolV3Types.ObserveResponse> {
    return this.callContractMethod<UniswapPoolV3Types.ObserveResponse>(
      'observe',
      [secondsAgos],
    )
  }

  /**
   * Fetches the call context for the `observe` method.
   * @param secondsAgos - Array of seconds ago to query.
   * @returns The call context.
   */
  public observeCallContext(
    secondsAgos: BigNumberish[],
  ): MethodCall<UniswapPoolV3Types.Contract, 'observe'> {
    return this.prepareCallContext('observe', [secondsAgos])
  }

  /**
   * Fetches the position data for a given position key.
   * @param parameter0 - The position key.
   * @returns The position data.
   */
  public async positions(
    parameter0: BytesLike,
  ): Promise<UniswapPoolV3Types.PositionsResponse> {
    return this.callContractMethod<UniswapPoolV3Types.PositionsResponse>(
      'positions',
      [parameter0],
    )
  }

  /**
   * Fetches the call context for the `positions` method.
   * @param parameter0 - The position key.
   * @returns The call context.
   */
  public positionsCallContext(
    parameter0: BytesLike,
  ): MethodCall<UniswapPoolV3Types.Contract, 'positions'> {
    return this.prepareCallContext('positions', [parameter0])
  }

  /**
   * Fetches the protocol fees.
   * @returns The protocol fees for token0 and token1.
   */
  public async protocolFees(): Promise<UniswapPoolV3Types.ProtocolFeesResponse> {
    return this.callContractMethod<UniswapPoolV3Types.ProtocolFeesResponse>(
      'protocolFees',
      [],
    )
  }

  /**
   * Fetches the call context for the `protocolFees` method.
   * @returns The call context.
   */
  public protocolFeesCallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'protocolFees'
  > {
    return this.prepareCallContext('protocolFees', [])
  }

  /**
   * Sets the fee protocol for the pool.
   * @param feeProtocol0 - The fee protocol for token0.
   * @param feeProtocol1 - The fee protocol for token1.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async setFeeProtocol(
    feeProtocol0: BigNumberish,
    feeProtocol1: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('setFeeProtocol', [
      feeProtocol0,
      feeProtocol1,
      overrides,
    ])
  }

  /**
   * Encodes the function data to set the fee protocol.
   * @param feeProtocol0 - The fee protocol for token0.
   * @param feeProtocol1 - The fee protocol for token1.
   * @returns The encoded function data.
   */
  public encodeSetFeeProtocol(
    feeProtocol0: BigNumberish,
    feeProtocol1: BigNumberish,
  ): string {
    return this.encodeFunctionData('setFeeProtocol', [
      feeProtocol0,
      feeProtocol1,
    ])
  }

  /**
   * Fetches the slot0 data (price, tick, observation, and other pool details).
   * @returns The slot0 data.
   */
  public async slot0(): Promise<UniswapPoolV3Types.Slot0Response> {
    return this.callContractMethod<UniswapPoolV3Types.Slot0Response>(
      'slot0',
      [],
    )
  }

  /**
   * Fetches the call context for the `slot0` method.
   * @returns The call context.
   */
  public slot0CallContext(): MethodCall<UniswapPoolV3Types.Contract, 'slot0'> {
    return this.prepareCallContext('slot0', [])
  }

  /**
   * Fetches cumulative data inside a given tick range.
   * @param tickLower - The lower tick of the range.
   * @param tickUpper - The upper tick of the range.
   * @returns The cumulative snapshot inside the range.
   */
  public async snapshotCumulativesInside(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
  ): Promise<UniswapPoolV3Types.SnapshotCumulativesInsideResponse> {
    return this.callContractMethod<UniswapPoolV3Types.SnapshotCumulativesInsideResponse>(
      'snapshotCumulativesInside',
      [tickLower, tickUpper],
    )
  }

  /**
   * Fetches the call context for the `snapshotCumulativesInside` method.
   * @param tickLower - The lower tick of the range.
   * @param tickUpper - The upper tick of the range.
   * @returns The call context.
   */
  public snapshotCumulativesInsideCallContext(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
  ): MethodCall<UniswapPoolV3Types.Contract, 'snapshotCumulativesInside'> {
    return this.prepareCallContext('snapshotCumulativesInside', [
      tickLower,
      tickUpper,
    ])
  }

  /**
   * Swaps tokens in the pool.
   * @param recipient - The recipient address.
   * @param zeroForOne - Boolean indicating the direction of the swap.
   * @param amountSpecified - The specified amount for the swap.
   * @param sqrtPriceLimitX96 - The price limit for the swap.
   * @param data - Additional swap data.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swap(
    recipient: string,
    zeroForOne: boolean,
    amountSpecified: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('swap', [
      recipient,
      zeroForOne,
      amountSpecified,
      sqrtPriceLimitX96,
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for a swap.
   * @param recipient - The recipient address.
   * @param zeroForOne - Boolean indicating the direction of the swap.
   * @param amountSpecified - The specified amount for the swap.
   * @param sqrtPriceLimitX96 - The price limit for the swap.
   * @param data - Additional swap data.
   * @returns The encoded function data.
   */
  public encodeSwap(
    recipient: string,
    zeroForOne: boolean,
    amountSpecified: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('swap', [
      recipient,
      zeroForOne,
      amountSpecified,
      sqrtPriceLimitX96,
      data,
    ])
  }

  /**
   * Fetches the tick bitmap for a given position.
   * @param parameter0 - The position of the tick bitmap.
   * @returns The tick bitmap value.
   */
  public async tickBitmap(parameter0: BigNumberish): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('tickBitmap', [parameter0])
  }

  /**
   * Fetches the tick bitmap for a given position using call context.
   * @param parameter0 - The position of the tick bitmap.
   * @returns The CallContext object to be used with Multicall.
   */
  public tickBitmapCallContext(
    parameter0: BigNumberish,
  ): MethodCall<UniswapPoolV3Types.Contract, 'tickBitmap'> {
    return this.prepareCallContext('tickBitmap', [parameter0])
  }

  /**
   * Fetches the tick spacing of the pool.
   * @returns The tick spacing value.
   */
  public async tickSpacing(): Promise<number> {
    return this.callContractMethod<number>('tickSpacing', [])
  }

  /**
   * Fetches the call context for the `tickSpacing` method.
   * @returns The call context.
   */
  public tickSpacingCallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'tickSpacing'
  > {
    return this.prepareCallContext('tickSpacing', [])
  }

  /**
   * Fetches the tick data for a specific tick.
   * @param parameter0 - The tick index.
   * @returns The tick data.
   */
  public async ticks(
    parameter0: BigNumberish,
  ): Promise<UniswapPoolV3Types.TicksResponse> {
    return this.callContractMethod<UniswapPoolV3Types.TicksResponse>('ticks', [
      parameter0,
    ])
  }

  /**
   * Fetches the call context for the `ticks` method.
   * @param parameter0 - The tick index.
   * @returns The call context.
   */
  public ticksCallContext(
    parameter0: BigNumberish,
  ): MethodCall<UniswapPoolV3Types.Contract, 'ticks'> {
    return this.prepareCallContext('ticks', [parameter0])
  }

  /**
   * Fetches the address of token0.
   * @returns The address of token0.
   */
  public async token0(): Promise<string> {
    return this.callContractMethod<string>('token0', [])
  }

  /**
   * Fetches the call context for the `token0` method.
   * @returns The call context.
   */
  public token0CallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'token0'
  > {
    return this.prepareCallContext('token0', [])
  }

  /**
   * Fetches the address of token1.
   * @returns The address of token1.
   */
  public async token1(): Promise<string> {
    return this.callContractMethod<string>('token1', [])
  }

  /**
   * Fetches the call context for the `token1` method.
   * @returns The call context.
   */
  public token1CallContext(): MethodCall<
    UniswapPoolV3Types.Contract,
    'token1'
  > {
    return this.prepareCallContext('token1', [])
  }
}
