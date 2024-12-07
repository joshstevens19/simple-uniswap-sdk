import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  DexMulticallProviderContext,
  Erc1155Types,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  defaultErc1155MethodMap,
  erc1155ABI,
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
} from '@ethereum-multicall/types'
import type {
  BigNumberish,
  BytesLike,
  ContractTransaction,
  BigNumber,
} from 'ethers'

export class Erc1155Contract
  extends DexProviderBase
  implements Erc1155Types.Contract
{
  protected _contract: Erc1155Types.ContractContext

  protected _methodNames: Erc1155Types.MethodNameMap

  constructor(
    multicallProviderContext: DexMulticallProviderContext,
    contractDetail: ContractDetailToken,
  ) {
    super(multicallProviderContext, {
      ...contractDetail,
      abi: contractDetail.abi || erc1155ABI,
    })

    this._contract =
      this._multicallProvider.getContract<Erc1155Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultErc1155MethodMap,
      ...this._contractDetail.methods,
    }
  }

  /** Get the ERC1155 contract */
  public get erc1155Contract(): Erc1155Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): Erc1155Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  protected async callContractMethod<T>(
    methodName: Erc1155Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof Erc1155Types.ContractContext

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
    methodName: Erc1155Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as Erc1155Types.MethodNames,
      values,
    )
  }

  /**
   * Helper function to dynamically prepare a call context based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param methodParameters - The method parameters.
   * @returns The call context.
   */
  protected prepareCallContext<TMethod extends keyof Erc1155Types.Contract>(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<Erc1155Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof Erc1155Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<Erc1155Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<Erc1155Types.Contract>[MethodNames<Erc1155Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<Erc1155Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<Erc1155Types.Contract, TCalls, TCustomData> =
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
      DiscriminatedMethodCalls<Erc1155Types.Contract>[MethodNames<Erc1155Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<Erc1155Types.Contract, TCalls>> {
    return super.executeCall<Erc1155Types.Contract, TCalls>(calls, options)
  }

  /**
   * Returns the balance of the specified account for a given token ID.
   * @param account - The address of the account.
   * @param id - The token ID.
   * @returns The balance of the account for the token ID.
   */
  public async balanceOf(
    account: string,
    id: BigNumberish,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('balanceOf', [account, id])
  }

  /**
   * Returns the call context for the balanceOf method.
   * @param account - The address of the account.
   * @param id - The token ID.
   * @returns The call context.
   */
  public balanceOfCallContext(
    account: string,
    id: BigNumberish,
  ): MethodCall<Erc1155Types.Contract, 'balanceOf'> {
    return this.prepareCallContext('balanceOf', [account, id])
  }

  /**
   * Returns the balances of multiple accounts for multiple token IDs.
   * @param accounts - The array of account addresses.
   * @param ids - The array of token IDs.
   * @returns The array of balances.
   */
  public async balanceOfBatch(
    accounts: string[],
    ids: BigNumberish[],
  ): Promise<BigNumber[]> {
    return this.callContractMethod<BigNumber[]>('balanceOfBatch', [
      accounts,
      ids,
    ])
  }

  /**
   * Returns the call context for the balanceOfBatch method.
   * @param accounts - The array of account addresses.
   * @param ids - The array of token IDs.
   * @returns The call context.
   */
  public balanceOfBatchCallContext(
    accounts: string[],
    ids: BigNumberish[],
  ): MethodCall<Erc1155Types.Contract, 'balanceOfBatch'> {
    return this.prepareCallContext('balanceOfBatch', [accounts, ids])
  }

  /**
   * Checks if an operator is approved for all tokens of a given account.
   * @param account - The address of the account.
   * @param operator - The address of the operator.
   * @returns True if the operator is approved for all tokens, false otherwise.
   */
  public async isApprovedForAll(
    account: string,
    operator: string,
  ): Promise<boolean> {
    return this.callContractMethod<boolean>('isApprovedForAll', [
      account,
      operator,
    ])
  }

  /**
   * Returns the call context for the isApprovedForAll method.
   * @param account - The address of the account.
   * @param operator - The address of the operator.
   * @returns The call context.
   */
  public isApprovedForAllCallContext(
    account: string,
    operator: string,
  ): MethodCall<Erc1155Types.Contract, 'isApprovedForAll'> {
    return this.prepareCallContext('isApprovedForAll', [account, operator])
  }

  /**
   * Safely transfers multiple token types from one account to another.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param ids - The array of token IDs.
   * @param amounts - The array of token amounts.
   * @param data - Additional data to include with the transfer.
   * @param overrides - Optional transaction overrides.
   * @returns A promise that resolves to a contract transaction.
   */
  public async safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'safeBatchTransferFrom',
      [from, to, ids, amounts, data, overrides],
    )
  }

  /**
   * Encodes the function data for a safe batch transfer.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param ids - The array of token IDs.
   * @param amounts - The array of token amounts.
   * @param data - Additional data to include with the transfer.
   * @returns The encoded function data.
   */
  public encodeSafeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('safeBatchTransferFrom', [
      from,
      to,
      ids,
      amounts,
      data,
    ])
  }

  /**
   * Safely transfers a single token type from one account to another.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param id - The token ID.
   * @param amount - The amount to transfer.
   * @param data - Additional data to include with the transfer.
   * @param overrides - Optional transaction overrides.
   * @returns A promise that resolves to a contract transaction.
   */
  public async safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('safeTransferFrom', [
      from,
      to,
      id,
      amount,
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for a safe transfer.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param id - The token ID.
   * @param amount - The amount to transfer.
   * @param data - Additional data to include with the transfer.
   * @returns The encoded function data.
   */
  public encodeSafeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('safeTransferFrom', [
      from,
      to,
      id,
      amount,
      data,
    ])
  }

  /**
   * Sets or un-sets approval for a given operator to manage all of the caller's tokens.
   * @param operator - The address of the operator.
   * @param approved - True to approve the operator, false to revoke approval.
   * @param overrides - Optional transaction overrides.
   * @returns A promise that resolves to a contract transaction.
   */
  public async setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('setApprovalForAll', [
      operator,
      approved,
      overrides,
    ])
  }

  /**
   * Encodes the function data for setting approval for all tokens.
   * @param operator - The address of the operator.
   * @param approved - True to approve the operator, false to revoke approval.
   * @returns The encoded function data.
   */
  public encodeSetApprovalForAll(operator: string, approved: boolean): string {
    return this.encodeFunctionData('setApprovalForAll', [operator, approved])
  }

  /**
   * Checks if the contract implements a specific interface.
   * @param interfaceId - The interface ID to check.
   * @returns True if the contract supports the interface, false otherwise.
   */
  public async supportsInterface(interfaceId: BytesLike): Promise<boolean> {
    return this.callContractMethod<boolean>('supportsInterface', [interfaceId])
  }

  /**
   * Returns the call context for the supportsInterface method.
   * @param interfaceId - The interface ID to check.
   * @returns The call context.
   */
  public supportsInterfaceCallContext(
    interfaceId: BytesLike,
  ): MethodCall<Erc1155Types.Contract, 'supportsInterface'> {
    return this.prepareCallContext('supportsInterface', [interfaceId])
  }

  /**
   * Returns the URI for a given token ID.
   * @param id - The token ID.
   * @returns The URI of the token.
   */
  public async uri(id: BigNumberish): Promise<string> {
    return this.callContractMethod<string>('uri', [id])
  }

  /**
   * Returns the call context for the uri method.
   * @param id - The token ID.
   * @returns The call context.
   */
  public uriCallContext(
    id: BigNumberish,
  ): MethodCall<Erc1155Types.Contract, 'uri'> {
    return this.prepareCallContext('uri', [id])
  }
}
