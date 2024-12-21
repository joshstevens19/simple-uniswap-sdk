[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / CoinGecko

# Class: CoinGecko

## Extends

- [`Price`](Price.md)

## Constructors

### new CoinGecko()

> **new CoinGecko**(`apiKey`?): [`CoinGecko`](CoinGecko.md)

#### Parameters

• **apiKey?**: `string`

#### Returns

[`CoinGecko`](CoinGecko.md)

#### Overrides

[`Price`](Price.md).[`constructor`](Price.md#constructors)

#### Defined in

[packages/utils/src/price-source/coin-gecko.ts:56](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/coin-gecko.ts#L56)

## Properties

### \_cacheMilliseconds

> `protected` **\_cacheMilliseconds**: `number` = `90000`

#### Inherited from

[`Price`](Price.md).[`_cacheMilliseconds`](Price.md#_cachemilliseconds)

#### Defined in

[packages/utils/src/price-source/price-source.ts:18](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L18)

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

[packages/utils/src/price-source/price-source.ts:19](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L19)

***

### apiKey?

> `protected` `optional` **apiKey**: `string`

#### Inherited from

[`Price`](Price.md).[`apiKey`](Price.md#apikey)

#### Defined in

[packages/utils/src/price-source/price-source.ts:23](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L23)

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

[packages/utils/src/price-source/coin-gecko.ts:60](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/coin-gecko.ts#L60)

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

[packages/utils/src/price-source/price-source.ts:38](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.ts#L38)
