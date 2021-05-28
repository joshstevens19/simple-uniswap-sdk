import { ethers } from 'ethers';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { isAddress } from '../../common/utils/is-address';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from '../token/tokens.factory';
import {
  UniswapPairContextForChainId,
  UniswapPairContextForProviderUrl,
} from './models/uniswap-pair-contexts';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { UniswapPairFactory } from './uniswap-pair.factory';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _uniswapPairContext:
      | UniswapPairContextForChainId
      | UniswapPairContextForProviderUrl
  ) {
    if (!this._uniswapPairContext.fromTokenContractAddress) {
      throw new UniswapError(
        'Must have a `fromTokenContractAddress` on the context',
        ErrorCodes.fromTokenContractAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.fromTokenContractAddress)) {
      throw new UniswapError(
        '`fromTokenContractAddress` is not a valid contract address',
        ErrorCodes.fromTokenContractAddressNotValid
      );
    }

    this._uniswapPairContext.fromTokenContractAddress = ethers.utils.getAddress(
      this._uniswapPairContext.fromTokenContractAddress
    );

    if (!this._uniswapPairContext.toTokenContractAddress) {
      throw new UniswapError(
        'Must have a `toTokenContractAddress` on the context',
        ErrorCodes.toTokenContractAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.toTokenContractAddress)) {
      throw new UniswapError(
        '`toTokenContractAddress` is not a valid contract address',
        ErrorCodes.toTokenContractAddressNotValid
      );
    }

    this._uniswapPairContext.toTokenContractAddress = ethers.utils.getAddress(
      this._uniswapPairContext.toTokenContractAddress
    );

    if (!this._uniswapPairContext.ethereumAddress) {
      throw new UniswapError(
        'Must have a `ethereumAddress` on the context',
        ErrorCodes.ethereumAddressRequired
      );
    }

    if (!isAddress(this._uniswapPairContext.ethereumAddress)) {
      throw new UniswapError(
        '`ethereumAddress` is not a valid address',
        ErrorCodes.ethereumAddressNotValid
      );
    }

    if (
      Array.isArray(this._uniswapPairContext.uniswapVersions) &&
      this._uniswapPairContext.uniswapVersions.length === 0
    ) {
      throw new UniswapError(
        '`uniswapVersions` must not be an empty array',
        ErrorCodes.uniswapVersionsMustNotBeAnEmptyArray
      );
    }

    this._uniswapPairContext.ethereumAddress = ethers.utils.getAddress(
      this._uniswapPairContext.ethereumAddress
    );

    const chainId = (<UniswapPairContextForChainId>this._uniswapPairContext)
      .chainId;

    const providerUrl = (<UniswapPairContextForProviderUrl>(
      this._uniswapPairContext
    )).providerUrl;

    if (providerUrl && chainId) {
      this._ethersProvider = new EthersProvider(chainId, providerUrl);
      return;
    }

    if (chainId) {
      this._ethersProvider = new EthersProvider(chainId);
      return;
    }

    throw new UniswapError(
      'You must have a chainId on the context.',
      ErrorCodes.youMustSupplyAChainId
    );
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapPairFactory> {
    const tokensFactory = new TokensFactory(this._ethersProvider);
    const tokens = await tokensFactory.getTokens([
      this._uniswapPairContext.fromTokenContractAddress,
      this._uniswapPairContext.toTokenContractAddress,
    ]);

    const uniswapFactoryContext: UniswapPairFactoryContext = {
      fromToken: tokens.find(
        (t) =>
          t.contractAddress ===
          this._uniswapPairContext.fromTokenContractAddress
      )!,
      toToken: tokens.find(
        (t) =>
          t.contractAddress === this._uniswapPairContext.toTokenContractAddress
      )!,
      ethereumAddress: this._uniswapPairContext.ethereumAddress,
      settings: this._uniswapPairContext.settings || new UniswapPairSettings(),
      ethersProvider: this._ethersProvider,
      uniswapVersions: this._uniswapPairContext.uniswapVersions || [
        UniswapVersion.v2,
        UniswapVersion.v3,
      ],
    };

    return new UniswapPairFactory(uniswapFactoryContext);
  }
}
