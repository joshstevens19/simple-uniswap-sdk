import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  DexMulticallProviderContext,
  Erc20Types,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  defaultErc20MethodMap,
  erc20ABI,
  getAddress,
} from '@dex-toolkit/utils'
import type {
  MethodCall,
  ContractTransactionOverrides,
  ContractDetailToken,
  ContractContextOptions,
  DiscriminatedMethodCalls,
  MethodNames,
  ExecutionResult,
  ContractContext,
} from '@multicall-toolkit/types'
import type { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

export class Erc20Contract
  extends DexProviderBase
  implements Erc20Types.Contract
{
  protected _contract: Erc20Types.ContractContext

  protected _methodNames: Erc20Types.MethodNameMap

  constructor(
    multicallProviderContext: DexMulticallProviderContext,
    contractDetail: ContractDetailToken,
  ) {
    super(multicallProviderContext, {
      ...contractDetail,
      abi: contractDetail.abi || erc20ABI,
    })

    this._contract =
      this._multicallProvider.getContract<Erc20Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultErc20MethodMap,
      ...this._contractDetail.methods,
    }
  }

  /** Get the ERC20 contract */
  public get erc20Contract(): Erc20Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): Erc20Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  protected async callContractMethod<T>(
    methodName: Erc20Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof Erc20Types.ContractContext

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
  protected encodeFunctionData(
    methodName: Erc20Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as Erc20Types.MethodNames,
      values,
    )
  }

  /**
   * Helper function to dynamically prepare a call context based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param methodParameters - The method parameters.
   * @returns The call context.
   */
  protected prepareCallContext<TMethod extends keyof Erc20Types.Contract>(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<Erc20Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof Erc20Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<Erc20Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<Erc20Types.Contract>[MethodNames<Erc20Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<Erc20Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<Erc20Types.Contract, TCalls, TCustomData> = {
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
      DiscriminatedMethodCalls<Erc20Types.Contract>[MethodNames<Erc20Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<Erc20Types.Contract, TCalls>> {
    return super.executeCall<Erc20Types.Contract, TCalls>(calls, options)
  }

  /**
   * Returns the name of the token.
   * @returns The name of the token.
   */
  public async name(): Promise<string> {
    return this.callContractMethod<string>('name')
  }

  /**
   * Returns the call context for the name method.
   * @returns The call context.
   */
  public nameCallContext(): MethodCall<Erc20Types.Contract, 'name'> {
    return this.prepareCallContext('name', [])
  }

  /**
   * Approves the specified amount of tokens to the specified address.
   * @param _spender - The address to approve.
   * @param _value - The amount of tokens to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approve(
    _spender: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approve', [
      _spender,
      _value,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving tokens.
   * @param _spender - The address to approve.
   * @param _value - The amount of tokens to approve.
   * @returns The encoded function data.
   */
  public encodeApprove(_spender: string, _value: BigNumberish): string {
    return this.encodeFunctionData('approve', [_spender, _value])
  }

  /**
   * Returns the total supply of the token.
   * @returns The total supply of the token.
   */
  public async totalSupply(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('totalSupply', [])
  }

  /**
   * Returns the call context for the totalSupply method.
   * @returns The call context.
   */
  public totalSupplyCallContext(): MethodCall<
    Erc20Types.Contract,
    'totalSupply'
  > {
    return this.prepareCallContext('totalSupply', [])
  }

  /**
   * Transfers tokens from one address to another.
   * @param _from - The source address.
   * @param _to - The destination address.
   * @param _value - The amount of tokens to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transferFrom(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transferFrom', [
      _from,
      _to,
      _value,
      overrides,
    ])
  }

  /**
   * Encodes the function data for transferring tokens from one address to another.
   * @param _from - The source address.
   * @param _to - The destination address.
   * @param _value - The amount of tokens to transfer.
   * @returns The encoded function data.
   */
  public encodeTransferFrom(
    _from: string,
    _to: string,
    _value: BigNumberish,
  ): string {
    return this.encodeFunctionData('transferFrom', [_from, _to, _value])
  }

  /**
   * Returns the number of decimals used by the token.
   * @returns The number of decimals.
   */
  public async decimals(): Promise<number | BigNumber> {
    return this.callContractMethod<number | BigNumber>('decimals', [])
  }

  /**
   * Returns the call context for the decimals method.
   * @returns The call context.
   */
  public decimalsCallContext(): MethodCall<Erc20Types.Contract, 'decimals'> {
    return this.prepareCallContext('decimals', [])
  }

  /**
   * Returns the balance of the specified address.
   * @param _owner - The address to query.
   * @returns The balance of the specified address.
   */
  public async balanceOf(_owner: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('balanceOf', [_owner])
  }

  /**
   * Returns the call context for the balanceOf method.
   * @param _owner - The address to query.
   * @returns The call context.
   */
  public balanceOfCallContext(
    _owner: string,
  ): MethodCall<Erc20Types.Contract, 'balanceOf'> {
    return this.prepareCallContext('balanceOf', [_owner])
  }

  /**
   * Returns the symbol of the token.
   * @returns The symbol of the token.
   */
  public async symbol(): Promise<string> {
    return this.callContractMethod<string>('symbol', [])
  }

  /**
   * Returns the call context for the symbol method.
   * @returns The call context.
   */
  public symbolCallContext(): MethodCall<Erc20Types.Contract, 'symbol'> {
    return this.prepareCallContext('symbol', [])
  }

  /**
   * Transfers tokens to a specified address.
   * @param _to - The address to transfer to.
   * @param _value - The amount of tokens to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transfer(
    _to: string,
    _value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transfer', [
      _to,
      _value,
      overrides,
    ])
  }

  /**
   * Encodes the function data for transferring tokens to a specified address.
   * @param _to - The address to transfer to.
   * @param _value - The amount of tokens to transfer.
   * @returns The encoded function data.
   */
  public encodeTransfer(_to: string, _value: BigNumberish): string {
    return this.encodeFunctionData('transfer', [_to, _value])
  }

  /**
   * Returns the amount of tokens that an owner allowed to a spender.
   * @param _owner - The address of the owner.
   * @param _spender - The address of the spender.
   * @returns The amount of tokens that are allowed to be spent.
   */
  public async allowance(_owner: string, _spender: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('allowance', [_owner, _spender])
  }

  /**
   * Returns the call context for the allowance method.
   * @param _owner - The address of the owner.
   * @param _spender - The address of the spender.
   * @returns The call context.
   */
  public allowanceCallContext(
    _owner: string,
    _spender: string,
  ): MethodCall<Erc20Types.Contract, 'allowance'> {
    return this.prepareCallContext('allowance', [_owner, _spender])
  }
}
