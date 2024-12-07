import type BigNumber from 'bignumber.js'
import type { BigNumber as EthersBigNumber } from 'ethers'

import type {
  TradeFormat,
  TradeFormatValue,
  TradeFormatOptions,
} from './trade.types'

/**
 * Represents a string that is a valid hexadecimal representation.
 * Used to differentiate regular strings from strings that specifically represent hex values.
 *
 * @example
 * ```typescript
 * const hexString: HexString = '0x123abc' as HexString;
 * ```
 */
export type HexString = string & HexStringBrand

/**
 * Internal brand type for HexString
 */
export type HexStringBrand = { readonly HexString: unique symbol }

/**
 * Represents the state of a DexNumber object.
 *
 * This state indicates whether the DexNumber instance has been shifted or unshifted,
 * or if it's in a neutral state where no shifting operation has been applied yet.
 *
 * - `unshifted`: The DexNumber is in its human-readable form, typically used when
 *                interacting with users or when displaying values (e.g., 1 Ether instead of 1e18 Wei).
 *
 * - `shifted`: The DexNumber has been shifted, meaning it represents a value in its smallest unit,
 *              such as Wei in Ethereum or the smallest token unit for ERC-20 tokens (e.g., 1 Ether in Wei is 1e18).
 *
 * - `neutral`: The DexNumber has not been explicitly shifted or unshifted, representing a state where
 *              the value is neither converted to its smallest unit nor its human-readable form.
 *
 * This state helps track whether the value has been transformed to or from its smallest unit (e.g., Wei) and ensures that the correct operations are applied when performing calculations, conversions, or displaying values.
 */
export type DexNumberState = 'unshifted' | 'neutral' | 'shifted'

/**
 * Represents the units of measurement for Ethereum-based values.
 * These units follow the standard Ethereum denomination scheme, where each unit
 * is related to the next by a factor of 1000.
 *
 * - 'wei': The smallest unit (1 wei)
 * - 'kwei': 1,000 wei (10^3)
 * - 'mwei': 1,000,000 wei (10^6)
 * - 'gwei': 1,000,000,000 wei (10^9), commonly used for gas prices
 * - 'szabo': 1,000,000,000,000 wei (10^12)
 * - 'finney': 1,000,000,000,000,000 wei (10^15)
 * - 'ether': 1,000,000,000,000,000,000 wei (10^18), the main unit of Ethereum
 */
export type DexNumberUnit =
  | 'wei'
  | 'kwei'
  | 'mwei'
  | 'gwei'
  | 'szabo'
  | 'finney'
  | 'ether'

/**
 * Represents the possible decimal types that can be used in DexNumber operations.
 * Combines multiple value types to provide flexible decimal specification.
 *
 * @type {BigNumber.Value} - Standard BigNumber values (string, number, BigNumber)
 * @type {DexNumberUnit} - Ethereum unit denominations (e.g., 'wei', 'gwei', 'ether')
 * @type {EthersBigNumber} - ethers.js BigNumber instances
 *
 * @example
 * ```typescript
 * // Using numeric value
 * const dec1: DexNumberDecimal = 18
 *
 * // Using Ethereum unit
 * const dec2: DexNumberDecimal = 'ether'
 *
 * // Using BigNumber
 * const dec3: DexNumberDecimal = BigNumber.from('1000000000000000000')
 * ```
 */
export type DexNumberDecimal = BigNumber.Value | DexNumberUnit | EthersBigNumber

/**
 * Represents a serialized form of a DexNumber instance that can be safely cloned and transmitted.
 * This interface captures all the essential state of a DexNumber without the prototype chain.
 *
 * @example
 * ```typescript
 * // Example of a serialized DexNumber representing 123.45 with 18 decimals
 * const serialized: SerializedDexNumber = {
 *   s: 1,              // positive number
 *   e: 2,              // exponent
 *   c: [12345],        // coefficient array
 *   _shiftedState: 'unshifted',
 *   _decimals: 18,
 *   _roundingMode: 1
 * };
 * ```
 */
export interface SerializedDexNumber {
  /** The sign of the number: 1 for positive, -1 for negative */
  s: number
  /** The exponent of the number in scientific notation */
  e: number
  /** The coefficient array representing the significant digits */
  c: number[]
  /**
   * The shifting state of the number:
   * - 'shifted': Number has been shifted by its decimals
   * - 'unshifted': Number has not been shifted
   * - 'neutral': Number's shift state is not relevant
   */
  _shiftedState: 'shifted' | 'unshifted' | 'neutral'
  /** The number of decimal places */
  _decimals: number
  /** The rounding mode used for calculations */
  _roundingMode: number
}

/**
 * Interface defining the structure for a DexNumber, which extends the functionality of the BigNumber class.
 */
export interface IDexNumber extends BigNumber {
  /**
   * The current shifted state of the number.
   *
   * - `neutral`: The number is not shifted in either direction.
   * - `shifted`: The number's decimal is shifted to the right.
   * - `unshifted`: The number's decimal is shifted to the left.
   */
  _shiftedState: DexNumberState

  /**
   * The number of decimal places for the number.
   */
  _decimals: number

  /**
   * The default rounding mode to use when performing arithmetic operations
   */
  _roundingMode: BigNumber.RoundingMode

  // ------------------------
  // State Management
  // ------------------------

  /**
   * Checks if the number is in shifted state
   */
  isShifted(): boolean

  /**
   * Checks if the number is in unshifted state
   */
  isUnshifted(): boolean

  /**
   * Checks if the number is in neutral state
   */
  isNeutral(): boolean

  /**
   * Clones the current instance.
   */
  clone(): IDexNumber

  /**
   * Converts any input value to a BigNumber with matching decimals
   */
  normalizeToBigNumber(n: BigNumber.Value): {
    base: BigNumber
    other: BigNumber
    decimalDifference: number
  }

  /**
   * Creates a new DexNumber while preserving state
   */
  createResult(
    bigNumber: BigNumber,
    decimals: DexNumberDecimal,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber

  // ------------------------
  // Getters
  // ------------------------

  /**
   * Gets the shifted state of the number.
   */
  get shiftedState(): DexNumberState

  /**
   * Gets the number of decimal places for the number.
   */
  get decimals(): number

  // ------------------------
  // Comparison Methods
  // ------------------------

  // Comparison methods can stay as is

  // ------------------------
  // Arithmetic Methods
  // ------------------------

  absoluteValue(): IDexNumber

  abs(): IDexNumber

  decimalPlaces(): number | null
  decimalPlaces(
    decimalPlaces: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber

  dp(): number | null
  dp(decimalPlaces: number, roundingMode?: BigNumber.RoundingMode): IDexNumber

  dividedBy(n: BigNumber.Value, base?: number): IDexNumber

  div(n: BigNumber.Value, base?: number): IDexNumber

  dividedToIntegerBy(n: BigNumber.Value, base?: number): IDexNumber

  idiv(n: BigNumber.Value, base?: number): IDexNumber

  exponentiatedBy(n: number, m?: BigNumber.Value): IDexNumber

  pow(n: number, m?: BigNumber.Value): IDexNumber

  integerValue(rm?: BigNumber.RoundingMode): IDexNumber

  minus(n: BigNumber.Value, base?: number): IDexNumber

  modulo(n: BigNumber.Value, base?: number): IDexNumber

  mod(n: BigNumber.Value, base?: number): IDexNumber

  multipliedBy(n: BigNumber.Value, base?: number): IDexNumber

  times(n: BigNumber.Value, base?: number): IDexNumber

  negated(): IDexNumber

  plus(n: BigNumber.Value, base?: number): IDexNumber

  sd(includeZeros?: boolean): number
  sd(
    significantDigits: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber

  precision(includeZeros?: boolean): number
  precision(
    significantDigits: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber

  squareRoot(): IDexNumber

  sqrt(): IDexNumber

  toFraction(max_denominator?: BigNumber.Value): [IDexNumber, IDexNumber]

  // ------------------------
  // Shifting and Unshifting
  // ------------------------

  /**
   * Disabled shiftedBy to force use of shift() or unshift()
   */
  shiftedBy(n: number): IDexNumber

  /**
   * Adjusts the decimals of the DexNumber to match the provided decimals.
   * This is useful when converting between different token decimals.
   *
   * @param otherDecimals - The decimals of the other token involved in the conversion.
   * @returns A new DexNumber instance with adjusted decimals.
   */
  adjustForDecimals(otherDecimals: number): IDexNumber

  /**
   * Shifts the DexNumber by the stored decimals.
   * Converts it to the smallest unit (like wei for Ether).
   *
   * @example
   * ```typescript
   * DexNumber.fromUnshifted('0.0001', 18).shift(); // Returns DexNumber representing '100000000000000'
   * DexNumber.fromUnshifted('1', 18).shift(); // Returns DexNumber representing '1000000000000000000'
   * ```
   * @returns A DexNumber instance.
   */
  shift(): IDexNumber

  /**
   * Unshifts the DexNumber back to its human-readable format.
   *
   * @example
   * ```typescript
   * DexNumber.fromShifted('100000000000000', 18).unshift(); // Returns DexNumber representing '0.0001'
   * DexNumber.fromShifted('1000000000000000000', 18).unshift(); // Returns DexNumber representing '1'
   * ```
   *
   * @returns A DexNumber instance.
   */
  unshift(): IDexNumber

  // ------------------------
  // Conversions
  // ------------------------

  /**
   * Serializes a DexNumber instance into a plain object that can be safely cloned/transmitted.
   * This is useful when you need to pass DexNumber instances through structured cloning or JSON serialization.
   *
   * @example
   * ```typescript
   * const num = DexNumber.fromUnshifted('123.45');
   * const serialized = num.serialize();
   * // serialized can now be safely cloned or transmitted
   * console.log(serialized);
   * // {
   * //   s: 1,
   * //   e: 2,
   * //   c: [12345],
   * //   _shiftedState: 'unshifted',
   * //   _decimals: 18,
   * //   _roundingMode: 1
   * // }
   * ```
   *
   * @returns A plain object representing the DexNumber that can be safely cloned
   */
  toSerialized(): SerializedDexNumber

  /**
   * Converts a DexNumber instance to an ethers.js BigNumber.
   * Always returns a shifted value.
   *
   * @returns An ethers.js BigNumber.
   */
  toEthersBigNumber(): EthersBigNumber

  /**
   * Converts the DexNumber instance to a BigNumber instance.
   * Always returns a shifted value.
   *
   * @returns A BigNumber instance.
   */
  toBigNumber(): BigNumber

  /**
   * Converts the DexNumber instance to a bigint.
   * Always returns a shifted value.
   *
   * @returns A bigint.
   */
  toBigInt(): bigint

  /**
   * Converts the `DexNumber` to a formatted, human-readable string with optional decimal places and locale.
   * Uses locale formatting to add commas or periods, depending on the locale.
   *
   * @param decimals - (Optional) Number of decimal places. Defaults to the initialized decimal places.
   * @param locales - (Optional) Locale string or array of locales for `Intl.NumberFormat`. Defaults to 'en'.
   * @param roundingMode - (Optional) Rounding mode. Defaults to `BigNumber.ROUND_DOWN`.
   * @returns A human-readable string representation of the `DexNumber`, formatted with locale conventions.
   *
   * @example
   * ```typescript
   * const amount = DexNumber.fromUnshifted('1234.56789', 18);
   * amount.toReadableString(2); // Returns '1,234.57'
   * amount.toReadableString(5, 'en-US'); // Returns '1.234,56789' in English locale
   * ```
   */
  toReadableString(
    decimals?: number,
    locales?: Intl.LocalesArgument,
    roundingMode?: BigNumber.RoundingMode,
  ): string

  /**
   * Converts the `DexNumber` to a string with a fixed number of decimal places, optionally rounding.
   *
   * @param decimals - (Optional) Number of decimal places. Defaults to the initialized decimal places.
   * @param roundingMode - (Optional) Rounding mode. Defaults to `BigNumber.ROUND_DOWN`.
   * @returns A fixed decimal representation of the `DexNumber` as a string.
   *
   * @example
   * ```typescript
   * const price = DexNumber.fromUnshifted('100.123456789', 18);
   * price.toDecimalString(4); // Returns '100.1235'
   * price.toDecimalString(2, BigNumber.ROUND_UP); // Returns '100.13'
   * ```
   */
  toDecimalString(
    decimals?: number,
    roundingMode?: BigNumber.RoundingMode,
  ): string

  /**
   * Outputs the `DexNumber` in its smallest unit representation (e.g., wei for Ether), returning a raw integer string.
   * This format disregards any shifted state and is rounded down.
   *
   * @returns The `DexNumber` as a raw integer string in the smallest unit.
   *
   * @example
   * ```typescript
   * const amount = DexNumber.fromUnshifted('1', 'gwei');
   * amount.toSmallestUnitString(); // Returns '1000000000'
   * ```
   */
  toWeiString(): string

  /**
   * Converts the `DexNumber` to a hexadecimal string in its smallest unit.
   * Ensures the number is returned in its raw integer form, rounded down to prevent fractional values.
   *
   * @returns A hexadecimal string representation of the `DexNumber`.
   *
   * @example
   * ```typescript
   * const value = DexNumber.fromUnshifted('1', 'ether');
   * value.toHexString(); // Returns '0xde0b6b3a7640000'
   * ```
   */
  toHexString(): HexString

  /**
   * Formats the `DexNumber` according to the specified `TradeFormat`.
   *
   * @param options - The format configuration object
   *    - `options.type` - Format to convert the number to: 'readable', 'decimal', 'wei', etc.
   *    - `options.options` - Format-specific options for decimal places, locales, and rounding
   * @returns The formatted number in the specified format
   */
  toTradeFormat<TFormat extends TradeFormat>({
    type,
    options,
  }: TradeFormatOptions<TFormat>): TradeFormatValue<TFormat>
}
