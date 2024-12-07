[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isSerializedDexNumber

# Function: isSerializedDexNumber()

> **isSerializedDexNumber**(`value`): `boolean`

Type guard to check if a value needs deserialization (is a plain object, not a DexNumber instance)

## Parameters

• **value**: `any`

## Returns

`boolean`

## Example

```typescript
const value = someValue;
if (needsDeserialization(value)) {
  return DexNumber.fromSerialized(value);
}
return value;
```

## Defined in

packages/utils/src/utils/liquidity.utils.ts:1459
