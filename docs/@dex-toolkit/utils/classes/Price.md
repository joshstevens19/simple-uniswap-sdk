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

packages/utils/src/price-source/price-source.ts:24

## Properties

### \_cacheMilliseconds

> `protected` **\_cacheMilliseconds**: `number` = `90000`

#### Defined in

packages/utils/src/price-source/price-source.ts:17

***

### \_fiatPriceCache?

> `protected` `optional` **\_fiatPriceCache**: `object` = `undefined`

#### cachedResponse

> **cachedResponse**: `Record`\<`string`, `number`\>

#### timestamp

> **timestamp**: `number`

#### Defined in

packages/utils/src/price-source/price-source.ts:18

***

### apiKey?

> `protected` `optional` **apiKey**: `string`

#### Defined in

packages/utils/src/price-source/price-source.ts:22

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

packages/utils/src/price-source/price-source.ts:84

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

packages/utils/src/price-source/price-source.ts:37
