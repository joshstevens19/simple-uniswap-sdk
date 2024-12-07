import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  UniswapRouterV3Types,
  ContractDetailContext,
  DexMulticallProviderContext,
  ContractTransactionOverrides,
  ContractCallOverrides,
} from '@dex-toolkit/types'
import {
  assertChainId,
  assertDexConfigBase,
  assertDexType,
  assertProtocol,
  assertVersion,
  defaultRouterMethodMapV3,
  DexError,
  ErrorCodes,
  formatVersionForDisplay,
  getAddress,
  getDexConfig,
  getVersionTagFromVersion,
  isContractDetail,
  isContractDetailForDexType,
  isArrayOfBigNumberish,
  isArrayOfBytesLike,
} from '@dex-toolkit/utils'
import type {
  ContractContext,
  ContractContextOptions,
  DiscriminatedMethodCalls,
  ExecutionResult,
  MethodCall,
  MethodNames,
} from '@multicall-toolkit/types'
import type { BigNumberish, BytesLike, ContractTransaction } from 'ethers'

export class RouterContractV3
  extends DexProviderBase
  implements UniswapRouterV3Types.Contract
{
  protected _contract: UniswapRouterV3Types.ContractContext

  protected _methodNames: UniswapRouterV3Types.MethodNameMap

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

      const contractDetail = contractDetails.router
      if (!contractDetail) {
        throw new DexError(
          `Router configuration missing for ${dexType} V3 version ${formatVersionForDisplay(
            version,
          )}`,
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
      this.dexProvider.getContract<UniswapRouterV3Types.ContractContext>(
        this._contractDetail,
      )
    this._methodNames = {
      ...defaultRouterMethodMapV3,
      ...this._contractDetail.methods,
    }
  }

  /** Get the router contract */
  public get routerContract(): UniswapRouterV3Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapRouterV3Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapRouterV3Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapRouterV3Types.ContractContext

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
    methodName: UniswapRouterV3Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapRouterV3Types.MethodNames,
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
    TMethod extends keyof UniswapRouterV3Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapRouterV3Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapRouterV3Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapRouterV3Types.Contract, TMethod>
    } else {
      throw new DexError(
        `Method ${String(contractMethodName)} does not exist on the contract. Available methods are ${Object.keys(
          this._contract.functions,
        ).join(', ')}`,
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
      DiscriminatedMethodCalls<UniswapRouterV3Types.Contract>[MethodNames<UniswapRouterV3Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapRouterV3Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapRouterV3Types.Contract,
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
      DiscriminatedMethodCalls<UniswapRouterV3Types.Contract>[MethodNames<UniswapRouterV3Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapRouterV3Types.Contract, TCalls>> {
    return super.executeCall<UniswapRouterV3Types.Contract, TCalls>(
      calls,
      options,
    )
  }

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
    UniswapRouterV3Types.Contract,
    'WETH9'
  > {
    return this.prepareCallContext('WETH9', [])
  }

  /**
   * Approves the maximum token allowance.
   * @param token - The address of the token to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approveMax(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approveMax', [
      token,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving the maximum token allowance.
   * @param token - The address of the token to approve.
   * @returns The encoded function data.
   */
  public encodeApproveMax(token: string): string {
    return this.encodeFunctionData('approveMax', [token])
  }

  /**
   * Approves the maximum token allowance minus one.
   * @param token - The address of the token to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approveMaxMinusOne(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approveMaxMinusOne', [
      token,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving the maximum token allowance minus one.
   * @param token - The address of the token to approve.
   * @returns The encoded function data.
   */
  public encodeApproveMaxMinusOne(token: string): string {
    return this.encodeFunctionData('approveMaxMinusOne', [token])
  }

  /**
   * Approves zero tokens and then sets the maximum token allowance.
   * @param token - The address of the token to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approveZeroThenMax(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approveZeroThenMax', [
      token,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving zero tokens and then setting the maximum token allowance.
   * @param token - The address of the token to approve.
   * @returns The encoded function data.
   */
  public encodeApproveZeroThenMax(token: string): string {
    return this.encodeFunctionData('approveZeroThenMax', [token])
  }

  /**
   * Approves zero tokens and then sets the maximum token allowance minus one.
   * @param token - The address of the token to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approveZeroThenMaxMinusOne(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'approveZeroThenMaxMinusOne',
      [token, overrides],
    )
  }

  /**
   * Encodes the function data for approving zero tokens and then setting the maximum token allowance minus one.
   * @param token - The address of the token to approve.
   * @returns The encoded function data.
   */
  public encodeApproveZeroThenMaxMinusOne(token: string): string {
    return this.encodeFunctionData('approveZeroThenMaxMinusOne', [token])
  }

  /**
   * Calls the position manager with the provided data.
   * @param data - The data to pass to the position manager.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async callPositionManager(
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('callPositionManager', [
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for calling the position manager.
   * @param data - The data to pass to the position manager.
   * @returns The encoded function data.
   */
  public encodeCallPositionManager(data: BytesLike): string {
    return this.encodeFunctionData('callPositionManager', [data])
  }

  /**
   * Checks for oracle slippage with multiple paths.
   * @param paths - The array of paths to check.
   * @param amounts - The array of amounts corresponding to each path.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @param overrides - Optional call overrides.
   * @returns A promise that resolves when the check is complete.
   */
  public async checkOracleSlippage(
    paths: BytesLike[],
    amounts: BigNumberish[],
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<void>

  /**
   * Checks for oracle slippage with a single path.
   * @param path - The path to check.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @param overrides - Optional call overrides.
   * @returns A promise that resolves when the check is complete.
   */
  public async checkOracleSlippage(
    path: BytesLike,
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<void>

  public async checkOracleSlippage(
    arg1: BytesLike | BytesLike[],
    arg2: BigNumberish | BigNumberish[],
    arg3: BigNumberish,
    arg4?: BigNumberish | ContractCallOverrides,
    arg5?: ContractCallOverrides,
  ): Promise<void> {
    if (isArrayOfBytesLike(arg1) && isArrayOfBigNumberish(arg2)) {
      // Multiple paths overload
      const paths = arg1 as BytesLike[]
      const amounts = arg2 as BigNumberish[]
      const maximumTickDivergence = arg3 as BigNumberish
      const secondsAgo = arg4 as BigNumberish
      const overrides = arg5

      await this.callContractMethod<void>('checkOracleSlippage', [
        paths,
        amounts,
        maximumTickDivergence,
        secondsAgo,
        overrides,
      ])
    } else {
      // Single path overload
      const path = arg1 as BytesLike
      const maximumTickDivergence = arg2 as BigNumberish
      const secondsAgo = arg3 as BigNumberish
      const overrides = arg4 as ContractCallOverrides

      await this.callContractMethod<void>('checkOracleSlippage', [
        path,
        maximumTickDivergence,
        secondsAgo,
        overrides,
      ])
    }
  }

  /**
   * Encodes the function data for checking oracle slippage with multiple paths.
   * @param paths - The array of paths to check.
   * @param amounts - The array of amounts corresponding to each path.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @returns The encoded function data.
   */
  public encodeCheckOracleSlippage(
    paths: BytesLike[],
    amounts: BigNumberish[],
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
  ): string

  /**
   * Encodes the function data for checking oracle slippage with a single path.
   * @param path - The path to check.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @returns The encoded function data.
   */
  public encodeCheckOracleSlippage(
    path: BytesLike,
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
  ): string

  public encodeCheckOracleSlippage(
    arg1: BytesLike | BytesLike[],
    arg2: BigNumberish | BigNumberish[],
    arg3: BigNumberish,
    arg4?: any,
  ): string {
    if (isArrayOfBytesLike(arg1) && isArrayOfBigNumberish(arg2)) {
      // Multiple paths encode
      const paths = arg1 as BytesLike[]
      const amounts = arg2 as BigNumberish[]
      const maximumTickDivergence = arg3 as BigNumberish
      const secondsAgo = arg4 // Not used in encoding for multiple paths

      return this.encodeFunctionData('checkOracleSlippage', [
        paths,
        amounts,
        maximumTickDivergence,
        secondsAgo,
      ])
    } else {
      // Single path encode
      const path = arg1 as BytesLike
      const maximumTickDivergence = arg2 as BigNumberish
      const secondsAgo = arg3 as BigNumberish

      return this.encodeFunctionData('checkOracleSlippage', [
        path,
        maximumTickDivergence,
        secondsAgo,
      ])
    }
  }

  /**
   * Checks for oracle slippage with a single path.
   * @param path - The path to check.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @param overrides - Optional call overrides.
   * @returns A promise that resolves when the check is complete.
   */
  public async checkOracleSlippageSingle(
    path: BytesLike,
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<void> {
    return this.callContractMethod<void>('checkOracleSlippage', [
      path,
      maximumTickDivergence,
      secondsAgo,
      overrides,
    ])
  }

  /**
   * Encodes the function data for checking oracle slippage with a single path.
   * @param path - The path to check.
   * @param maximumTickDivergence - The maximum allowed tick divergence.
   * @param secondsAgo - The number of seconds ago to consider for the oracle data.
   * @returns The encoded function data.
   */
  public encodeCheckOracleSlippageSingle(
    path: BytesLike,
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
  ): string {
    return this.encodeFunctionData('checkOracleSlippage', [
      path,
      maximumTickDivergence,
      secondsAgo,
    ])
  }

  /**
   * Executes an exact input swap.
   * @param params - The swap parameters.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async exactInput(
    params: UniswapRouterV3Types.ExactInputParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('exactInput', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for an exact input swap.
   * @param params - The swap parameters.
   * @returns The encoded function data.
   */
  public encodeExactInput(
    params: UniswapRouterV3Types.ExactInputParamsRequest,
  ): string {
    return this.encodeFunctionData('exactInput', [params])
  }

  /**
   * Executes an exact input single swap.
   * @param params - The swap parameters.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async exactInputSingle(
    params: UniswapRouterV3Types.ExactInputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('exactInputSingle', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for an exact input single swap.
   * @param params - The swap parameters.
   * @returns The encoded function data.
   */
  public encodeExactInputSingle(
    params: UniswapRouterV3Types.ExactInputSingleParamsRequest,
  ): string {
    return this.encodeFunctionData('exactInputSingle', [params])
  }

  /**
   * Executes an exact output swap.
   * @param params - The swap parameters.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async exactOutput(
    params: UniswapRouterV3Types.ExactOutputParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('exactOutput', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for an exact output swap.
   * @param params - The swap parameters.
   * @returns The encoded function data.
   */
  public encodeExactOutput(
    params: UniswapRouterV3Types.ExactOutputParamsRequest,
  ): string {
    return this.encodeFunctionData('exactOutput', [params])
  }

  /**
   * Executes an exact output single swap.
   * @param params - The swap parameters.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async exactOutputSingle(
    params: UniswapRouterV3Types.ExactOutputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('exactOutputSingle', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for an exact output single swap.
   * @param params - The swap parameters.
   * @returns The encoded function data.
   */
  public encodeExactOutputSingle(
    params: UniswapRouterV3Types.ExactOutputSingleParamsRequest,
  ): string {
    return this.encodeFunctionData('exactOutputSingle', [params])
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
    UniswapRouterV3Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Returns the V2 factory address.
   * @returns The V2 factory address.
   */
  public async factoryV2(): Promise<string> {
    return this.callContractMethod<string>('factoryV2', [])
  }

  /**
   * Returns the call context for the factoryV2 method.
   * @returns The call context.
   */
  public factoryV2CallContext(): MethodCall<
    UniswapRouterV3Types.Contract,
    'factoryV2'
  > {
    return this.prepareCallContext('factoryV2', [])
  }

  /**
   * Gets the approval type for a token and amount.
   * @param token - The address of the token.
   * @param amount - The amount to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async getApprovalType(
    token: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('getApprovalType', [
      token,
      amount,
      overrides,
    ])
  }

  /**
   * Encodes the function data for getting the approval type.
   * @param token - The address of the token.
   * @param amount - The amount to approve.
   * @returns The encoded function data.
   */
  public encodeGetApprovalType(token: string, amount: BigNumberish): string {
    return this.encodeFunctionData('getApprovalType', [token, amount])
  }

  /**
   * Increases liquidity for a specific position.
   * @param params - The parameters for increasing liquidity.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async increaseLiquidity(
    params: UniswapRouterV3Types.IncreaseLiquidityParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('increaseLiquidity', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for increasing liquidity.
   * @param params - The parameters for increasing liquidity.
   * @returns The encoded function data.
   */
  public encodeIncreaseLiquidity(
    params: UniswapRouterV3Types.IncreaseLiquidityParamsRequest,
  ): string {
    return this.encodeFunctionData('increaseLiquidity', [params])
  }

  /**
   * Mints a new position.
   * @param params - The parameters for minting.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async mint(
    params: UniswapRouterV3Types.MintParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('mint', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for minting a new position.
   * @param params - The parameters for minting.
   * @returns The encoded function data.
   */
  public encodeMint(params: UniswapRouterV3Types.MintParamsRequest): string {
    return this.encodeFunctionData('mint', [params])
  }

  /**
   * Executes a multicall with an array of calldata.
   * @param data - An array of calldata.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async multicall(
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Executes a multicall with a deadline and an array of calldata.
   * @param deadline - The deadline for the multicall.
   * @param data - An array of calldata.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async multicall(
    deadline: BigNumberish,
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Executes a multicall with a previous blockhash and an array of calldata.
   * @param previousBlockhash - The previous blockhash for the multicall.
   * @param data - An array of calldata.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async multicall(
    previousBlockhash: BytesLike,
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async multicall(
    arg1: BytesLike | BytesLike[] | BigNumberish,
    arg2?: BytesLike[] | ContractTransactionOverrides,
    arg3?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (isArrayOfBytesLike(arg1)) {
      return this.callContractMethod<ContractTransaction>('multicall', [
        arg1,
        arg2,
      ])
    }

    return this.callContractMethod<ContractTransaction>('multicall', [
      arg1,
      arg2,
      arg3,
    ])
  }

  /**
   * Encodes the function data for a multicall.
   * @param data - An array of calldata.
   * @returns The encoded function data.
   */
  public encodeMulticall(data: BytesLike[]): string

  /**
   * Encodes the function data for a multicall with a deadline.
   * @param deadline - The deadline for the multicall.
   * @param data - An array of calldata.
   * @returns The encoded function data.
   */
  public encodeMulticall(deadline: BigNumberish, data: BytesLike[]): string

  /**
   * Encodes the function data for a multicall with a previous blockhash.
   * @param previousBlockhash - The previous blockhash for the multicall.
   * @param data - An array of calldata.
   * @returns The encoded function data.
   */
  public encodeMulticall(
    previousBlockhash: BytesLike,
    data: BytesLike[],
  ): string

  public encodeMulticall(
    arg1: BytesLike | BytesLike[] | BigNumberish,
    arg2?: BytesLike[],
  ): string {
    if (isArrayOfBytesLike(arg1)) {
      return this.encodeFunctionData('multicall', [arg1])
    }

    return this.encodeFunctionData('multicall', [arg1, arg2])
  }

  /**
   * Returns the position manager address.
   * @returns The position manager address.
   */
  public async positionManager(): Promise<string> {
    return this.callContractMethod<string>('positionManager', [])
  }

  /**
   * Returns the call context for the positionManager method.
   * @returns The call context.
   */
  public positionManagerCallContext(): MethodCall<
    UniswapRouterV3Types.Contract,
    'positionManager'
  > {
    return this.prepareCallContext('positionManager', [])
  }

  /**
   * Pulls tokens from the contract.
   * @param token - The address of the token to pull.
   * @param value - The amount of tokens to pull.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async pull(
    token: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('pull', [
      token,
      value,
      overrides,
    ])
  }

  /**
   * Encodes the function data for pulling tokens from the contract.
   * @param token - The address of the token to pull.
   * @param value - The amount of tokens to pull.
   * @returns The encoded function data.
   */
  public encodePull(token: string, value: BigNumberish): string {
    return this.encodeFunctionData('pull', [token, value])
  }

  /**
   * Refunds any excess ETH sent in a transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async refundETH(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('refundETH', [
      overrides,
    ])
  }

  /**
   * Encodes the function data to refund any excess ETH sent in a transaction.
   * @returns The encoded function data.
   */
  public encodeRefundETH(): string {
    return this.encodeFunctionData('refundETH')
  }

  /**
   * Permits a token transfer on behalf of the user.
   * @param token - The address of the token.
   * @param value - The amount of tokens to permit.
   * @param deadline - The deadline for the permit.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async selfPermit(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('selfPermit', [
      token,
      value,
      deadline,
      v,
      r,
      s,
      overrides,
    ])
  }

  /**
   * Encodes the function data to permit a token transfer on behalf of the user.
   * @param token - The address of the token.
   * @param value - The amount of tokens to permit.
   * @param deadline - The deadline for the permit.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeSelfPermit(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('selfPermit', [
      token,
      value,
      deadline,
      v,
      r,
      s,
    ])
  }

  /**
   * Permits a token transfer on behalf of the user, using nonce and expiry.
   * @param token - The address of the token.
   * @param nonce - The permit nonce.
   * @param expiry - The expiry time.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async selfPermitAllowed(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('selfPermitAllowed', [
      token,
      nonce,
      expiry,
      v,
      r,
      s,
      overrides,
    ])
  }

  /**
   * Encodes the function data to permit a token transfer on behalf of the user, using nonce and expiry.
   * @param token - The address of the token.
   * @param nonce - The permit nonce.
   * @param expiry - The expiry time.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeSelfPermitAllowed(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('selfPermitAllowed', [
      token,
      nonce,
      expiry,
      v,
      r,
      s,
    ])
  }

  /**
   * Permits a token transfer on behalf of the user, if necessary.
   * @param token - The address of the token.
   * @param value - The amount of tokens to permit.
   * @param deadline - The deadline for the permit.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async selfPermitIfNecessary(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'selfPermitIfNecessary',
      [token, value, deadline, v, r, s, overrides],
    )
  }

  /**
   * Encodes the function data to permit a token transfer on behalf of the user, if necessary.
   * @param token - The address of the token.
   * @param value - The amount of tokens to permit.
   * @param deadline - The deadline for the permit.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeSelfPermitIfNecessary(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('selfPermitIfNecessary', [
      token,
      value,
      deadline,
      v,
      r,
      s,
    ])
  }

  /**
   * Permits a token transfer on behalf of the user, if necessary, using nonce and expiry.
   * @param token - The address of the token.
   * @param nonce - The permit nonce.
   * @param expiry - The expiry time.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async selfPermitAllowedIfNecessary(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'selfPermitAllowedIfNecessary',
      [token, nonce, expiry, v, r, s, overrides],
    )
  }

  /**
   * Encodes the function data to permit a token transfer on behalf of the user, if necessary, using nonce and expiry.
   * @param token - The address of the token.
   * @param nonce - The permit nonce.
   * @param expiry - The expiry time.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeSelfPermitAllowedIfNecessary(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('selfPermitAllowedIfNecessary', [
      token,
      nonce,
      expiry,
      v,
      r,
      s,
    ])
  }

  /**
   * Executes a token swap with exact input tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of the swap.
   * @param to - The recipient address.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactTokensForTokens',
      [amountIn, amountOutMin, path, to, overrides],
    )
  }

  /**
   * Encodes the function data for swapping exact input tokens for output tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of the swap.
   * @param to - The recipient address.
   * @returns The encoded function data.
   */
  public encodeSwapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
  ): string {
    return this.encodeFunctionData('swapExactTokensForTokens', [
      amountIn,
      amountOutMin,
      path,
      to,
    ])
  }

  /**
   * Executes a token swap for exact output tokens.
   * @param amountOut - The desired amount of output tokens.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of the swap.
   * @param to - The recipient address.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapTokensForExactTokens',
      [amountOut, amountInMax, path, to, overrides],
    )
  }

  /**
   * Encodes the function data for swapping tokens for exact output tokens.
   * @param amountOut - The desired amount of output tokens.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of the swap.
   * @param to - The recipient address.
   * @returns The encoded function data.
   */
  public encodeSwapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
  ): string {
    return this.encodeFunctionData('swapTokensForExactTokens', [
      amountOut,
      amountInMax,
      path,
      to,
    ])
  }

  /**
   * Sweeps the specified token to the recipient's address.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Sweeps the specified token to the recipient's address.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param recipient - The address to receive the tokens.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipientOrOverrides?: string | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (typeof recipientOrOverrides === 'string') {
      return this.callContractMethod<ContractTransaction>('sweepToken', [
        token,
        amountMinimum,
        recipientOrOverrides,
        overrides,
      ])
    }

    return this.callContractMethod<ContractTransaction>('sweepToken', [
      token,
      amountMinimum,
      overrides,
    ])
  }

  /**
   * Encodes the function data to sweep the specified token to the recipient's address.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param recipientOrOverrides - The address to receive the tokens.
   * @returns The encoded function data.
   */
  public encodeSweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipientOrOverrides?: string | ContractTransactionOverrides,
  ): string {
    if (typeof recipientOrOverrides === 'string') {
      return this.encodeFunctionData('sweepToken', [
        token,
        amountMinimum,
        recipientOrOverrides,
      ])
    }

    return this.encodeFunctionData('sweepToken', [token, amountMinimum])
  }

  /**
   * Sweeps the specified token to the recipient's address with a fee.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Sweeps the specified token to the recipient's address with a fee.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param recipient - The address to receive the tokens.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async sweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    feeBipsOrRecipient: string | BigNumberish,
    feeRecipientOrFeeBips: string | BigNumberish,
    overridesOrFeeRecipient?: string | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (typeof feeBipsOrRecipient === 'string') {
      return this.callContractMethod<ContractTransaction>('sweepTokenWithFee', [
        token,
        amountMinimum,
        feeBipsOrRecipient,
        feeRecipientOrFeeBips,
        overridesOrFeeRecipient,
        overrides,
      ])
    }

    return this.callContractMethod<ContractTransaction>('sweepTokenWithFee', [
      token,
      amountMinimum,
      feeBipsOrRecipient,
      feeRecipientOrFeeBips,
      overrides,
    ])
  }

  /**
   * Encodes the function data to sweep the specified token to the recipient's address with a fee.
   * @param token - The address of the token.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param feeBipsOrRecipient -  The fee in basis points, or the address to receive the tokens.
   * @param feeRecipientOrFeeBips - The address to receive the fee, or the fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @returns The encoded function data.
   */
  public encodeSweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    feeBipsOrRecipient: string | BigNumberish,
    feeRecipientOrFeeBips: string | BigNumberish,
    feeRecipient?: string | ContractTransactionOverrides,
  ): string {
    if (typeof feeBipsOrRecipient === 'string') {
      return this.encodeFunctionData('sweepTokenWithFee', [
        token,
        amountMinimum,
        feeBipsOrRecipient,
        feeRecipientOrFeeBips,
        feeRecipient,
      ])
    }

    return this.encodeFunctionData('sweepTokenWithFee', [
      token,
      amountMinimum,
      feeBipsOrRecipient,
      feeRecipientOrFeeBips,
    ])
  }

  /**
   * Unwraps WETH9 and sends ETH to the recipient's address.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async unwrapWETH9(
    amountMinimum: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Unwraps WETH9 and sends ETH to the recipient's address.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address to receive the ETH.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async unwrapWETH9(
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async unwrapWETH9(
    amountMinimum: BigNumberish,
    overridesOrRecipient?: string | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (typeof overridesOrRecipient === 'string') {
      return this.callContractMethod<ContractTransaction>('unwrapWETH9', [
        amountMinimum,
        overridesOrRecipient,
        overrides,
      ])
    }

    return this.callContractMethod<ContractTransaction>('unwrapWETH9', [
      amountMinimum,
      overridesOrRecipient,
    ])
  }

  /**
   * Encodes the function data to unwrap WETH9 and send ETH to the recipient's address.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address to receive the ETH.
   * @returns The encoded function data.
   */
  public encodeUnwrapWETH9(
    amountMinimum: BigNumberish,
    recipient?: string,
  ): string {
    if (recipient) {
      return this.encodeFunctionData('unwrapWETH9', [amountMinimum, recipient])
    }

    return this.encodeFunctionData('unwrapWETH9', [amountMinimum])
  }

  /**
   * Unwraps WETH9 and sends ETH to the recipient's address with a fee.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async unwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Unwraps WETH9 and sends ETH to the recipient's address with a fee.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address to receive the ETH.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async unwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async unwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    feeBipsOrRecipient: string | BigNumberish,
    feeRecipientOrFeeBips: string | BigNumberish,
    overridesOrFeeRecipient?: string | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (typeof feeRecipientOrFeeBips === 'string') {
      return this.callContractMethod<ContractTransaction>('unwrapWETH9', [
        amountMinimum,
        feeBipsOrRecipient,
        feeRecipientOrFeeBips,
        overridesOrFeeRecipient,
      ])
    }

    return this.callContractMethod<ContractTransaction>('unwrapWETH9WithFee', [
      amountMinimum,
      feeBipsOrRecipient,
      feeRecipientOrFeeBips,
      overridesOrFeeRecipient,
      overrides,
    ])
  }

  /**
   * Encodes the function data to unwrap WETH9 and send ETH to the recipient's address with a fee.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @returns The contract transaction.
   */
  public encodeUnwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
  ): string

  /**
   * Encodes the function data to unwrap WETH9 and send ETH to the recipient's address with a fee.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address to receive the ETH.
   * @param feeBips - The fee in basis points.
   * @param feeRecipient - The address to receive the fee.
   * @returns The contract transaction.
   */
  public encodeUnwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
  ): string

  public encodeUnwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    feeBipsOrRecipient: string | BigNumberish,
    feeRecipientOrFeeBips: string | BigNumberish,
    feeRecipient?: string,
  ): string {
    if (typeof feeBipsOrRecipient === 'string') {
      return this.encodeFunctionData('unwrapWETH9WithFee', [
        amountMinimum,
        feeBipsOrRecipient,
        feeRecipientOrFeeBips,
        feeRecipient,
      ])
    }

    return this.encodeFunctionData('unwrapWETH9WithFee', [
      amountMinimum,
      feeBipsOrRecipient,
      feeRecipientOrFeeBips,
    ])
  }

  /**
   * Callback function for Uniswap V3 swaps.
   * @param amount0Delta - The change in amount0.
   * @param amount1Delta - The change in amount1.
   * @param _data - The swap data.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async uniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    _data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'uniswapV3SwapCallback',
      [amount0Delta, amount1Delta, _data, overrides],
    )
  }

  /**
   * Encodes the function data for the Uniswap V3 swap callback.
   * @param amount0Delta - The change in amount0.
   * @param amount1Delta - The change in amount1.
   * @param _data - The swap data.
   * @returns The encoded function data.
   */
  public encodeUniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    _data: BytesLike,
  ): string {
    return this.encodeFunctionData('uniswapV3SwapCallback', [
      amount0Delta,
      amount1Delta,
      _data,
    ])
  }

  /**
   * Wraps ETH into WETH9.
   * @param value - The amount of ETH to wrap.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async wrapETH(
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('wrapETH', [
      value,
      overrides,
    ])
  }

  /**
   * Encodes the function data to wrap ETH into WETH9.
   * @param value - The amount of ETH to wrap.
   * @returns The encoded function data.
   */
  public encodeWrapETH(value: BigNumberish): string {
    return this.encodeFunctionData('wrapETH', [value])
  }
}
