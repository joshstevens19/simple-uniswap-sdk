import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  DexMulticallProviderContext,
  WrappedTypes,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  defaultWrappedMethodMap,
  getAddress,
  getChainConfig,
  wrappedABI,
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
} from '@ethereum-multicall/types'
import { mapAbiFunctionNames } from '@ethereum-multicall/utils'
import type { BigNumber, BigNumberish, ContractTransaction } from 'ethers'

export class WrappedContract
  extends DexProviderBase
  implements WrappedTypes.Contract
{
  protected _contract: WrappedTypes.ContractContext

  protected _methodNames: WrappedTypes.MethodNameMap

  constructor(
    multicallProviderContext: DexMulticallProviderContext,
    contractDetail?: ContractDetailToken,
  ) {
    super(multicallProviderContext)

    const { chainId } = this.dexProvider.network ?? {}

    if (!chainId) {
      throw new DexError(
        'Dex provider network is missing chain id',
        ErrorCodes.functionArgumentError,
      )
    }

    const chainConfig = getChainConfig(chainId)
    const { contractAddress } = chainConfig.nativeWrappedTokenInfo ?? {}

    if (!contractDetail?.address && !contractAddress) {
      throw new DexError(
        'Chain config is missing wrapped token contract details',
        ErrorCodes.functionArgumentError,
      )
    }

    const detail = {
      ...contractDetail,
      address: contractDetail?.address || contractAddress,
      abi: contractDetail?.abi || wrappedABI,
    }

    const mappedAbi =
      detail.methods && detail.options?.mapMethodNames
        ? mapAbiFunctionNames<Record<string, string>>(
            detail.abi,
            detail.methods,
          )
        : detail.abi

    this._contractDetail = {
      ...detail,
      abi: mappedAbi,
    }

    this._contract =
      this._multicallProvider.getContract<WrappedTypes.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultWrappedMethodMap,
      ...this._contractDetail?.methods,
    }
  }

  /** Get the wrapped contract */
  public get wrappedContract(): WrappedTypes.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): WrappedTypes.MethodNameMap {
    return this._contractDetail.methods as WrappedTypes.MethodNameMap
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  protected async callContractMethod<T>(
    methodName: WrappedTypes.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof WrappedTypes.ContractContext

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
    methodName: WrappedTypes.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as WrappedTypes.MethodNames,
      values,
    )
  }

  /**
   * Helper function to dynamically prepare a call context based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param methodParameters - The method parameters.
   * @returns The call context.
   */
  protected prepareCallContext<TMethod extends keyof WrappedTypes.Contract>(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<WrappedTypes.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof WrappedTypes.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<WrappedTypes.Contract, TMethod>
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
      DiscriminatedMethodCalls<WrappedTypes.Contract>[MethodNames<WrappedTypes.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<WrappedTypes.Contract, TCalls, TCustomData> {
    const context: ContractContext<WrappedTypes.Contract, TCalls, TCustomData> =
      {
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
      DiscriminatedMethodCalls<WrappedTypes.Contract>[MethodNames<WrappedTypes.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<WrappedTypes.Contract, TCalls>> {
    return super.executeCall<WrappedTypes.Contract, TCalls>(calls, options)
  }

  /**
   * Returns the name of the token.
   * @returns The name of the token.
   */
  public async name(): Promise<string> {
    return this.callContractMethod<string>('name', [])
  }

  /**
   * Returns the call context for the name method.
   * @returns The call context.
   */
  public nameCallContext(): MethodCall<WrappedTypes.Contract, 'name'> {
    return this.prepareCallContext('name', [])
  }

  /**
   * Approves the specified amount of tokens to the specified address.
   * @param guy - The address to approve.
   * @param wad - The amount of tokens to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approve(
    guy: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approve', [
      guy,
      wad,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving tokens.
   * @param guy - The address to approve.
   * @param wad - The amount of tokens to approve.
   * @returns The encoded function data.
   */
  public encodeApprove(guy: string, wad: BigNumberish): string {
    return this.encodeFunctionData('approve', [guy, wad])
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
    WrappedTypes.Contract,
    'totalSupply'
  > {
    return this.prepareCallContext('totalSupply', [])
  }

  /**
   * Transfers tokens from one address to another.
   * @param src - The source address.
   * @param dst - The destination address.
   * @param wad - The amount of tokens to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transferFrom(
    src: string,
    dst: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transferFrom', [
      src,
      dst,
      wad,
      overrides,
    ])
  }

  /**
   * Encodes the function data for transferring tokens from one address to another.
   * @param src - The source address.
   * @param dst - The destination address.
   * @param wad - The amount of tokens to transfer.
   * @returns The encoded function data.
   */
  public encodeTransferFrom(
    src: string,
    dst: string,
    wad: BigNumberish,
  ): string {
    return this.encodeFunctionData('transferFrom', [src, dst, wad])
  }

  /**
   * Withdraws the specified amount of tokens.
   * @param wad - The amount of tokens to withdraw.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async withdraw(
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('withdraw', [
      wad,
      overrides,
    ])
  }

  /**
   * Encodes the function data for withdrawing tokens.
   * @param wad - The amount of tokens to withdraw.
   * @returns The encoded function data.
   */
  public encodeWithdraw(wad: BigNumberish): string {
    return this.encodeFunctionData('withdraw', [wad])
  }

  /**
   * Returns the number of decimals used by the token.
   * @returns The number of decimals.
   */
  public async decimals(): Promise<number | BigNumber> {
    return this.callContractMethod<number>('decimals', [])
  }

  /**
   * Returns the call context for the decimals method.
   * @returns The call context.
   */
  public decimalsCallContext(): MethodCall<WrappedTypes.Contract, 'decimals'> {
    return this.prepareCallContext('decimals', [])
  }

  /**
   * Returns the balance of the specified address.
   * @param parameter0 - The address to query.
   * @returns The balance of the specified address.
   */
  public async balanceOf(parameter0: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('balanceOf', [parameter0])
  }

  /**
   * Returns the call context for the balanceOf method.
   * @param parameter0 - The address to query.
   * @returns The call context.
   */
  public balanceOfCallContext(
    parameter0: string,
  ): MethodCall<WrappedTypes.Contract, 'balanceOf'> {
    return this.prepareCallContext('balanceOf', [parameter0])
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
  public symbolCallContext(): MethodCall<WrappedTypes.Contract, 'symbol'> {
    return this.prepareCallContext('symbol', [])
  }

  /**
   * Transfers tokens to a specified address.
   * @param dst - The address to transfer to.
   * @param wad - The amount of tokens to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transfer(
    dst: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transfer', [
      dst,
      wad,
      overrides,
    ])
  }

  /**
   * Encodes the function data for transferring tokens to a specified address.
   * @param dst - The address to transfer to.
   * @param wad - The amount of tokens to transfer.
   * @returns The encoded function data.
   */
  public encodeTransfer(dst: string, wad: BigNumberish): string {
    return this.encodeFunctionData('transfer', [dst, wad])
  }

  /**
   * Deposits the specified amount of ETH into the contract and mints wrapped tokens.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async deposit(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('deposit', [overrides])
  }

  /**
   * Encodes the function data for depositing ETH and minting wrapped tokens.
   * @returns The encoded function data.
   */
  public encodeDeposit(): string {
    return this.encodeFunctionData('deposit')
  }

  /**
   * Returns the amount of tokens that an owner allowed to a spender.
   * @param parameter0 - The address of the owner.
   * @param parameter1 - The address of the spender.
   * @returns The amount of tokens that are allowed to be spent.
   */
  public async allowance(
    parameter0: string,
    parameter1: string,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('allowance', [
      parameter0,
      parameter1,
    ])
  }

  /**
   * Returns the call context for the allowance method.
   * @param parameter0 - The address of the owner.
   * @param parameter1 - The address of the spender.
   * @returns The call context.
   */
  public allowanceCallContext(
    parameter0: string,
    parameter1: string,
  ): MethodCall<WrappedTypes.Contract, 'allowance'> {
    return this.prepareCallContext('allowance', [parameter0, parameter1])
  }
}
