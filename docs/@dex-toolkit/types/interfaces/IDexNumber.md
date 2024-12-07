[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / IDexNumber

# Interface: IDexNumber

Interface defining the structure for a DexNumber, which extends the functionality of the BigNumber class.

## Extends

- `BigNumber`

## Properties

### \_decimals

> **\_decimals**: `number`

The number of decimal places for the number.

#### Defined in

packages/types/src/dex-number.types.ts:142

***

### \_roundingMode

> **\_roundingMode**: `RoundingMode`

The default rounding mode to use when performing arithmetic operations

#### Defined in

packages/types/src/dex-number.types.ts:147

***

### \_shiftedState

> **\_shiftedState**: [`DexNumberState`](../type-aliases/DexNumberState.md)

The current shifted state of the number.

- `neutral`: The number is not shifted in either direction.
- `shifted`: The number's decimal is shifted to the right.
- `unshifted`: The number's decimal is shifted to the left.

#### Defined in

packages/types/src/dex-number.types.ts:137

***

### c

> `readonly` **c**: `null` \| `number`[]

The coefficient of the value of this BigNumber, an array of base 1e14 integer numbers, or null.

#### Inherited from

`BigNumber.c`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:336

***

### e

> `readonly` **e**: `null` \| `number`

The exponent of the value of this BigNumber, an integer number, -1000000000 to 1000000000, or null.

#### Inherited from

`BigNumber.e`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:339

***

### s

> `readonly` **s**: `null` \| `number`

The sign of the value of this BigNumber, -1, 1, or null.

#### Inherited from

`BigNumber.s`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:342

## Accessors

### decimals

> `get` **decimals**(): `number`

Gets the number of decimal places for the number.

#### Returns

`number`

#### Defined in

packages/types/src/dex-number.types.ts:203

***

### shiftedState

> `get` **shiftedState**(): [`DexNumberState`](../type-aliases/DexNumberState.md)

Gets the shifted state of the number.

#### Returns

[`DexNumberState`](../type-aliases/DexNumberState.md)

#### Defined in

packages/types/src/dex-number.types.ts:198

## Methods

### abs()

> **abs**(): [`IDexNumber`](IDexNumber.md)

Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this
BigNumber.

The return value is always exact and unrounded.

```ts
x = new BigNumber(-0.8)
x.abs()                     // '0.8'
```

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.abs`

#### Defined in

packages/types/src/dex-number.types.ts:217

***

### absoluteValue()

> **absoluteValue**(): [`IDexNumber`](IDexNumber.md)

Returns a BigNumber whose value is the absolute value, i.e. the magnitude, of the value of this
BigNumber.

The return value is always exact and unrounded.

```ts
x = new BigNumber(-0.8)
x.absoluteValue()           // '0.8'
```

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.absoluteValue`

#### Defined in

packages/types/src/dex-number.types.ts:215

***

### adjustForDecimals()

> **adjustForDecimals**(`otherDecimals`): [`IDexNumber`](IDexNumber.md)

Adjusts the decimals of the DexNumber to match the provided decimals.
This is useful when converting between different token decimals.

#### Parameters

• **otherDecimals**: `number`

The decimals of the other token involved in the conversion.

#### Returns

[`IDexNumber`](IDexNumber.md)

A new DexNumber instance with adjusted decimals.

#### Defined in

packages/types/src/dex-number.types.ts:290

***

### clone()

> **clone**(): [`IDexNumber`](IDexNumber.md)

Clones the current instance.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Defined in

packages/types/src/dex-number.types.ts:171

***

### comparedTo()

> **comparedTo**(`n`, `base`?): `number`

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

• **base?**: `number`

The base of n.

#### Returns

`number`

#### Inherited from

`BigNumber.comparedTo`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:488

***

### createResult()

> **createResult**(`bigNumber`, `decimals`, `roundingMode`?): [`IDexNumber`](IDexNumber.md)

Creates a new DexNumber while preserving state

#### Parameters

• **bigNumber**: `BigNumber`

• **decimals**: [`DexNumberDecimal`](../type-aliases/DexNumberDecimal.md)

• **roundingMode?**: `RoundingMode`

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Defined in

packages/types/src/dex-number.types.ts:185

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

##### Overrides

`BigNumber.decimalPlaces`

##### Defined in

packages/types/src/dex-number.types.ts:219

#### decimalPlaces(decimalPlaces, roundingMode)

> **decimalPlaces**(`decimalPlaces`, `roundingMode`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

##### Overrides

`BigNumber.decimalPlaces`

##### Defined in

packages/types/src/dex-number.types.ts:220

***

### div()

> **div**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.div`

#### Defined in

packages/types/src/dex-number.types.ts:230

***

### dividedBy()

> **dividedBy**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.dividedBy`

#### Defined in

packages/types/src/dex-number.types.ts:228

***

### dividedToIntegerBy()

> **dividedToIntegerBy**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.dividedToIntegerBy`

#### Defined in

packages/types/src/dex-number.types.ts:232

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

##### Overrides

`BigNumber.dp`

##### Defined in

packages/types/src/dex-number.types.ts:225

#### dp(decimalPlaces, roundingMode)

> **dp**(`decimalPlaces`, `roundingMode`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

##### Overrides

`BigNumber.dp`

##### Defined in

packages/types/src/dex-number.types.ts:226

***

### eq()

> **eq**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.eq`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:755

***

### exponentiatedBy()

> **exponentiatedBy**(`n`, `m`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.exponentiatedBy`

#### Defined in

packages/types/src/dex-number.types.ts:236

***

### gt()

> **gt**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.gt`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:803

***

### gte()

> **gte**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.gte`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:837

***

### idiv()

> **idiv**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.idiv`

#### Defined in

packages/types/src/dex-number.types.ts:234

***

### integerValue()

> **integerValue**(`rm`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.integerValue`

#### Defined in

packages/types/src/dex-number.types.ts:240

***

### isEqualTo()

> **isEqualTo**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.isEqualTo`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:733

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

#### Inherited from

`BigNumber.isFinite`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:769

***

### isGreaterThan()

> **isGreaterThan**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.isGreaterThan`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:786

***

### isGreaterThanOrEqualTo()

> **isGreaterThanOrEqualTo**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.isGreaterThanOrEqualTo`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:820

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

#### Inherited from

`BigNumber.isInteger`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:849

***

### isLessThan()

> **isLessThan**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.isLessThan`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:866

***

### isLessThanOrEqualTo()

> **isLessThanOrEqualTo**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.isLessThanOrEqualTo`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:900

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

#### Defined in

packages/types/src/dex-number.types.ts:166

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

#### Defined in

packages/types/src/dex-number.types.ts:156

***

### isUnshifted()

> **isUnshifted**(): `boolean`

Checks if the number is in unshifted state

#### Returns

`boolean`

#### Defined in

packages/types/src/dex-number.types.ts:161

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

#### Inherited from

`BigNumber.isZero`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:963

***

### lt()

> **lt**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.lt`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:883

***

### lte()

> **lte**(`n`, `base`?): `boolean`

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

• **base?**: `number`

The base of n.

#### Returns

`boolean`

#### Inherited from

`BigNumber.lte`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:917

***

### minus()

> **minus**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.minus`

#### Defined in

packages/types/src/dex-number.types.ts:242

***

### mod()

> **mod**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.mod`

#### Defined in

packages/types/src/dex-number.types.ts:246

***

### modulo()

> **modulo**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.modulo`

#### Defined in

packages/types/src/dex-number.types.ts:244

***

### multipliedBy()

> **multipliedBy**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.multipliedBy`

#### Defined in

packages/types/src/dex-number.types.ts:248

***

### negated()

> **negated**(): [`IDexNumber`](IDexNumber.md)

Returns a BigNumber whose value is the value of this BigNumber negated, i.e. multiplied by -1.

```ts
x = new BigNumber(1.8)
x.negated()                     // '-1.8'
y = new BigNumber(-1.3)
y.negated()                     // '1.3'
```

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.negated`

#### Defined in

packages/types/src/dex-number.types.ts:252

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

#### Defined in

packages/types/src/dex-number.types.ts:176

***

### plus()

> **plus**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.plus`

#### Defined in

packages/types/src/dex-number.types.ts:254

***

### pow()

> **pow**(`n`, `m`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.pow`

#### Defined in

packages/types/src/dex-number.types.ts:238

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

##### Overrides

`BigNumber.precision`

##### Defined in

packages/types/src/dex-number.types.ts:262

#### precision(significantDigits, roundingMode)

> **precision**(`significantDigits`, `roundingMode`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

##### Overrides

`BigNumber.precision`

##### Defined in

packages/types/src/dex-number.types.ts:263

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

##### Overrides

`BigNumber.sd`

##### Defined in

packages/types/src/dex-number.types.ts:256

#### sd(significantDigits, roundingMode)

> **sd**(`significantDigits`, `roundingMode`?): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

##### Overrides

`BigNumber.sd`

##### Defined in

packages/types/src/dex-number.types.ts:257

***

### shift()

> **shift**(): [`IDexNumber`](IDexNumber.md)

Shifts the DexNumber by the stored decimals.
Converts it to the smallest unit (like wei for Ether).

#### Returns

[`IDexNumber`](IDexNumber.md)

A DexNumber instance.

#### Example

```typescript
DexNumber.fromUnshifted('0.0001', 18).shift(); // Returns DexNumber representing '100000000000000'
DexNumber.fromUnshifted('1', 18).shift(); // Returns DexNumber representing '1000000000000000000'
```

#### Defined in

packages/types/src/dex-number.types.ts:303

***

### shiftedBy()

> **shiftedBy**(`n`): [`IDexNumber`](IDexNumber.md)

Disabled shiftedBy to force use of shift() or unshift()

#### Parameters

• **n**: `number`

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.shiftedBy`

#### Defined in

packages/types/src/dex-number.types.ts:281

***

### sqrt()

> **sqrt**(): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.sqrt`

#### Defined in

packages/types/src/dex-number.types.ts:270

***

### squareRoot()

> **squareRoot**(): [`IDexNumber`](IDexNumber.md)

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

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.squareRoot`

#### Defined in

packages/types/src/dex-number.types.ts:268

***

### times()

> **times**(`n`, `base`?): [`IDexNumber`](IDexNumber.md)

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

• **base?**: `number`

The base of n.

#### Returns

[`IDexNumber`](IDexNumber.md)

#### Overrides

`BigNumber.times`

#### Defined in

packages/types/src/dex-number.types.ts:250

***

### toBigInt()

> **toBigInt**(): `bigint`

Converts the DexNumber instance to a bigint.
Always returns a shifted value.

#### Returns

`bigint`

A bigint.

#### Defined in

packages/types/src/dex-number.types.ts:368

***

### toBigNumber()

> **toBigNumber**(): `BigNumber`

Converts the DexNumber instance to a BigNumber instance.
Always returns a shifted value.

#### Returns

`BigNumber`

A BigNumber instance.

#### Defined in

packages/types/src/dex-number.types.ts:360

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

#### Defined in

packages/types/src/dex-number.types.ts:406

***

### toEthersBigNumber()

> **toEthersBigNumber**(): `BigNumber`

Converts a DexNumber instance to an ethers.js BigNumber.
Always returns a shifted value.

#### Returns

`BigNumber`

An ethers.js BigNumber.

#### Defined in

packages/types/src/dex-number.types.ts:352

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

##### Inherited from

`BigNumber.toExponential`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1272

#### toExponential(undefined)

> **toExponential**(): `string`

##### Returns

`string`

##### Inherited from

`BigNumber.toExponential`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1273

***

### toFixed()

#### toFixed(decimalPlaces, roundingMode)

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

##### Parameters

• **decimalPlaces?**: `number`

Decimal places, integer, 0 to 1e+9.

• **roundingMode?**: `RoundingMode`

Rounding mode, integer, 0 to 8.

##### Returns

`string`

##### Inherited from

`BigNumber.toFixed`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1310

#### toFixed(undefined)

> **toFixed**(): `string`

##### Returns

`string`

##### Inherited from

`BigNumber.toFixed`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1311

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

##### Inherited from

`BigNumber.toFormat`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1375

***

### toFraction()

> **toFraction**(`max_denominator`?): [[`IDexNumber`](IDexNumber.md), [`IDexNumber`](IDexNumber.md)]

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

[[`IDexNumber`](IDexNumber.md), [`IDexNumber`](IDexNumber.md)]

#### Overrides

`BigNumber.toFraction`

#### Defined in

packages/types/src/dex-number.types.ts:272

***

### toHexString()

> **toHexString**(): [`HexString`](../type-aliases/HexString.md)

Converts the `DexNumber` to a hexadecimal string in its smallest unit.
Ensures the number is returned in its raw integer form, rounded down to prevent fractional values.

#### Returns

[`HexString`](../type-aliases/HexString.md)

A hexadecimal string representation of the `DexNumber`.

#### Example

```typescript
const value = DexNumber.fromUnshifted('1', 'ether');
value.toHexString(); // Returns '0xde0b6b3a7640000'
```

#### Defined in

packages/types/src/dex-number.types.ts:437

***

### toJSON()

> **toJSON**(): `string`

As `valueOf`.

#### Returns

`string`

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

##### Inherited from

`BigNumber.toPrecision`

##### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1456

#### toPrecision(undefined)

> **toPrecision**(): `string`

##### Returns

`string`

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

#### Defined in

packages/types/src/dex-number.types.ts:386

***

### toSerialized()

> **toSerialized**(): [`SerializedDexNumber`](SerializedDexNumber.md)

Serializes a DexNumber instance into a plain object that can be safely cloned/transmitted.
This is useful when you need to pass DexNumber instances through structured cloning or JSON serialization.

#### Returns

[`SerializedDexNumber`](SerializedDexNumber.md)

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

#### Defined in

packages/types/src/dex-number.types.ts:344

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

#### Inherited from

`BigNumber.toString`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1497

***

### toTradeFormat()

> **toTradeFormat**\<`TFormat`\>(`options`): [`TradeFormatValue`](../type-aliases/TradeFormatValue.md)\<`TFormat`\>

Formats the `DexNumber` according to the specified `TradeFormat`.

#### Type Parameters

• **TFormat** *extends* [`TradeFormat`](../type-aliases/TradeFormat.md)

#### Parameters

• **options**: [`TradeFormatOptions`](../type-aliases/TradeFormatOptions.md)\<`TFormat`\>

The format configuration object
   - `options.type` - Format to convert the number to: 'readable', 'decimal', 'wei', etc.
   - `options.options` - Format-specific options for decimal places, locales, and rounding

#### Returns

[`TradeFormatValue`](../type-aliases/TradeFormatValue.md)\<`TFormat`\>

The formatted number in the specified format

#### Defined in

packages/types/src/dex-number.types.ts:447

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

#### Defined in

packages/types/src/dex-number.types.ts:423

***

### unshift()

> **unshift**(): [`IDexNumber`](IDexNumber.md)

Unshifts the DexNumber back to its human-readable format.

#### Returns

[`IDexNumber`](IDexNumber.md)

A DexNumber instance.

#### Example

```typescript
DexNumber.fromShifted('100000000000000', 18).unshift(); // Returns DexNumber representing '0.0001'
DexNumber.fromShifted('1000000000000000000', 18).unshift(); // Returns DexNumber representing '1'
```

#### Defined in

packages/types/src/dex-number.types.ts:316

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

#### Inherited from

`BigNumber.valueOf`

#### Defined in

node\_modules/.pnpm/bignumber.js@9.1.2/node\_modules/bignumber.js/bignumber.d.ts:1511
