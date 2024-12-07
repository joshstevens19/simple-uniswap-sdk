[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / CryptoCompare

# Class: CryptoCompare

## Extends

- [`Price`](Price.md)

## Constructors

### new CryptoCompare()

> **new CryptoCompare**(`apiKey`?): [`CryptoCompare`](CryptoCompare.md)

#### Parameters

• **apiKey?**: `string`

#### Returns

[`CryptoCompare`](CryptoCompare.md)

#### Overrides

[`Price`](Price.md).[`constructor`](Price.md#constructors)

#### Defined in

packages/utils/src/price-source/crypto-compare.ts:9

## Properties

### \_cacheMilliseconds

> `protected` **\_cacheMilliseconds**: `number` = `90000`

#### Inherited from

[`Price`](Price.md).[`_cacheMilliseconds`](Price.md#_cachemilliseconds)

#### Defined in

packages/utils/src/price-source/price-source.ts:17

***

### \_fiatPriceCache?

> `protected` `optional` **\_fiatPriceCache**: `object` = `undefined`

#### cachedResponse

> **cachedResponse**: `Record`\<`string`, `number`\>

#### timestamp

> **timestamp**: `number`

#### Inherited from

[`Price`](Price.md).[`_fiatPriceCache`](Price.md#_fiatpricecache)

#### Defined in

packages/utils/src/price-source/price-source.ts:18

***

### apiKey?

> `protected` `optional` **apiKey**: `string`

#### Inherited from

[`Price`](Price.md).[`apiKey`](Price.md#apikey)

#### Defined in

packages/utils/src/price-source/price-source.ts:22

## Methods

### fetchFiatPrices()

> `protected` **fetchFiatPrices**(`params`): `Promise`\<`Record`\<`string`, `number`\>\>

Fetch fiat prices from the specific price source.

#### Parameters

• **params**

The parameters required to fetch fiat prices.

• **params.chainId**: `number`

The chain id.

• **params.contractAddresses**: `string`[]

The array of contract addresses.

• **params.currency?**: `PriceCurrencies` = `'USD'`

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

A promise that resolves to an object containing the fiat prices.

#### Overrides

[`Price`](Price.md).[`fetchFiatPrices`](Price.md#fetchfiatprices)

#### Defined in

packages/utils/src/price-source/crypto-compare.ts:13

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

#### Inherited from

[`Price`](Price.md).[`getFiatPrices`](Price.md#getfiatprices)

#### Defined in

packages/utils/src/price-source/price-source.ts:37
