import { zoraMainChainId, zoraSepoliaChainId } from '@chain-toolkit/chains'
import { ZoraNetwork as ZoraNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getAllTokensForChainId } from '../../utils/token.utils'

const commonProps: Pick<ChainConfig, 'standards'> = {
  standards: {
    token20: {
      standard: 'ERC20',
      abi: erc20ABI,
    },
    token721: {
      standard: 'ERC721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'ERC777',
      abi: erc777ABI,
    },
    token1155: {
      standard: 'ERC1155',
      abi: erc1155ABI,
    },
  },
}

export class ZoraNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...ZoraNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.ZORA.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ZORA.MAINNET(),
      tokens: getAllTokensForChainId(zoraMainChainId),
      multicallContractAddress:
        ZoraNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...ZoraNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.ZORA.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ZORA.SEPOLIA(),
      tokens: getAllTokensForChainId(zoraSepoliaChainId),
      multicallContractAddress:
        ZoraNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zoraMainChainId:
        return ZoraNetwork.MAINNET()
      case zoraSepoliaChainId:
        return ZoraNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
