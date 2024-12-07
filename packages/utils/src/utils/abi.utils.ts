import type { Standard } from '@dex-toolkit/types'

import bep20ABI from '../abis/bep20.abi'
import bep777ABI from '../abis/bep777.abi'
import erc1155ABI from '../abis/erc1155.abi'
import erc20ABI from '../abis/erc20.abi'
import erc721ABI from '../abis/erc721.abi'
import erc777ABI from '../abis/erc777.abi'
import pulseXABI from '../abis/pulseX-router-v2.abi'
import traderJoeRouterV2ABI from '../abis/traderJoe-router-v2-1-0-0.abi'
import uniswapFactoryV2ABI from '../abis/uniswap-factory-v2.abi'
import uniswapFactoryV3ABI from '../abis/uniswap-factory-v3.abi'
import uniswapPairV2ABI from '../abis/uniswap-pair-v2.abi'
import uniswapQuoterV3ABI from '../abis/uniswap-quoter-v3.abi'
import uniswapRouterVersionV2ABI from '../abis/uniswap-router-v2.abi'
import uniswapRouterVersionV3ABI from '../abis/uniswap-router-v3.abi'
import wrappedABI from '../abis/wrapped.abi'
import yetiSwapRouterV2ABI from '../abis/yetiswap-router-v2.abi'

export function getAbiForStandard(standard: Standard) {
  if (!standard) {
    return undefined
  }

  switch (standard) {
    case 'BEP20':
      return bep20ABI
    case 'PRC20':
    case 'ERC20':
      return erc20ABI
    case 'BEP777':
      return bep777ABI
    case 'PRC777':
    case 'ERC777':
      return erc777ABI
    case 'BEP721':
    case 'PRC721':
    case 'TRC721':
    case 'ERC721':
      return erc721ABI
    case 'BEP1155':
    case 'PRC1155':
    case 'ERC1155':
      return erc1155ABI
    case 'TRC20':
    default:
      return undefined
  }
}

export function getAllAbis() {
  return [
    { name: 'BEP20', abi: bep20ABI },
    { name: 'BEP777', abi: bep777ABI },
    { name: 'ERC20', abi: erc20ABI },
    { name: 'ERC721', abi: erc721ABI },
    { name: 'ERC777', abi: erc777ABI },
    { name: 'ERC1155', abi: erc1155ABI },
    { name: 'PulseX Router', abi: pulseXABI },
    { name: 'Wrapped', abi: wrappedABI },
    { name: 'Trader Joe Router', abi: traderJoeRouterV2ABI },
    { name: 'Uniswap Factory V2', abi: uniswapFactoryV2ABI },
    { name: 'Uniswap Factory V3', abi: uniswapFactoryV3ABI },
    { name: 'Uniswap Pair V2', abi: uniswapPairV2ABI },
    { name: 'Uniswap Quoter V3', abi: uniswapQuoterV3ABI },
    { name: 'Uniswap Router V2', abi: uniswapRouterVersionV2ABI },
    { name: 'Uniswap Router V3', abi: uniswapRouterVersionV3ABI },
    { name: 'YetiSwap Router', abi: yetiSwapRouterV2ABI },
  ]
}

export function getAllTokenAbis() {
  return [
    { name: 'BEP20', abi: bep20ABI },
    { name: 'BEP777', abi: bep777ABI },
    { name: 'ERC20', abi: erc20ABI },
    { name: 'ERC721', abi: erc721ABI },
    { name: 'ERC777', abi: erc777ABI },
    { name: 'ERC1155', abi: erc1155ABI },
  ]
}
