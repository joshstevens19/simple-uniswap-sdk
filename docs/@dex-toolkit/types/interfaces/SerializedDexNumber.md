[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / SerializedDexNumber

# Interface: SerializedDexNumber

Represents a serialized form of a DexNumber instance that can be safely cloned and transmitted.
This interface captures all the essential state of a DexNumber without the prototype chain.

## Example

```typescript
// Example of a serialized DexNumber representing 123.45 with 18 decimals
const serialized: SerializedDexNumber = {
  s: 1,              // positive number
  e: 2,              // exponent
  c: [12345],        // coefficient array
  _shiftedState: 'unshifted',
  _decimals: 18,
  _roundingMode: 1
};
```

## Properties

### \_decimals

> **\_decimals**: `number`

The number of decimal places

#### Defined in

[packages/types/src/dex-number.types.ts:121](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L121)

***

### \_roundingMode

> **\_roundingMode**: `number`

The rounding mode used for calculations

#### Defined in

[packages/types/src/dex-number.types.ts:123](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L123)

***

### \_shiftedState

> **\_shiftedState**: `"unshifted"` \| `"neutral"` \| `"shifted"`

The shifting state of the number:
- 'shifted': Number has been shifted by its decimals
- 'unshifted': Number has not been shifted
- 'neutral': Number's shift state is not relevant

#### Defined in

[packages/types/src/dex-number.types.ts:119](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L119)

***

### c

> **c**: `number`[]

The coefficient array representing the significant digits

#### Defined in

[packages/types/src/dex-number.types.ts:112](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L112)

***

### e

> **e**: `number`

The exponent of the number in scientific notation

#### Defined in

[packages/types/src/dex-number.types.ts:110](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L110)

***

### s

> **s**: `number`

The sign of the number: 1 for positive, -1 for negative

#### Defined in

[packages/types/src/dex-number.types.ts:108](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L108)
