import type {
  Address,
  MethodCall,
  MethodCallUnion,
} from '@ethereum-multicall/types'

import type { Erc20Types } from './abis'
import type { DexProtocol, DexTag } from './dex.types'
import type { VersionTag } from './version.types'

/**
 * Represents valid token call method options.
 */
export type TokenCallOption =
  | 'symbol'
  | 'decimals'
  | 'name'
  | 'balanceOf'
  | 'allowance'

/**
 * Type for token calls that conditionally includes balance and allowance methods.
 *
 * @template IncludeBalance - Whether to include balance methods
 * @template IncludeAllowance - Whether to include allowance methods
 */
export type TokenCalls<
  IncludeBalance extends boolean,
  IncludeAllowance extends boolean,
> = Record<
  string,
  IncludeBalance extends true
    ? IncludeAllowance extends true
      ? MethodCallUnion<
          Erc20Types.Contract,
          'symbol' | 'decimals' | 'name' | 'balanceOf' | 'allowance'
        >
      : MethodCallUnion<
          Erc20Types.Contract,
          'symbol' | 'decimals' | 'name' | 'balanceOf'
        >
    : IncludeAllowance extends true
      ? MethodCallUnion<
          Erc20Types.Contract,
          'symbol' | 'decimals' | 'name' | 'allowance'
        >
      : MethodCallUnion<Erc20Types.Contract, 'symbol' | 'decimals' | 'name'>
>

/**
 * Maps individual token method call options to their corresponding method calls.
 * Provides specific method call mappings for each supported token operation.
 *
 * @template T - Token call option defining which method mapping to use
 */
export type TokenMethodCallMap<T extends TokenCallOption> = T extends 'symbol'
  ? { symbol: MethodCall<Erc20Types.Contract, 'symbol'> }
  : T extends 'decimals'
    ? { decimals: MethodCall<Erc20Types.Contract, 'decimals'> }
    : T extends 'name'
      ? { name: MethodCall<Erc20Types.Contract, 'name'> }
      : T extends 'balanceOf'
        ? { balanceOf: MethodCall<Erc20Types.Contract, 'balanceOf'> }
        : T extends 'allowanceV2'
          ? { [key: string]: MethodCall<Erc20Types.Contract, 'allowance'> }
          : T extends 'allowanceV3'
            ? { [key: string]: MethodCall<Erc20Types.Contract, 'allowance'> }
            : never

/**
 * Creates a context type for token calls based on provided options.
 *
 * @template T - Array of token call options
 */
export type TokenCallContext<T extends TokenCallOption[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends TokenCallOption
    ? Rest extends TokenCallOption[]
      ? TokenMethodCallMap<First> & TokenCallContext<Rest>
      : TokenMethodCallMap<First>
    : never
  : Record<string, never>

/**
 * Defines the base parameters required for any token call.
 * Contains the mandatory includes array specifying which methods to call.
 *
 * @template TOption - Array of token call options
 */
export type BaseParams<TOption extends TokenCallOption[]> = {
  includes: TOption
}

/**
 * Defines additional parameters required based on which token call options are included.
 * Adds wallet address for balance checks and router/protocol details for allowance checks.
 *
 * @template TOption - Array of token call options
 */
export type ConditionalParams<TOption extends TokenCallOption[]> =
  TOption extends TokenCallOption[]
    ? ('balanceOf' extends TOption[number]
        ? { walletAddress: Address }
        : object) &
        ('allowance' extends TOption[number]
          ? {
              walletAddress: Address
              routerAddress: Address
              dexTag: DexTag
              protocol: DexProtocol
              versionTag: VersionTag
            }
          : object)
    : never

/**
 * Combined parameters for token calls.
 *
 * @template TOption - Array of token call options
 */
export type TokenParams<TOption extends TokenCallOption[]> =
  BaseParams<TOption> & ConditionalParams<TOption>
