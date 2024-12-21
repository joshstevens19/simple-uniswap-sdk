[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexFactoryBaseArgs

# Type Alias: DexFactoryBaseArgs\<TFormat\>

> **DexFactoryBaseArgs**\<`TFormat`\>: `object`

Represents the base arguments required for the DexFactory.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md) = `"readable"`

## Type declaration

### dexContext

> **dexContext**: [`DexContext`](DexContext.md)

The context of the DEX (Decentralized Exchange) where the operation is performed.

### format?

> `optional` **format**: [`TradeFormatOptions`](TradeFormatOptions.md)\<`TFormat`\>

The format in which the liquidity context's number values will be returned.
Defaults to { type: `readable`, options: { locales: 'en' }}

- `'readable'`: Returns a human-readable string with grouping (thousands separators) and specified decimal places (e.g., "1,234.567").
- `'decimal'`: Outputs a precise decimal string representation without grouping, maintaining the decimal places specified (e.g., "1234.567").
- `'wei'`: Outputs the value in its smallest unit, suitable for precise blockchain interactions (e.g., "1000000000000000000" for 1 Ether).
- `'hex'`: Returns a hexadecimal string representation, useful for encoding values in blockchain transactions (e.g., "0x158e460913d000000000").
- `'dexnumber'`: Returns the current instance as a `DexNumber` object.
- `'bignumber'`: Returns an instance of `BigNumber` from `bignumber.js`.
- `'ethers'`: Returns a `BigNumber` instance from `ethers.js`.
- `'bigint'`: Converts and returns the value as a native JavaScript `BigInt`.

### multiPriceContext?

> `optional` **multiPriceContext**: [`MultiPriceContext`](MultiPriceContext.md)

(Optional) The price context for multiple tokens.

### tokenListContext?

> `optional` **tokenListContext**: [`TokenListContext`](TokenListContext.md)

(Optional) The context of the token list to be used. Provide an empty array to disable the token list.

### walletAddress

> **walletAddress**: `Address`

The wallet address of the user initiating the liquidity operation.

## Defined in

[packages/types/src/dex.types.ts:219](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex.types.ts#L219)
