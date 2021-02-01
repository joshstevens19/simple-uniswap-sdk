import { ethers } from 'ethers';

export function isAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}
