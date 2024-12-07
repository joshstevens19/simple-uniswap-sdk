import type { Address, ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  arbitrumSepoliaChainId,
  avaxFujiChainId,
  avaxMainChainId,
  bscMainChainId,
  bscTestChainId,
  celoAlfajoresChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  optimismSepoliaChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
} from '../../chains/chainIds'
import { getAddress, isAddress, isCoinAddress } from '../../utils/address.utils'

/**
 * Get image URL from PulseX
 *
 * @param tokenContractAddress The contract address of the token
 *
 * @returns The URL of the token image
 */
export function getImageUrlFromPulseX({
  tokenContractAddress,
}: {
  tokenContractAddress: Address
}): string {
  return `https://tokens.app.pulsex.com/images/tokens/${tokenContractAddress}.png`
}

function getChainKey(chainId: ChainId) {
  switch (chainId) {
    // ARBITRUM
    case arbitrumMainChainId:
      return 'arbitrum'
    case arbitrumSepoliaChainId:
      return 'arbitrum'

    // AVAX
    case avaxMainChainId:
      return 'avalanchec'
    case avaxFujiChainId:
      return 'avalanchecfuji'

    // BSC
    case bscMainChainId:
      return 'smartchain'
    case bscTestChainId:
      return 'smartchain'

    // CELO
    case celoMainChainId:
      return 'celo'
    case celoAlfajoresChainId:
      return 'celo'

    // ETH
    case ethMainChainId:
      return 'ethereum'
    case ethSepoliaChainId:
      return 'sepolia'

    // OPTIMISM
    case optimismMainChainId:
      return 'optimism'
    case optimismSepoliaChainId:
      return 'optimism'

    // POLYGON
    case polygonMainChainId:
      return 'polygon'

    // PLS
    case plsMainChainId:
      return 'pulse'
    case plsTestChainId:
      return 'pulse'

    default:
      return undefined
  }
}

/**
 * Returns the URL for the token image of a given contract address and chain ID.
 * [TrustWallet](https://github.com/trustwallet/assets/tree/master/blockchains)
 *
 * @param params - The parameters required to get the token image URL.
 * @param params.tokenContractAddress The contract address of the token
 * @param params.tokenContractChainId The chain ID of the token contract
 *
 * @returns The URL of the token image
 */
export function getImageUrlForToken({
  tokenContractAddress,
  tokenContractChainId,
}: {
  tokenContractAddress?: Address
  tokenContractChainId?: ChainId
}) {
  if (!tokenContractChainId) return undefined

  // Only allow Pulse Mainnet to get images from PulseX
  if (plsMainChainId === tokenContractChainId) {
    if (!tokenContractAddress) {
      const wplsAddress = '0xA1077a294dDE1B09bB078844df40758a5D0f9a27'
      return getImageUrlFromPulseX({
        tokenContractAddress: wplsAddress,
      })
    }

    return getImageUrlFromPulseX({ tokenContractAddress })
  }

  const chainKey = getChainKey(tokenContractChainId)

  if (
    chainKey &&
    tokenContractAddress &&
    !isCoinAddress(tokenContractAddress) &&
    isAddress(tokenContractAddress)
  ) {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainKey}/assets/${getAddress(
      tokenContractAddress,
    )}/logo.png`
  }

  if (chainKey) {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainKey}/info/logo.png`
  }

  return undefined
}
