import type {
  ContractDetailContext,
  ContractDetailForDexType,
  ContractDetailWithAddressContext,
  ContractDetailForAddress,
  ContractDetailsV2,
  ContractDetailsV3,
} from '@dex-toolkit/types'
import type { ContractDetail } from '@multicall-toolkit/types'

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if a given object is of type ContractDetail.
 * This function does not check for the presence of the optional 'methods' property.
 *
 * @param obj - The object to check.
 * @returns True if the object is of type ContractDetail, false otherwise.
 */
export function isContractDetail<TOption>(
  obj: any,
): obj is ContractDetail<TOption> {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.address === 'string' &&
    Array.isArray(obj.abi)
  )
}

/**
 * Checks if the given context is of type ContractDetailsV2.
 *
 * @param context - The context to check.
 * @returns True if the context is of type ContractDetailsV2, false otherwise.
 */
export function isContractDetailsV2(
  context: any,
): context is ContractDetailsV2 {
  return (
    (context as ContractDetailsV2).router !== undefined &&
    (context as ContractDetailsV2).factory !== undefined &&
    (context as ContractDetailsV2).pair !== undefined
  )
}

/**
 * Checks if the given context is of type ContractDetailsV3.
 *
 * @param context - The context to check.
 * @returns True if the context is of type ContractDetailsV3, false otherwise.
 */
export function isContractDetailsV3(
  context: any,
): context is ContractDetailsV3 {
  return (
    (context as ContractDetailsV3).router !== undefined &&
    (context as ContractDetailsV3).factory !== undefined &&
    (context as ContractDetailsV3).quoter !== undefined
  )
}

/**
 * Checks if the given context is of type ContractDetailForDexType.
 *
 * @param context - The context to check.
 * @returns True if the context is of type ContractDetailForDexType, false otherwise.
 */
export function isContractDetailForDexType(
  context: ContractDetailContext | ContractDetailWithAddressContext,
): context is ContractDetailForDexType {
  return (
    (context as ContractDetailForDexType).dexType !== undefined &&
    (context as ContractDetailForDexType).protocol !== undefined &&
    (context as ContractDetailForDexType).contractType !== undefined &&
    (context as ContractDetailForDexType).version !== undefined
  )
}

/**
 * Checks if the given context is of type ContractDetailForAddress.
 *
 * @param context - The context to check.
 * @returns True if the context is of type ContractDetailForAddress, false otherwise.
 */
export function isContractDetailForAddress(
  context: ContractDetailWithAddressContext,
): context is ContractDetailForAddress {
  return (
    (context as ContractDetailForAddress).dexType !== undefined &&
    (context as ContractDetailForAddress).protocol !== undefined &&
    (context as ContractDetailForAddress).address !== undefined
  )
}
