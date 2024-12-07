import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  ContractDetailContext,
  DexMulticallProviderContext,
  UniswapQuoterV3Types,
  ContractTransactionOverrides,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  getDexConfig,
  isContractDetail,
  isContractDetailForDexType,
  defaultQuoterMethodMapV3,
  getVersionTagFromVersion,
  formatVersionForDisplay,
  assertChainId,
  assertDexType,
  assertVersion,
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
} from '@ethereum-multicall/types'
import type { BigNumberish, BytesLike } from 'ethers'

export class QuoterContractV3
  extends DexProviderBase
  implements UniswapQuoterV3Types.Contract
{
  protected _contract: UniswapQuoterV3Types.ContractContext

  protected _methodNames: UniswapQuoterV3Types.MethodNameMap

  constructor(
    dexProviderContext: DexMulticallProviderContext,
    contractDetailContext: ContractDetailContext,
  ) {
    if (!contractDetailContext) {
      throw new DexError(
        'contractDetailContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (isContractDetail(contractDetailContext)) {
      super(dexProviderContext, contractDetailContext)
    } else if (isContractDetailForDexType(contractDetailContext)) {
      const { dexType, chainId, version } = contractDetailContext ?? {}

      assertDexType(dexType)
      assertChainId(chainId)
      assertVersion(version)

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

      const contractDetail = contractDetails.quoter
      if (!contractDetail) {
        throw new DexError(
          `Quoter configuration missing for ${dexType} V3 version ${formatVersionForDisplay(version)}`,
          ErrorCodes.contractDetailsNotFound,
        )
      }

      super(dexProviderContext, contractDetail)
    } else {
      throw new DexError(
        'Invalid contract detail context',
        ErrorCodes.functionArgumentError,
      )
    }

    this._contract =
      this.dexProvider.getContract<UniswapQuoterV3Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultQuoterMethodMapV3,
      ...this._contractDetail.methods,
    }
  }

  /** Get the quoter contract */
  public get quoterContract(): UniswapQuoterV3Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapQuoterV3Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapQuoterV3Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapQuoterV3Types.ContractContext

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
    methodName: UniswapQuoterV3Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapQuoterV3Types.MethodNames,
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
    TMethod extends keyof UniswapQuoterV3Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapQuoterV3Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapQuoterV3Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapQuoterV3Types.Contract, TMethod>
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
  prepareContractContext<
    TCalls extends Record<
      string,
      DiscriminatedMethodCalls<UniswapQuoterV3Types.Contract>[MethodNames<UniswapQuoterV3Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapQuoterV3Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapQuoterV3Types.Contract,
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
      DiscriminatedMethodCalls<UniswapQuoterV3Types.Contract>[MethodNames<UniswapQuoterV3Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapQuoterV3Types.Contract, TCalls>> {
    return super.executeCall<UniswapQuoterV3Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new quoter contract.
  //  * @param _factory - The address of the factory.
  //  * @param _WETH9 - The address of the WETH9 contract.
  //  * @param overrides - Optional transaction overrides.
  //  * @returns The contract transaction.
  //  */
  // public async new(
  //   _factory: string,
  //   _WETH9: string,
  //   overrides?: ContractTransactionOverrides,
  // ): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [
  //     _factory,
  //     _WETH9,
  //     overrides,
  //   ])
  // }

  // /**
  //  * Encodes the function data for initializing a new quoter contract.
  //  * @param _factory - The address of the factory.
  //  * @param _WETH9 - The address of the WETH9 contract.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(_factory: string, _WETH9: string): string {
  //   return this.encodeFunctionData('new', [_factory, _WETH9])
  // }

  /**
   * Returns the WETH9 address.
   * @returns The WETH9 address.
   */
  public async WETH9(): Promise<string> {
    return this.callContractMethod<string>('WETH9', [])
  }

  /**
   * Returns the call context for the WETH9 method.
   * @returns The call context.
   */
  public WETH9CallContext(): MethodCall<
    UniswapQuoterV3Types.Contract,
    'WETH9'
  > {
    return this.prepareCallContext('WETH9', [])
  }

  /**
   * Returns the factory address.
   * @returns The factory address.
   */
  public async factory(): Promise<string> {
    return this.callContractMethod<string>('factory', [])
  }

  /**
   * Returns the call context for the factory method.
   * @returns The call context.
   */
  public factoryCallContext(): MethodCall<
    UniswapQuoterV3Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Quotes the exact input for a given path and amount.
   * @param path - The path for the swap.
   * @param amountIn - The input amount.
   * @param overrides - Optional transaction overrides.
   * @returns Quote information including output amount, sqrt price after, ticks crossed, and gas estimate.
   */
  public async quoteExactInput(
    path: BytesLike,
    amountIn: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<UniswapQuoterV3Types.QuoteExactInputResponse> {
    return this.callContractMethod<UniswapQuoterV3Types.QuoteExactInputResponse>(
      'quoteExactInput',
      [path, amountIn, overrides],
    )
  }

  /**
   * Encodes the function data to quote the exact input for a given path and amount.
   * @param path - The path for the swap.
   * @param amountIn - The input amount.
   * @returns The encoded function data.
   */
  public encodeQuoteExactInput(
    path: BytesLike,
    amountIn: BigNumberish,
  ): string {
    return this.encodeFunctionData('quoteExactInput', [path, amountIn])
  }

  /**
   * Prepares the CallContext for the `quoteExactInput` method.
   * This method is used to quote the exact input for a given path and amount.
   *
   * @param path - The encoded path for the swap, typically a series of token addresses.
   * @param amountIn - The amount of the input token to be swapped.
   * @returns The CallContext object to be used with Multicall.
   */
  public quoteExactInputCallContext(
    path: BytesLike,
    amountIn: BigNumberish,
  ): MethodCall<UniswapQuoterV3Types.Contract, 'quoteExactInput'> {
    return this.prepareCallContext('quoteExactInput', [path, amountIn])
  }

  /**
   * Quotes the exact input for a single path.
   * @param params - The quote parameters including tokens, fee, amount and price limit.
   * @param overrides - Optional transaction overrides.
   * @returns Quote information including output amount, sqrt price after, ticks crossed, and gas estimate.
   */
  public async quoteExactInputSingle(
    params: UniswapQuoterV3Types.QuoteExactInputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<UniswapQuoterV3Types.QuoteExactInputSingleResponse> {
    return this.callContractMethod<UniswapQuoterV3Types.QuoteExactInputSingleResponse>(
      'quoteExactInputSingle',
      [params, overrides],
    )
  }

  /**
   * Encodes the function data to quote the exact input for a single path.
   * @param tokenIn - The address of the input token.
   * @param tokenOut - The address of the output token.
   * @param fee - The fee for the swap.
   * @param amountIn - The input amount.
   * @param sqrtPriceLimitX96 - The price limit.
   * @returns The encoded function data.
   */
  public encodeQuoteExactInputSingle(
    tokenIn: string,
    tokenOut: string,
    fee: BigNumberish,
    amountIn: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
  ): string {
    return this.encodeFunctionData('quoteExactInputSingle', [
      tokenIn,
      tokenOut,
      fee,
      amountIn,
      sqrtPriceLimitX96,
    ])
  }

  /**
   * Prepares the CallContext for the `quoteExactInputSingle` method.
   * This method is used to quote the exact input for a single token pair.
   *
   * @param tokenIn - The address of the input token.
   * @param tokenOut - The address of the output token.
   * @param fee - The fee tier for the Uniswap V3 pool.
   * @param amountIn - The amount of the input token to be swapped.
   * @param sqrtPriceLimitX96 - The price limit for the swap.
   * @returns The CallContext object to be used with Multicall.
   */
  public quoteExactInputSingleCallContext(
    tokenIn: string,
    tokenOut: string,
    fee: BigNumberish,
    amountIn: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
  ): MethodCall<UniswapQuoterV3Types.Contract, 'quoteExactInputSingle'> {
    return this.prepareCallContext('quoteExactInputSingle', [
      tokenIn,
      tokenOut,
      fee,
      amountIn,
      sqrtPriceLimitX96,
    ])
  }

  /**
   * Quotes the exact output for a given path and amount.
   * @param path - The path for the swap.
   * @param amountOut - The output amount.
   * @param overrides - Optional transaction overrides.
   * @returns Quote information including input amount, sqrt price after, ticks crossed, and gas estimate.
   */
  public async quoteExactOutput(
    path: BytesLike,
    amountOut: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<UniswapQuoterV3Types.QuoteExactOutputResponse> {
    return this.callContractMethod<UniswapQuoterV3Types.QuoteExactOutputResponse>(
      'quoteExactOutput',
      [path, amountOut, overrides],
    )
  }

  /**
   * Encodes the function data to quote the exact output for a given path and amount.
   * @param path - The path for the swap.
   * @param amountOut - The output amount.
   * @returns The encoded function data.
   */
  public encodeQuoteExactOutput(
    path: BytesLike,
    amountOut: BigNumberish,
  ): string {
    return this.encodeFunctionData('quoteExactOutput', [path, amountOut])
  }

  /**
   * Prepares the CallContext for the `quoteExactOutput` method.
   * This method is used to quote the exact output for a given path and amount.
   *
   * @param path - The encoded path for the swap, typically a series of token addresses.
   * @param amountOut - The amount of the output token to be received.
   * @returns The CallContext object to be used with Multicall.
   */
  public quoteExactOutputCallContext(
    path: BytesLike,
    amountOut: BigNumberish,
  ): MethodCall<UniswapQuoterV3Types.Contract, 'quoteExactOutput'> {
    return this.prepareCallContext('quoteExactOutput', [path, amountOut])
  }

  /**
   * Quotes the exact output for a single path.
   * @param params - The quote parameters including tokens, fee, amount and sqrtPriceLimitX96.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async quoteExactOutputSingle(
    params: UniswapQuoterV3Types.QuoteExactOutputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<UniswapQuoterV3Types.QuoteExactOutputSingleResponse> {
    return this.callContractMethod<UniswapQuoterV3Types.QuoteExactOutputSingleResponse>(
      'quoteExactOutputSingle',
      [params, overrides],
    )
  }

  /**
   * Encodes the function data to quote the exact output for a single path.
   * @param tokenIn - The address of the input token.
   * @param tokenOut - The address of the output token.
   * @param fee - The fee for the swap.
   * @param amountOut - The output amount.
   * @param sqrtPriceLimitX96 - The price limit.
   * @returns The encoded function data.
   */
  public encodeQuoteExactOutputSingle(
    tokenIn: string,
    tokenOut: string,
    fee: BigNumberish,
    amountOut: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
  ): string {
    return this.encodeFunctionData('quoteExactOutputSingle', [
      tokenIn,
      tokenOut,
      fee,
      amountOut,
      sqrtPriceLimitX96,
    ])
  }

  /**
   * Prepares the CallContext for the `quoteExactOutputSingle` method.
   * This method is used to quote the exact output for a single token pair.
   *
   * @param tokenIn - The address of the input token.
   * @param tokenOut - The address of the output token.
   * @param fee - The fee tier for the Uniswap V3 pool.
   * @param amountOut - The amount of the output token to be received.
   * @param sqrtPriceLimitX96 - The price limit for the swap.
   * @returns The CallContext object to be used with Multicall.
   */
  public quoteExactOutputSingleCallContext(
    tokenIn: string,
    tokenOut: string,
    fee: BigNumberish,
    amountOut: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
  ): MethodCall<UniswapQuoterV3Types.Contract, 'quoteExactOutputSingle'> {
    return this.prepareCallContext('quoteExactOutputSingle', [
      tokenIn,
      tokenOut,
      fee,
      amountOut,
      sqrtPriceLimitX96,
    ])
  }

  /**
   * Callback function for the Uniswap V3 swap.
   * @param amount0Delta - The amount delta of token0.
   * @param amount1Delta - The amount delta of token1.
   * @param path - The path of the swap.
   * @returns The callback result.
   */
  public async uniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    path: BytesLike,
  ): Promise<void> {
    return this.callContractMethod<void>('uniswapV3SwapCallback', [
      amount0Delta,
      amount1Delta,
      path,
    ])
  }

  /**
   * Returns the call context for the uniswapV3SwapCallback method.
   * @param amount0Delta - The amount delta of token0.
   * @param amount1Delta - The amount delta of token1.
   * @param path - The path of the swap.
   * @returns The call context.
   */
  public uniswapV3SwapCallbackCallContext(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    path: BytesLike,
  ): MethodCall<UniswapQuoterV3Types.Contract, 'uniswapV3SwapCallback'> {
    return this.prepareCallContext('uniswapV3SwapCallback', [
      amount0Delta,
      amount1Delta,
      path,
    ])
  }
}
