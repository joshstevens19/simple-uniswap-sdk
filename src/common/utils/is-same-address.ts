import { ethers } from "ethers";
import { removeEthFromContractAddress } from "../tokens/eth";

export function isSameAddress(address1: string, address2: string): boolean {
  return (
    ethers.utils.isAddress(removeEthFromContractAddress(address1)) &&
    ethers.utils.isAddress(removeEthFromContractAddress(address2)) &&
    address1.toLowerCase() === address2.toLowerCase()
  );
}