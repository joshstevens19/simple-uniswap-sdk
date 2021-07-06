import { ethers } from 'ethers';
import {
  appendEthToContractAddress,
  isNativeEthToContractAddress,
  removeEthFromContractAddress,
} from '../tokens/weth';

export function getAddress(address: string, keepEthPrefix = false): string {
  const parsedAddress = ethers.utils.getAddress(
    removeEthFromContractAddress(address)
  );
  if (!keepEthPrefix) {
    return parsedAddress;
  }

  if (!isNativeEthToContractAddress(address)) {
    return parsedAddress;
  }

  return appendEthToContractAddress(parsedAddress);
}
