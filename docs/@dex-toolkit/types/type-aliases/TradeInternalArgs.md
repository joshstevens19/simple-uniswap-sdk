[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeInternalArgs

# Type Alias: TradeInternalArgs\<TFormat\>

> **TradeInternalArgs**\<`TFormat`\>: [`DexFactoryBaseArgs`](DexFactoryBaseArgs.md)\<`TFormat`\> & [`TradeSenderArgs`](TradeSenderArgs.md) & `object`

Represents the internal arguments for the Trade, combining base arguments, sender arguments, and the DEX provider.

## Type declaration

### dexProvider

> **dexProvider**: [`IDexProvider`](../interfaces/IDexProvider.md)

The DEX provider responsible for handling the trade execution.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/trade.types.ts:82
