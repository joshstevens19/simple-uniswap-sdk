[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquidityInternalArgs

# Type Alias: LiquidityInternalArgs\<TFormat\>

> **LiquidityInternalArgs**\<`TFormat`\>: [`DexFactoryBaseArgs`](DexFactoryBaseArgs.md)\<`TFormat`\> & [`LiquiditySenderArgs`](LiquiditySenderArgs.md) & `object`

Represents the internal arguments for the Liquidity, combining base arguments, sender arguments, and the DEX provider.

## Type declaration

### dexProvider

> **dexProvider**: [`IDexProvider`](../interfaces/IDexProvider.md)

The provider for the DEX where the liquidity operation is performed.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

[packages/types/src/liquidity.types.ts:120](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L120)
