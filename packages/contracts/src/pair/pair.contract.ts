import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  UniswapPairV2Types,
  DexMulticallProviderContext,
  ContractTransactionOverrides,
  ContractDetailWithAddressContext,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  getDexConfig,
  isContractDetail,
  isContractDetailForAddress,
  defaultPairMethodMapV2,
  getVersionTagFromVersion,
  formatVersionForDisplay,
  assertChainId,
  assertDexType,
  assertDexConfigBase,
  assertProtocol,
  assertVersion,
  assertIsAddress,
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
import type {
  BigNumberish,
  BytesLike,
  ContractTransaction,
  BigNumber,
} from 'ethers'

export class PairContract
  extends DexProviderBase
  implements UniswapPairV2Types.Contract
{
  protected _contract: UniswapPairV2Types.ContractContext

  protected _methodNames: UniswapPairV2Types.MethodNameMap

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

      const protocol = dexConfig.protocols.protocolV2
      assertProtocol(protocol)

      const contractDetails = protocol[getVersionTagFromVersion(version)]
      if (!contractDetails) {
        throw new DexError(
          `Version ${formatVersionForDisplay(version)} not supported for ${dexType} V2`,
          ErrorCodes.versionNotSupported,
        )
      }

      const { abi, methods } = contractDetails.pair ?? {}

      if (!abi) {
        throw new DexError(
          `ABI not found for ${dexType} V2 version ${formatVersionForDisplay(version)}`,
          ErrorCodes.contractDetailsNotFound,
        )
      }

      if (!methods) {
        throw new DexError(
          `Methods not found for ${dexType} V2 version ${formatVersionForDisplay(version)}`,
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
      this.dexProvider.getContract<UniswapPairV2Types.ContractContext>(
        this._contractDetail,
      )

    this._methodNames = {
      ...defaultPairMethodMapV2,
      ...this._contractDetail.methods,
    }
  }

  /** Get the pair contract */
  public get pairContract(): UniswapPairV2Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapPairV2Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapPairV2Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPairV2Types.ContractContext

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
    methodName: UniswapPairV2Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[methodName] as UniswapPairV2Types.MethodNames,
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
    TMethod extends keyof UniswapPairV2Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapPairV2Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPairV2Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapPairV2Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<UniswapPairV2Types.Contract>[MethodNames<UniswapPairV2Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<UniswapPairV2Types.Contract, TCalls, TCustomData> {
    const context: ContractContext<
      UniswapPairV2Types.Contract,
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
      DiscriminatedMethodCalls<UniswapPairV2Types.Contract>[MethodNames<UniswapPairV2Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapPairV2Types.Contract, TCalls>> {
    return super.executeCall<UniswapPairV2Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new pair contract.
  //  * @param overrides - Optional transaction overrides.
  //  * @returns The contract transaction.
  //  */
  // public async new(
  //   overrides?: ContractTransactionOverrides,
  // ): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [overrides])
  // }

  // /**
  //  * Encodes the function data for initializing a new pair contract.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(): string {
  //   return this.encodeFunctionData('new', [])
  // }

  /**
   * Returns the domain separator.
   * @returns The domain separator.
   */
  public async DOMAIN_SEPARATOR(): Promise<string> {
    return this.callContractMethod<string>('DOMAIN_SEPARATOR', [])
  }

  /**
   * Returns the call context for the DOMAIN_SEPARATOR method.
   * @returns The call context.
   */
  public DOMAIN_SEPARATORCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'DOMAIN_SEPARATOR'
  > {
    return this.prepareCallContext('DOMAIN_SEPARATOR', [])
  }

  /**
   * Returns the minimum liquidity.
   * @returns The minimum liquidity.
   */
  public async MINIMUM_LIQUIDITY(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('MINIMUM_LIQUIDITY', [])
  }

  /**
   * Returns the call context for the MINIMUM_LIQUIDITY method.
   * @returns The call context.
   */
  public MINIMUM_LIQUIDITYCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'MINIMUM_LIQUIDITY'
  > {
    return this.prepareCallContext('MINIMUM_LIQUIDITY', [])
  }

  /**
   * Returns the PERMIT_TYPEHASH.
   * @returns The PERMIT_TYPEHASH.
   */
  public async PERMIT_TYPEHASH(): Promise<string> {
    return this.callContractMethod<string>('PERMIT_TYPEHASH', [])
  }

  /**
   * Returns the call context for the PERMIT_TYPEHASH method.
   * @returns The call context.
   */
  public PERMIT_TYPEHASHCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'PERMIT_TYPEHASH'
  > {
    return this.prepareCallContext('PERMIT_TYPEHASH', [])
  }

  /**
   * Returns the allowance for a given owner and spender.
   * @param owner - The address of the token owner.
   * @param spender - The address of the spender.
   * @returns The allowance.
   */
  public async allowance(owner: string, spender: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('allowance', [owner, spender])
  }

  /**
   * Returns the call context for the allowance method.
   * @param owner - The address of the token owner.
   * @param spender - The address of the spender.
   * @returns The call context.
   */
  public allowanceCallContext(
    owner: string,
    spender: string,
  ): MethodCall<UniswapPairV2Types.Contract, 'allowance'> {
    return this.prepareCallContext('allowance', [owner, spender])
  }

  /**
   * Returns the reserves of the pair.
   * @returns The reserves of the pair.
   */
  public async getReserves(): Promise<UniswapPairV2Types.GetReservesResponse> {
    return this.callContractMethod<UniswapPairV2Types.GetReservesResponse>(
      'getReserves',
      [],
    )
  }

  /**
   * Returns the call context for the getReserves method.
   * @returns The call context.
   */
  public getReservesCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'getReserves'
  > {
    return this.prepareCallContext('getReserves', [])
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
    UniswapPairV2Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Returns the kLast value.
   * @returns The kLast value.
   */
  public async kLast(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('kLast', [])
  }

  /**
   * Returns the call context for the kLast method.
   * @returns The call context.
   */
  public kLastCallContext(): MethodCall<UniswapPairV2Types.Contract, 'kLast'> {
    return this.prepareCallContext('kLast', [])
  }

  /**
   * Initializes the pair contract with token addresses.
   * @param _token0 - The address of token 0.
   * @param _token1 - The address of token 1.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async initialize(
    _token0: string,
    _token1: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('initialize', [
      _token0,
      _token1,
      overrides,
    ])
  }

  /**
   * Encodes the function data for initializing the pair contract.
   * @param _token0 - The address of token 0.
   * @param _token1 - The address of token 1.
   * @returns The encoded function data.
   */
  public encodeInitialize(_token0: string, _token1: string): string {
    return this.encodeFunctionData('initialize', [_token0, _token1])
  }

  /**
   * Mints new liquidity tokens.
   * @param to - The address to which the liquidity tokens will be sent.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async mint(
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('mint', [to, overrides])
  }

  /**
   * Encodes the function data to mint new liquidity tokens.
   * @param to - The address to which the liquidity tokens will be sent.
   * @returns The encoded function data.
   */
  public encodeMint(to: string): string {
    return this.encodeFunctionData('mint', [to])
  }

  /**
   * Burns liquidity tokens.
   * @param to - The address to which the underlying tokens will be sent.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async burn(
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('burn', [to, overrides])
  }

  /**
   * Encodes the function data to burn liquidity tokens.
   * @param to - The address to which the underlying tokens will be sent.
   * @returns The encoded function data.
   */
  public encodeBurn(to: string): string {
    return this.encodeFunctionData('burn', [to])
  }

  /**
   * Swaps tokens.
   * @param amount0Out - The amount of token 0 to swap out.
   * @param amount1Out - The amount of token 1 to swap out.
   * @param to - The address to which the swapped tokens will be sent.
   * @param data - Additional data for the swap.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async swap(
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    to: string,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('swap', [
      amount0Out,
      amount1Out,
      to,
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data to swap tokens.
   * @param amount0Out - The amount of token 0 to swap out.
   * @param amount1Out - The amount of token 1 to swap out.
   * @param to - The address to which the swapped tokens will be sent.
   * @param data - Additional data for the swap.
   * @returns The encoded function data.
   */
  public encodeSwap(
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    to: string,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('swap', [amount0Out, amount1Out, to, data])
  }

  /**
   * Skims the token balances to the specified address.
   * @param to - The address to which the skimmed tokens will be sent.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async skim(
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('skim', [to, overrides])
  }

  /**
   * Encodes the function data to skim token balances.
   * @param to - The address to which the skimmed tokens will be sent.
   * @returns The encoded function data.
   */
  public encodeSkim(to: string): string {
    return this.encodeFunctionData('skim', [to])
  }

  /**
   * Synchronizes the reserves of the pair.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sync(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('sync', [overrides])
  }

  /**
   * Encodes the function data to synchronize reserves.
   * @returns The encoded function data.
   */
  public encodeSync(): string {
    return this.encodeFunctionData('sync', [])
  }

  /**
   * Returns the balance of a given address.
   * @param parameter0 - The address to check the balance of.
   * @returns The balance.
   */
  public async balanceOf(parameter0: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('balanceOf', [parameter0])
  }

  /**
   * Returns the call context for the balanceOf method.
   * @param parameter0 - The address to check the balance of.
   * @returns The call context.
   */
  public balanceOfCallContext(
    parameter0: string,
  ): MethodCall<UniswapPairV2Types.Contract, 'balanceOf'> {
    return this.prepareCallContext('balanceOf', [parameter0])
  }

  /**
   * Returns the address of token0.
   * @returns The address of token0.
   */
  public async token0(): Promise<string> {
    return this.callContractMethod<string>('token0', [])
  }

  /**
   * Returns the call context for the token0 method.
   * @returns The call context.
   */
  public token0CallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'token0'
  > {
    return this.prepareCallContext('token0', [])
  }

  /**
   * Returns the address of token1.
   * @returns The address of token1.
   */
  public async token1(): Promise<string> {
    return this.callContractMethod<string>('token1', [])
  }

  /**
   * Returns the call context for the token1 method.
   * @returns The call context.
   */
  public token1CallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'token1'
  > {
    return this.prepareCallContext('token1', [])
  }

  /**
   * Returns the total supply of liquidity tokens.
   * @returns The total supply.
   */
  public async totalSupply(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('totalSupply', [])
  }

  /**
   * Returns the call context for the totalSupply method.
   * @returns The call context.
   */
  public totalSupplyCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'totalSupply'
  > {
    return this.prepareCallContext('totalSupply', [])
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
  public nameCallContext(): MethodCall<UniswapPairV2Types.Contract, 'name'> {
    return this.prepareCallContext('name', [])
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
  public symbolCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'symbol'
  > {
    return this.prepareCallContext('symbol', [])
  }

  /**
   * Returns the number of decimals used by the token.
   * @returns The number of decimals.
   */
  public async decimals(): Promise<number> {
    return this.callContractMethod<number>('decimals', [])
  }

  /**
   * Returns the call context for the decimals method.
   * @returns The call context.
   */
  public decimalsCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'decimals'
  > {
    return this.prepareCallContext('decimals', [])
  }

  /**
   * Returns the cumulative price of token0.
   * @returns The cumulative price of token0.
   */
  public async price0CumulativeLast(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('price0CumulativeLast', [])
  }

  /**
   * Returns the call context for the price0CumulativeLast method.
   * @returns The call context.
   */
  public price0CumulativeLastCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'price0CumulativeLast'
  > {
    return this.prepareCallContext('price0CumulativeLast', [])
  }

  /**
   * Returns the cumulative price of token1.
   * @returns The cumulative price of token1.
   */
  public async price1CumulativeLast(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('price1CumulativeLast', [])
  }

  /**
   * Returns the call context for the price1CumulativeLast method.
   * @returns The call context.
   */
  public price1CumulativeLastCallContext(): MethodCall<
    UniswapPairV2Types.Contract,
    'price1CumulativeLast'
  > {
    return this.prepareCallContext('price1CumulativeLast', [])
  }

  /**
   * Returns the nonce for a given address.
   * @param parameter0 - The address to check the nonce of.
   * @returns The nonce.
   */
  public async nonces(parameter0: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('nonces', [parameter0])
  }

  /**
   * Returns the call context for the nonces method.
   * @param parameter0 - The address to check the nonce of.
   * @returns The call context.
   */
  public noncesCallContext(
    parameter0: string,
  ): MethodCall<UniswapPairV2Types.Contract, 'nonces'> {
    return this.prepareCallContext('nonces', [parameter0])
  }

  /**
   * Approves a spender to spend a specified amount.
   * @param spender - The address of the spender.
   * @param value - The amount to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approve(
    spender: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approve', [
      spender,
      value,
      overrides,
    ])
  }

  /**
   * Encodes the function data to approve a spender.
   * @param spender - The address of the spender.
   * @param value - The amount to approve.
   * @returns The encoded function data.
   */
  public encodeApprove(spender: string, value: BigNumberish): string {
    return this.encodeFunctionData('approve', [spender, value])
  }

  /**
   * Transfers tokens to a specified address.
   * @param to - The address to transfer to.
   * @param value - The amount to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transfer(
    to: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transfer', [
      to,
      value,
      overrides,
    ])
  }

  /**
   * Encodes the function data to transfer tokens.
   * @param to - The address to transfer to.
   * @param value - The amount to transfer.
   * @returns The encoded function data.
   */
  public encodeTransfer(to: string, value: BigNumberish): string {
    return this.encodeFunctionData('transfer', [to, value])
  }

  /**
   * Transfers tokens from a specified address to another address.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param value - The amount to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transferFrom(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transferFrom', [
      from,
      to,
      value,
      overrides,
    ])
  }

  /**
   * Encodes the function data to transfer tokens from a specified address.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param value - The amount to transfer.
   * @returns The encoded function data.
   */
  public encodeTransferFrom(
    from: string,
    to: string,
    value: BigNumberish,
  ): string {
    return this.encodeFunctionData('transferFrom', [from, to, value])
  }

  /**
   * Allows a spender to transfer tokens using a permit.
   * @param owner - The address of the token owner.
   * @param spender - The address of the spender.
   * @param value - The amount to transfer.
   * @param deadline - The deadline timestamp.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('permit', [
      owner,
      spender,
      value,
      deadline,
      v,
      r,
      s,
      overrides,
    ])
  }

  /**
   * Encodes the function data for the permit method.
   * @param owner - The address of the token owner.
   * @param spender - The address of the spender.
   * @param value - The amount to transfer.
   * @param deadline - The deadline timestamp.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodePermit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('permit', [
      owner,
      spender,
      value,
      deadline,
      v,
      r,
      s,
    ])
  }
}
