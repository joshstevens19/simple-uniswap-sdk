import type {
  DexNumberDecimal,
  DexNumberState,
  DexNumberUnit,
  HexString,
  IDexNumber,
  SerializedDexNumber,
  TradeFormat,
  TradeFormatValue,
  TradeFormatOptions,
} from '@dex-toolkit/types'
import {
  BigNumber as EthersBigNumber,
  type BigNumberish,
} from '@ethersproject/bignumber'
import { hexlify } from '@ethersproject/bytes'
import BigNumber from 'bignumber.js'

export const dexNumberUnits: DexNumberUnit[] = [
  'wei',
  'kwei',
  'mwei',
  'gwei',
  'szabo',
  'finney',
  'ether',
] as const

/**
 * NUM is a clone of BigNumber with a higher precision
 */
const NUM = BigNumber.clone({
  DECIMAL_PLACES: 60,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-1e9, 1e9],
})

/**
 * Normalizes a value to a consistent BigNumber.Value format.
 * @param value - The value to normalize.
 * @returns A normalized BigNumber.Value.
 */
export function parseValue(
  value: BigNumber.Value | EthersBigNumber,
): BigNumber.Value {
  let numericValue: BigNumber.Value

  if (typeof value === 'string' && value.startsWith('0x')) {
    numericValue = EthersBigNumber.from(value).toString()
  } else if (EthersBigNumber.isBigNumber(value)) {
    numericValue = value.toString()
  } else {
    numericValue = value as BigNumber.Value
  }

  return numericValue
}

/**
 * Parses decimals input, converting BigNumber.Value, BigNumbers, or DexNumberUnits to a plain number.
 * @param decimals - The input value, which can be BigNumber.Value, a number, or a DexNumberUnit.
 * @returns A plain number representing the parsed decimals.
 */
export function parseDecimals(decimals?: DexNumberDecimal): number {
  // Handle undefined, null, or empty string
  if (decimals === undefined || decimals === null || decimals === '') {
    return 0
  }

  // Convert BigNumber.Value to a string for normalization
  let numericValue: string | number

  if (typeof decimals === 'string' && decimals.startsWith('0x')) {
    // Hexadecimal string to decimal string
    numericValue = EthersBigNumber.from(decimals).toString()
  } else if (EthersBigNumber.isBigNumber(decimals)) {
    // Ethers BigNumber to string
    numericValue = decimals.toString()
  } else if (BigNumber.isBigNumber(decimals)) {
    // BigNumber.js to string
    numericValue = decimals.toFixed()
  } else if (typeof decimals === 'number') {
    // Already a number
    return decimals
  } else {
    // If not a recognized number type, assume it's a string
    numericValue = decimals as string
  }

  // Parse as a number
  const parsed = Number(numericValue)
  if (!isNaN(parsed)) {
    return parsed
  }

  // Check if it's a DexNumberUnit
  const index = dexNumberUnits.indexOf(decimals as DexNumberUnit)
  if (index !== -1) {
    return 3 * index
  }

  // Invalid input case
  throw new Error(
    `Invalid decimals value '${decimals}' with type '${typeof decimals}'. Must be a number, BigNumber.Value, or one of (${dexNumberUnits.join(', ')})`,
  )
}

/**
 * Prevents the constructor from being called directly
 */
const _constructorGuard = {}

export class DexNumber extends BigNumber implements IDexNumber {
  /** The shifted state of the number */
  _shiftedState: DexNumberState = 'neutral'

  /** The number of decimal places */
  _decimals: number

  /** The rounding mode */
  _roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN

  /**
   * Constructs a new DexNumber instance.
   *
   * @param value - The numeric value. Can be a number, string, BigNumber, or hex string.
   * @param decimals - (Optional) The number of decimals or a unit string (e.g., 'ether').
   * @param shiftedState - (Optional) The shifted state of the DexNumber.
   * @param roundingMode - (Optional) The default rounding mode to use when performing arithmetic operations.
   */
  constructor(
    constructorGuard: any,
    value: BigNumber.Value,
    decimals?: DexNumberDecimal,
    shiftedState?: DexNumberState,
    roundingMode?: BigNumber.RoundingMode,
  ) {
    if (constructorGuard !== _constructorGuard) {
      throw new Error(
        'Cannot call constructor directly; Use DexNumber.fromUnshifted() or DexNumber.fromShifted()',
      )
    }

    super(parseValue(value))

    if (this.isNaN()) {
      throw new Error(`Invalid number: ${value}, parsed: ${parseValue(value)}`)
    }

    this._decimals = parseDecimals(decimals)
    this._shiftedState = shiftedState ?? this._shiftedState
    this._roundingMode = roundingMode ?? this._roundingMode

    Object.setPrototypeOf(this, DexNumber.prototype)
  }

  // ------------------------
  // State Management
  // ------------------------

  public isShifted(): boolean {
    return this._shiftedState === 'shifted'
  }

  public isUnshifted(): boolean {
    return this._shiftedState === 'unshifted'
  }

  public isNeutral(): boolean {
    return this._shiftedState === 'neutral'
  }

  public clone(): IDexNumber {
    const clonedInstance = new DexNumber(
      _constructorGuard,
      this.toString(),
      this._decimals,
    )
    clonedInstance._shiftedState = this._shiftedState
    return clonedInstance
  }

  public normalizeToBigNumber(n: BigNumber.Value): {
    base: BigNumber
    other: BigNumber
    decimalDifference: number
  } {
    let baseValue: BigNumber
    let otherValue: BigNumber
    let decimalDifference: number

    if (n instanceof DexNumber && n._decimals !== undefined) {
      // Shift both numbers to their shifted state (integer representations)
      const baseShifted = this.shift()
      const otherShifted = n.shift()

      decimalDifference = this._decimals - n._decimals

      if (decimalDifference === 0) {
        // Same decimals, no scaling needed
        baseValue = new NUM(baseShifted.toString())
        otherValue = new NUM(otherShifted.toString())
      } else if (decimalDifference > 0) {
        // 'this' has more decimals; scale 'other' up
        const scalingFactor = new NUM(10).pow(decimalDifference)
        otherValue = new NUM(otherShifted.toString()).multipliedBy(
          scalingFactor,
        )
        baseValue = new NUM(baseShifted.toString())
      } else {
        // 'n' has more decimals; scale 'this' up
        const scalingFactor = new NUM(10).pow(-decimalDifference)
        baseValue = new NUM(baseShifted.toString()).multipliedBy(scalingFactor)
        otherValue = new NUM(otherShifted.toString())
      }
    } else {
      // 'n' is a normal number; scale it to match 'this' decimals
      const baseShifted = this.shift()
      baseValue = new NUM(baseShifted.toString())
      decimalDifference = this._decimals

      // Scale 'n' by 'highestDecimals' to match 'baseValue'
      otherValue = new NUM(n.toString()).shiftedBy(this._decimals)
    }

    return {
      base: baseValue,
      other: otherValue,
      decimalDifference,
    }
  }

  public createResult(
    bigNumber: BigNumber,
    decimals: DexNumberDecimal,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber {
    let value = DexNumber.fromBigNumber(
      bigNumber,
      decimals,
      'shifted',
      roundingMode,
    )

    if (this.isUnshifted()) {
      value = value.unshift()
    }

    return value
  }

  // ------------------------
  // Getters
  // ------------------------

  public get shiftedState(): DexNumberState {
    return this._shiftedState
  }

  public get decimals(): number {
    return this._decimals
  }

  // ------------------------
  // Comparison Methods
  // ------------------------

  override comparedTo(n: BigNumber.Value): number {
    const { base, other } = this.normalizeToBigNumber(n)
    return base.comparedTo(other)
  }

  override eq(n: BigNumber.Value): boolean {
    return this.comparedTo(n) === 0
  }
  override isEqualTo(n: BigNumber.Value): boolean {
    return this.eq(n)
  }

  override gt(n: BigNumber.Value): boolean {
    return this.comparedTo(n) > 0
  }
  override isGreaterThan(n: BigNumber.Value): boolean {
    return this.gt(n)
  }

  override gte(n: BigNumber.Value): boolean {
    return this.comparedTo(n) >= 0
  }
  override isGreaterThanOrEqualTo(n: BigNumber.Value): boolean {
    return this.gte(n)
  }

  override lt(n: BigNumber.Value): boolean {
    return this.comparedTo(n) < 0
  }
  override isLessThan(n: BigNumber.Value): boolean {
    return this.lt(n)
  }

  override lte(n: BigNumber.Value): boolean {
    return this.comparedTo(n) <= 0
  }
  override isLessThanOrEqualTo(n: BigNumber.Value): boolean {
    return this.lte(n)
  }

  // ------------------------
  // Arithmetic Methods
  // ------------------------

  override absoluteValue(): IDexNumber {
    const { base } = this.normalizeToBigNumber(this)
    return this.createResult(base.absoluteValue(), this._decimals)
  }
  override abs(): IDexNumber {
    return this.absoluteValue()
  }

  override decimalPlaces(): number | null
  override decimalPlaces(
    decimalPlaces: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber
  override decimalPlaces(
    decimalPlaces?: number,
    roundingMode?: BigNumber.RoundingMode,
  ): number | null | IDexNumber {
    if (decimalPlaces === undefined) {
      return super.decimalPlaces()
    }
    const result = super.decimalPlaces(decimalPlaces, roundingMode)
    return DexNumber.fromBigNumber(
      result as BigNumber,
      this._decimals,
      this.shiftedState,
    )
  }

  override dp(): number | null
  override dp(
    decimalPlaces: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber
  override dp(
    decimalPlaces?: number,
    roundingMode?: BigNumber.RoundingMode,
  ): number | null | IDexNumber {
    if (decimalPlaces === undefined) {
      return super.dp()
    }
    const result = super.dp(decimalPlaces, roundingMode)
    return DexNumber.fromBigNumber(
      result as BigNumber,
      this._decimals,
      this.shiftedState,
    )
  }

  override dividedBy(n: BigNumber.Value): IDexNumber {
    const { base, other } = this.normalizeToBigNumber(n)

    const result = base
      .dividedBy(other)
      .multipliedBy(new NUM(10).pow(this._decimals))

    return this.createResult(result, this._decimals)
  }

  override div(n: BigNumber.Value): IDexNumber {
    return this.dividedBy(n)
  }

  override dividedToIntegerBy(n: BigNumber.Value): IDexNumber {
    const divided = this.dividedBy(n).integerValue()
    return DexNumber.fromBigNumber(divided, this._decimals, 'shifted')
  }

  override idiv(n: BigNumber.Value): IDexNumber {
    return this.dividedToIntegerBy(n)
  }

  override exponentiatedBy(n: number, m?: BigNumber.Value): IDexNumber {
    if (this.isUnshifted()) {
      const result = super.exponentiatedBy(n, m)
      return DexNumber.fromBigNumber(result, this._decimals, 'unshifted')
    }

    const unshifted = this.unshift()
    const result = new NUM(unshifted.toString()).exponentiatedBy(n, m)
    return DexNumber.fromBigNumber(result, this._decimals, 'shifted')
  }

  override pow(n: number, m?: BigNumber.Value): IDexNumber {
    return this.exponentiatedBy(n, m)
  }

  override integerValue(rm?: BigNumber.RoundingMode): IDexNumber {
    const value = new NUM(this.toString()).integerValue(rm)
    return DexNumber.fromBigNumber(value, this._decimals, 'shifted', rm)
  }

  override minus(n: BigNumber.Value): IDexNumber {
    const { base, other, decimalDifference } = this.normalizeToBigNumber(n)

    let result = base.minus(other)

    if (decimalDifference < 0) {
      result = result.multipliedBy(new NUM(10).pow(decimalDifference))
    }

    return this.createResult(result, this._decimals)
  }

  override modulo(n: BigNumber.Value): IDexNumber {
    const { base, other } = this.normalizeToBigNumber(n)
    return this.createResult(base.modulo(other), this._decimals)
  }

  override mod(n: BigNumber.Value): IDexNumber {
    return this.modulo(n)
  }

  override multipliedBy(n: BigNumber.Value): IDexNumber {
    const { base, other, decimalDifference } = this.normalizeToBigNumber(n)

    let result = base.multipliedBy(other)

    if (n instanceof DexNumber && n._decimals !== undefined) {
      if (decimalDifference > 0) {
        result = result.dividedBy(new NUM(10).pow(this._decimals))
      } else if (decimalDifference < 0) {
        result = result.dividedBy(
          new NUM(10).pow(n.decimals + Math.abs(decimalDifference)),
        )
      } else {
        result = result.dividedBy(new NUM(10).pow(this._decimals))
      }
    } else {
      result = result.dividedBy(new NUM(10).pow(this._decimals))
    }

    return this.createResult(result, this._decimals)
  }

  override times(n: BigNumber.Value): IDexNumber {
    return this.multipliedBy(n)
  }

  override negated(): IDexNumber {
    const { base } = this.normalizeToBigNumber(this)
    return this.createResult(base.negated(), this._decimals)
  }

  override plus(n: BigNumber.Value): IDexNumber {
    const { base, other, decimalDifference } = this.normalizeToBigNumber(n)

    let result = base.plus(other)

    if (decimalDifference < 0) {
      result = result.multipliedBy(new NUM(10).pow(decimalDifference))
    }

    return this.createResult(result, this._decimals)
  }

  override sd(includeZeros?: boolean): number
  override sd(
    significantDigits: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber
  override sd(
    arg?: boolean | number,
    roundingMode?: BigNumber.RoundingMode,
  ): number | IDexNumber {
    if (typeof arg === 'boolean') {
      return super.sd(arg)
    } else if (typeof arg === 'number') {
      const { base } = this.normalizeToBigNumber(this)
      return this.createResult(base.sd(arg, roundingMode), this._decimals)
    }
    return super.sd()
  }

  override precision(includeZeros?: boolean): number
  override precision(
    significantDigits: number,
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber
  override precision(
    arg?: boolean | number,
    roundingMode?: BigNumber.RoundingMode,
  ): number | IDexNumber {
    if (typeof arg === 'boolean') {
      return super.precision(arg)
    } else if (typeof arg === 'number') {
      const { base } = this.normalizeToBigNumber(this)
      return this.createResult(
        base.precision(arg, roundingMode),
        this._decimals,
      )
    }
    return super.precision()
  }

  override squareRoot(): IDexNumber {
    if (this.isUnshifted()) {
      const result = super.squareRoot()
      return DexNumber.fromBigNumber(result, this._decimals, 'unshifted')
    }

    const unshifted = this.unshift()
    const result = new NUM(unshifted.toString()).squareRoot()
    return DexNumber.fromBigNumber(result, this._decimals, 'shifted')
  }

  override sqrt(): IDexNumber {
    return this.squareRoot()
  }

  override toFraction(
    max_denominator?: BigNumber.Value,
  ): [IDexNumber, IDexNumber] {
    if (this.isUnshifted()) {
      const [n, d] = super.toFraction(max_denominator)
      return [
        DexNumber.fromBigNumber(n, this._decimals, 'unshifted'),
        DexNumber.fromBigNumber(d, this._decimals, 'unshifted'),
      ]
    }
    const unshifted = this.unshift()
    const [n, d] = new NUM(unshifted.toString()).toFraction(max_denominator)
    return [
      DexNumber.fromBigNumber(n, this._decimals, 'shifted'),
      DexNumber.fromBigNumber(d, this._decimals, 'shifted'),
    ]
  }

  // ------------------------
  // Static Overrides
  // ------------------------

  static override maximum(
    decimals: number,
    ...n: BigNumber.Value[]
  ): IDexNumber {
    if (n.length === 0) {
      throw new Error('At least one number is required')
    }

    const result = super.maximum(...n)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  static override max(decimals: number, ...n: BigNumber.Value[]): IDexNumber {
    const result = super.max(...n)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  static override minimum(
    decimals: number,
    ...n: BigNumber.Value[]
  ): IDexNumber {
    if (n.length === 0) {
      throw new Error('At least one number is required')
    }

    const result = super.minimum(...n)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  static override min(decimals: number, ...n: BigNumber.Value[]): IDexNumber {
    const result = super.min(...n)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  static override random(decimals?: number): IDexNumber {
    const result = super.random(decimals)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  static override sum(decimals: number, ...n: BigNumber.Value[]): IDexNumber {
    if (n.length === 0) {
      return DexNumber.fromShifted('0', decimals)
    }

    const result = super.sum(...n)
    return new DexNumber(_constructorGuard, result.toString(), decimals)
  }

  // ------------------------
  // Shifting and Unshifting
  // ------------------------

  // @ts-ignore - Args won't be used. Need to keep for `DexNumber` and `IDexNumber` compatibility.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override shiftedBy(n: number): IDexNumber {
    throw new Error(
      'Method disabled. You must initialize with decimals and use shift() or unshift()',
    )
  }

  public adjustForDecimals(otherDecimals: number): IDexNumber {
    if (otherDecimals > this._decimals) {
      throw new Error('Cannot adjust for more decimals than current')
    }

    const unshifted = this.isShifted() ? this.unshift() : this
    return DexNumber.fromUnshifted(unshifted.toString(), otherDecimals)
  }

  public shift(): IDexNumber {
    if (this.isNeutral() || this._decimals === 0 || this.isShifted()) {
      return this
    }

    const shiftedValue = new NUM(this.toString()).shiftedBy(this._decimals)

    return DexNumber.fromBigNumber(
      shiftedValue,
      this._decimals,
      'shifted',
      this._roundingMode,
    )
  }

  public unshift(): IDexNumber {
    if (this.isNeutral() || this._decimals === 0 || this.isUnshifted()) {
      return this
    }

    const unshiftedValue = new NUM(this.toString()).shiftedBy(-this._decimals)

    return DexNumber.fromBigNumber(
      unshiftedValue,
      this._decimals,
      'unshifted',
      this._roundingMode,
    )
  }

  // ------------------------
  // Conversions
  // ------------------------

  public toSerialized(): SerializedDexNumber {
    if (
      this.s === undefined ||
      this.s === null ||
      this.e === undefined ||
      this.e === null ||
      this.c === undefined ||
      this.c === null
    ) {
      throw new Error('Invalid DexNumber instance for serialization')
    }

    return {
      s: this.s,
      e: this.e,
      c: [...this.c], // Create a new array to avoid reference issues
      _shiftedState: this._shiftedState,
      _decimals: this._decimals,
      _roundingMode: this._roundingMode,
    }
  }

  public override toFixed(
    decimalPlaces?: number,
    roundingMode?: BigNumber.RoundingMode,
  ): string {
    if (this.isShifted()) {
      // After some operations, an atomic number may have a decimal place so we need get its integer value

      const value = new NUM(this.toString())
      const valueToFormat = value.integerValue(
        roundingMode ?? this._roundingMode,
      )

      return decimalPlaces
        ? valueToFormat.toFixed(decimalPlaces, roundingMode)
        : valueToFormat.toFixed()
    }

    return decimalPlaces
      ? super.toFixed(decimalPlaces, roundingMode)
      : super.toFixed()
  }

  public toEthersBigNumber(): EthersBigNumber {
    const value = this.shift().integerValue(this._roundingMode)
    return EthersBigNumber.from(value.toFixed())
  }

  public toBigNumber(): BigNumber {
    return new BigNumber(this.shift())
  }

  public toBigInt(): bigint {
    const value = this.shift().integerValue(this._roundingMode)
    return BigInt(value.toFixed())
  }

  public toReadableString(
    decimals?: number,
    locales?: Intl.LocalesArgument,
    roundingMode?: BigNumber.RoundingMode,
  ): string {
    const value = this.unshift()
    const decimalsToUse = decimals ?? this.decimals

    // Default rounding mode
    const rounding = roundingMode ?? this._roundingMode

    // If no locale is specified, return the formatted string as is
    if (!locales) {
      return value.toFormat(decimalsToUse, rounding)
    }

    // Obtain locale-specific separators
    const parts = new Intl.NumberFormat(locales).formatToParts(1234567.89)

    const groupSymbol =
      parts.find((part) => part.type === 'group')?.value || ','
    const decimalSymbol =
      parts.find((part) => part.type === 'decimal')?.value || '.'

    // Create format object for BigNumber
    const format = {
      groupSize: 3,
      groupSeparator: groupSymbol,
      decimalSeparator: decimalSymbol,
    }

    // Format using BigNumber.js with custom format
    const formattedString = value.toFormat(decimalsToUse, rounding, format)

    return formattedString
  }

  public toDecimalString(
    decimals?: number,
    roundingMode?: BigNumber.RoundingMode,
  ): string {
    const value = this.unshift()
    return value.toFixed(
      decimals ?? this.decimals,
      roundingMode ?? this._roundingMode,
    )
  }

  public toWeiString(): string {
    const value = this.shift()
    return value.toFixed(0, BigNumber.ROUND_DOWN)
  }

  public toHexString(): HexString {
    const value = this.shift()
    return hexlify(EthersBigNumber.from(value.toFixed())) as HexString
  }

  public toTradeFormat<TFormat extends TradeFormat>({
    type,
    options,
  }: TradeFormatOptions<TFormat>): TradeFormatValue<TFormat> {
    switch (type) {
      case 'readable': {
        const {
          decimalPlaces = this.decimals,
          locales,
          roundingMode,
        } = options || {}
        return this.toReadableString(
          decimalPlaces,
          locales,
          roundingMode,
        ) as TradeFormatValue<TFormat>
      }
      case 'decimal': {
        const { decimalPlaces = this.decimals, roundingMode } = options || {}
        return this.toDecimalString(
          decimalPlaces,
          roundingMode,
        ) as TradeFormatValue<TFormat>
      }
      case 'wei':
        return this.toWeiString() as TradeFormatValue<TFormat>
      case 'hex':
        return this.toHexString() as TradeFormatValue<TFormat>
      case 'dexnumber':
        return this as unknown as TradeFormatValue<TFormat>
      case 'bignumber':
        return this.toBigNumber() as TradeFormatValue<TFormat>
      case 'ethers':
        return this.toEthersBigNumber() as TradeFormatValue<TFormat>
      case 'bigint':
        return this.toBigInt() as TradeFormatValue<TFormat>
      default:
        throw new Error(`Unsupported format type: ${type}`)
    }
  }

  // ------------------------
  // Static Methods
  // ------------------------

  /**
   * Creates a new DexNumber instance from a serialized object.
   * This static method reconstructs a full DexNumber instance from its serialized form.
   *
   * @example
   * ```typescript
   * const original = DexNumber.fromUnshifted('123.45');
   * const serialized = original.serialize();
   *
   * // Later, or in another context:
   * const restored = DexNumber.fromSerialized(serialized);
   * console.log(restored.toString()); // "123.45"
   * console.log(restored instanceof DexNumber); // true
   * console.log(restored.multipliedBy(2).toString()); // "246.9"
   * ```
   *
   * @param serialized - The serialized DexNumber object
   * @returns A new DexNumber instance with all properties and methods restored
   */
  public static fromSerialized(
    serialized: IDexNumber | SerializedDexNumber,
  ): DexNumber {
    const instance = new DexNumber(_constructorGuard, 0)

    Object.defineProperties(instance, {
      s: { value: serialized.s, configurable: true },
      e: { value: serialized.e, configurable: true },
      c: {
        value: serialized.c ? [...serialized.c] : [],
        configurable: true,
      },
    })

    // Set the non-readonly properties
    instance._shiftedState = serialized._shiftedState
    instance._decimals = serialized._decimals
    instance._roundingMode = serialized._roundingMode as BigNumber.RoundingMode

    return instance
  }

  /**
   * Helper method to ensure a value is a proper DexNumber instance.
   * This is particularly useful when working with values that might be either
   * DexNumber instances or serialized DexNumber objects, such as when retrieving
   * from storage or receiving from network calls.
   *
   * @example
   * ```typescript
   * // Working with a mix of serialized and instance values
   * const num1 = DexNumber.fromUnshifted('100');
   * const serialized = num1.serialize();
   *
   * // Ensure works with both types:
   * const assured1 = DexNumber.ensure(num1);        // Returns original instance
   * const assured2 = DexNumber.ensure(serialized);  // Creates new instance
   *
   * // Practical usage in a function:
   * function calculateTotal(value: DexNumber | SerializedDexNumber) {
   *   const dexNum = DexNumber.ensure(value);
   *   return dexNum.multipliedBy(1.1); // 10% increase
   * }
   * ```
   *
   * @param value - Either a DexNumber instance or a serialized DexNumber object
   * @returns A DexNumber instance, either the original if already an instance, or a new instance if serialized
   */
  public static ensure(value: IDexNumber | SerializedDexNumber): DexNumber {
    if (value instanceof DexNumber) {
      return value
    }
    return DexNumber.fromSerialized(value as SerializedDexNumber)
  }

  /**
   * Creates a new DexNumber instance from a BigNumber.
   *
   * @param bigNumber - The BigNumber instance.
   * @param decimals - The decimals to apply.
   * @param shiftedState - The shifted state of the DexNumber.
   * @param roundingMode - The rounding mode to use for the BigNumber
   * @returns A new DexNumber instance.
   */
  public static fromBigNumber(
    bigNumber: BigNumber,
    decimals: DexNumberDecimal,
    shiftedState: DexNumberState = 'neutral',
    roundingMode?: BigNumber.RoundingMode,
  ): IDexNumber {
    const dexNum = Object.create(DexNumber.prototype)
    Object.assign(dexNum, bigNumber)
    dexNum._decimals = decimals
    dexNum._shiftedState = shiftedState
    dexNum._roundingMode = roundingMode ?? BigNumber.ROUND_DOWN
    return dexNum
  }

  /**
   * Helper method to create a new DexNumber instance from a string.
   *
   * @param value - The string to create the DexNumber from.
   * @param decimals - The decimals to apply.
   * @param shiftedState - The shifted state of the DexNumber.
   * @returns A new DexNumber instance.
   */
  public static fromString(
    value: string,
    decimals: DexNumberDecimal,
    shiftedState: 'unshifted' | 'shifted',
  ): IDexNumber {
    const bigNum = new DexNumber(_constructorGuard, value.toString(), decimals)
    bigNum._shiftedState = shiftedState

    return bigNum
  }

  /**
   * Creates a new DexNumber instance from a bigint value.
   *
   * @param value - The bigint value to convert
   * @param decimals - (Optional) The number of decimals representing the precision. Defaults to 0 if not provided.
   * @param shiftedState - (Optional) The shifted state of the new DexNumber. Defaults to 'neutral'
   * @returns A DexNumber instance representing the bigint value
   *
   * @example
   * ```typescript
   * const value = BigInt('1000000000000000000')
   * const dexNum = DexNumber.fromBigInt(value, 18)
   * console.log(dexNum.unshift().toFixed()) // "1.0"
   * ```
   */
  public static fromBigInt(
    value: bigint,
    decimals: DexNumberDecimal = 0,
    shiftedState: DexNumberState = 'neutral',
  ): IDexNumber {
    // Convert bigint to string to ensure no precision loss
    const stringValue = value.toString()
    const bigNum = new DexNumber(_constructorGuard, stringValue, decimals)
    bigNum._shiftedState = shiftedState

    return bigNum
  }

  /**
   * Creates a new DexNumber instance from an unshifted value. The unshifted state means that
   * the value is represented in a human-readable format (e.g., Ether for Ether instead of wei).
   *
   * @param value - The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.
   * @param decimals - (Optional) The number of decimals representing the precision. Defaults to 0 if not provided.
   * @returns A DexNumber instance representing the unshifted value.
   *
   * @example
   * ```typescript
   * const unshiftedDexNum = DexNumber.fromUnshifted('1', 18); // Represents 1 Ether.
   * ```
   */
  static fromUnshifted(
    value: BigNumberish,
    decimals?: DexNumberDecimal,
  ): IDexNumber {
    const bigNum = new DexNumber(_constructorGuard, value.toString(), decimals)
    bigNum._shiftedState = 'unshifted'

    return bigNum
  }

  /**
   * Creates a new DexNumber instance from a shifted value. The shifted state means that
   * the value is already represented in its smallest unit (e.g., wei for Ether).
   *
   * @param value - The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.
   * @param decimals - (Optional) The number of decimals representing the precision. Defaults to 0 if not provided.
   * @returns A DexNumber instance representing the shifted value.
   *
   * @example
   * ```typescript
   * const shiftedDexNum = DexNumber.fromShifted('1000000000000000000', 18); // Represents 1 Ether in wei.
   * ```
   */
  static fromShifted(
    value: BigNumberish,
    decimals?: DexNumberDecimal,
  ): IDexNumber {
    const bigNum = new DexNumber(_constructorGuard, value.toString(), decimals)
    bigNum._shiftedState = 'shifted'

    return bigNum
  }

  /**
   * Alias for `fromUnshifted`
   *
   * Creates a new DexNumber instance from a decimal value. The decimal state means that
   * the value is represented in a human-readable format (e.g., Ether for Ether instead of wei).
   *
   * @param value - The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.
   * @param decimals - (Optional) The number of decimals representing the precision. Defaults to 0 if not provided.
   * @returns A DexNumber instance representing the decimal value.
   *
   * @example
   * ```typescript
   * const dexNum = DexNumber.fromDecimal('1', 18); // Represents 1 Ether.
   * const dexNum = DexNumber.fromDecimal('1.0', 18); // Represents 1 Ether.
   * const dexNum = DexNumber.fromAtomic('1.5', 18); // Represents 1.5 Ether.
   * ```
   */
  static fromDecimal(
    value: BigNumberish,
    decimals?: DexNumberDecimal,
  ): IDexNumber {
    return DexNumber.fromUnshifted(value, decimals)
  }

  /**
   * Alias for `fromShifted`
   *
   * Creates a new DexNumber instance from a shifted value. The shifted state means that
   * the value is already represented in its smallest unit (e.g., wei for Ether).
   *
   * @param value - The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.
   * @param decimals - (Optional) The number of decimals representing the precision. Defaults to 0 if not provided.
   * @returns A DexNumber instance representing the shifted value.
   *
   * @example
   * ```typescript
   * const dexNum = DexNumber.fromAtomic('1000000000000000000', 18); // Represents 1 Ether.
   * const dexNum = DexNumber.fromAtomic('1500000000000000000', 18); // Represents 1.5 Ether.
   * ```
   */
  static fromAtomic(
    value: BigNumberish,
    decimals?: DexNumberDecimal,
  ): IDexNumber {
    return DexNumber.fromShifted(value, decimals)
  }
}
