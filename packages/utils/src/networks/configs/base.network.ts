import { baseMainChainId, baseSepoliaChainId } from '@chain-toolkit/chains'
import { BaseNetwork as BaseNetworkBase } from '@chain-toolkit/networks'
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

export class BaseNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...BaseNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.BASE.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.BASE.MAINNET(),
      tokens: getAllTokensForChainId(baseMainChainId),
      multicallContractAddress:
        BaseNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...BaseNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.BASE.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.BASE.SEPOLIA(),
      tokens: getAllTokensForChainId(baseSepoliaChainId),
      multicallContractAddress:
        BaseNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case baseMainChainId:
        return BaseNetwork.MAINNET()
      case baseSepoliaChainId:
        return BaseNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
