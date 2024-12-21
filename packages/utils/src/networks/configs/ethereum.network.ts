import {
  ethMainChainId,
  ethHoleskyChainId,
  ethSepoliaChainId,
} from '@chain-toolkit/chains'
import { EthereumNetwork as EthereumNetworkBase } from '@chain-toolkit/networks'
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

export class EthereumNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...EthereumNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: ETHCoin.ETH.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ETH.MAINNET(),
      tokens: getAllTokensForChainId(ethMainChainId),
      multicallContractAddress:
        EthereumNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static HOLESKY = (): ChainConfig => {
    return {
      ...EthereumNetworkBase.HOLESKY(),
      ...commonProps,
      nativeCurrency: ETHCoin.ETH.HOLESKY(),
      nativeWrappedTokenInfo: WETHToken.ETH.HOLESKY(),
      tokens: getAllTokensForChainId(ethHoleskyChainId),
      multicallContractAddress:
        EthereumNetworkBase.HOLESKY().contracts.multicall ?? '',
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...EthereumNetworkBase.SEPOLIA(),
      ...commonProps,
      nativeCurrency: ETHCoin.ETH.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ETH.SEPOLIA(),
      tokens: getAllTokensForChainId(ethSepoliaChainId),
      multicallContractAddress:
        EthereumNetworkBase.SEPOLIA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case ethMainChainId:
        return EthereumNetwork.MAINNET()
      case ethHoleskyChainId:
        return EthereumNetwork.HOLESKY()
      case ethSepoliaChainId:
        return EthereumNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
