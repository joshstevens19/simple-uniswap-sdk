[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeFormat

# Type Alias: TradeFormat

> **TradeFormat**: `"readable"` \| `"hex"` \| `"decimal"` \| `"wei"` \| `"dexnumber"` \| `"bignumber"` \| `"ethers"` \| `"bigint"`

The format in which the trade context's number values will be returned.

- `'readable'`: Returns a human-readable string with grouping (thousands separators) and specified decimal places (e.g., "1,234.567").
- `'decimal'`: Outputs a precise decimal string representation without grouping, maintaining the decimal places specified (e.g., "1234.567").
- `'wei'`: Outputs the value in its smallest unit, suitable for precise blockchain interactions (e.g., "1000000000000000000" for 1 Ether).
- `'hex'`: Returns a hexadecimal string representation, useful for encoding values in blockchain transactions (e.g., "0x158e460913d000000000").
- `'dexnumber'`: Returns the current instance as a `DexNumber` object.
- `'bignumber'`: Returns an instance of `BigNumber` from `bignumber.js`.
- `'ethers'`: Returns a `BigNumber` instance from `ethers.js`.
- `'bigint'`: Converts and returns the value as a native JavaScript `BigInt`.

## Defined in

packages/types/src/trade.types.ts:222
