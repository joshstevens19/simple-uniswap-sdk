import { avaxMainChainId, avaxFujiChainId } from '@chain-toolkit/chains'
import { AvalancheNetwork as AvalancheNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { AVAXToken } from '../../tokens/configs/avax.token'
import { WAVAXToken } from '../../tokens/configs/wavax.token'
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

export class AvalancheNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...AvalancheNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: AVAXToken.AVALANCHE.MAINNET(),
      nativeWrappedTokenInfo: WAVAXToken.AVALANCHE.MAINNET(),
      tokens: getAllTokensForChainId(avaxMainChainId),
      multicallContractAddress:
        AvalancheNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static FUJI = (): ChainConfig => {
    return {
      ...AvalancheNetworkBase.FUJI(),
      ...commonProps,
      nativeCurrency: AVAXToken.AVALANCHE.FUJI(),
      nativeWrappedTokenInfo: WAVAXToken.AVALANCHE.FUJI(),
      tokens: getAllTokensForChainId(avaxFujiChainId),
      multicallContractAddress:
        AvalancheNetworkBase.FUJI().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return AvalancheNetwork.MAINNET()
      case avaxFujiChainId:
        return AvalancheNetwork.FUJI()
      default:
        return undefined
    }
  }
}
