import { bscMainChainId, bscTestChainId } from '@chain-toolkit/chains'
import { BscNetwork as BscNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { bep20ABI, bep777ABI, erc1155ABI, erc721ABI } from '../../abis/index'
import { BNBToken } from '../../tokens/configs/bnb.token'
import { WBNBToken } from '../../tokens/configs/wbnb.token'
import { getAllTokensForChainId } from '../../utils/token.utils'

const commonProps: Pick<ChainConfig, 'standards'> = {
  standards: {
    token20: {
      standard: 'BEP20',
      abi: bep20ABI,
    },
    token721: {
      standard: 'BEP721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'BEP777',
      abi: bep777ABI,
    },
    token1155: {
      standard: 'BEP1155',
      abi: erc1155ABI,
    },
  },
}

export class BscNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...BscNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: BNBToken.BSC.MAINNET(),
      nativeWrappedTokenInfo: WBNBToken.BSC.MAINNET(),
      tokens: getAllTokensForChainId(bscMainChainId),
      multicallContractAddress:
        BscNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...BscNetworkBase.TESTNET(),
      ...commonProps,
      nativeCurrency: BNBToken.BSC.TESTNET(),
      nativeWrappedTokenInfo: WBNBToken.BSC.TESTNET(),
      tokens: getAllTokensForChainId(bscTestChainId),
      multicallContractAddress:
        BscNetworkBase.TESTNET().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case bscMainChainId:
        return BscNetwork.MAINNET()
      case bscTestChainId:
        return BscNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
