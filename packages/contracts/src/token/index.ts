import type { DexMulticallProviderContext } from '@dex-toolkit/types'
import type { ContractDetailToken } from '@ethereum-multicall/types'

import { Erc1155Contract } from './erc1155.contract'
import { Erc20Contract } from './erc20.contract'
import { Erc721Contract } from './erc721.contract'
import { Erc777Contract } from './erc777.contract'

// Token
export { Erc20Contract } from './erc20.contract'
export { Erc777Contract } from './erc777.contract'

// NFT
export { Erc721Contract } from './erc721.contract'
export { Erc1155Contract } from './erc1155.contract'

/**
 * A map of token standard to contract class.
 */
export type ContractMap = {
  ERC20: Erc20Contract
  ERC777: Erc777Contract
  ERC721: Erc721Contract
  ERC1155: Erc1155Contract
}

/**
 * The type of the contract class based on the provided standard.
 */
export type ContractForStandard<S extends keyof ContractMap> = ContractMap[S]

/**
 * Returns an instance of a contract class based on the provided standard.
 *
 * @param standard - The token standard, such as ERC20, ERC777, ERC721, or ERC1155.
 * @param dexProviderContext - The context containing provider information.
 * @param contractDetail - The contract details, including address and ABI.
 *
 * @returns An instance of the corresponding contract class based on the token standard.
 * @throws If an unsupported standard is provided.
 */
export function getContractForStandard<S extends keyof ContractMap>(
  standard: S,
  dexProviderContext: DexMulticallProviderContext,
  contractDetail: ContractDetailToken,
): ContractForStandard<S> {
  switch (standard) {
    case 'ERC20':
      return new Erc20Contract(
        dexProviderContext,
        contractDetail,
      ) as ContractForStandard<S>
    case 'ERC777':
      return new Erc777Contract(
        dexProviderContext,
        contractDetail,
      ) as ContractForStandard<S>
    case 'ERC721':
      return new Erc721Contract(
        dexProviderContext,
        contractDetail,
      ) as ContractForStandard<S>
    case 'ERC1155':
      return new Erc1155Contract(
        dexProviderContext,
        contractDetail,
      ) as ContractForStandard<S>
    default:
      throw new Error(`Unsupported standard: ${standard}`)
  }
}
