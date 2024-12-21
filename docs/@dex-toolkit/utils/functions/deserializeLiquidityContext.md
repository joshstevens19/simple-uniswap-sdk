[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / deserializeLiquidityContext

# Function: deserializeLiquidityContext()

> **deserializeLiquidityContext**(`context`): `InternalLiquidityContext`\<`"dexnumber"`\>

Deserializes a liquidity context by converting all serialized DexNumber values back to DexNumber instances.
This is the inverse operation of formatLiquidityContext.

## Parameters

• **context**: `InternalLiquidityContext`\<`"dexnumber"`\>

The serialized liquidity context

## Returns

`InternalLiquidityContext`\<`"dexnumber"`\>

A context with proper DexNumber instances

## Example

```typescript
// After receiving a context from RxJS
subscription.pipe(
  map(({ latestQuote }) => deserializeLiquidityContext(latestQuote))
).subscribe(context => {
  // context now has proper DexNumber instances
  context.expectedLiquidity.multipliedBy(2); // works!
});
```

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:1377](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L1377)
