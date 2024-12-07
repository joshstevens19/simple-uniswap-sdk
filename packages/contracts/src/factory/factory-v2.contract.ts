import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  ContractDetailContext,
  UniswapFactoryV2Types,
  DexMulticallProviderContext,
  ContractTransactionOverrides,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  getDexConfig,
  isContractDetail,
  isContractDetailForDexType,
  defaultFactoryMethodMapV2,
  getVersionTagFromVersion,
  formatVersionForDisplay,
  assertProtocol,
  assertVersion,
  assertDexType,
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
import type { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

export class FactoryContractV2
  extends DexProviderBase
  implements UniswapFactoryV2Types.Contract
{
  protected _contract: UniswapFactoryV2Types.ContractContext

  protected _methodNames: UniswapFactoryV2Types.MethodNameMap

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

      if (!chainId) {
        throw new DexError(
          'ChainId is required in contract detail context',
          ErrorCodes.functionArgumentError,
        )
      }

      assertVersion(version)

      const dexConfig = getDexConfig({ dexType, chainId })
      if (!dexConfig) {
        throw new DexError(
          `DEX config not found for dexType ${dexType} and chainId ${chainId}`,
          ErrorCodes.dexConfigNotFound,
        )
      }

      const protocol = dexConfig.protocols.protocolV2
      assertProtocol(protocol)

      const contractDetails = protocol[getVersionTagFromVersion(version)]
      if (!contractDetails) {
        throw new DexError(
          `Version ${formatVersionForDisplay(version)} not supported for ${dexType} V2`,
          ErrorCodes.versionNotSupported,
        )
      }

      const contractDetail = contractDetails.factory
      if (!contractDetail) {
        throw new DexError(
          `Factory configuration missing for ${dexType} V2 version ${formatVersionForDisplay(version)}`,
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
      this.dexProvider.getContract<UniswapFactoryV2Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultFactoryMethodMapV2,
      ...this._contractDetail.methods,
    }
  }

  /** Get the factory contract */
  public get factoryContract(): UniswapFactoryV2Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapFactoryV2Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapFactoryV2Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapFactoryV2Types.ContractContext

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
    methodName: UniswapFactoryV2Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapFactoryV2Types.MethodNames,
      values,
    )
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
      DiscriminatedMethodCalls<UniswapFactoryV2Types.Contract>[MethodNames<UniswapFactoryV2Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapFactoryV2Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapFactoryV2Types.Contract,
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
   * Helper function to dynamically prepare a call context based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param methodParameters - The method parameters.
   * @returns The call context.
   */
  protected prepareCallContext<
    TMethod extends keyof UniswapFactoryV2Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapFactoryV2Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapFactoryV2Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapFactoryV2Types.Contract, TMethod>
    } else {
      throw new DexError(
        `Method ${String(contractMethodName)} does not exist on the contract`,
        ErrorCodes.functionArgumentError,
      )
    }
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
      DiscriminatedMethodCalls<UniswapFactoryV2Types.Contract>[MethodNames<UniswapFactoryV2Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapFactoryV2Types.Contract, TCalls>> {
    return super.executeCall<UniswapFactoryV2Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new factory contract.
  //  * @param feeToSetter - The address of the fee setter.
  //  * @returns The contract transaction.
  //  */
  // public async new(feeToSetter: string): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [feeToSetter])
  // }

  // /**
  //  * Encodes the function data for initializing a new factory contract.
  //  * @param feeToSetter - The address of the fee setter.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(feeToSetter: string): string {
  //   return this.encodeFunctionData('new', [feeToSetter])
  // }

  /**
   * Returns the address of the pair at the specified index.
   * @param parameter0 - The index of the pair.
   * @returns The address of the pair.
   */
  public async allPairs(parameter0: BigNumberish): Promise<string> {
    return this.callContractMethod<string>('allPairs', [parameter0])
  }

  /**
   * Returns the call context for the allPairs method.
   * @param parameter0 - The index of the pair.
   * @returns The call context.
   */
  public allPairsCallContext(
    parameter0: BigNumberish,
  ): MethodCall<UniswapFactoryV2Types.Contract, 'allPairs'> {
    return this.prepareCallContext('allPairs', [parameter0])
  }

  /**
   * Returns the number of pairs created by the factory.
   * @returns The number of pairs.
   */
  public async allPairsLength(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('allPairsLength', [])
  }

  /**
   * Returns the call context for the allPairsLength method.
   * @returns The call context.
   */
  public allPairsLengthCallContext(): MethodCall<
    UniswapFactoryV2Types.Contract,
    'allPairsLength'
  > {
    return this.prepareCallContext('allPairsLength', [])
  }

  /**
   * Creates a pair of tokens.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param overrides - Optional transaction overrides
   * @returns The contract transaction.
   */
  public async createPair(
    tokenA: string,
    tokenB: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('createPair', [
      tokenA,
      tokenB,
      overrides,
    ])
  }

  /**
   * Encodes the function data to create a pair of tokens.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @returns The encoded function data.
   */
  public encodeCreatePair(tokenA: string, tokenB: string): string {
    return this.encodeFunctionData('createPair', [tokenA, tokenB])
  }

  /**
   * Returns the address to which the fees are sent.
   * @returns The fee recipient address.
   */
  public async feeTo(): Promise<string> {
    return this.callContractMethod<string>('feeTo', [])
  }

  /**
   * Returns the call context for the feeTo method.
   * @returns The call context.
   */
  public feeToCallContext(): MethodCall<
    UniswapFactoryV2Types.Contract,
    'feeTo'
  > {
    return this.prepareCallContext('feeTo', [])
  }

  /**
   * Returns the address of the fee setter.
   * @returns The fee setter address.
   */
  public async feeToSetter(): Promise<string> {
    return this.callContractMethod<string>('feeToSetter', [])
  }

  /**
   * Returns the call context for the feeToSetter method.
   * @returns The call context.
   */
  public feeToSetterCallContext(): MethodCall<
    UniswapFactoryV2Types.Contract,
    'feeToSetter'
  > {
    return this.prepareCallContext('feeToSetter', [])
  }

  /**
   * Returns the address of the pair for the given tokens.
   * @param token0 - The address of token 0.
   * @param token1 - The address of token 1.
   * @returns The address of the pair.
   */
  public async getPair(token0: string, token1: string): Promise<string> {
    return this.callContractMethod<string>('getPair', [token0, token1])
  }

  /**
   * Returns the call context for the getPair method.
   * @param token0 - The address of token 0.
   * @param token1 - The address of token 1.
   * @returns The call context.
   */
  public getPairCallContext(
    token0: string,
    token1: string,
  ): MethodCall<UniswapFactoryV2Types.Contract, 'getPair'> {
    return this.prepareCallContext('getPair', [token0, token1])
  }

  /**
   * Sets the fee recipient.
   * @param _feeTo - The address of the new fee recipient.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async setFeeTo(
    _feeTo: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('setFeeTo', [
      _feeTo,
      overrides,
    ])
  }

  /**
   * Encodes the function data to set the fee recipient.
   * @param _feeTo - The address of the new fee recipient.
   * @returns The encoded function data.
   */
  public encodeSetFeeTo(_feeTo: string): string {
    return this.encodeFunctionData('setFeeTo', [_feeTo])
  }

  /**
   * Sets the fee setter.
   * @param _feeToSetter - The address of the new fee setter.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async setFeeToSetter(
    _feeToSetter: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('setFeeToSetter', [
      _feeToSetter,
      overrides,
    ])
  }

  /**
   * Encodes the function data to set the fee setter.
   * @param _feeToSetter - The address of the new fee setter.
   * @returns The encoded function data.
   */
  public encodeSetFeeToSetter(_feeToSetter: string): string {
    return this.encodeFunctionData('setFeeToSetter', [_feeToSetter])
  }
}
