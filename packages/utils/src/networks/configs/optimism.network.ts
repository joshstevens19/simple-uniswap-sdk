import {
  optimismMainChainId,
  optimismSepoliaChainId,
} from '@chain-toolkit/chains'
import { OptimismNetwork as OptimismNetworkBase } from '@chain-toolkit/networks'
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

export class OptimismNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...OptimismNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.OPTIMISM.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.OPTIMISM.MAINNET(),
      tokens: getAllTokensForChainId(optimismMainChainId),
      multicallContractAddress:
        OptimismNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...OptimismNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.OPTIMISM.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.OPTIMISM.SEPOLIA(),
      tokens: getAllTokensForChainId(optimismSepoliaChainId),
      multicallContractAddress:
        OptimismNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case optimismMainChainId:
        return OptimismNetwork.MAINNET()
      case optimismSepoliaChainId:
        return OptimismNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
