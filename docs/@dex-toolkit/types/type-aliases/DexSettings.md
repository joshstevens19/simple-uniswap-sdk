[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexSettings

# Type Alias: DexSettings

> **DexSettings**: `object`

Configuration settings for DEX operations.

## Type declaration

### approvalBufferFactor?

> `optional` **approvalBufferFactor**: `number`

Multiplier for the token approval amount to add a buffer.
Only applies when `approveMax` is false.
For example, a value of 1.05 represents a 5% buffer.

#### Default

```ts
1.05
```

### approveMax?

> `optional` **approveMax**: `boolean`

Whether to approve the the maximum token amount, or the exact token amount.

#### Default

```ts
true
```

### deadlineMinutes

> **deadlineMinutes**: `number`

The number of minutes before the transaction expires.

#### Default

```ts
20
```

### disableMultihops

> **disableMultihops**: `boolean`

Disable multihops, forcing direct routes.

#### Default

```ts
false
```

### disableObserver

> **disableObserver**: `boolean`

Prevent the built-in block listener from observing changes.

#### Default

```ts
false
```

### gasSettings?

> `optional` **gasSettings**: [`GasSettings`](GasSettings.md)

Gas price settings, where the `getGasPrice` function returns the gas price in GWEI.

#### Default

```ts
undefined
```

### observerBlockSkip

> **observerBlockSkip**: `number`

Number of blocks to skip between each quote, reducing the number of calls to the node.

#### Default

```ts
0
```

### protocolSettings

> **protocolSettings**: [`ProtocolSettings`](ProtocolSettings.md)

Filter to choose which DEX versions to use. Defaults to all.

#### Default

```ts
All protocols of targeted DEXs
```

### recipient

> **recipient**: `Address`

The address that will receive the output tokens or LP tokens.
If not provided, the default is to send the output tokens to the address initiating the swap.

#### Default

```ts
''
```

### slippage

> **slippage**: `number`

Slippage tolerance in percentage, e.g., 0.005 represents 0.5% slippage.

#### Default

```ts
0.005
```

## Defined in

[packages/types/src/dex.types.ts:146](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex.types.ts#L146)
