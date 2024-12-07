import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  ContractDetailContext,
  UniswapFactoryV3Types,
  DexMulticallProviderContext,
  ContractTransactionOverrides,
} from '@dex-toolkit/types'
import {
  assertChainId,
  assertDexConfigBase,
  assertDexType,
  assertProtocol,
  assertVersion,
  defaultFactoryMethodMapV3,
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
} from '@multicall-toolkit/types'
import type { BigNumberish, ContractTransaction } from 'ethers'

export class FactoryContractV3
  extends DexProviderBase
  implements UniswapFactoryV3Types.Contract
{
  protected _contract: UniswapFactoryV3Types.ContractContext

  protected _methodNames: UniswapFactoryV3Types.MethodNameMap

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
      const versionTag = getVersionTagFromVersion(version)

      const dexConfig = getDexConfig({ dexType, chainId })
      assertDexConfigBase(dexConfig)

      const protocol = dexConfig.protocols.protocolV3
      assertProtocol(protocol)

      const contractDetails = protocol[versionTag]
      if (!contractDetails) {
        throw new DexError(
          `Version ${formatVersionForDisplay(version)} not supported for ${dexType} V3`,
          ErrorCodes.versionNotSupported,
        )
      }

      const contractDetail = contractDetails.factory
      if (!contractDetail) {
        throw new DexError(
          `Factory configuration missing for ${dexType} V3 version ${formatVersionForDisplay(version)}`,
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
      this.dexProvider.getContract<UniswapFactoryV3Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultFactoryMethodMapV3,
      ...this._contractDetail.methods,
    }
  }

  /** Get the factory contract */
  public get factoryContract(): UniswapFactoryV3Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapFactoryV3Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapFactoryV3Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapFactoryV3Types.ContractContext

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
    methodName: UniswapFactoryV3Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapFactoryV3Types.MethodNames,
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
    TMethod extends keyof UniswapFactoryV3Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapFactoryV3Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapFactoryV3Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapFactoryV3Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<UniswapFactoryV3Types.Contract>[MethodNames<UniswapFactoryV3Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapFactoryV3Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapFactoryV3Types.Contract,
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
      DiscriminatedMethodCalls<UniswapFactoryV3Types.Contract>[MethodNames<UniswapFactoryV3Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapFactoryV3Types.Contract, TCalls>> {
    return super.executeCall<UniswapFactoryV3Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new factory contract.
  //  * @param overrides - Optional transaction overrides.
  //  * @returns The contract transaction.
  //  */
  // public async new(
  //   overrides?: ContractTransactionOverrides,
  // ): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [overrides])
  // }

  // /**
  //  * Encodes the function data for initializing a new factory contract.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(): string {
  //   return this.encodeFunctionData('new', [])
  // }

  /**
   * Creates a pool.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param fee - The fee amount.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async createPool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('createPool', [
      tokenA,
      tokenB,
      fee,
      overrides,
    ])
  }

  /**
   * Encodes the function data to create a pool.
   * @param tokenA - The address of token A.
   * @param tokenB - The address of token B.
   * @param fee - The fee amount.
   * @returns The encoded function data.
   */
  public encodeCreatePool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
  ): string {
    return this.encodeFunctionData('createPool', [tokenA, tokenB, fee])
  }

  /**
   * Enables a fee amount.
   * @param fee - The fee amount.
   * @param tickSpacing - The tick spacing.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async enableFeeTier(
    fee: BigNumberish,
    tickSpacing: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('enableFeeTier', [
      fee,
      tickSpacing,
      overrides,
    ])
  }

  /**
   * Encodes the function data to enable a fee amount.
   * @param fee - The fee amount.
   * @param tickSpacing - The tick spacing.
   * @returns The encoded function data.
   */
  public encodeEnableFeeTier(
    fee: BigNumberish,
    tickSpacing: BigNumberish,
  ): string {
    return this.encodeFunctionData('enableFeeTier', [fee, tickSpacing])
  }

  /**
   * Returns the tick spacing for a fee amount.
   * @param parameter0 - The fee amount.
   * @returns The tick spacing.
   */
  public async feeTierTickSpacing(parameter0: BigNumberish): Promise<number> {
    return this.callContractMethod<number>('feeTierTickSpacing', [parameter0])
  }

  /**
   * Returns the call context for the feeTierTickSpacing method.
   * @param parameter0 - The fee amount.
   * @returns The call context.
   */
  public feeTierTickSpacingCallContext(
    parameter0: BigNumberish,
  ): MethodCall<UniswapFactoryV3Types.Contract, 'feeTierTickSpacing'> {
    return this.prepareCallContext('feeTierTickSpacing', [parameter0])
  }

  /**
   * Returns the address of the pool for the given tokens and fee.
   * @param parameter0 - The address of token 0.
   * @param parameter1 - The address of token 1.
   * @param parameter2 - The fee amount.
   * @returns The address of the pool.
   */
  public async getPool(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
  ): Promise<string> {
    return this.callContractMethod<string>('getPool', [
      parameter0,
      parameter1,
      parameter2,
    ])
  }

  /**
   * Returns the call context for the getPool method.
   * @param parameter0 - The address of token 0.
   * @param parameter1 - The address of token 1.
   * @param parameter2 - The fee amount.
   * @returns The call context.
   */
  public getPoolCallContext(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
  ): MethodCall<UniswapFactoryV3Types.Contract, 'getPool'> {
    return this.prepareCallContext('getPool', [
      parameter0,
      parameter1,
      parameter2,
    ])
  }

  /**
   * Returns the owner of the factory.
   * @returns The owner address.
   */
  public async owner(): Promise<string> {
    return this.callContractMethod<string>('owner', [])
  }

  /**
   * Returns the call context for the owner method.
   * @returns The call context.
   */
  public ownerCallContext(): MethodCall<
    UniswapFactoryV3Types.Contract,
    'owner'
  > {
    return this.prepareCallContext('owner', [])
  }

  /**
   * Returns the parameters of the factory.
   * @returns The factory parameters.
   */
  public async parameters(): Promise<UniswapFactoryV3Types.ParametersResponse> {
    return this.callContractMethod<UniswapFactoryV3Types.ParametersResponse>(
      'parameters',
      [],
    )
  }

  /**
   * Returns the call context for the parameters method.
   * @returns The call context.
   */
  public parametersCallContext(): MethodCall<
    UniswapFactoryV3Types.Contract,
    'parameters'
  > {
    return this.prepareCallContext('parameters', [])
  }

  /**
   * Sets the owner of the factory.
   * @param _owner - The new owner address.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async setOwner(
    _owner: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('setOwner', [
      _owner,
      overrides,
    ])
  }

  /**
   * Encodes the function data to set the owner of the factory.
   * @param _owner - The new owner address.
   * @returns The encoded function data.
   */
  public encodeSetOwner(_owner: string): string {
    return this.encodeFunctionData('setOwner', [_owner])
  }
}
