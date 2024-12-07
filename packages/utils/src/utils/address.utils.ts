import type { Address } from '@multicall-toolkit/types'
import { ethers } from 'ethers'

import { DexError, ErrorCodes } from '../errors'

/**
 * The suffix used to identify coin addresses, usually appended to the wrapped token's contract address.
 */
export const COIN_SUFFIX = '-COIN'

/**
 * Transforms a wrapped token contract address into a coin address by appending a predefined suffix.
 *
 * @param contractAddress - The wrapped token's contract address.
 * @returns The transformed coin address.
 */
export const transformWrappedAddressToCoinAddress = (
  contractAddress: Address,
): Address => {
  if (contractAddress.includes(COIN_SUFFIX)) {
    return contractAddress
  }

  return `${contractAddress}${COIN_SUFFIX}`
}

/**
 * Transforms a coin contract address back into its corresponding wrapped token address by removing a predefined suffix.
 *
 * @param contractAddress - The coin's contract address.
 * @returns The transformed wrapped token address.
 */
export const transformCoinAddressToWrappedAddress = (
  contractAddress: Address,
): Address => {
  return contractAddress
    .replace(COIN_SUFFIX, '')
    .replace(COIN_SUFFIX.toLowerCase(), '') as Address
}

/**
 * Converts and returns the address in its checksummed format.
 * Optionally, the address is converted back to its original coin address if it was a wrapped address.
 *
 * @param address - The address to convert.
 * @param keepEthPrefix - Whether to keep the ETH prefix for coin addresses. Defaults to `false`.
 * @returns The checksummed address.
 *
 * @throws If the address is not a valid address.
 */
export function getAddress(address: Address, keepEthPrefix = false): Address {
  const parsedAddress = ethers.utils.getAddress(
    transformCoinAddressToWrappedAddress(address),
  ) as Address

  if (!keepEthPrefix) {
    return parsedAddress
  }

  if (!isCoinAddress(address)) {
    return parsedAddress
  }

  return transformWrappedAddressToCoinAddress(parsedAddress)
}

/**
 * Checks if the given contract address represents a coin by verifying the presence of a predefined suffix.
 *
 * @param contractAddress - The contract address to check.
 * @returns `true` if the address represents a coin, otherwise `false`.
 */
export const isCoinAddress = (contractAddress: Address): boolean => {
  return contractAddress.includes(COIN_SUFFIX)
}

/**
 * Asserts that the given contract address represents a coin by verifying the presence of a predefined suffix.
 *
 * @param contractAddress - The contract address to check.
 * @throws DexError if the address does not represent a coin.
 */
export function assertIsCoinAddress(
  contractAddress: Address,
): asserts contractAddress {
  if (!contractAddress.includes(COIN_SUFFIX)) {
    throw new DexError(
      `The address ${contractAddress} does not represent a coin.`,
      ErrorCodes.addressNotValid,
    )
  }
}

/**
 * Checks if the provided Address is a valid address.
 *
 * @param address - The address to validate.
 * @returns `true` if the address is valid, otherwise `false`.
 */
export function isAddress(address: Address): boolean {
  return ethers.utils.isAddress(transformCoinAddressToWrappedAddress(address))
}

/**
 * Asserts that the provided Address is a valid address.
 *
 * @param address - The address to validate.
 * @throws DexError if the address is invalid.
 */
export function assertIsAddress(address: Address): asserts address {
  if (!ethers.utils.isAddress(transformCoinAddressToWrappedAddress(address))) {
    throw new DexError(
      `The address ${address} is not a valid address`,
      ErrorCodes.addressNotValid,
    )
  }
}

/**
 * Checks if the provided Addresses are valid addresses.
 *
 * @param addresses - The addresses to validate.
 * @returns `true` if all the addresses are valid, otherwise `false`.
 */
export function isAddresses(addresses: Address[]): boolean {
  if (!addresses.length) {
    return false
  }

  return addresses.every((address) => isAddress(address))
}

/**
 * Asserts that the provided Addresses are all valid addresses.
 *
 * @param addresses - The addresses to validate.
 * @throws DexError if any address in the list is invalid.
 */
export function assertIsAddresses(addresses: Address[]): asserts addresses {
  if (!addresses.length) {
    throw new DexError(
      'Must provide addresses',
      ErrorCodes.functionArgumentError,
    )
  }

  const invalidAddresses = addresses.filter(
    (address) =>
      !ethers.utils.isAddress(transformCoinAddressToWrappedAddress(address)),
  )

  if (invalidAddresses.length > 0) {
    throw new DexError(
      `The following addresses are invalid: ${invalidAddresses.join(', ')}`,
      ErrorCodes.addressNotValid,
    )
  }
}

/**
 * Compares two addresses to check if they are the same.
 *
 * @param address1 - The first address to compare.
 * @param address2 - The second address to compare.
 * @returns `true` if the addresses are the same, otherwise `false`.
 */
export function isSameAddress(address1: Address, address2: Address): boolean {
  if (!address1 || !address2) {
    return false
  }

  return (
    isAddress(address1) &&
    isAddress(address2) &&
    address1.toLowerCase() === address2.toLowerCase()
  )
}
