[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / DexFactory

# Class: DexFactory\<TFormat\>

The `DexFactory` class serves as the entry point for interacting with decentralized exchanges (DEXs).
It provides methods to create instances of `Trade` and `Liquidity` for token swaps and liquidity management.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The format in which numerical values (e.g., balances, amounts) are returned.

## Constructors

### new DexFactory()

> **new DexFactory**\<`TFormat`\>(`_context`): [`DexFactory`](DexFactory.md)\<`TFormat`\>

#### Parameters

• **\_context**: `DexArgs`\<`TFormat`\>

#### Returns

[`DexFactory`](DexFactory.md)\<`TFormat`\>

#### Defined in

[packages/core/src/dex.factory.ts:30](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L30)

## Properties

### \_context

> `protected` **\_context**: `DexArgs`\<`TFormat`\>

#### Defined in

[packages/core/src/dex.factory.ts:30](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L30)

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

The underlying `DexProvider` instance used for DEX operations.

#### Defined in

[packages/core/src/dex.factory.ts:28](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L28)

## Accessors

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Returns the underlying `DexProvider`.

#### Returns

`DexProvider`

#### Defined in

[packages/core/src/dex.factory.ts:40](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L40)

## Methods

### createLiquidity()

> **createLiquidity**(`args`): `Promise`\<[`Liquidity`](Liquidity.md)\<`TFormat`\>\>

Creates an instance of the `Trade` that can be used for token trades.

#### Parameters

• **args**: `LiquiditySenderPublicArgs`

The arguments for creating the factory.

#### Returns

`Promise`\<[`Liquidity`](Liquidity.md)\<`TFormat`\>\>

A promise resolving to a `Trade` instance.

#### Throws

if the token addresses are invalid or not found in the token list.

#### Defined in

[packages/core/src/dex.factory.ts:133](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L133)

***

### createTrade()

> **createTrade**(`args`): `Promise`\<[`Trade`](Trade.md)\<`TFormat`\>\>

Creates an instance of the `Trade` that can be used for token trades.

#### Parameters

• **args**: `TradeSenderPublicArgs`

The arguments for creating the factory.

#### Returns

`Promise`\<[`Trade`](Trade.md)\<`TFormat`\>\>

A promise resolving to a `Trade` instance.

#### Throws

if the token addresses are invalid or not found in the token list.

#### Defined in

[packages/core/src/dex.factory.ts:53](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/dex.factory.ts#L53)
