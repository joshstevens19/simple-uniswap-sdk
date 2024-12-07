[**@dex-toolkit/number v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/number](../README.md) / DexNumber

# Class: DexNumber

## Extends

- `BigNumber`

## Implements

- `IDexNumber`

## Constructors

### new DexNumber()

> **new DexNumber**(`constructorGuard`, `value`, `decimals`?, `shiftedState`?, `roundingMode`?): [`DexNumber`](DexNumber.md)

Constructs a new DexNumber instance.

#### Parameters

• **constructorGuard**: `any`

• **value**: `Value`

The numeric value. Can be a number, string, BigNumber, or hex string.

• **decimals?**: `DexNumberDecimal`

(Optional) The number of decimals or a unit string (e.g., 'ether').

• **shiftedState?**: `DexNumberState`

(Optional) The shifted state of the DexNumber.

• **roundingMode?**: `RoundingMode`

(Optional) The default rounding mode to use when performing arithmetic operations.

#### Returns

[`DexNumber`](DexNumber.md)

#### Overrides

`BigNumber.constructor`

#### Defined in

packages/number/src/dex-number.ts:131

## Properties

### \_decimals

> **\_decimals**: `number`

The number of decimal places

#### Implementation of

`IDexNumber._decimals`

#### Defined in

packages/number/src/dex-number.ts:118

***

### \_roundingMode

> **\_roundingMode**: `RoundingMode` = `BigNumber.ROUND_DOWN`

The rounding mode

#### Implementation of

`IDexNumber._roundingMode`

#### Defined in

packages/number/src/dex-number.ts:121

***

### \_shiftedState

> **\_shiftedState**: `DexNumberState` = `'neutral'`

The shifted state of the number

#### Implementation of

`IDexNumber._shiftedState`

#### Defined in

packages/number/src/dex-number.ts:115

***

### c

> `readonly` **c**: `null` \| `number`[]

The coefficient of the value of this BigNumber, an array of base 1e14 integer numbers, or null.

#### Implementation of

`IDexNumber.c`

#### Inherited from

`BigNumber.c`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:336

***

### e

> `readonly` **e**: `null` \| `number`

The exponent of the value of this BigNumber, an integer number, -1000000000 to 1000000000, or null.

#### Implementation of

`IDexNumber.e`

#### Inherited from

`BigNumber.e`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:339

***

### s

> `readonly` **s**: `null` \| `number`

The sign of the value of this BigNumber, -1, 1, or null.

#### Implementation of

`IDexNumber.s`

#### Inherited from

`BigNumber.s`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:342

***

### DEBUG?

> `static` `optional` **DEBUG**: `boolean`

To aid in debugging, if a `BigNumber.DEBUG` property is `true` then an error will be thrown
if the BigNumber constructor receives an invalid `BigNumber.Value`, or if `BigNumber.isBigNumber`
receives a BigNumber instance that is malformed.

```ts
// No error, and BigNumber NaN is returned.
new BigNumber('blurgh')    // 'NaN'
new BigNumber(9, 2)        // 'NaN'
BigNumber.DEBUG = true
new BigNumber('blurgh')    // '[BigNumber Error] Not a number'
new BigNumber(9, 2)        // '[BigNumber Error] Not a base 2 number'
```

An error will also be thrown if a `BigNumber.Value` is of type number with more than 15
significant digits, as calling `toString` or `valueOf` on such numbers may not result
in the intended value.

```ts
console.log(823456789123456.3)       //  823456789123456.2
// No error, and the returned BigNumber does not have the same value as the number literal.
new BigNumber(823456789123456.3)     // '823456789123456.2'
BigNumber.DEBUG = true
new BigNumber(823456789123456.3)
// '[BigNumber Error] Number primitive has more than 15 significant digits'
```

Check that a BigNumber instance is well-formed:

```ts
x = new BigNumber(10)

BigNumber.DEBUG = false
// Change x.c to an illegitimate value.
x.c = NaN
// No error, as BigNumber.DEBUG is false.
BigNumber.isBigNumber(x)    // true

BigNumber.DEBUG = true
BigNumber.isBigNumber(x)    // '[BigNumber Error] Invalid BigNumber'
```

#### Inherited from

`BigNumber.DEBUG`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1591

***

### EUCLID

> `readonly` `static` **EUCLID**: `9`

See `MODULO_MODE`.

#### Inherited from

`BigNumber.EUCLID`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1547

***

### ROUND\_CEIL

> `readonly` `static` **ROUND\_CEIL**: `2`

Rounds towards Infinity.

#### Inherited from

`BigNumber.ROUND_CEIL`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1526

***

### ROUND\_DOWN

> `readonly` `static` **ROUND\_DOWN**: `1`

Rounds towards zero.

#### Inherited from

`BigNumber.ROUND_DOWN`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1523

***

### ROUND\_FLOOR

> `readonly` `static` **ROUND\_FLOOR**: `3`

Rounds towards -Infinity.

#### Inherited from

`BigNumber.ROUND_FLOOR`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1529

***

### ROUND\_HALF\_CEIL

> `readonly` `static` **ROUND\_HALF\_CEIL**: `7`

Rounds towards nearest neighbour. If equidistant, rounds towards Infinity.

#### Inherited from

`BigNumber.ROUND_HALF_CEIL`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1541

***

### ROUND\_HALF\_DOWN

> `readonly` `static` **ROUND\_HALF\_DOWN**: `5`

Rounds towards nearest neighbour. If equidistant, rounds towards zero.

#### Inherited from

`BigNumber.ROUND_HALF_DOWN`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1535

***

### ROUND\_HALF\_EVEN

> `readonly` `static` **ROUND\_HALF\_EVEN**: `6`

Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour.

#### Inherited from

`BigNumber.ROUND_HALF_EVEN`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1538

***

### ROUND\_HALF\_FLOOR

> `readonly` `static` **ROUND\_HALF\_FLOOR**: `8`

Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity.

#### Inherited from

`BigNumber.ROUND_HALF_FLOOR`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1544

***

### ROUND\_HALF\_UP

> `readonly` `static` **ROUND\_HALF\_UP**: `4`

Rounds towards nearest neighbour. If equidistant, rounds away from zero .

#### Inherited from

`BigNumber.ROUND_HALF_UP`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1532

***

### ROUND\_UP

> `readonly` `static` **ROUND\_UP**: `0`

Rounds away from zero.

#### Inherited from

`BigNumber.ROUND_UP`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1520

## Accessors

### decimals

> `get` **decimals**(): `number`

Gets the number of decimal places for the number.

#### Returns

`number`

#### Implementation of

`IDexNumber.decimals`

#### Defined in

packages/number/src/dex-number.ts:260

***

### shiftedState

> `get` **shiftedState**(): `DexNumberState`

Gets the shifted state of the number.

#### Returns

`DexNumberState`

#### Implementation of

`IDexNumber.shiftedState`

#### Defined in

packages/number/src/dex-number.ts:256

## Methods

### abs()

> **abs**(): `IDexNumber`

Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this
BigNumber.

The return value is always exact and unrounded.

```ts
x = new BigNumber(-0.8)
x.abs()                     // '0.8'
```

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.abs`

#### Overrides

`BigNumber.abs`

#### Defined in

packages/number/src/dex-number.ts:316

***

### absoluteValue()

> **absoluteValue**(): `IDexNumber`

Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this
BigNumber.

The return value is always exact and unrounded.

```ts
x = new BigNumber(-0.8)
x.absoluteValue()           // '0.8'
```

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.absoluteValue`

#### Overrides

`BigNumber.absoluteValue`

#### Defined in

packages/number/src/dex-number.ts:312

***

### adjustForDecimals()

> **adjustForDecimals**(`otherDecimals`): `IDexNumber`

Adjusts the decimals of the DexNumber to match the provided decimals.
This is useful when converting between different token decimals.

#### Parameters

• **otherDecimals**: `number`

The decimals of the other token involved in the conversion.

#### Returns

`IDexNumber`

A new DexNumber instance with adjusted decimals.

#### Implementation of

`IDexNumber.adjustForDecimals`

#### Defined in

packages/number/src/dex-number.ts:603

***

### clone()

> **clone**(): `IDexNumber`

Clones the current instance.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.clone`

#### Defined in

packages/number/src/dex-number.ts:173

***

### comparedTo()

> **comparedTo**(`n`): `number`

Returns |                                                               |
:-------:|:--------------------------------------------------------------|
    1    | If the value of this BigNumber is greater than the value of `n`
   -1    | If the value of this BigNumber is less than the value of `n`
    0    | If this BigNumber and `n` have the same value
 `null`  | If the value of either this BigNumber or `n` is `NaN`

```ts

x = new BigNumber(Infinity)
y = new BigNumber(5)
x.comparedTo(y)                 // 1
x.comparedTo(x.minus(1))        // 0
y.comparedTo(NaN)               // null
y.comparedTo('110', 2)          // -1
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`number`

#### Implementation of

`IDexNumber.comparedTo`

#### Overrides

`BigNumber.comparedTo`

#### Defined in

packages/number/src/dex-number.ts:268

***

### createResult()

> **createResult**(`bigNumber`, `decimals`, `roundingMode`?): `IDexNumber`

Creates a new DexNumber while preserving state

#### Parameters

• **bigNumber**: `BigNumber`

• **decimals**: `DexNumberDecimal`

• **roundingMode?**: `RoundingMode`

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.createResult`

#### Defined in

packages/number/src/dex-number.ts:233

***

### decimalPlaces()

#### decimalPlaces(undefined)

> **decimalPlaces**(): `null` \| `number`

Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode
`roundingMode` to a maximum of `decimalPlaces` decimal places.

If `decimalPlaces` is omitted, or is `null` or `undefined`, the return value is the number of
decimal places of the value of this BigNumber, or `null` if the value of this BigNumber is
±`Infinity` or `NaN`.

If `roundingMode` is omitted, or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = new BigNumber(1234.56)
x.decimalPlaces()                      // 2
x.decimalPlaces(1)                     // '1234.6'
x.decimalPlaces(2)                     // '1234.56'
x.decimalPlaces(10)                    // '1234.56'
x.decimalPlaces(0, 1)                  // '1234'
x.decimalPlaces(0, 6)                  // '1235'
x.decimalPlaces(1, 1)                  // '1234.5'
x.decimalPlaces(1, BigNumber.ROUND_HALF_EVEN)     // '1234.6'
x                                      // '1234.56'
y = new BigNumber('9.9e-101')
y.decimalPlaces()                      // 102
```

##### Returns

`null` \| `number`

##### Implementation of

`IDexNumber.decimalPlaces`

##### Overrides

`BigNumber.decimalPlaces`

##### Defined in

packages/number/src/dex-number.ts:320

#### decimalPlaces(decimalPlaces, roundingMode)

> **decimalPlaces**(`decimalPlaces`, `roundingMode`?): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode
`roundingMode` to a maximum of `decimalPlaces` decimal places.

If `decimalPlaces` is omitted, or is `null` or `undefined`, the return value is the number of
decimal places of the value of this BigNumber, or `null` if the value of this BigNumber is
±`Infinity` or `NaN`.

If `roundingMode` is omitted, or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = new BigNumber(1234.56)
x.decimalPlaces()                      // 2
x.decimalPlaces(1)                     // '1234.6'
x.decimalPlaces(2)                     // '1234.56'
x.decimalPlaces(10)                    // '1234.56'
x.decimalPlaces(0, 1)                  // '1234'
x.decimalPlaces(0, 6)                  // '1235'
x.decimalPlaces(1, 1)                  // '1234.5'
x.decimalPlaces(1, BigNumber.ROUND_HALF_EVEN)     // '1234.6'
x                                      // '1234.56'
y = new BigNumber('9.9e-101')
y.decimalPlaces()                      // 102
```

##### Parameters

• **decimalPlaces**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

##### Returns

`IDexNumber`

##### Implementation of

`IDexNumber.decimalPlaces`

##### Overrides

`BigNumber.decimalPlaces`

##### Defined in

packages/number/src/dex-number.ts:321

***

### div()

> **div**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber divided by `n`, rounded
according to the current `DECIMAL_PLACES` and `ROUNDING_MODE` settings.

```ts
x = new BigNumber(355)
y = new BigNumber(113)
x.div(y)                    // '3.14159292035398230088'
x.div(5)                    // '71'
x.div(47, 16)               // '5'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.div`

#### Overrides

`BigNumber.div`

#### Defined in

packages/number/src/dex-number.ts:370

***

### dividedBy()

> **dividedBy**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber divided by `n`, rounded
according to the current `DECIMAL_PLACES` and `ROUNDING_MODE` settings.

```ts
x = new BigNumber(355)
y = new BigNumber(113)
x.dividedBy(y)                  // '3.14159292035398230088'
x.dividedBy(5)                  // '71'
x.dividedBy(47, 16)             // '5'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.dividedBy`

#### Overrides

`BigNumber.dividedBy`

#### Defined in

packages/number/src/dex-number.ts:360

***

### dividedToIntegerBy()

> **dividedToIntegerBy**(`n`): `IDexNumber`

Returns a BigNumber whose value is the integer part of dividing the value of this BigNumber by
`n`.

```ts
x = new BigNumber(5)
y = new BigNumber(3)
x.dividedToIntegerBy(y)              // '1'
x.dividedToIntegerBy(0.7)            // '7'
x.dividedToIntegerBy('0.f', 16)      // '5'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.dividedToIntegerBy`

#### Overrides

`BigNumber.dividedToIntegerBy`

#### Defined in

packages/number/src/dex-number.ts:374

***

### dp()

#### dp(undefined)

> **dp**(): `null` \| `number`

Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode
`roundingMode` to a maximum of `decimalPlaces` decimal places.

If `decimalPlaces` is omitted, or is `null` or `undefined`, the return value is the number of
decimal places of the value of this BigNumber, or `null` if the value of this BigNumber is
±`Infinity` or `NaN`.

If `roundingMode` is omitted, or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = new BigNumber(1234.56)
x.dp()                                 // 2
x.dp(1)                                // '1234.6'
x.dp(2)                                // '1234.56'
x.dp(10)                               // '1234.56'
x.dp(0, 1)                             // '1234'
x.dp(0, 6)                             // '1235'
x.dp(1, 1)                             // '1234.5'
x.dp(1, BigNumber.ROUND_HALF_EVEN)     // '1234.6'
x                                      // '1234.56'
y = new BigNumber('9.9e-101')
y.dp()                                 // 102
```

##### Returns

`null` \| `number`

##### Implementation of

`IDexNumber.dp`

##### Overrides

`BigNumber.dp`

##### Defined in

packages/number/src/dex-number.ts:340

#### dp(decimalPlaces, roundingMode)

> **dp**(`decimalPlaces`, `roundingMode`?): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber rounded by rounding mode
`roundingMode` to a maximum of `decimalPlaces` decimal places.

If `decimalPlaces` is omitted, or is `null` or `undefined`, the return value is the number of
decimal places of the value of this BigNumber, or `null` if the value of this BigNumber is
±`Infinity` or `NaN`.

If `roundingMode` is omitted, or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = new BigNumber(1234.56)
x.dp()                                 // 2
x.dp(1)                                // '1234.6'
x.dp(2)                                // '1234.56'
x.dp(10)                               // '1234.56'
x.dp(0, 1)                             // '1234'
x.dp(0, 6)                             // '1235'
x.dp(1, 1)                             // '1234.5'
x.dp(1, BigNumber.ROUND_HALF_EVEN)     // '1234.6'
x                                      // '1234.56'
y = new BigNumber('9.9e-101')
y.dp()                                 // 102
```

##### Parameters

• **decimalPlaces**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

##### Returns

`IDexNumber`

##### Implementation of

`IDexNumber.dp`

##### Overrides

`BigNumber.dp`

##### Defined in

packages/number/src/dex-number.ts:341

***

### eq()

> **eq**(`n`): `boolean`

Returns `true` if the value of this BigNumber is equal to the value of `n`, otherwise returns
`false`.

As with JavaScript, `NaN` does not equal `NaN`.

```ts
0 === 1e-324                    // true
x = new BigNumber(0)
x.eq('1e-324')                  // false
BigNumber(-0).eq(x)             // true  ( -0 === 0 )
BigNumber(255).eq('ff', 16)     // true

y = new BigNumber(NaN)
y.eq(NaN)                       // false
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.eq`

#### Overrides

`BigNumber.eq`

#### Defined in

packages/number/src/dex-number.ts:273

***

### exponentiatedBy()

> **exponentiatedBy**(`n`, `m`?): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber exponentiated by `n`, i.e.
raised to the power `n`, and optionally modulo a modulus `m`.

If `n` is negative the result is rounded according to the current `DECIMAL_PLACES` and
`ROUNDING_MODE` settings.

As the number of digits of the result of the power operation can grow so large so quickly,
e.g. 123.456**10000 has over 50000 digits, the number of significant digits calculated is
limited to the value of the `POW_PRECISION` setting (unless a modulus `m` is specified).

By default `POW_PRECISION` is set to 0. This means that an unlimited number of significant
digits will be calculated, and that the method's performance will decrease dramatically for
larger exponents.

If `m` is specified and the value of `m`, `n` and this BigNumber are integers and `n` is
positive, then a fast modular exponentiation algorithm is used, otherwise the operation will
be performed as `x.exponentiatedBy(n).modulo(m)` with a `POW_PRECISION` of 0.

Throws if `n` is not an integer.

```ts
Math.pow(0.7, 2)                    // 0.48999999999999994
x = new BigNumber(0.7)
x.exponentiatedBy(2)                // '0.49'
BigNumber(3).exponentiatedBy(-2)    // '0.11111111111111111111'
```

#### Parameters

• **n**: `number`

The exponent, an integer.

• **m?**: `Value`

The modulus.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.exponentiatedBy`

#### Overrides

`BigNumber.exponentiatedBy`

#### Defined in

packages/number/src/dex-number.ts:383

***

### gt()

> **gt**(`n`): `boolean`

Returns `true` if the value of this BigNumber is greater than the value of `n`, otherwise
returns `false`.

```ts
0.1 > (0.3 - 0                     // true
x = new BigNumber(0.1)
x.gt(BigNumber(0.3).minus(0.2))    // false
BigNumber(0).gt(x)                 // false
BigNumber(11, 3).gt(11.1, 2)       // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.gt`

#### Overrides

`BigNumber.gt`

#### Defined in

packages/number/src/dex-number.ts:280

***

### gte()

> **gte**(`n`): `boolean`

Returns `true` if the value of this BigNumber is greater than or equal to the value of `n`,
otherwise returns `false`.

```ts
(0.3 - 0.2) >= 0.1                    // false
x = new BigNumber(0.3).minus(0.2)
x.gte(0.1)                            // true
BigNumber(1).gte(x)                   // true
BigNumber(10, 18).gte('i', 36)        // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.gte`

#### Overrides

`BigNumber.gte`

#### Defined in

packages/number/src/dex-number.ts:287

***

### idiv()

> **idiv**(`n`): `IDexNumber`

Returns a BigNumber whose value is the integer part of dividing the value of this BigNumber by
`n`.

```ts
x = new BigNumber(5)
y = new BigNumber(3)
x.idiv(y)                       // '1'
x.idiv(0.7)                     // '7'
x.idiv('0.f', 16)               // '5'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.idiv`

#### Overrides

`BigNumber.idiv`

#### Defined in

packages/number/src/dex-number.ts:379

***

### integerValue()

> **integerValue**(`rm`?): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber rounded to an integer using
rounding mode `rm`.

If `rm` is omitted, or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `rm` is invalid.

```ts
x = new BigNumber(123.456)
x.integerValue()                        // '123'
x.integerValue(BigNumber.ROUND_CEIL)    // '124'
y = new BigNumber(-12.7)
y.integerValue()                        // '-13'
x.integerValue(BigNumber.ROUND_DOWN)    // '-12'
```

#### Parameters

• **rm?**: `RoundingMode`

The roundng mode, an integer, 0 to 8.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.integerValue`

#### Overrides

`BigNumber.integerValue`

#### Defined in

packages/number/src/dex-number.ts:398

***

### isEqualTo()

> **isEqualTo**(`n`): `boolean`

Returns `true` if the value of this BigNumber is equal to the value of `n`, otherwise returns
`false`.

As with JavaScript, `NaN` does not equal `NaN`.

```ts
0 === 1e-324                           // true
x = new BigNumber(0)
x.isEqualTo('1e-324')                  // false
BigNumber(-0).isEqualTo(x)             // true  ( -0 === 0 )
BigNumber(255).isEqualTo('ff', 16)     // true

y = new BigNumber(NaN)
y.isEqualTo(NaN)                // false
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isEqualTo`

#### Overrides

`BigNumber.isEqualTo`

#### Defined in

packages/number/src/dex-number.ts:276

***

### isFinite()

> **isFinite**(): `boolean`

Returns `true` if the value of this BigNumber is a finite number, otherwise returns `false`.

The only possible non-finite values of a BigNumber are `NaN`, `Infinity` and `-Infinity`.

```ts
x = new BigNumber(1)
x.isFinite()                    // true
y = new BigNumber(Infinity)
y.isFinite()                    // false
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isFinite`

#### Inherited from

`BigNumber.isFinite`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:769

***

### isGreaterThan()

> **isGreaterThan**(`n`): `boolean`

Returns `true` if the value of this BigNumber is greater than the value of `n`, otherwise
returns `false`.

```ts
0.1 > (0.3 - 0.2)                             // true
x = new BigNumber(0.1)
x.isGreaterThan(BigNumber(0.3).minus(0.2))    // false
BigNumber(0).isGreaterThan(x)                 // false
BigNumber(11, 3).isGreaterThan(11.1, 2)       // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isGreaterThan`

#### Overrides

`BigNumber.isGreaterThan`

#### Defined in

packages/number/src/dex-number.ts:283

***

### isGreaterThanOrEqualTo()

> **isGreaterThanOrEqualTo**(`n`): `boolean`

Returns `true` if the value of this BigNumber is greater than or equal to the value of `n`,
otherwise returns `false`.

```ts
(0.3 - 0.2) >= 0.1                                  // false
x = new BigNumber(0.3).minus(0.2)
x.isGreaterThanOrEqualTo(0.1)                       // true
BigNumber(1).isGreaterThanOrEqualTo(x)              // true
BigNumber(10, 18).isGreaterThanOrEqualTo('i', 36)   // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isGreaterThanOrEqualTo`

#### Overrides

`BigNumber.isGreaterThanOrEqualTo`

#### Defined in

packages/number/src/dex-number.ts:290

***

### isInteger()

> **isInteger**(): `boolean`

Returns `true` if the value of this BigNumber is an integer, otherwise returns `false`.

```ts
x = new BigNumber(1)
x.isInteger()                   // true
y = new BigNumber(123.456)
y.isInteger()                   // false
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isInteger`

#### Inherited from

`BigNumber.isInteger`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:849

***

### isLessThan()

> **isLessThan**(`n`): `boolean`

Returns `true` if the value of this BigNumber is less than the value of `n`, otherwise returns
`false`.

```ts
(0.3 - 0.2) < 0.1                       // true
x = new BigNumber(0.3).minus(0.2)
x.isLessThan(0.1)                       // false
BigNumber(0).isLessThan(x)              // true
BigNumber(11.1, 2).isLessThan(11, 3)    // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isLessThan`

#### Overrides

`BigNumber.isLessThan`

#### Defined in

packages/number/src/dex-number.ts:297

***

### isLessThanOrEqualTo()

> **isLessThanOrEqualTo**(`n`): `boolean`

Returns `true` if the value of this BigNumber is less than or equal to the value of `n`,
otherwise returns `false`.

```ts
0.1 <= (0.3 - 0.2)                                 // false
x = new BigNumber(0.1)
x.isLessThanOrEqualTo(BigNumber(0.3).minus(0.2))   // true
BigNumber(-1).isLessThanOrEqualTo(x)               // true
BigNumber(10, 18).isLessThanOrEqualTo('i', 36)     // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isLessThanOrEqualTo`

#### Overrides

`BigNumber.isLessThanOrEqualTo`

#### Defined in

packages/number/src/dex-number.ts:304

***

### isNaN()

> **isNaN**(): `boolean`

Returns `true` if the value of this BigNumber is `NaN`, otherwise returns `false`.

```ts
x = new BigNumber(NaN)
x.isNaN()                       // true
y = new BigNumber('Infinity')
y.isNaN()                       // false
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isNaN`

#### Inherited from

`BigNumber.isNaN`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:929

***

### isNegative()

> **isNegative**(): `boolean`

Returns `true` if the value of this BigNumber is negative, otherwise returns `false`.

```ts
x = new BigNumber(-0)
x.isNegative()                  // true
y = new BigNumber(2)
y.isNegative()                  // false
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isNegative`

#### Inherited from

`BigNumber.isNegative`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:941

***

### isNeutral()

> **isNeutral**(): `boolean`

Checks if the number is in neutral state

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isNeutral`

#### Defined in

packages/number/src/dex-number.ts:169

***

### isPositive()

> **isPositive**(): `boolean`

Returns `true` if the value of this BigNumber is positive, otherwise returns `false`.

```ts
x = new BigNumber(-0)
x.isPositive()                  // false
y = new BigNumber(2)
y.isPositive()                  // true
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isPositive`

#### Inherited from

`BigNumber.isPositive`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:953

***

### isShifted()

> **isShifted**(): `boolean`

Checks if the number is in shifted state

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isShifted`

#### Defined in

packages/number/src/dex-number.ts:161

***

### isUnshifted()

> **isUnshifted**(): `boolean`

Checks if the number is in unshifted state

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isUnshifted`

#### Defined in

packages/number/src/dex-number.ts:165

***

### isZero()

> **isZero**(): `boolean`

Returns `true` if the value of this BigNumber is zero or minus zero, otherwise returns `false`.

```ts
x = new BigNumber(-0)
x.isZero()                 // true
```

#### Returns

`boolean`

#### Implementation of

`IDexNumber.isZero`

#### Inherited from

`BigNumber.isZero`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:963

***

### lt()

> **lt**(`n`): `boolean`

Returns `true` if the value of this BigNumber is less than the value of `n`, otherwise returns
`false`.

```ts
(0.3 - 0.2) < 0.1                       // true
x = new BigNumber(0.3).minus(0.2)
x.lt(0.1)                               // false
BigNumber(0).lt(x)                      // true
BigNumber(11.1, 2).lt(11, 3)            // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.lt`

#### Overrides

`BigNumber.lt`

#### Defined in

packages/number/src/dex-number.ts:294

***

### lte()

> **lte**(`n`): `boolean`

Returns `true` if the value of this BigNumber is less than or equal to the value of `n`,
otherwise returns `false`.

```ts
0.1 <= (0.3 - 0.2)                  // false
x = new BigNumber(0.1)
x.lte(BigNumber(0.3).minus(0.2))    // true
BigNumber(-1).lte(x)                // true
BigNumber(10, 18).lte('i', 36)      // true
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`boolean`

#### Implementation of

`IDexNumber.lte`

#### Overrides

`BigNumber.lte`

#### Defined in

packages/number/src/dex-number.ts:301

***

### minus()

> **minus**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber minus `n`.

The return value is always exact and unrounded.

```ts
0.3 - 0.1                       // 0.19999999999999998
x = new BigNumber(0.3)
x.minus(0.1)                    // '0.2'
x.minus(0.6, 20)                // '0'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.minus`

#### Overrides

`BigNumber.minus`

#### Defined in

packages/number/src/dex-number.ts:403

***

### mod()

> **mod**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber modulo `n`, i.e. the integer
remainder of dividing this BigNumber by `n`.

The value returned, and in particular its sign, is dependent on the value of the `MODULO_MODE`
setting of this BigNumber constructor. If it is 1 (default value), the result will have the
same sign as this BigNumber, and it will match that of Javascript's `%` operator (within the
limits of double precision) and BigDecimal's `remainder` method.

The return value is always exact and unrounded.

See `MODULO_MODE` for a description of the other modulo modes.

```ts
1 % 0.9                      // 0.09999999999999998
x = new BigNumber(1)
x.mod(0.9)                   // '0.1'
y = new BigNumber(33)
y.mod('a', 33)               // '3'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.mod`

#### Overrides

`BigNumber.mod`

#### Defined in

packages/number/src/dex-number.ts:420

***

### modulo()

> **modulo**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber modulo `n`, i.e. the integer
remainder of dividing this BigNumber by `n`.

The value returned, and in particular its sign, is dependent on the value of the `MODULO_MODE`
setting of this BigNumber constructor. If it is 1 (default value), the result will have the
same sign as this BigNumber, and it will match that of Javascript's `%` operator (within the
limits of double precision) and BigDecimal's `remainder` method.

The return value is always exact and unrounded.

See `MODULO_MODE` for a description of the other modulo modes.

```ts
1 % 0.9                         // 0.09999999999999998
x = new BigNumber(1)
x.modulo(0.9)                   // '0.1'
y = new BigNumber(33)
y.modulo('a', 33)               // '3'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.modulo`

#### Overrides

`BigNumber.modulo`

#### Defined in

packages/number/src/dex-number.ts:415

***

### multipliedBy()

> **multipliedBy**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber multiplied by `n`.

The return value is always exact and unrounded.

```ts
0.6 * 3                                // 1.7999999999999998
x = new BigNumber(0.6)
y = x.multipliedBy(3)                  // '1.8'
BigNumber('7e+500').multipliedBy(y)    // '1.26e+501'
x.multipliedBy('-a', 16)               // '-6'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.multipliedBy`

#### Overrides

`BigNumber.multipliedBy`

#### Defined in

packages/number/src/dex-number.ts:424

***

### negated()

> **negated**(): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber negated, i.e. multiplied by -1.

```ts
x = new BigNumber(1.8)
x.negated()                     // '-1.8'
y = new BigNumber(-1.3)
y.negated()                     // '1.3'
```

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.negated`

#### Overrides

`BigNumber.negated`

#### Defined in

packages/number/src/dex-number.ts:450

***

### normalizeToBigNumber()

> **normalizeToBigNumber**(`n`): `object`

Converts any input value to a BigNumber with matching decimals

#### Parameters

• **n**: `Value`

#### Returns

`object`

##### base

> **base**: `BigNumber`

##### decimalDifference

> **decimalDifference**: `number`

##### other

> **other**: `BigNumber`

#### Implementation of

`IDexNumber.normalizeToBigNumber`

#### Defined in

packages/number/src/dex-number.ts:183

***

### plus()

> **plus**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber plus `n`.

The return value is always exact and unrounded.

```ts
0.1 + 0.2                       // 0.30000000000000004
x = new BigNumber(0.1)
y = x.plus(0.2)                 // '0.3'
BigNumber(0.7).plus(x).plus(y)  // '1.1'
x.plus('0.1', 8)                // '0.225'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.plus`

#### Overrides

`BigNumber.plus`

#### Defined in

packages/number/src/dex-number.ts:455

***

### pow()

> **pow**(`n`, `m`?): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber exponentiated by `n`, i.e.
raised to the power `n`, and optionally modulo a modulus `m`.

If `n` is negative the result is rounded according to the current `DECIMAL_PLACES` and
`ROUNDING_MODE` settings.

As the number of digits of the result of the power operation can grow so large so quickly,
e.g. 123.456**10000 has over 50000 digits, the number of significant digits calculated is
limited to the value of the `POW_PRECISION` setting (unless a modulus `m` is specified).

By default `POW_PRECISION` is set to 0. This means that an unlimited number of significant
digits will be calculated, and that the method's performance will decrease dramatically for
larger exponents.

If `m` is specified and the value of `m`, `n` and this BigNumber are integers and `n` is
positive, then a fast modular exponentiation algorithm is used, otherwise the operation will
be performed as `x.pow(n).modulo(m)` with a `POW_PRECISION` of 0.

Throws if `n` is not an integer.

```ts
Math.pow(0.7, 2)                   // 0.48999999999999994
x = new BigNumber(0.7)
x.pow(2)                           // '0.49'
BigNumber(3).pow(-2)               // '0.11111111111111111111'
```

#### Parameters

• **n**: `number`

The exponent, an integer.

• **m?**: `Value`

The modulus.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.pow`

#### Overrides

`BigNumber.pow`

#### Defined in

packages/number/src/dex-number.ts:394

***

### precision()

#### precision(includeZeros)

> **precision**(`includeZeros`?): `number`

Returns the number of significant digits of the value of this BigNumber, or `null` if the value
of this BigNumber is ±`Infinity` or `NaN`.

If `includeZeros` is true then any trailing zeros of the integer part of the value of this
BigNumber are counted as significant digits, otherwise they are not.

Throws if `includeZeros` is invalid.

```ts
x = new BigNumber(9876.54321)
x.precision()                         // 9
y = new BigNumber(987000)
y.precision(false)                    // 3
y.precision(true)                     // 6
```

##### Parameters

• **includeZeros?**: `boolean`

Whether to include integer trailing zeros in the significant digit count.

##### Returns

`number`

##### Implementation of

`IDexNumber.precision`

##### Overrides

`BigNumber.precision`

##### Defined in

packages/number/src/dex-number.ts:485

#### precision(significantDigits, roundingMode)

> **precision**(`significantDigits`, `roundingMode`?): `IDexNumber`

Returns the number of significant digits of the value of this BigNumber, or `null` if the value
of this BigNumber is ±`Infinity` or `NaN`.

If `includeZeros` is true then any trailing zeros of the integer part of the value of this
BigNumber are counted as significant digits, otherwise they are not.

Throws if `includeZeros` is invalid.

```ts
x = new BigNumber(9876.54321)
x.precision()                         // 9
y = new BigNumber(987000)
y.precision(false)                    // 3
y.precision(true)                     // 6
```

##### Parameters

• **significantDigits**: `number`

• **roundingMode?**: `RoundingMode`

##### Returns

`IDexNumber`

##### Implementation of

`IDexNumber.precision`

##### Overrides

`BigNumber.precision`

##### Defined in

packages/number/src/dex-number.ts:486

***

### sd()

#### sd(includeZeros)

> **sd**(`includeZeros`?): `number`

Returns the number of significant digits of the value of this BigNumber,
or `null` if the value of this BigNumber is ±`Infinity` or `NaN`.

If `includeZeros` is true then any trailing zeros of the integer part of
the value of this BigNumber are counted as significant digits, otherwise
they are not.

Throws if `includeZeros` is invalid.

```ts
x = new BigNumber(9876.54321)
x.sd()                         // 9
y = new BigNumber(987000)
y.sd(false)                    // 3
y.sd(true)                     // 6
```

##### Parameters

• **includeZeros?**: `boolean`

Whether to include integer trailing zeros in the significant digit count.

##### Returns

`number`

##### Implementation of

`IDexNumber.sd`

##### Overrides

`BigNumber.sd`

##### Defined in

packages/number/src/dex-number.ts:467

#### sd(significantDigits, roundingMode)

> **sd**(`significantDigits`, `roundingMode`?): `IDexNumber`

Returns the number of significant digits of the value of this BigNumber,
or `null` if the value of this BigNumber is ±`Infinity` or `NaN`.

If `includeZeros` is true then any trailing zeros of the integer part of
the value of this BigNumber are counted as significant digits, otherwise
they are not.

Throws if `includeZeros` is invalid.

```ts
x = new BigNumber(9876.54321)
x.sd()                         // 9
y = new BigNumber(987000)
y.sd(false)                    // 3
y.sd(true)                     // 6
```

##### Parameters

• **significantDigits**: `number`

• **roundingMode?**: `RoundingMode`

##### Returns

`IDexNumber`

##### Implementation of

`IDexNumber.sd`

##### Overrides

`BigNumber.sd`

##### Defined in

packages/number/src/dex-number.ts:468

***

### shift()

> **shift**(): `IDexNumber`

Shifts the DexNumber by the stored decimals.
Converts it to the smallest unit (like wei for Ether).

#### Returns

`IDexNumber`

A DexNumber instance.

#### Example

```typescript
DexNumber.fromUnshifted('0.0001', 18).shift(); // Returns DexNumber representing '100000000000000'
DexNumber.fromUnshifted('1', 18).shift(); // Returns DexNumber representing '1000000000000000000'
```

#### Implementation of

`IDexNumber.shift`

#### Defined in

packages/number/src/dex-number.ts:612

***

### shiftedBy()

> **shiftedBy**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber shifted by `n` places.

The shift is of the decimal point, i.e. of powers of ten, and is to the left if `n` is negative
or to the right if `n` is positive.

The return value is always exact and unrounded.

Throws if `n` is invalid.

```ts
x = new BigNumber(1.23)
x.shiftedBy(3)                      // '1230'
x.shiftedBy(-3)                     // '0.00123'
```

#### Parameters

• **n**: `number`

The shift value, integer, -9007199254740991 to 9007199254740991.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.shiftedBy`

#### Overrides

`BigNumber.shiftedBy`

#### Defined in

packages/number/src/dex-number.ts:597

***

### sqrt()

> **sqrt**(): `IDexNumber`

Returns a BigNumber whose value is the square root of the value of this BigNumber, rounded
according to the current `DECIMAL_PLACES` and `ROUNDING_MODE` settings.

The return value will be correctly rounded, i.e. rounded as if the result was first calculated
to an infinite number of correct digits before rounding.

```ts
x = new BigNumber(16)
x.sqrt()                  // '4'
y = new BigNumber(3)
y.sqrt()                  // '1.73205080756887729353'
```

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.sqrt`

#### Overrides

`BigNumber.sqrt`

#### Defined in

packages/number/src/dex-number.ts:517

***

### squareRoot()

> **squareRoot**(): `IDexNumber`

Returns a BigNumber whose value is the square root of the value of this BigNumber, rounded
according to the current `DECIMAL_PLACES` and `ROUNDING_MODE` settings.

The return value will be correctly rounded, i.e. rounded as if the result was first calculated
to an infinite number of correct digits before rounding.

```ts
x = new BigNumber(16)
x.squareRoot()                  // '4'
y = new BigNumber(3)
y.squareRoot()                  // '1.73205080756887729353'
```

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.squareRoot`

#### Overrides

`BigNumber.squareRoot`

#### Defined in

packages/number/src/dex-number.ts:506

***

### times()

> **times**(`n`): `IDexNumber`

Returns a BigNumber whose value is the value of this BigNumber multiplied by `n`.

The return value is always exact and unrounded.

```ts
0.6 * 3                         // 1.7999999999999998
x = new BigNumber(0.6)
y = x.times(3)                  // '1.8'
BigNumber('7e+500').times(y)    // '1.26e+501'
x.times('-a', 16)               // '-6'
```

#### Parameters

• **n**: `Value`

A numeric value.

#### Returns

`IDexNumber`

#### Implementation of

`IDexNumber.times`

#### Overrides

`BigNumber.times`

#### Defined in

packages/number/src/dex-number.ts:446

***

### toBigInt()

> **toBigInt**(): `bigint`

Converts the DexNumber instance to a bigint.
Always returns a shifted value.

#### Returns

`bigint`

A bigint.

#### Implementation of

`IDexNumber.toBigInt`

#### Defined in

packages/number/src/dex-number.ts:699

***

### toBigNumber()

> **toBigNumber**(): `BigNumber`

Converts the DexNumber instance to a BigNumber instance.
Always returns a shifted value.

#### Returns

`BigNumber`

A BigNumber instance.

#### Implementation of

`IDexNumber.toBigNumber`

#### Defined in

packages/number/src/dex-number.ts:695

***

### toDecimalString()

> **toDecimalString**(`decimals`?, `roundingMode`?): `string`

Converts the `DexNumber` to a string with a fixed number of decimal places, optionally rounding.

#### Parameters

• **decimals?**: `number`

(Optional) Number of decimal places. Defaults to the initialized decimal places.

• **roundingMode?**: `RoundingMode`

(Optional) Rounding mode. Defaults to `BigNumber.ROUND_DOWN`.

#### Returns

`string`

A fixed decimal representation of the `DexNumber` as a string.

#### Example

```typescript
const price = DexNumber.fromUnshifted('100.123456789', 18);
price.toDecimalString(4); // Returns '100.1235'
price.toDecimalString(2, BigNumber.ROUND_UP); // Returns '100.13'
```

#### Implementation of

`IDexNumber.toDecimalString`

#### Defined in

packages/number/src/dex-number.ts:741

***

### toEthersBigNumber()

> **toEthersBigNumber**(): `BigNumber`

Converts a DexNumber instance to an ethers.js BigNumber.
Always returns a shifted value.

#### Returns

`BigNumber`

An ethers.js BigNumber.

#### Implementation of

`IDexNumber.toEthersBigNumber`

#### Defined in

packages/number/src/dex-number.ts:690

***

### toExponential()

#### toExponential(decimalPlaces, roundingMode)

> **toExponential**(`decimalPlaces`?, `roundingMode`?): `string`

Returns a string representing the value of this BigNumber in exponential notation rounded using
rounding mode `roundingMode` to `decimalPlaces` decimal places, i.e with one digit before the
decimal point and `decimalPlaces` digits after it.

If the value of this BigNumber in exponential notation has fewer than `decimalPlaces` fraction
digits, the return value will be appended with zeros accordingly.

If `decimalPlaces` is omitted, or is `null` or `undefined`, the number of digits after the
decimal point defaults to the minimum number of digits necessary to represent the value
exactly.

If `roundingMode` is omitted or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = 45.6
y = new BigNumber(x)
x.toExponential()               // '4.56e+1'
y.toExponential()               // '4.56e+1'
x.toExponential(0)              // '5e+1'
y.toExponential(0)              // '5e+1'
x.toExponential(1)              // '4.6e+1'
y.toExponential(1)              // '4.6e+1'
y.toExponential(1, 1)           // '4.5e+1'  (ROUND_DOWN)
x.toExponential(3)              // '4.560e+1'
y.toExponential(3)              // '4.560e+1'
```

##### Parameters

• **decimalPlaces?**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

##### Returns

`string`

##### Implementation of

`IDexNumber.toExponential`

##### Inherited from

`BigNumber.toExponential`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1272

#### toExponential(undefined)

> **toExponential**(): `string`

##### Returns

`string`

##### Implementation of

`IDexNumber.toExponential`

##### Inherited from

`BigNumber.toExponential`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1273

***

### toFixed()

> **toFixed**(`decimalPlaces`?, `roundingMode`?): `string`

Returns a string representing the value of this BigNumber in normal (fixed-point) notation
rounded to `decimalPlaces` decimal places using rounding mode `roundingMode`.

If the value of this BigNumber in normal notation has fewer than `decimalPlaces` fraction
digits, the return value will be appended with zeros accordingly.

Unlike `Number.prototype.toFixed`, which returns exponential notation if a number is greater or
equal to 10**21, this method will always return normal notation.

If `decimalPlaces` is omitted or is `null` or `undefined`, the return value will be unrounded
and in normal notation. This is also unlike `Number.prototype.toFixed`, which returns the value
to zero decimal places. It is useful when normal notation is required and the current
`EXPONENTIAL_AT` setting causes `toString` to return exponential notation.

If `roundingMode` is omitted or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `decimalPlaces` or `roundingMode` is invalid.

```ts
x = 3.456
y = new BigNumber(x)
x.toFixed()                     // '3'
y.toFixed()                     // '3.456'
y.toFixed(0)                    // '3'
x.toFixed(2)                    // '3.46'
y.toFixed(2)                    // '3.46'
y.toFixed(2, 1)                 // '3.45'  (ROUND_DOWN)
x.toFixed(5)                    // '3.45600'
y.toFixed(5)                    // '3.45600'
```

#### Parameters

• **decimalPlaces?**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

#### Returns

`string`

#### Implementation of

`IDexNumber.toFixed`

#### Overrides

`BigNumber.toFixed`

#### Defined in

packages/number/src/dex-number.ts:668

***

### toFormat()

#### toFormat(decimalPlaces, roundingMode, format)

> **toFormat**(`decimalPlaces`?, `roundingMode`?, `format`?): `string`

Returns a string representing the value of this BigNumber in normal (fixed-point) notation
rounded to `decimalPlaces` decimal places using rounding mode `roundingMode`, and formatted
according to the properties of the `format` or `FORMAT` object.

The formatting object may contain some or all of the properties shown in the examples below.

If `decimalPlaces` is omitted or is `null` or `undefined`, then the return value is not
rounded to a fixed number of decimal places.

If `roundingMode` is omitted or is `null` or `undefined`, `ROUNDING_MODE` is used.

If `format` is omitted or is `null` or `undefined`, `FORMAT` is used.

Throws if `decimalPlaces`, `roundingMode`, or `format` is invalid.

```ts
fmt = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0
}

x = new BigNumber('123456789.123456789')

// Set the global formatting options
BigNumber.config({ FORMAT: fmt })

x.toFormat()                              // '123,456,789.123456789'
x.toFormat(3)                             // '123,456,789.123'

// If a reference to the object assigned to FORMAT has been retained,
// the format properties can be changed directly
fmt.groupSeparator = ' '
fmt.fractionGroupSize = 5
x.toFormat()                              // '123 456 789.12345 6789'

// Alternatively, pass the formatting options as an argument
fmt = {
  decimalSeparator: ',',
  groupSeparator: '.',
  groupSize: 3,
  secondaryGroupSize: 2
}

x.toFormat()                              // '123 456 789.12345 6789'
x.toFormat(fmt)                           // '12.34.56.789,123456789'
x.toFormat(2, fmt)                        // '12.34.56.789,12'
x.toFormat(3, BigNumber.ROUND_UP, fmt)    // '12.34.56.789,124'
```

##### Parameters

• **decimalPlaces?**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

• **format?**: `Format`

Formatting options object. See `BigNumber.Format`.

##### Returns

`string`

##### Implementation of

`IDexNumber.toFormat`

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1371

#### toFormat(decimalPlaces, roundingMode)

> **toFormat**(`decimalPlaces`, `roundingMode`?): `string`

##### Parameters

• **decimalPlaces**: `number`

• **roundingMode?**: `RoundingMode`

##### Returns

`string`

##### Implementation of

`IDexNumber.toFormat`

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1372

#### toFormat(decimalPlaces)

> **toFormat**(`decimalPlaces`?): `string`

##### Parameters

• **decimalPlaces?**: `number`

##### Returns

`string`

##### Implementation of

`IDexNumber.toFormat`

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1373

#### toFormat(decimalPlaces, format)

> **toFormat**(`decimalPlaces`, `format`): `string`

##### Parameters

• **decimalPlaces**: `number`

• **format**: `Format`

##### Returns

`string`

##### Implementation of

`IDexNumber.toFormat`

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1374

#### toFormat(format)

> **toFormat**(`format`): `string`

##### Parameters

• **format**: `Format`

##### Returns

`string`

##### Implementation of

`IDexNumber.toFormat`

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1375

***

### toFraction()

> **toFraction**(`max_denominator`?): [`IDexNumber`, `IDexNumber`]

Returns an array of two BigNumbers representing the value of this BigNumber as a simple
fraction with an integer numerator and an integer denominator.
The denominator will be a positive non-zero value less than or equal to `max_denominator`.
If a maximum denominator, `max_denominator`, is not specified, or is `null` or `undefined`, the
denominator will be the lowest value necessary to represent the number exactly.

Throws if `max_denominator` is invalid.

```ts
x = new BigNumber(1.75)
x.toFraction()                  // '7, 4'

pi = new BigNumber('3.14159265358')
pi.toFraction()                 // '157079632679,50000000000'
pi.toFraction(100000)           // '312689, 99532'
pi.toFraction(10000)            // '355, 113'
pi.toFraction(100)              // '311, 99'
pi.toFraction(10)               // '22, 7'
pi.toFraction(1)                // '3, 1'
```

#### Parameters

• **max\_denominator?**: `Value`

The maximum denominator, integer > 0, or Infinity.

#### Returns

[`IDexNumber`, `IDexNumber`]

#### Implementation of

`IDexNumber.toFraction`

#### Overrides

`BigNumber.toFraction`

#### Defined in

packages/number/src/dex-number.ts:521

***

### toHexString()

> **toHexString**(): `HexString`

Converts the `DexNumber` to a hexadecimal string in its smallest unit.
Ensures the number is returned in its raw integer form, rounded down to prevent fractional values.

#### Returns

`HexString`

A hexadecimal string representation of the `DexNumber`.

#### Example

```typescript
const value = DexNumber.fromUnshifted('1', 'ether');
value.toHexString(); // Returns '0xde0b6b3a7640000'
```

#### Implementation of

`IDexNumber.toHexString`

#### Defined in

packages/number/src/dex-number.ts:757

***

### toJSON()

> **toJSON**(): `string`

As `valueOf`.

#### Returns

`string`

#### Implementation of

`IDexNumber.toJSON`

#### Inherited from

`BigNumber.toJSON`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1404

***

### toNumber()

> **toNumber**(): `number`

Returns the value of this BigNumber as a JavaScript primitive number.

Using the unary plus operator gives the same result.

```ts
x = new BigNumber(456.789)
x.toNumber()                    // 456.789
+x                              // 456.789

y = new BigNumber('45987349857634085409857349856430985')
y.toNumber()                    // 4.598734985763409e+34

z = new BigNumber(-0)
1 / z.toNumber()                // -Infinity
1 / +z                          // -Infinity
```

#### Returns

`number`

#### Implementation of

`IDexNumber.toNumber`

#### Inherited from

`BigNumber.toNumber`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1424

***

### toPrecision()

#### toPrecision(significantDigits, roundingMode)

> **toPrecision**(`significantDigits`?, `roundingMode`?): `string`

Returns a string representing the value of this BigNumber rounded to `significantDigits`
significant digits using rounding mode `roundingMode`.

If `significantDigits` is less than the number of digits necessary to represent the integer
part of the value in normal (fixed-point) notation, then exponential notation is used.

If `significantDigits` is omitted, or is `null` or `undefined`, then the return value is the
same as `n.toString()`.

If `roundingMode` is omitted or is `null` or `undefined`, `ROUNDING_MODE` is used.

Throws if `significantDigits` or `roundingMode` is invalid.

```ts
x = 45.6
y = new BigNumber(x)
x.toPrecision()                 // '45.6'
y.toPrecision()                 // '45.6'
x.toPrecision(1)                // '5e+1'
y.toPrecision(1)                // '5e+1'
y.toPrecision(2, 0)             // '4.6e+1'  (ROUND_UP)
y.toPrecision(2, 1)             // '4.5e+1'  (ROUND_DOWN)
x.toPrecision(5)                // '45.600'
y.toPrecision(5)                // '45.600'
```

##### Parameters

• **significantDigits?**: `number`

Significant digits, integer, 1 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer 0 to 8.

##### Returns

`string`

##### Implementation of

`IDexNumber.toPrecision`

##### Inherited from

`BigNumber.toPrecision`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1456

#### toPrecision(undefined)

> **toPrecision**(): `string`

##### Returns

`string`

##### Implementation of

`IDexNumber.toPrecision`

##### Inherited from

`BigNumber.toPrecision`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1457

***

### toReadableString()

> **toReadableString**(`decimals`?, `locales`?, `roundingMode`?): `string`

Converts the `DexNumber` to a formatted, human-readable string with optional decimal places and locale.
Uses locale formatting to add commas or periods, depending on the locale.

#### Parameters

• **decimals?**: `number`

(Optional) Number of decimal places. Defaults to the initialized decimal places.

• **locales?**: `LocalesArgument`

(Optional) Locale string or array of locales for `Intl.NumberFormat`. Defaults to 'en'.

• **roundingMode?**: `RoundingMode`

(Optional) Rounding mode. Defaults to `BigNumber.ROUND_DOWN`.

#### Returns

`string`

A human-readable string representation of the `DexNumber`, formatted with locale conventions.

#### Example

```typescript
const amount = DexNumber.fromUnshifted('1234.56789', 18);
amount.toReadableString(2); // Returns '1,234.57'
amount.toReadableString(5, 'en-US'); // Returns '1.234,56789' in English locale
```

#### Implementation of

`IDexNumber.toReadableString`

#### Defined in

packages/number/src/dex-number.ts:704

***

### toSerialized()

> **toSerialized**(): `SerializedDexNumber`

Serializes a DexNumber instance into a plain object that can be safely cloned/transmitted.
This is useful when you need to pass DexNumber instances through structured cloning or JSON serialization.

#### Returns

`SerializedDexNumber`

A plain object representing the DexNumber that can be safely cloned

#### Example

```typescript
const num = DexNumber.fromUnshifted('123.45');
const serialized = num.serialize();
// serialized can now be safely cloned or transmitted
console.log(serialized);
// {
//   s: 1,
//   e: 2,
//   c: [12345],
//   _shiftedState: 'unshifted',
//   _decimals: 18,
//   _roundingMode: 1
// }
```

#### Implementation of

`IDexNumber.toSerialized`

#### Defined in

packages/number/src/dex-number.ts:646

***

### toString()

> **toString**(`base`?): `string`

Returns a string representing the value of this BigNumber in base `base`, or base 10 if `base`
is omitted or is `null` or `undefined`.

For bases above 10, and using the default base conversion alphabet (see `ALPHABET`), values
from 10 to 35 are represented by a-z (the same as `Number.prototype.toString`).

If a base is specified the value is rounded according to the current `DECIMAL_PLACES` and
`ROUNDING_MODE` settings, otherwise it is not.

If a base is not specified, and this BigNumber has a positive exponent that is equal to or
greater than the positive component of the current `EXPONENTIAL_AT` setting, or a negative
exponent equal to or less than the negative component of the setting, then exponential notation
is returned.

If `base` is `null` or `undefined` it is ignored.

Throws if `base` is invalid.

```ts
x = new BigNumber(750000)
x.toString()                    // '750000'
BigNumber.config({ EXPONENTIAL_AT: 5 })
x.toString()                    // '7.5e+5'

y = new BigNumber(362.875)
y.toString(2)                   // '101101010.111'
y.toString(9)                   // '442.77777777777777777778'
y.toString(32)                  // 'ba.s'

BigNumber.config({ DECIMAL_PLACES: 4 });
z = new BigNumber('1.23456789')
z.toString()                    // '1.23456789'
z.toString(10)                  // '1.2346'
```

#### Parameters

• **base?**: `number`

The base, integer, 2 to 36 (or `ALPHABET.length`, see `ALPHABET`).

#### Returns

`string`

#### Implementation of

`IDexNumber.toString`

#### Inherited from

`BigNumber.toString`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1497

***

### toTradeFormat()

> **toTradeFormat**\<`TFormat`\>(`options`): `TradeFormatValue`\<`TFormat`\>

Formats the `DexNumber` according to the specified `TradeFormat`.

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **options**: `TradeFormatOptions`\<`TFormat`\>

The format configuration object
   - `options.type` - Format to convert the number to: 'readable', 'decimal', 'wei', etc.
   - `options.options` - Format-specific options for decimal places, locales, and rounding

#### Returns

`TradeFormatValue`\<`TFormat`\>

The formatted number in the specified format

#### Implementation of

`IDexNumber.toTradeFormat`

#### Defined in

packages/number/src/dex-number.ts:762

***

### toWeiString()

> **toWeiString**(): `string`

Outputs the `DexNumber` in its smallest unit representation (e.g., wei for Ether), returning a raw integer string.
This format disregards any shifted state and is rounded down.

#### Returns

`string`

The `DexNumber` as a raw integer string in the smallest unit.

#### Example

```typescript
const amount = DexNumber.fromUnshifted('1', 'gwei');
amount.toSmallestUnitString(); // Returns '1000000000'
```

#### Implementation of

`IDexNumber.toWeiString`

#### Defined in

packages/number/src/dex-number.ts:752

***

### unshift()

> **unshift**(): `IDexNumber`

Unshifts the DexNumber back to its human-readable format.

#### Returns

`IDexNumber`

A DexNumber instance.

#### Example

```typescript
DexNumber.fromShifted('100000000000000', 18).unshift(); // Returns DexNumber representing '0.0001'
DexNumber.fromShifted('1000000000000000000', 18).unshift(); // Returns DexNumber representing '1'
```

#### Implementation of

`IDexNumber.unshift`

#### Defined in

packages/number/src/dex-number.ts:627

***

### valueOf()

> **valueOf**(): `string`

As `toString`, but does not accept a base argument and includes the minus sign for negative
zero.

``ts
x = new BigNumber('-0')
x.toString()                    // '0'
x.valueOf()                     // '-0'
y = new BigNumber('1.777e+457')
y.valueOf()                     // '1.777e+457'
```

#### Returns

`string`

#### Implementation of

`IDexNumber.valueOf`

#### Inherited from

`BigNumber.valueOf`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1511

***

### clone()

> `static` **clone**(`object`?): *typeof* `BigNumber`

Returns a new independent BigNumber constructor with configuration as described by `object`, or
with the default configuration if object is `null` or `undefined`.

Throws if `object` is not an object.

```ts
BigNumber.config({ DECIMAL_PLACES: 5 })
BN = BigNumber.clone({ DECIMAL_PLACES: 9 })

x = new BigNumber(1)
y = new BN(1)

x.div(3)                        // 0.33333
y.div(3)                        // 0.333333333

// BN = BigNumber.clone({ DECIMAL_PLACES: 9 }) is equivalent to:
BN = BigNumber.clone()
BN.config({ DECIMAL_PLACES: 9 })
```

#### Parameters

• **object?**: `Config`

The configuration object.

#### Returns

*typeof* `BigNumber`

#### Inherited from

`BigNumber.clone`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1616

***

### config()

> `static` **config**(`object`?): `Config`

Configures the settings that apply to this BigNumber constructor.

The configuration object, `object`, contains any number of the properties shown in the example
below.

Returns an object with the above properties and their current values.

Throws if `object` is not an object, or if an invalid value is assigned to one or more of the
properties.

```ts
BigNumber.config({
    DECIMAL_PLACES: 40,
    ROUNDING_MODE: BigNumber.ROUND_HALF_CEIL,
    EXPONENTIAL_AT: [-10, 20],
    RANGE: [-500, 500],
    CRYPTO: true,
    MODULO_MODE: BigNumber.ROUND_FLOOR,
    POW_PRECISION: 80,
    FORMAT: {
        groupSize: 3,
        groupSeparator: ' ',
        decimalSeparator: ','
    },
    ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
});

BigNumber.config().DECIMAL_PLACES        // 40
```

#### Parameters

• **object?**: `Config`

The configuration object.

#### Returns

`Config`

#### Inherited from

`BigNumber.config`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1651

***

### ensure()

> `static` **ensure**(`value`): [`DexNumber`](DexNumber.md)

Helper method to ensure a value is a proper DexNumber instance.
This is particularly useful when working with values that might be either
DexNumber instances or serialized DexNumber objects, such as when retrieving
from storage or receiving from network calls.

#### Parameters

• **value**: `IDexNumber` \| `SerializedDexNumber`

Either a DexNumber instance or a serialized DexNumber object

#### Returns

[`DexNumber`](DexNumber.md)

A DexNumber instance, either the original if already an instance, or a new instance if serialized

#### Example

```typescript
// Working with a mix of serialized and instance values
const num1 = DexNumber.fromUnshifted('100');
const serialized = num1.serialize();

// Ensure works with both types:
const assured1 = DexNumber.ensure(num1);        // Returns original instance
const assured2 = DexNumber.ensure(serialized);  // Creates new instance

// Practical usage in a function:
function calculateTotal(value: DexNumber | SerializedDexNumber) {
  const dexNum = DexNumber.ensure(value);
  return dexNum.multipliedBy(1.1); // 10% increase
}
```

#### Defined in

packages/number/src/dex-number.ts:874

***

### fromAtomic()

> `static` **fromAtomic**(`value`, `decimals`?): `IDexNumber`

Alias for `fromShifted`

Creates a new DexNumber instance from a shifted value. The shifted state means that
the value is already represented in its smallest unit (e.g., wei for Ether).

#### Parameters

• **value**: `BigNumberish`

The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.

• **decimals?**: `DexNumberDecimal`

(Optional) The number of decimals representing the precision. Defaults to 0 if not provided.

#### Returns

`IDexNumber`

A DexNumber instance representing the shifted value.

#### Example

```typescript
const dexNum = DexNumber.fromAtomic('1000000000000000000', 18); // Represents 1 Ether.
const dexNum = DexNumber.fromAtomic('1500000000000000000', 18); // Represents 1.5 Ether.
```

#### Defined in

packages/number/src/dex-number.ts:1037

***

### fromBigInt()

> `static` **fromBigInt**(`value`, `decimals`, `shiftedState`): `IDexNumber`

Creates a new DexNumber instance from a bigint value.

#### Parameters

• **value**: `bigint`

The bigint value to convert

• **decimals**: `DexNumberDecimal` = `0`

(Optional) The number of decimals representing the precision. Defaults to 0 if not provided.

• **shiftedState**: `DexNumberState` = `'neutral'`

(Optional) The shifted state of the new DexNumber. Defaults to 'neutral'

#### Returns

`IDexNumber`

A DexNumber instance representing the bigint value

#### Example

```typescript
const value = BigInt('1000000000000000000')
const dexNum = DexNumber.fromBigInt(value, 18)
console.log(dexNum.unshift().toFixed()) // "1.0"
```

#### Defined in

packages/number/src/dex-number.ts:938

***

### fromBigNumber()

> `static` **fromBigNumber**(`bigNumber`, `decimals`, `shiftedState`, `roundingMode`?): `IDexNumber`

Creates a new DexNumber instance from a BigNumber.

#### Parameters

• **bigNumber**: `BigNumber`

The BigNumber instance.

• **decimals**: `DexNumberDecimal`

The decimals to apply.

• **shiftedState**: `DexNumberState` = `'neutral'`

The shifted state of the DexNumber.

• **roundingMode?**: `RoundingMode`

The rounding mode to use for the BigNumber

#### Returns

`IDexNumber`

A new DexNumber instance.

#### Defined in

packages/number/src/dex-number.ts:890

***

### fromDecimal()

> `static` **fromDecimal**(`value`, `decimals`?): `IDexNumber`

Alias for `fromUnshifted`

Creates a new DexNumber instance from a decimal value. The decimal state means that
the value is represented in a human-readable format (e.g., Ether for Ether instead of wei).

#### Parameters

• **value**: `BigNumberish`

The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.

• **decimals?**: `DexNumberDecimal`

(Optional) The number of decimals representing the precision. Defaults to 0 if not provided.

#### Returns

`IDexNumber`

A DexNumber instance representing the decimal value.

#### Example

```typescript
const dexNum = DexNumber.fromDecimal('1', 18); // Represents 1 Ether.
const dexNum = DexNumber.fromDecimal('1.0', 18); // Represents 1 Ether.
const dexNum = DexNumber.fromAtomic('1.5', 18); // Represents 1.5 Ether.
```

#### Defined in

packages/number/src/dex-number.ts:1014

***

### fromSerialized()

> `static` **fromSerialized**(`serialized`): [`DexNumber`](DexNumber.md)

Creates a new DexNumber instance from a serialized object.
This static method reconstructs a full DexNumber instance from its serialized form.

#### Parameters

• **serialized**: `IDexNumber` \| `SerializedDexNumber`

The serialized DexNumber object

#### Returns

[`DexNumber`](DexNumber.md)

A new DexNumber instance with all properties and methods restored

#### Example

```typescript
const original = DexNumber.fromUnshifted('123.45');
const serialized = original.serialize();

// Later, or in another context:
const restored = DexNumber.fromSerialized(serialized);
console.log(restored.toString()); // "123.45"
console.log(restored instanceof DexNumber); // true
console.log(restored.multipliedBy(2).toString()); // "246.9"
```

#### Defined in

packages/number/src/dex-number.ts:826

***

### fromShifted()

> `static` **fromShifted**(`value`, `decimals`?): `IDexNumber`

Creates a new DexNumber instance from a shifted value. The shifted state means that
the value is already represented in its smallest unit (e.g., wei for Ether).

#### Parameters

• **value**: `BigNumberish`

The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.

• **decimals?**: `DexNumberDecimal`

(Optional) The number of decimals representing the precision. Defaults to 0 if not provided.

#### Returns

`IDexNumber`

A DexNumber instance representing the shifted value.

#### Example

```typescript
const shiftedDexNum = DexNumber.fromShifted('1000000000000000000', 18); // Represents 1 Ether in wei.
```

#### Defined in

packages/number/src/dex-number.ts:987

***

### fromString()

> `static` **fromString**(`value`, `decimals`, `shiftedState`): `IDexNumber`

Helper method to create a new DexNumber instance from a string.

#### Parameters

• **value**: `string`

The string to create the DexNumber from.

• **decimals**: `DexNumberDecimal`

The decimals to apply.

• **shiftedState**: `"unshifted"` \| `"shifted"`

The shifted state of the DexNumber.

#### Returns

`IDexNumber`

A new DexNumber instance.

#### Defined in

packages/number/src/dex-number.ts:912

***

### fromUnshifted()

> `static` **fromUnshifted**(`value`, `decimals`?): `IDexNumber`

Creates a new DexNumber instance from an unshifted value. The unshifted state means that
the value is represented in a human-readable format (e.g., Ether for Ether instead of wei).

#### Parameters

• **value**: `BigNumberish`

The numeric value to be converted into a DexNumber. This can be a number, string, or BigNumber.

• **decimals?**: `DexNumberDecimal`

(Optional) The number of decimals representing the precision. Defaults to 0 if not provided.

#### Returns

`IDexNumber`

A DexNumber instance representing the unshifted value.

#### Example

```typescript
const unshiftedDexNum = DexNumber.fromUnshifted('1', 18); // Represents 1 Ether.
```

#### Defined in

packages/number/src/dex-number.ts:964

***

### isBigNumber()

> `static` **isBigNumber**(`value`): `value is BigNumber`

Returns `true` if `value` is a BigNumber instance, otherwise returns `false`.

If `BigNumber.DEBUG` is `true`, throws if a BigNumber instance is not well-formed.

```ts
x = 42
y = new BigNumber(x)

BigNumber.isBigNumber(x)             // false
y instanceof BigNumber               // true
BigNumber.isBigNumber(y)             // true

BN = BigNumber.clone();
z = new BN(x)
z instanceof BigNumber               // false
BigNumber.isBigNumber(z)             // true
```

#### Parameters

• **value**: `any`

The value to test.

#### Returns

`value is BigNumber`

#### Inherited from

`BigNumber.isBigNumber`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1674

***

### max()

> `static` **max**(`decimals`, ...`n`): `IDexNumber`

Returns a BigNumber whose value is the maximum of the arguments.

The return value is always exact and unrounded.

```ts
x = new BigNumber('3257869345.0378653')
BigNumber.max(4e9, x, '123456789.9')      // '4000000000'

arr = [12, '13', new BigNumber(14)]
BigNumber.max.apply(null, arr)            // '14'
```

#### Parameters

• **decimals**: `number`

• ...**n**: `Value`[]

A numeric value.

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.max`

#### Defined in

packages/number/src/dex-number.ts:555

***

### maximum()

> `static` **maximum**(`decimals`, ...`n`): `IDexNumber`

Returns a BigNumber whose value is the maximum of the arguments.

The return value is always exact and unrounded.

```ts
x = new BigNumber('3257869345.0378653')
BigNumber.maximum(4e9, x, '123456789.9')      // '4000000000'

arr = [12, '13', new BigNumber(14)]
BigNumber.maximum.apply(null, arr)            // '14'
```

#### Parameters

• **decimals**: `number`

• ...**n**: `Value`[]

A numeric value.

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.maximum`

#### Defined in

packages/number/src/dex-number.ts:543

***

### min()

> `static` **min**(`decimals`, ...`n`): `IDexNumber`

Returns a BigNumber whose value is the minimum of the arguments.

The return value is always exact and unrounded.

```ts
x = new BigNumber('3257869345.0378653')
BigNumber.min(4e9, x, '123456789.9')             // '123456789.9'

arr = [2, new BigNumber(-14), '-15.9999', -12]
BigNumber.min.apply(null, arr)                   // '-15.9999'
```

#### Parameters

• **decimals**: `number`

• ...**n**: `Value`[]

A numeric value.

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.min`

#### Defined in

packages/number/src/dex-number.ts:572

***

### minimum()

> `static` **minimum**(`decimals`, ...`n`): `IDexNumber`

Returns a BigNumber whose value is the minimum of the arguments.

The return value is always exact and unrounded.

```ts
x = new BigNumber('3257869345.0378653')
BigNumber.minimum(4e9, x, '123456789.9')          // '123456789.9'

arr = [2, new BigNumber(-14), '-15.9999', -12]
BigNumber.minimum.apply(null, arr)                // '-15.9999'
```

#### Parameters

• **decimals**: `number`

• ...**n**: `Value`[]

A numeric value.

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.minimum`

#### Defined in

packages/number/src/dex-number.ts:560

***

### random()

> `static` **random**(`decimals`?): `IDexNumber`

Returns a new BigNumber with a pseudo-random value equal to or greater than 0 and less than 1.

The return value will have `decimalPlaces` decimal places, or less if trailing zeros are
produced. If `decimalPlaces` is omitted, the current `DECIMAL_PLACES` setting will be used.

Depending on the value of this BigNumber constructor's `CRYPTO` setting and the support for the
`crypto` object in the host environment, the random digits of the return value are generated by
either `Math.random` (fastest), `crypto.getRandomValues` (Web Cryptography API in recent
browsers) or `crypto.randomBytes` (Node.js).

To be able to set `CRYPTO` to true when using Node.js, the `crypto` object must be available
globally:

```ts
global.crypto = require('crypto')
```

If `CRYPTO` is true, i.e. one of the `crypto` methods is to be used, the value of a returned
BigNumber should be cryptographically secure and statistically indistinguishable from a random
value.

Throws if `decimalPlaces` is invalid.

```ts
BigNumber.config({ DECIMAL_PLACES: 10 })
BigNumber.random()              // '0.4117936847'
BigNumber.random(20)            // '0.78193327636914089009'
```

#### Parameters

• **decimals?**: `number`

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.random`

#### Defined in

packages/number/src/dex-number.ts:577

***

### set()

> `static` **set**(`object`?): `Config`

Configures the settings that apply to this BigNumber constructor.

The configuration object, `object`, contains any number of the properties shown in the example
below.

Returns an object with the above properties and their current values.

Throws if `object` is not an object, or if an invalid value is assigned to one or more of the
properties.

```ts
BigNumber.set({
    DECIMAL_PLACES: 40,
    ROUNDING_MODE: BigNumber.ROUND_HALF_CEIL,
    EXPONENTIAL_AT: [-10, 20],
    RANGE: [-500, 500],
    CRYPTO: true,
    MODULO_MODE: BigNumber.ROUND_FLOOR,
    POW_PRECISION: 80,
    FORMAT: {
        groupSize: 3,
        groupSeparator: ' ',
        decimalSeparator: ','
    },
    ALPHABET: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
});

BigNumber.set().DECIMAL_PLACES        // 40
```

#### Parameters

• **object?**: `Config`

The configuration object.

#### Returns

`Config`

#### Inherited from

`BigNumber.set`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1828

***

### sum()

> `static` **sum**(`decimals`, ...`n`): `IDexNumber`

Returns a BigNumber whose value is the sum of the arguments.

The return value is always exact and unrounded.

```ts
x = new BigNumber('3257869345.0378653')
BigNumber.sum(4e9, x, '123456789.9')      // '7381326134.9378653'

arr = [2, new BigNumber(14), '15.9999', 12]
BigNumber.sum.apply(null, arr)            // '43.9999'
```

#### Parameters

• **decimals**: `number`

• ...**n**: `Value`[]

A numeric value.

#### Returns

`IDexNumber`

#### Overrides

`BigNumber.sum`

#### Defined in

packages/number/src/dex-number.ts:582
