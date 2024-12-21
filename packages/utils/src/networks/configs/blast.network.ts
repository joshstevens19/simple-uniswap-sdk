import { blastMainChainId, blastSepoliaChainId } from '@chain-toolkit/chains'
import { BlastNetwork as BlastNetworkBase } from '@chain-toolkit/networks'
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

export class BlastNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...BlastNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.BLAST.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.BLAST.MAINNET(),
      tokens: getAllTokensForChainId(blastMainChainId),
      multicallContractAddress:
        BlastNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...BlastNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.BLAST.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.BLAST.SEPOLIA(),
      tokens: getAllTokensForChainId(blastSepoliaChainId),
      multicallContractAddress:
        BlastNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case blastMainChainId:
        return BlastNetwork.MAINNET()
      case blastSepoliaChainId:
        return BlastNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
