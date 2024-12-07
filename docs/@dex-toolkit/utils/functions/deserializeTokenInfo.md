[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / deserializeTokenInfo

# Function: deserializeTokenInfo()

> **deserializeTokenInfo**(`info`): `LiquidityTokenInfo`\<`"dexnumber"`\>

Deserializes a token info object by converting all its DexNumber values back to instances.

## Parameters

• **info**: `LiquidityTokenInfo`\<`"dexnumber"`\>

The serialized token info object

## Returns

`LiquidityTokenInfo`\<`"dexnumber"`\>

Token info with proper DexNumber instances

## Example

```typescript
const serializedInfo = {
  token: myToken,
  amount: serializedDexNumber,
  balance: serializedDexNumber,
  allowance: serializedDexNumber,
  // ... other properties
};
const deserializedInfo = deserializeTokenInfo(serializedInfo);
deserializedInfo.balance.multipliedBy(2); // works!
```

## Defined in

packages/utils/src/utils/liquidity.utils.ts:1433
