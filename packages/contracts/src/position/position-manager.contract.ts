import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  UniswapPositionManagerV3Types,
  ContractDetailContext,
  DexMulticallProviderContext,
  ContractTransactionOverrides,
} from '@dex-toolkit/types'
import {
  assertChainId,
  assertDexConfigBase,
  assertDexType,
  assertProtocol,
  assertVersion,
  defaultPositionManagerMethodMapV3,
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
import type {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractTransaction,
} from 'ethers'
import { isBytesLike } from 'ethers/lib/utils'

export class PositionManagerContractV3
  extends DexProviderBase
  implements UniswapPositionManagerV3Types.Contract
{
  protected _contract: UniswapPositionManagerV3Types.ContractContext

  protected _methodNames: UniswapPositionManagerV3Types.MethodNameMap

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

      const contractDetail = contractDetails.positionManager
      if (!contractDetail) {
        throw new DexError(
          `Position manager configuration missing for ${dexType} V3 version ${formatVersionForDisplay(version)}`,
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
      this.dexProvider.getContract<UniswapPositionManagerV3Types.ContractContext>(
        this._contractDetail,
      )
    this._methodNames = {
      ...defaultPositionManagerMethodMapV3,
      ...this._contractDetail.methods,
    }
  }

  /** Get the position manager contract */
  public get positionManagerContract(): UniswapPositionManagerV3Types.ContractContext {
    return this._contract
  }

  /** Get the method names */
  public get methodNames(): UniswapPositionManagerV3Types.MethodNameMap {
    return this._methodNames
  }

  /**
   * Helper function to dynamically invoke a contract method based on custom or default method names.
   * @param methodName - The name of the method to invoke.
   * @param values - An array of values to pass as arguments to the method.
   * @returns The result of the contract method invocation with the appropriate return type.
   */
  private async callContractMethod<T>(
    methodName: UniswapPositionManagerV3Types.MethodNames,
    values?: any[],
  ): Promise<T> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPositionManagerV3Types.ContractContext

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
    methodName: UniswapPositionManagerV3Types.MethodNames,
    values?: any[],
  ): string {
    return this._contract.interface.encodeFunctionData(
      this._methodNames[
        methodName
      ] as UniswapPositionManagerV3Types.MethodNames,
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
      DiscriminatedMethodCalls<UniswapPositionManagerV3Types.Contract>[MethodNames<UniswapPositionManagerV3Types.Contract>]
    >,
    TCustomData = unknown,
  >(
    calls: TCalls,
    customData?: TCustomData,
  ): ContractContext<
    UniswapPositionManagerV3Types.Contract,
    TCalls,
    TCustomData
  > {
    const context: ContractContext<
      UniswapPositionManagerV3Types.Contract,
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
    TMethod extends keyof UniswapPositionManagerV3Types.Contract,
  >(
    methodName: TMethod,
    methodParameters: any[] = [],
  ): MethodCall<UniswapPositionManagerV3Types.Contract, TMethod> {
    const contractMethodName = this._methodNames[
      methodName
    ] as keyof UniswapPositionManagerV3Types.Contract

    if (typeof this._contract[contractMethodName] === 'function') {
      return {
        methodName: contractMethodName,
        methodParameters: methodParameters ?? [],
      } as MethodCall<UniswapPositionManagerV3Types.Contract, TMethod>
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
      DiscriminatedMethodCalls<UniswapPositionManagerV3Types.Contract>[MethodNames<UniswapPositionManagerV3Types.Contract>]
    >,
  >(
    calls: TCalls,
    options: ContractContextOptions = {},
  ): Promise<ExecutionResult<UniswapPositionManagerV3Types.Contract, TCalls>> {
    return super.executeCall<UniswapPositionManagerV3Types.Contract, TCalls>(
      calls,
      options,
    )
  }

  // /**
  //  * Initializes a new instance of the Uniswap V3 position manager contract.
  //  * @param _factory - The address of the factory.
  //  * @param _WETH9 - The address of the WETH9 contract.
  //  * @param _tokenDescriptor_ - The address of the token descriptor.
  //  * @param overrides - Optional transaction overrides.
  //  * @returns The contract transaction.
  //  */
  // public async new(
  //   _factory: string,
  //   _WETH9: string,
  //   _tokenDescriptor_: string,
  //   overrides?: ContractTransactionOverrides,
  // ): Promise<ContractTransaction> {
  //   return this.callContractMethod<ContractTransaction>('new', [
  //     _factory,
  //     _WETH9,
  //     _tokenDescriptor_,
  //     overrides,
  //   ])
  // }

  // /**
  //  * Encodes the function data for initializing a new instance of the Uniswap V3 position manager contract.
  //  * @param _factory - The address of the factory.
  //  * @param _WETH9 - The address of the WETH9 contract.
  //  * @param _tokenDescriptor_ - The address of the token descriptor.
  //  * @returns The encoded function data.
  //  */
  // public encodeNew(
  //   _factory: string,
  //   _WETH9: string,
  //   _tokenDescriptor_: string,
  // ): string {
  //   return this.encodeFunctionData('new', [_factory, _WETH9, _tokenDescriptor_])
  // }

  /**
   * Returns the DOMAIN_SEPARATOR used in the permit function.
   * @returns The DOMAIN_SEPARATOR.
   */
  public async DOMAIN_SEPARATOR(): Promise<string> {
    return this.callContractMethod<string>('DOMAIN_SEPARATOR', [])
  }

  /**
   * Returns the call context for the DOMAIN_SEPARATOR method.
   * @returns The call context.
   */
  public DOMAIN_SEPARATORCallContext(): MethodCall<
    UniswapPositionManagerV3Types.Contract,
    'DOMAIN_SEPARATOR'
  > {
    return this.prepareCallContext('DOMAIN_SEPARATOR', [])
  }

  /**
   * Returns the PERMIT_TYPEHASH used in the permit function.
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
    UniswapPositionManagerV3Types.Contract,
    'PERMIT_TYPEHASH'
  > {
    return this.prepareCallContext('PERMIT_TYPEHASH', [])
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
    UniswapPositionManagerV3Types.Contract,
    'WETH9'
  > {
    return this.prepareCallContext('WETH9', [])
  }

  /**
   * Approves a spender to transfer a specific NFT.
   * @param to - The address to approve.
   * @param tokenId - The ID of the token to approve.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('approve', [
      to,
      tokenId,
      overrides,
    ])
  }

  /**
   * Encodes the function data for approving a spender to transfer a specific NFT.
   * @param to - The address to approve.
   * @param tokenId - The ID of the token to approve.
   * @returns The encoded function data.
   */
  public encodeApprove(to: string, tokenId: BigNumberish): string {
    return this.encodeFunctionData('approve', [to, tokenId])
  }

  /**
   * Returns the number of tokens owned by an address.
   * @param owner - The address to check.
   * @returns The number of tokens owned.
   */
  public async balanceOf(owner: string): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('balanceOf', [owner])
  }

  /**
   * Returns the call context for the balanceOf method.
   * @param owner - The address to check.
   * @returns The call context.
   */
  public balanceOfCallContext(
    owner: string,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'balanceOf'> {
    return this.prepareCallContext('balanceOf', [owner])
  }

  /**
   * Returns the base URI for computing {tokenURI}.
   * @returns The base URI.
   */
  public async baseURI(): Promise<string> {
    return this.callContractMethod<string>('baseURI', [])
  }

  /**
   * Returns the call context for the baseURI method.
   * @returns The call context.
   */
  public baseURICallContext(): MethodCall<
    UniswapPositionManagerV3Types.Contract,
    'baseURI'
  > {
    return this.prepareCallContext('baseURI', [])
  }

  /**
   * Burns a token.
   * @param tokenId - The ID of the token to burn.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async burn(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('burn', [
      tokenId,
      overrides,
    ])
  }

  /**
   * Encodes the function data for burning a token.
   * @param tokenId - The ID of the token to burn.
   * @returns The encoded function data.
   */
  public encodeBurn(tokenId: BigNumberish): string {
    return this.encodeFunctionData('burn', [tokenId])
  }

  /**
   * Collects tokens owed to a specific position.
   * @param params - The parameters for collecting tokens.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async collect(
    params: UniswapPositionManagerV3Types.CollectParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('collect', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for collecting tokens owed to a specific position.
   * @param params - The parameters for collecting tokens.
   * @returns The encoded function data.
   */
  public encodeCollect(
    params: UniswapPositionManagerV3Types.CollectParamsRequest,
  ): string {
    return this.encodeFunctionData('collect', [params])
  }

  /**
   * Creates and initializes a pool if necessary.
   * @param token0 - The address of the first token.
   * @param token1 - The address of the second token.
   * @param fee - The fee tier of the pool.
   * @param sqrtPriceX96 - The initial square root price of the pool.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async createAndInitializePoolIfNecessary(
    token0: string,
    token1: string,
    fee: BigNumberish,
    sqrtPriceX96: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'createAndInitializePoolIfNecessary',
      [token0, token1, fee, sqrtPriceX96, overrides],
    )
  }

  /**
   * Encodes the function data for creating and initializing a pool if necessary.
   * @param token0 - The address of the first token.
   * @param token1 - The address of the second token.
   * @param fee - The fee tier of the pool.
   * @param sqrtPriceX96 - The initial square root price of the pool.
   * @returns The encoded function data.
   */
  public encodeCreateAndInitializePoolIfNecessary(
    token0: string,
    token1: string,
    fee: BigNumberish,
    sqrtPriceX96: BigNumberish,
  ): string {
    return this.encodeFunctionData('createAndInitializePoolIfNecessary', [
      token0,
      token1,
      fee,
      sqrtPriceX96,
    ])
  }

  /**
   * Decreases the liquidity of a position.
   * @param params - The parameters for decreasing liquidity.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async decreaseLiquidity(
    params: UniswapPositionManagerV3Types.DecreaseLiquidityParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('decreaseLiquidity', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for decreasing the liquidity of a position.
   * @param params - The parameters for decreasing liquidity.
   * @returns The encoded function data.
   */
  public encodeDecreaseLiquidity(
    params: UniswapPositionManagerV3Types.DecreaseLiquidityParamsRequest,
  ): string {
    return this.encodeFunctionData('decreaseLiquidity', [params])
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
    UniswapPositionManagerV3Types.Contract,
    'factory'
  > {
    return this.prepareCallContext('factory', [])
  }

  /**
   * Returns the approved address for a token ID, or zero if no address set.
   * @param tokenId - The ID of the token to query.
   * @returns The currently approved address for this token.
   */
  public async getApproved(tokenId: BigNumberish): Promise<string> {
    return this.callContractMethod<string>('getApproved', [tokenId])
  }

  /**
   * Returns the call context for the getApproved method.
   * @param tokenId - The ID of the token to query.
   * @returns The call context.
   */
  public getApprovedCallContext(
    tokenId: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'getApproved'> {
    return this.prepareCallContext('getApproved', [tokenId])
  }

  /**
   * Increases the liquidity of a position.
   * @param params - The parameters for increasing liquidity.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async increaseLiquidity(
    params: UniswapPositionManagerV3Types.IncreaseLiquidityParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('increaseLiquidity', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for increasing the liquidity of a position.
   * @param params - The parameters for increasing liquidity.
   * @returns The encoded function data.
   */
  public encodeIncreaseLiquidity(
    params: UniswapPositionManagerV3Types.IncreaseLiquidityParamsRequest,
  ): string {
    return this.encodeFunctionData('increaseLiquidity', [params])
  }

  /**
   * Returns if an address is approved to manage all of the assets of another address.
   * @param owner - The address that owns the assets.
   * @param operator - The address that acts on behalf of the owner.
   * @returns True if `operator` is an approved operator for `owner`, false otherwise.
   */
  public async isApprovedForAll(
    owner: string,
    operator: string,
  ): Promise<boolean> {
    return this.callContractMethod<boolean>('isApprovedForAll', [
      owner,
      operator,
    ])
  }

  /**
   * Returns the call context for the isApprovedForAll method.
   * @param owner - The address that owns the assets.
   * @param operator - The address that acts on behalf of the owner.
   * @returns The call context.
   */
  public isApprovedForAllCallContext(
    owner: string,
    operator: string,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'isApprovedForAll'> {
    return this.prepareCallContext('isApprovedForAll', [owner, operator])
  }

  /**
   * Creates a new pool if it does not exist, then initializes if not initialized.
   * @param params - The parameters for minting a position.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async mint(
    params: UniswapPositionManagerV3Types.MintParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('mint', [
      params,
      overrides,
    ])
  }

  /**
   * Encodes the function data for minting a new position.
   * @param params - The parameters for minting a position.
   * @returns The encoded function data.
   */
  public encodeMint(
    params: UniswapPositionManagerV3Types.MintParamsRequest,
  ): string {
    return this.encodeFunctionData('mint', [params])
  }

  /**
   * Executes multiple method calls in a single transaction.
   * @param data - An array of encoded function calls.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async multicall(
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('multicall', [
      data,
      overrides,
    ])
  }

  /**
   * Encodes the function data for executing multiple method calls in a single transaction.
   * @param data - An array of encoded function calls.
   * @returns The encoded function data.
   */
  public encodeMulticall(data: BytesLike[]): string {
    return this.encodeFunctionData('multicall', [data])
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
  public nameCallContext(): MethodCall<
    UniswapPositionManagerV3Types.Contract,
    'name'
  > {
    return this.prepareCallContext('name', [])
  }

  /**
   * Returns the owner of the token.
   * @param tokenId - The ID of the token to query.
   * @returns The address of the owner of the token.
   */
  public async ownerOf(tokenId: BigNumberish): Promise<string> {
    return this.callContractMethod<string>('ownerOf', [tokenId])
  }

  /**
   * Returns the call context for the ownerOf method.
   * @param tokenId - The ID of the token to query.
   * @returns The call context.
   */
  public ownerOfCallContext(
    tokenId: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'ownerOf'> {
    return this.prepareCallContext('ownerOf', [tokenId])
  }

  /**
   * Permit a spender to manage a token.
   * @param spender - The address that will be approved.
   * @param tokenId - The ID of the token to approve.
   * @param deadline - The deadline timestamp by which the call must be mined.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async permit(
    spender: string,
    tokenId: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('permit', [
      spender,
      tokenId,
      deadline,
      v,
      r,
      s,
      overrides,
    ])
  }

  /**
   * Encodes the function data for permitting a spender to manage a token.
   * @param spender - The address that will be approved.
   * @param tokenId - The ID of the token to approve.
   * @param deadline - The deadline timestamp by which the call must be mined.
   * @param v - The recovery byte of the signature.
   * @param r - The first 32 bytes of the signature.
   * @param s - The second 32 bytes of the signature.
   * @returns The encoded function data.
   */
  public encodePermit(
    spender: string,
    tokenId: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
  ): string {
    return this.encodeFunctionData('permit', [
      spender,
      tokenId,
      deadline,
      v,
      r,
      s,
    ])
  }

  /**
   * Returns the position information associated with a given token ID.
   * @param tokenId - The ID of the token that represents the position.
   * @returns The position information.
   */
  public async positions(
    tokenId: BigNumberish,
  ): Promise<UniswapPositionManagerV3Types.PositionsResponse> {
    return this.callContractMethod<UniswapPositionManagerV3Types.PositionsResponse>(
      'positions',
      [tokenId],
    )
  }

  /**
   * Returns the call context for the positions method.
   * @param tokenId - The ID of the token that represents the position.
   * @returns The call context.
   */
  public positionsCallContext(
    tokenId: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'positions'> {
    return this.prepareCallContext('positions', [tokenId])
  }

  /**
   * Refunds any ETH balance held by this contract to the `msg.sender`.
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
   * Encodes the function data for refunding any ETH balance held by this contract.
   * @returns The encoded function data.
   */
  public encodeRefundETH(): string {
    return this.encodeFunctionData('refundETH', [])
  }

  /**
   * Safely transfers a token from one address to another.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param tokenId - The token ID to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  /**
   * Safely transfers a token from one address to another with additional data.
   * @param from - The address to transfer from.
   * @param to - The address to transfer to.
   * @param tokenId - The token ID to transfer.
   * @param data - Additional data to include with the transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>

  public async safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    dataOrOverrides?: BytesLike | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    if (
      typeof dataOrOverrides === 'string' ||
      dataOrOverrides instanceof Uint8Array ||
      isBytesLike(dataOrOverrides)
    ) {
      return this.callContractMethod<ContractTransaction>(
        'safeTransferFrom(address,address,uint256,bytes)' as UniswapPositionManagerV3Types.MethodNames,
        [from, to, tokenId, dataOrOverrides, overrides],
      )
    }

    return this.callContractMethod<ContractTransaction>('safeTransferFrom', [
      from,
      to,
      tokenId,
      dataOrOverrides,
    ])
  }

  /**
   * Encodes the function data for the `safeTransferFrom` method without additional data.
   * @param from - The address to transfer the token from.
   * @param to - The address to transfer the token to.
   * @param tokenId - The ID of the token to transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The encoded function data as a string.
   */
  public encodeSafeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): string

  /**
   * Encodes the function data for the `safeTransferFrom` method with additional data.
   * @param from - The address to transfer the token from.
   * @param to - The address to transfer the token to.
   * @param tokenId - The ID of the token to transfer.
   * @param data - Additional data to include with the transfer.
   * @param overrides - Optional transaction overrides.
   * @returns The encoded function data as a string.
   */
  public encodeSafeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): string

  public encodeSafeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    dataOrOverrides?: BytesLike | ContractTransactionOverrides,
    overrides?: ContractTransactionOverrides,
  ): string {
    if (
      typeof dataOrOverrides === 'string' ||
      dataOrOverrides instanceof Uint8Array ||
      isBytesLike(dataOrOverrides)
    ) {
      // Overload with data parameter
      const suffix = `(address,address,uint256,bytes)`
      const functionSignature = `${this.methodNames['safeTransferFrom']}${suffix}`
      const data = dataOrOverrides

      return this._contract.interface.encodeFunctionData(
        functionSignature as UniswapPositionManagerV3Types.MethodNames,
        [from, to, tokenId, data, overrides],
      )
    } else {
      // Overload without data parameter
      const suffix = `(address,address,uint256)`
      const functionSignature = `${this.methodNames['safeTransferFrom']}${suffix}`

      return this._contract.interface.encodeFunctionData(
        functionSignature as UniswapPositionManagerV3Types.MethodNames,
        [from, to, tokenId, dataOrOverrides],
      )
    }
  }

  /**
   * Encodes the function data for safely transferring the ownership of a given token ID with additional data.
   * @param from - The current owner of the token.
   * @param to - The address to receive the ownership of the given token ID.
   * @param tokenId - The ID of the token to be transferred.
   * @param _data - Additional data with no specified format to be sent along with the transfer.
   * @returns The encoded function data.
   */
  public encodeSafeTransferFromWithData(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
  ): string {
    return this.encodeFunctionData('safeTransferFrom', [
      from,
      to,
      tokenId,
      _data,
    ])
  }

  /**
   * Approves a token transfer on behalf of the user.
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
   * Encodes the function data for approving a token transfer on behalf of the user.
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
   * Approves a token allowance on behalf of the user.
   * @param token - The address of the token.
   * @param nonce - The current nonce of the owner.
   * @param expiry - The timestamp at which the permit expires.
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
   * Encodes the function data for approving a token allowance on behalf of the user.
   * @param token - The address of the token.
   * @param nonce - The current nonce of the owner.
   * @param expiry - The timestamp at which the permit expires.
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
   * Approves a token allowance on behalf of the user if necessary.
   * @param token - The address of the token.
   * @param nonce - The current nonce of the owner.
   * @param expiry - The timestamp at which the permit expires.
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
   * Encodes the function data for approving a token allowance on behalf of the user if necessary.
   * @param token - The address of the token.
   * @param nonce - The current nonce of the owner.
   * @param expiry - The timestamp at which the permit expires.
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
   * Approves a token transfer on behalf of the user if necessary.
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
   * Encodes the function data for approving a token transfer on behalf of the user if necessary.
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
   * Sets or unsets the approval of a given operator.
   * @param operator - Address to set the approval for.
   * @param approved - True if the operator is approved, false to revoke approval.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
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
   * Encodes the function data for setting or unsetting the approval of a given operator.
   * @param operator - Address to set the approval for.
   * @param approved - True if the operator is approved, false to revoke approval.
   * @returns The encoded function data.
   */
  public encodeSetApprovalForAll(operator: string, approved: boolean): string {
    return this.encodeFunctionData('setApprovalForAll', [operator, approved])
  }

  /**
   * Returns true if this contract implements the interface defined by `interfaceId`.
   * @param interfaceId - The interface identifier, as specified in ERC-165.
   * @returns True if the contract implements `interfaceId`.
   */
  public async supportsInterface(interfaceId: BytesLike): Promise<boolean> {
    return this.callContractMethod<boolean>('supportsInterface', [interfaceId])
  }

  /**
   * Returns the call context for the supportsInterface method.
   * @param interfaceId - The interface identifier, as specified in ERC-165.
   * @returns The call context.
   */
  public supportsInterfaceCallContext(
    interfaceId: BytesLike,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'supportsInterface'> {
    return this.prepareCallContext('supportsInterface', [interfaceId])
  }

  /**
   * Sweeps tokens to a recipient address.
   * @param token - The address of the token to sweep.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param recipient - The address that will receive the tokens.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('sweepToken', [
      token,
      amountMinimum,
      recipient,
      overrides,
    ])
  }

  /**
   * Encodes the function data for sweeping tokens to a recipient address.
   * @param token - The address of the token to sweep.
   * @param amountMinimum - The minimum amount of tokens to sweep.
   * @param recipient - The address that will receive the tokens.
   * @returns The encoded function data.
   */
  public encodeSweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
  ): string {
    return this.encodeFunctionData('sweepToken', [
      token,
      amountMinimum,
      recipient,
    ])
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
    UniswapPositionManagerV3Types.Contract,
    'symbol'
  > {
    return this.prepareCallContext('symbol', [])
  }

  /**
   * Returns a token ID at a given index of all the tokens stored by the contract.
   * @param index - A counter less than `totalSupply()`.
   * @returns The token ID at the given index of all the tokens stored by the contract.
   */
  public async tokenByIndex(index: BigNumberish): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('tokenByIndex', [index])
  }

  /**
   * Returns the call context for the tokenByIndex method.
   * @param index - A counter less than `totalSupply()`.
   * @returns The call context.
   */
  public tokenByIndexCallContext(
    index: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'tokenByIndex'> {
    return this.prepareCallContext('tokenByIndex', [index])
  }

  /**
   * Returns a token ID owned by `owner` at a given `index` of its token list.
   * @param owner - The address that owns the tokens.
   * @param index - A counter less than `balanceOf(owner)`.
   * @returns The token ID owned by `owner` at the given `index` of its token list.
   */
  public async tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
  ): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('tokenOfOwnerByIndex', [
      owner,
      index,
    ])
  }

  /**
   * Returns the call context for the tokenOfOwnerByIndex method.
   * @param owner - The address that owns the tokens.
   * @param index - A counter less than `balanceOf(owner)`.
   * @returns The call context.
   */
  public tokenOfOwnerByIndexCallContext(
    owner: string,
    index: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'tokenOfOwnerByIndex'> {
    return this.prepareCallContext('tokenOfOwnerByIndex', [owner, index])
  }

  /**
   * Returns the Uniform Resource Identifier (URI) for `tokenId` token.
   * @param tokenId - The ID of the token to query.
   * @returns The Uniform Resource Identifier (URI) for `tokenId` token.
   */
  public async tokenURI(tokenId: BigNumberish): Promise<string> {
    return this.callContractMethod<string>('tokenURI', [tokenId])
  }

  /**
   * Returns the call context for the tokenURI method.
   * @param tokenId - The ID of the token to query.
   * @returns The call context.
   */
  public tokenURICallContext(
    tokenId: BigNumberish,
  ): MethodCall<UniswapPositionManagerV3Types.Contract, 'tokenURI'> {
    return this.prepareCallContext('tokenURI', [tokenId])
  }

  /**
   * Returns the total amount of tokens stored by the contract.
   * @returns The total amount of tokens.
   */
  public async totalSupply(): Promise<BigNumber> {
    return this.callContractMethod<BigNumber>('totalSupply', [])
  }

  /**
   * Returns the call context for the totalSupply method.
   * @returns The call context.
   */
  public totalSupplyCallContext(): MethodCall<
    UniswapPositionManagerV3Types.Contract,
    'totalSupply'
  > {
    return this.prepareCallContext('totalSupply', [])
  }

  /**
   * Transfers the ownership of a given token ID to another address.
   * @param from - The current owner of the token.
   * @param to - The address to receive the ownership of the given token ID.
   * @param tokenId - The ID of the token to be transferred.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('transferFrom', [
      from,
      to,
      tokenId,
      overrides,
    ])
  }

  /**
   * Encodes the function data for transferring the ownership of a given token ID.
   * @param from - The current owner of the token.
   * @param to - The address to receive the ownership of the given token ID.
   * @param tokenId - The ID of the token to be transferred.
   * @returns The encoded function data.
   */
  public encodeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
  ): string {
    return this.encodeFunctionData('transferFrom', [from, to, tokenId])
  }

  /**
   * Called to `msg.sender` after minting liquidity to a position from IUniswapV3Pool#mint.
   * @param amount0Owed - The amount of token0 due to the pool for the minted liquidity.
   * @param amount1Owed - The amount of token1 due to the pool for the minted liquidity.
   * @param data - Any data passed through by the caller via the IUniswapV3PoolActions#mint call.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async uniswapV3MintCallback(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>(
      'uniswapV3MintCallback',
      [amount0Owed, amount1Owed, data, overrides],
    )
  }

  /**
   * Encodes the function data for the uniswapV3MintCallback.
   * @param amount0Owed - The amount of token0 due to the pool for the minted liquidity.
   * @param amount1Owed - The amount of token1 due to the pool for the minted liquidity.
   * @param data - Any data passed through by the caller via the IUniswapV3PoolActions#mint call.
   * @returns The encoded function data.
   */
  public encodeUniswapV3MintCallback(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
  ): string {
    return this.encodeFunctionData('uniswapV3MintCallback', [
      amount0Owed,
      amount1Owed,
      data,
    ])
  }

  /**
   * Unwraps the contract's WETH9 balance and sends it to recipient as ETH.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address receiving ETH.
   * @param overrides - Optional transaction overrides.
   * @returns The contract transaction.
   */
  public async unwrapWETH9(
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction> {
    return this.callContractMethod<ContractTransaction>('unwrapWETH9', [
      amountMinimum,
      recipient,
      overrides,
    ])
  }

  /**
   * Encodes the function data for unwrapping the contract's WETH9 balance.
   * @param amountMinimum - The minimum amount of WETH9 to unwrap.
   * @param recipient - The address receiving ETH.
   * @returns The encoded function data.
   */
  public encodeUnwrapWETH9(
    amountMinimum: BigNumberish,
    recipient: string,
  ): string {
    return this.encodeFunctionData('unwrapWETH9', [amountMinimum, recipient])
  }
}
