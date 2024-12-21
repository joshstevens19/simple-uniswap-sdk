import type { ChainConfig as ChainConfigBase } from '@chain-toolkit/schemas'
import type { JsonFragment } from '@ethersproject/abi'

import type {
  Standard1155,
  Standard20,
  Standard721,
  Standard777,
} from './standard.types'
import type { Token } from './token.types'
import type { DexCustomNetwork } from './trade.types'

/**
 * Complete configuration for a blockchain network.
 * This configuration type contains all necessary information to interact with a blockchain,
 * including network details, available nodes, supported standards, and UI-related information.
 */
export type ChainConfig = Omit<Required<DexCustomNetwork>, 'nativeCurrency'> &
  Omit<ChainConfigBase, 'nativeCurrency'> & {
    // DexCustomNetwork/chain-toolkit overrides
    nativeCurrency: Token

    // Standards
    standards: {
      token20: {
        standard: Standard20
        abi: JsonFragment[]
      }
      token721: {
        standard: Standard721
        abi: JsonFragment[]
      }
      token777: {
        standard: Standard777
        abi: JsonFragment[]
      }
      token1155: {
        standard: Standard1155
        abi: JsonFragment[]
      }
    }
  }
