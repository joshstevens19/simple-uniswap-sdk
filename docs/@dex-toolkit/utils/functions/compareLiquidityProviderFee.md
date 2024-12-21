[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / compareLiquidityProviderFee

# Function: compareLiquidityProviderFee()

> **compareLiquidityProviderFee**(`cachedLiquidity`, `newLiquidity`): `boolean`

Compares the cached liquidity provider fee with the new liquidity provider fee to determine if they are the same.

- For v2 liquidity fees (a single number), it performs a direct comparison.
- For v3 liquidity fees (an array of numbers), it compares each fee in the array individually.

## Parameters

• **cachedLiquidity**: `number` \| `number`[]

The cached liquidity provider fee (either a single number or an array of numbers).

• **newLiquidity**: `undefined` \| `number` \| `number`[]

The new liquidity provider fee to compare (either a single number or an array of numbers).

## Returns

`boolean`

`true` if the fees are the same, otherwise `false`.

## Throws

DexError if the cached or new liquidity fee is in an unexpected format or is missing.

## Defined in

[packages/utils/src/utils/trade.utils.ts:363](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/trade.utils.ts#L363)
