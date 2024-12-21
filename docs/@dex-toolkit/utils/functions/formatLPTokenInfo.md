[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatLPTokenInfo

# Function: formatLPTokenInfo()

> **formatLPTokenInfo**\<`TFormat`\>(`info`, `format`): `LPTokenInfoV2`\<`TFormat`\> \| `LPTokenInfoV3`\<`TFormat`\>

Formats liquidity pool token information by converting DexNumber values to the specified format type.
Handles both V2 and V3 LP token information, including their specific properties.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The target format type for the converted values

## Parameters

• **info**: `LPTokenInfoV2`\<`"dexnumber"`\> \| `LPTokenInfoV3`\<`"dexnumber"`\>

The LP token information containing DexNumber values (either V2 or V3)

• **format**: `TradeFormatOptions`\<`TFormat`\>

The format specification to convert values to

## Returns

`LPTokenInfoV2`\<`TFormat`\> \| `LPTokenInfoV3`\<`TFormat`\>

New LP token information with numeric values converted to the specified format

## Example

```typescript
// For V2 LP Token Info
const v2Info = {
  token: myToken,
  amount: dexNumberAmount,
  balance: dexNumberBalance,
  totalSupply: dexNumberTotalSupply,
  // ... other properties
};
const formattedV2 = formatLPTokenInfo(v2Info, { type: 'readable' });

// For V3 LP Token Info
const v3Info = {
  tokenId: '123',
  totalSupply: dexNumberTotalSupply,
  amount: dexNumberAmount,
  feeTier: 500,
  priceRange: { tickLower: -1000, tickUpper: 1000 }
};
const formattedV3 = formatLPTokenInfo(v3Info, { type: 'readable' });
```

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:1248](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L1248)
