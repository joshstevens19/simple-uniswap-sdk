import { zksyncMainChainId, zksyncSepoliaChainId } from '@chain-toolkit/chains'
import { ZKSyncNetwork as ZKSyncNetworkBase } from '@chain-toolkit/networks'
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

export class ZKSyncNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...ZKSyncNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.ZKSYNC.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ZKSYNC.MAINNET(),
      tokens: getAllTokensForChainId(zksyncMainChainId),
      multicallContractAddress:
        ZKSyncNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...ZKSyncNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.ZKSYNC.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ZKSYNC.SEPOLIA(),
      tokens: getAllTokensForChainId(zksyncSepoliaChainId),
      multicallContractAddress:
        ZKSyncNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zksyncMainChainId:
        return ZKSyncNetwork.MAINNET()
      case zksyncSepoliaChainId:
        return ZKSyncNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
