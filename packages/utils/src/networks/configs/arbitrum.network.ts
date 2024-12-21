import {
  arbitrumMainChainId,
  arbitrumSepoliaChainId,
} from '@chain-toolkit/chains'
import { ArbitrumNetwork as ArbitrumNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin, WETHToken } from '../../tokens/configs/index'
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

export class ArbitrumNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...ArbitrumNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.ARBITRUM.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ARBITRUM.MAINNET(),
      tokens: getAllTokensForChainId(arbitrumMainChainId),
      multicallContractAddress:
        ArbitrumNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...ArbitrumNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.ARBITRUM.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ARBITRUM.SEPOLIA(),
      tokens: getAllTokensForChainId(arbitrumSepoliaChainId),
      multicallContractAddress:
        ArbitrumNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return ArbitrumNetwork.MAINNET()
      case arbitrumSepoliaChainId:
        return ArbitrumNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
