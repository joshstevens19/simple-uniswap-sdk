import { DexNumber } from '@dex-toolkit/number'
import type {
  IDexProvider,
  DexMulticallProviderContext,
  TradeFormat,
  TradeFormatValue,
  ChainConfig,
  DexCustomNetwork,
  TradeFormatOptions,
  DexProviderContext,
} from '@dex-toolkit/types'
import {
  ErrorCodes,
  getChainConfig,
  DexError,
  isDexAuthenticatedProviderContext,
  isDexChainIdAndProviderContext,
  isEthersProviderContext,
  isDexProvider,
  isEthersSignerContext,
} from '@dex-toolkit/utils'
import { MulticallProvider } from '@ethereum-multicall/provider'
import type { Address, ProviderContext } from '@ethereum-multicall/types'
import { BaseProvider } from '@ethersproject/providers'
import type { Signer } from 'ethers'

export class DexProvider extends MulticallProvider implements IDexProvider {
  _chainConfig: ChainConfig | undefined

  _signer?: Signer | undefined

  constructor(_providerContext: DexProviderContext) {
    if (!_providerContext) {
      throw new DexError(
        'providerContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    _providerContext.tryAggregate = _providerContext.tryAggregate ?? true

    if (isDexAuthenticatedProviderContext(_providerContext)) {
      const { chainId, providerType, apiKey } = _providerContext

      if (!chainId) {
        throw new DexError(
          'chainId is required',
          ErrorCodes.functionArgumentError,
        )
      }

      if (!providerType) {
        throw new DexError(
          'providerType is required',
          ErrorCodes.functionArgumentError,
        )
      }

      if (!apiKey) {
        throw new DexError(
          'apiKey is required',
          ErrorCodes.functionArgumentError,
        )
      }

      const chainConfig = getChainConfig(chainId)

      if (!chainConfig) {
        throw new DexError(
          `Cannot find chain configuration for chainId ${chainId}`,
          ErrorCodes.canNotFindChainId,
        )
      }

      const providerConfig = chainConfig.nodes?.authenticated?.[providerType]

      if (!providerConfig) {
        throw new DexError(
          `Unable to find provider configuration for chainId ${chainId} and providerType ${providerType}`,
          ErrorCodes.canNotFindChainId,
        )
      }

      const urlWithSlash = providerConfig.url.endsWith('/')
        ? providerConfig.url
        : `${providerConfig.url}/`

      const rpcUrl = `${urlWithSlash}${apiKey}`

      const providerContextWithRpc: ProviderContext = {
        ..._providerContext,
        rpcUrl,
      }

      super(providerContextWithRpc)

      this._providerContext = providerContextWithRpc

      this._chainConfig = getChainConfig(chainId)
    } else if (isDexChainIdAndProviderContext(_providerContext)) {
      const { chainId, rpcUrl } = _providerContext

      if (!chainId) {
        throw new DexError(
          'chainId is required',
          ErrorCodes.functionArgumentError,
        )
      }

      const chainConfig = getChainConfig(chainId)

      if (!chainConfig) {
        throw new DexError(
          `Cannot find chain configuration for chainId ${chainId}`,
          ErrorCodes.canNotFindChainId,
        )
      }

      let url = rpcUrl

      // If a rpcUrl is not provided, attempt to get it from chainConfig
      if (!url) {
        url = chainConfig.nodes.public?.[0]?.url

        if (!url) {
          throw new DexError(
            `Cannot find an RPC URL for chainId ${chainId}. Provide a 'rpcUrl' along with the 'chainId'.`,
            ErrorCodes.canNotFindChainId,
          )
        }
      }

      const providerContextWithRpc: ProviderContext = {
        ..._providerContext,
        rpcUrl: url,
      }

      super(providerContextWithRpc)

      this._providerContext = providerContextWithRpc

      this._chainConfig = chainConfig
    } else if (isEthersProviderContext(_providerContext)) {
      super(_providerContext)

      this._providerContext = _providerContext

      const network = this._ethersProvider.network
      if (!network || !network.chainId) {
        throw new DexError(
          'Unable to determine chainId from ethersProvider',
          ErrorCodes.invalidDexProviderContext,
        )
      }

      this._chainConfig = getChainConfig(network.chainId)
    } else if (isEthersSignerContext(_providerContext)) {
      const signer = _providerContext.ethersSigner

      if (!signer) {
        throw new DexError(
          'ethersSigner is required',
          ErrorCodes.functionArgumentError,
        )
      }

      if (!signer.provider || !(signer.provider instanceof BaseProvider)) {
        throw new DexError(
          'ethersSigner must have a provider attached',
          ErrorCodes.functionArgumentError,
        )
      }

      const providerContextWithSigner: ProviderContext = {
        ..._providerContext,
        ethersProvider: signer.provider,
      }

      super(providerContextWithSigner)

      this._signer = signer

      this._providerContext = providerContextWithSigner

      const network = this._ethersProvider.network
      if (!network || !network.chainId) {
        throw new DexError(
          'Unable to determine chainId from ethersProvider',
          ErrorCodes.invalidDexProviderContext,
        )
      }

      this._chainConfig = getChainConfig(network.chainId)
    } else {
      throw new DexError(
        'Unable to determine provider context. Please check the `ProviderContext` type to see what properties are required.',
        ErrorCodes.invalidDexProviderContext,
      )
    }

    if (!this._chainConfig && !this._providerContext.customNetwork) {
      throw new DexError(
        `Unable to find chain configuration for chainId ${this.network.chainId}`,
        ErrorCodes.canNotFindChainId,
      )
    }
  }

  public get signer(): Signer | undefined {
    return this._signer
  }

  public get chainConfig(): ChainConfig | undefined {
    return this._chainConfig
  }

  override get customNetwork(): DexCustomNetwork | undefined {
    return this._providerContext.customNetwork as DexCustomNetwork
  }

  public get chainName(): string {
    if (this._providerContext.customNetwork) {
      return this._providerContext.customNetwork.name
    }

    const chainName = this._chainConfig?.name

    if (!chainName) {
      throw new DexError(
        `Can not find chain name for ${this.network.chainId}`,
        ErrorCodes.canNotFindChainId,
      )
    }

    return chainName
  }

  public async getCoinBalance<TFormat extends TradeFormat>({
    walletAddress,
    format,
  }: {
    walletAddress: Address
    format: TradeFormatOptions<TFormat>
  }): Promise<TradeFormatValue<TFormat>> {
    const balance = await this._ethersProvider.getBalance(walletAddress)
    const decimals = this._chainConfig?.nativeWrappedTokenInfo?.decimals || 18

    return DexNumber.fromShifted(balance, decimals).toTradeFormat(format)
  }
}

/**
 * Parses the given `dexContext` and returns an instance of `DexProvider`.
 *
 * - If the context already contains an `IDexProvider`, it is returned as is.
 * - If the context includes a chain ID and optional custom network or RPC URL, a new `DexProvider`
 *   is created for that chain.
 * - If the context includes an `ethersProvider`, a new `DexProvider` is created using that provider.
 *
 * @param dexProviderContext - The context which can either be an object with a `dexProvider`, or a `ProviderContext`.
 *
 * @returns An instance of `DexProvider` based on the provided context.
 *
 * @throws DexError - Throws an error if the `dexContext` is not supported, or if the chain ID provided is unsupported.
 */
export function parseDexProviderFromContext(
  dexProviderContext: DexMulticallProviderContext,
): DexProvider {
  if (isDexProvider(dexProviderContext)) {
    return dexProviderContext
  }

  return new DexProvider(dexProviderContext)
}
