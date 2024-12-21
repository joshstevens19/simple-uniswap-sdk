import { celoMainChainId, celoAlfajoresChainId } from '@chain-toolkit/chains'
import { CeloNetwork as CeloNetworkBase } from '@chain-toolkit/networks'
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

export class CeloNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...CeloNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.CELO.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.CELO.MAINNET(),
      tokens: getAllTokensForChainId(celoMainChainId),
      multicallContractAddress:
        CeloNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static ALFAJORES = (): ChainConfig => {
    return {
      ...CeloNetworkBase.ALFAJORES(),
      ...commonProps,
      nativeCurrency: ETHCoin.CELO.ALFAJORES(),
      nativeWrappedTokenInfo: WETHToken.CELO.ALFAJORES(),
      tokens: getAllTokensForChainId(celoAlfajoresChainId),
      multicallContractAddress:
        CeloNetworkBase.ALFAJORES().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case celoMainChainId:
        return CeloNetwork.MAINNET()
      case celoAlfajoresChainId:
        return CeloNetwork.ALFAJORES()
      default:
        return undefined
    }
  }
}
