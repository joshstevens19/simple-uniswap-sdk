[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeFormatValue

# Type Alias: TradeFormatValue\<TFormat\>

> **TradeFormatValue**\<`TFormat`\>: `TFormat` *extends* `"readable"` ? `string` : `TFormat` *extends* `"hex"` ? [`HexString`](HexString.md) : `TFormat` *extends* `"decimal"` ? `string` : `TFormat` *extends* `"wei"` ? `string` : `TFormat` *extends* `"dexnumber"` ? [`IDexNumber`](../interfaces/IDexNumber.md) : `TFormat` *extends* `"bignumber"` ? `BigNumber` : `TFormat` *extends* `"ethers"` ? `EthersBigNumber` : `TFormat` *extends* `"bigint"` ? `bigint` : `never`

Maps TradeFormat to its corresponding return type.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/trade.types.ts:255
