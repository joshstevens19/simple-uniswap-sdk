import { celoMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

export class CELOToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Celo native asset',
    symbol: 'CELO',
    decimals: 18,
    color: 'rgb(253, 253, 83)',
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...CELOToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0x471EcE3750Da237f93B8E339c536989b8978a438',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case celoMainChainId:
        return CELOToken.CELO.MAINNET()
      default:
        return undefined
    }
  }
}
