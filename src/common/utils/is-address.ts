import { ethers } from 'ethers';
import { removeEthFromContractAddress } from '../tokens/weth';

export function isAddress(address: string): boolean {
  return ethers.utils.isAddress(removeEthFromContractAddress(address));
}
