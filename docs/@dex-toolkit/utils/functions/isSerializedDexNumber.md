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

[packages/utils/src/utils/liquidity.utils.ts:1459](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L1459)
