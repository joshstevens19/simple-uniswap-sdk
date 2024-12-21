[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / Price

# Class: `abstract` Price

## Extended by

- [`CoinGecko`](CoinGecko.md)
- [`CoinMarketCap`](CoinMarketCap.md)
- [`CryptoCompare`](CryptoCompare.md)

## Constructors

### new Price()

> **new Price**(`apiKey`?): [`Price`](Price.md)

#### Parameters

• **apiKey?**: `string`

#### Returns

[`Price`](Price.md)

#### Defined in

[packages/utils/src/price-source/price-source.ts:25](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L25)

## Properties

### \_cacheMilliseconds

> `protected` **\_cacheMilliseconds**: `number` = `90000`

#### Defined in

[packages/utils/src/price-source/price-source.ts:18](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L18)

***

### \_fiatPriceCache?

> `protected` `optional` **\_fiatPriceCache**: `object` = `undefined`

#### cachedResponse

> **cachedResponse**: `Record`\<`string`, `number`\>

#### timestamp

> **timestamp**: `number`

#### Defined in

[packages/utils/src/price-source/price-source.ts:19](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L19)

***

### apiKey?

> `protected` `optional` **apiKey**: `string`

#### Defined in

[packages/utils/src/price-source/price-source.ts:23](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L23)

## Methods

### fetchFiatPrices()

> `abstract` `protected` **fetchFiatPrices**(`params`): `Promise`\<`Record`\<`string`, `number`\>\>

Fetch fiat prices from the specific price source.

#### Parameters

• **params**

The parameters required to fetch fiat prices.

• **params.chainId**: `number`

The chain id.

• **params.contractAddresses**: `string`[]

The array of contract addresses.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

A promise that resolves to an object containing the fiat prices.

#### Defined in

[packages/utils/src/price-source/price-source.ts:85](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L85)

***

### getFiatPrices()

> **getFiatPrices**(`params`): `Promise`\<`Record`\<`string`, `number`\>\>

Get fiat prices for the given contract addresses.

#### Parameters

• **params**

The parameters required to get fiat prices.

• **params.chainId**: `number`

The chain id.

• **params.contractAddresses**: `string`[]

The array of contract addresses.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

A promise that resolves to an object containing the fiat prices.

#### Defined in

[packages/utils/src/price-source/price-source.ts:38](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L38)
