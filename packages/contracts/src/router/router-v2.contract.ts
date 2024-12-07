import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  ContractDetailContext,
  ContractTransactionOverrides,
  DexMulticallProviderContext,
  UniswapRouterV2Types,
} from '@dex-toolkit/types'
import {
  assertChainId,
  assertDexConfigBase,
  assertDexType,
  assertProtocol,
  assertVersion,
  defaultRouterMethodMapV2,
  DexError,
  ErrorCodes,
  formatVersionForDisplay,
  getAddress,
  getDexConfig,
  getVersionTagFromVersion,
  isContractDetail,
  isContractDetailForDexType,
} from '@dex-toolkit/utils'
import type {
  ContractContext,
  ContractContextOptions,
  DiscriminatedMethodCalls,
  ExecutionResult,
  MethodCall,
  MethodNames,
} from '@ethereum-multicall/types'
import {
  BigNumber,
  type BigNumberish,
  type ContractTransaction,
  type BytesLike,
} from 'ethers'

export class RouterContractV2
  extends DexProviderBase
  implements UniswapRouterV2Types.Contract
{
  protected _contract: UniswapRouterV2Types.ContractContext

  protected _methodNames: UniswapRouterV2Types.MethodNameMap

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
          `Version ${formatVersionForDisplay(version)} not supported for ${dexType} V2`,
          ErrorCodes.versionNotSupported,
        )
      }

      const contractDetail = contractDetails.router
      if (!contractDetail) {
        throw new DexError(
          `Router configuration missing for ${dexType} V2 version ${formatVersionForDisplay(version)}`,
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
      this.dexProvider.getContract<UniswapRouterV2Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultRouterMethodMapV2,
      ...this._contractDetail.methods,
    }
  }

  /** Get the router contract */
  public get routerContract(): UniswapRouterV2Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapRouterV2Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapRouterV2Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapRouterV2Types.ContractContext

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
    methodName: UniswapRouterV2Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapRouterV2Types.MethodNames,
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
    TMethod extends keyof UniswapRouterV2Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapRouterV2Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapRouterV2Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapRouterV2Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<UniswapRouterV2Types.Contract>[MethodNames<UniswapRouterV2Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapRouterV2Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapRouterV2Types.Contract,
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
      DiscriminatedMethodCalls<UniswapRouterV2Types.Contract>[MethodNames<UniswapRouterV2Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapRouterV2Types.Contract, TCalls>> {
    return super.executeCall<UniswapRouterV2Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  /**
   * Returns the WETH address.
   * @returns The WETH address.
   */
  public async WETH(): Promise<string> {
    return this.callContractMethod<string>('WETH', [])
  }

  /**
   * Returns the call context for the WETH method.
   * @returns The call context.
   */
  public WETHCallContext(): MethodCall<UniswapRouterV2Types.Contract, 'WETH'> {
    return this.prepareCallContext('WETH', [])
  }

  /**
   * Adds liquidity to a token pair.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param amountADesired - The desired amount of token A.
   * @param amountBDesired - The desired amount of token B.
   * @param amountAMin - The minimum amount of token A.
   * @param amountBMin - The minimum amount of token B.
   * @param to - The address to receive the liquidity tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('addLiquidity', [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline,
      overrides,
    ])
  }

  /**
   * Encodes the function data to add liquidity to a token pair.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param amountADesired - The desired amount of token A.
   * @param amountBDesired - The desired amount of token B.
   * @param amountAMin - The minimum amount of token A.
   * @param amountBMin - The minimum amount of token B.
   * @param to - The address to receive the liquidity tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeAddLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('addLiquidity', [
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline,
    ])
  }

  /**
   * Adds liquidity to a token-ETH pair.
   * @param token - The address of the token.
   * @param amountTokenDesired - The desired amount of the token.
   * @param amountTokenMin - The minimum amount of the token.
   * @param amountETHMin - The minimum amount of ETH.
   * @param to - The address to receive the liquidity tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async addLiquidityETH(
    token: string,
    amountTokenDesired: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('addLiquidityETH', [
      token,
      amountTokenDesired,
      amountTokenMin,
      amountETHMin,
      to,
      deadline,
      overrides,
    ])
  }

  /**
   * Encodes the function data to add liquidity to a token-ETH pair.
   * @param token - The address of the token.
   * @param amountTokenDesired - The desired amount of the token.
   * @param amountTokenMin - The minimum amount of the token.
   * @param amountETHMin - The minimum amount of ETH.
   * @param to - The address to receive the liquidity tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeAddLiquidityETH(
    token: string,
    amountTokenDesired: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('addLiquidityETH', [
      token,
      amountTokenDesired,
      amountTokenMin,
      amountETHMin,
      to,
      deadline,
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
   * Returns the call context for the factory method.
   * @returns The call context.
   */
  public factoryCallContext(): MethodCall<
    UniswapRouterV2Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Returns the amount of input tokens required to obtain a specific output amount, based on reserves.
   * @param amountOut - The amount of output tokens desired.
   * @param reserveIn - The reserve of the input token.
   * @param reserveOut - The reserve of the output token.
   * @returns The required input amount.
   */
  public async getAmountIn(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('getAmountIn', [
      amountOut,
      reserveIn,
      reserveOut,
    ])
  }

  /**
   * Returns the call context for the getAmountIn method.
   * @param amountOut - The amount of output tokens desired.
   * @param reserveIn - The reserve of the input token.
   * @param reserveOut - The reserve of the output token.
   * @returns The call context.
   */
  public getAmountInCallContext(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
  ): MethodCall<UniswapRouterV2Types.Contract, 'getAmountIn'> {
    return this.prepareCallContext('getAmountIn', [
      amountOut,
      reserveIn,
      reserveOut,
    ])
  }

  /**
   * Returns the amount of output tokens obtained for a specific input amount, based on reserves.
   * @param amountIn - The amount of input tokens provided.
   * @param reserveIn - The reserve of the input token.
   * @param reserveOut - The reserve of the output token.
   * @returns The output amount obtained.
   */
  public async getAmountOut(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('getAmountOut', [
      amountIn,
      reserveIn,
      reserveOut,
    ])
  }

  /**
   * Returns the call context for the getAmountOut method.
   * @param amountIn - The amount of input tokens provided.
   * @param reserveIn - The reserve of the input token.
   * @param reserveOut - The reserve of the output token.
   * @returns The call context.
   */
  public getAmountOutCallContext(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
  ): MethodCall<UniswapRouterV2Types.Contract, 'getAmountOut'> {
    return this.prepareCallContext('getAmountOut', [
      amountIn,
      reserveIn,
      reserveOut,
    ])
  }

  /**
   * Returns the input amounts for each token in a path to obtain a specific output amount.
   * @param amountOut - The amount of output tokens desired.
   * @param path - The path of token addresses.
   * @returns An array of input amounts for each token in the path.
   */
  public async getAmountsIn(
    amountOut: BigNumberish,
    path: string[],
  ): Promise<BigNumber[]> {
    return this.callContractMethod<BigNumber[]>('getAmountsIn', [
      amountOut,
      path,
    ])
  }

  /**
   * Returns the call context for the getAmountsIn method.
   * @param amountOut - The amount of output tokens desired.
   * @param path - The path of token addresses.
   * @returns The call context.
   */
  public getAmountsInCallContext(
    amountOut: BigNumberish,
    path: string[],
  ): MethodCall<UniswapRouterV2Types.Contract, 'getAmountsIn'> {
    return this.prepareCallContext('getAmountsIn', [amountOut, path])
  }

  /**
   * Returns the output amounts for each token in a path for a specific input amount.
   * @param amountIn - The amount of input tokens provided.
   * @param path - The path of token addresses.
   * @returns An array of output amounts for each token in the path.
   */
  public async getAmountsOut(
    amountIn: BigNumberish,
    path: string[],
  ): Promise<BigNumber[]> {
    return this.callContractMethod<BigNumber[]>('getAmountsOut', [
      amountIn,
      path,
    ])
  }

  /**
   * Returns the call context for the getAmountsOut method.
   * @param amountIn - The amount of input tokens provided.
   * @param path - The path of token addresses.
   * @returns The call context.
   */
  public getAmountsOutCallContext(
    amountIn: BigNumberish,
    path: string[],
  ): MethodCall<UniswapRouterV2Types.Contract, 'getAmountsOut'> {
    return this.prepareCallContext('getAmountsOut', [amountIn, path])
  }

  /**
   * Returns the amount of token A required to obtain a specific amount of token B, based on reserves.
   * @param amountA - The amount of token A.
   * @param reserveA - The reserve of token A.
   * @param reserveB - The reserve of token B.
   * @returns The equivalent amount of token B.
   */
  public async quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('quote', [
      amountA,
      reserveA,
      reserveB,
    ])
  }

  /**
   * Returns the call context for the quote method.
   * @param amountA - The amount of token A.
   * @param reserveA - The reserve of token A.
   * @param reserveB - The reserve of token B.
   * @returns The call context.
   */
  public quoteCallContext(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
  ): MethodCall<UniswapRouterV2Types.Contract, 'quote'> {
    return this.prepareCallContext('quote', [amountA, reserveA, reserveB])
  }

  /**
   * Removes liquidity from a token pair.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountAMin - The minimum amount of token A to receive.
   * @param amountBMin - The minimum amount of token B to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('removeLiquidity', [
      tokenA,
      tokenB,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline,
      overrides,
    ])
  }

  /**
   * Encodes the function data to remove liquidity from a token pair.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountAMin - The minimum amount of token A to receive.
   * @param amountBMin - The minimum amount of token B to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('removeLiquidity', [
      tokenA,
      tokenB,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline,
    ])
  }

  /**
   * Removes liquidity from a token-ETH pair.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('removeLiquidityETH', [
      token,
      liquidity,
      amountTokenMin,
      amountETHMin,
      to,
      deadline,
      overrides,
    ])
  }

  /**
   * Encodes the function data to remove liquidity from a token-ETH pair.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('removeLiquidityETH', [
      token,
      liquidity,
      amountTokenMin,
      amountETHMin,
      to,
      deadline,
    ])
  }

  /**
   * Removes liquidity from a token-ETH pair, supporting fee-on-transfer tokens.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidityETHSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'removeLiquidityETHSupportingFeeOnTransferTokens',
      [token, liquidity, amountTokenMin, amountETHMin, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to remove liquidity from a token-ETH pair, supporting fee-on-transfer tokens.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidityETHSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData(
      'removeLiquidityETHSupportingFeeOnTransferTokens',
      [token, liquidity, amountTokenMin, amountETHMin, to, deadline],
    )
  }

  /**
   * Removes liquidity from a token-ETH pair with a permit.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidityETHWithPermit(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'removeLiquidityETHWithPermit',
      [
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
        overrides,
      ],
    )
  }

  /**
   * Encodes the function data to remove liquidity from a token-ETH pair with a permit.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidityETHWithPermit(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('removeLiquidityETHWithPermit', [
      token,
      liquidity,
      amountTokenMin,
      amountETHMin,
      to,
      deadline,
      approveMax,
      v,
      r,
      s,
    ])
  }

  /**
   * Removes liquidity from a token-ETH pair with a permit, supporting fee-on-transfer tokens.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      [
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
        overrides,
      ],
    )
  }

  /**
   * Encodes the function data to remove liquidity from a token-ETH pair with a permit, supporting fee-on-transfer tokens.
   * @param token - The address of the token.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountTokenMin - The minimum amount of the token to receive.
   * @param amountETHMin - The minimum amount of ETH to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData(
      'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      [
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
      ],
    )
  }

  /**
   * Removes liquidity from a token pair with a permit.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountAMin - The minimum amount of token A to receive.
   * @param amountBMin - The minimum amount of token B to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async removeLiquidityWithPermit(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'removeLiquidityWithPermit',
      [
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
        overrides,
      ],
    )
  }

  /**
   * Encodes the function data to remove liquidity from a token pair with a permit.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param liquidity - The amount of liquidity to remove.
   * @param amountAMin - The minimum amount of token A to receive.
   * @param amountBMin - The minimum amount of token B to receive.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param approveMax - Whether to approve the maximum amount.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodeRemoveLiquidityWithPermit(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('removeLiquidityWithPermit', [
      tokenA,
      tokenB,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline,
      approveMax,
      v,
      r,
      s,
    ])
  }

  /**
   * Swaps ETH for exact tokens.
   * @param amountOut - The amount of output tokens desired.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapETHForExactTokens(
    amountOut: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapETHForExactTokens',
      [amountOut, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap ETH for exact tokens.
   * @param amountOut - The amount of output tokens desired.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapETHForExactTokens(
    amountOut: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapETHForExactTokens', [
      amountOut,
      path,
      to,
      deadline,
    ])
  }

  /**
   * Swaps exact ETH for tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactETHForTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactETHForTokens',
      [amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact ETH for tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactETHForTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapExactETHForTokens', [
      amountOutMin,
      path,
      to,
      deadline,
    ])
  }

  /**
   * Swaps exact ETH for tokens, supporting fee-on-transfer tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactETHForTokensSupportingFeeOnTransferTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactETHForTokensSupportingFeeOnTransferTokens',
      [amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact ETH for tokens, supporting fee-on-transfer tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactETHForTokensSupportingFeeOnTransferTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData(
      'swapExactETHForTokensSupportingFeeOnTransferTokens',
      [amountOutMin, path, to, deadline],
    )
  }

  /**
   * Swaps exact tokens for ETH.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output ETH.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactTokensForETH(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactTokensForETH',
      [amountIn, amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact tokens for ETH.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output ETH.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactTokensForETH(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapExactTokensForETH', [
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
    ])
  }

  /**
   * Swaps exact tokens for ETH, supporting fee-on-transfer tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output ETH.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactTokensForETHSupportingFeeOnTransferTokens',
      [amountIn, amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact tokens for ETH, supporting fee-on-transfer tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output ETH.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData(
      'swapExactTokensForETHSupportingFeeOnTransferTokens',
      [amountIn, amountOutMin, path, to, deadline],
    )
  }

  /**
   * Swaps exact tokens for tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactTokensForTokens',
      [amountIn, amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact tokens for tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapExactTokensForTokens', [
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
    ])
  }

  /**
   * Swaps exact tokens for tokens, supporting fee-on-transfer tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      [amountIn, amountOutMin, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap exact tokens for tokens, supporting fee-on-transfer tokens.
   * @param amountIn - The amount of input tokens.
   * @param amountOutMin - The minimum amount of output tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData(
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      [amountIn, amountOutMin, path, to, deadline],
    )
  }

  /**
   * Swaps tokens for exact ETH.
   * @param amountOut - The amount of ETH desired.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapTokensForExactETH(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapTokensForExactETH',
      [amountOut, amountInMax, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap tokens for exact ETH.
   * @param amountOut - The amount of ETH desired.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the ETH.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapTokensForExactETH(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapTokensForExactETH', [
      amountOut,
      amountInMax,
      path,
      to,
      deadline,
    ])
  }

  /**
   * Swaps tokens for exact tokens.
   * @param amountOut - The amount of output tokens desired.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'swapTokensForExactTokens',
      [amountOut, amountInMax, path, to, deadline, overrides],
    )
  }

  /**
   * Encodes the function data to swap tokens for exact tokens.
   * @param amountOut - The amount of output tokens desired.
   * @param amountInMax - The maximum amount of input tokens.
   * @param path - The path of token addresses.
   * @param to - The address to receive the output tokens.
   * @param deadline - The deadline for the transaction.
   * @returns The encoded function data.
   */
  public encodeSwapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
  ): string {
    return this.encodeFunctionData('swapTokensForExactTokens', [
      amountOut,
      amountInMax,
      path,
      to,
      deadline,
    ])
  }
}
