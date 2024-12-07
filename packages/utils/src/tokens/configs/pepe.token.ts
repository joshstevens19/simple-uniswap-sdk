import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  arbitrumMainChainId,
  baseMainChainId,
  bscMainChainId,
  ethMainChainId,
  plsMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class PEPEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Pepe',
    symbol: 'PEPE',
    decimals: 18,
    color: 'rgb(76, 149, 65)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...PEPEToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...PEPEToken.commonProps,
        chainId: baseMainChainId,
        name: 'BasedPepe',
        contractAddress: '0x52b492a33E447Cdb854c7FC19F1e57E8BfA1777D',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x52b492a33E447Cdb854c7FC19F1e57E8BfA1777D',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...PEPEToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...PEPEToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...PEPEToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return PEPEToken.ARBITRUM.MAINNET()
      case baseMainChainId:
        return PEPEToken.BASE.MAINNET()
      case bscMainChainId:
        return PEPEToken.BSC.MAINNET()
      case ethMainChainId:
        return PEPEToken.ETH.MAINNET()
      case plsMainChainId:
        return PEPEToken.PULSE.MAINNET()
      default:
        return undefined
    }
  }
}
