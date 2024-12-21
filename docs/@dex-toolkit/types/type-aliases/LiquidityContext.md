[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquidityContext

# Type Alias: LiquidityContext\<TFormat\>

> **LiquidityContext**\<`TFormat`\>: `object`

Represents the context of a liquidity operation, containing various details about the process,
including the DEX tag, version, liquidity direction, and other relevant information.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### deadline

> **deadline**: `number`

The Unix timestamp after which the transaction will revert.

### dexTag

> **dexTag**: [`DexTag`](DexTag.md)

The tag of the decentralized exchange (DEX) being used.

### enableTransactions?

> `optional` **enableTransactions**: `object`

Set of transactions needed to enable token spending, if required.
V2: If removing liquidity and permit data is passed in, this will be set to undefined.

### enableTransactions.lpToken?

> `optional` **enableTransactions.lpToken**: [`DexTransaction`](DexTransaction.md)

The transaction needed to enable spending of the LP token, if required.
V2: If permit data is passed in, this will be set to undefined.

### enableTransactions.tokenA?

> `optional` **enableTransactions.tokenA**: [`DexTransaction`](DexTransaction.md)

The transaction needed to enable spending of tokenA, if required.

### enableTransactions.tokenB?

> `optional` **enableTransactions.tokenB**: [`DexTransaction`](DexTransaction.md)

The transaction needed to enable spending of tokenB, if required.

### execute()?

> `optional` **execute**: (`{
    approvalConfirmations,
    transactionConfirmations,
  }`) => `Promise`\<`object`\>

Executes the liquidity operation by handling all necessary transactions (approvals and main transaction).
Uses the signer from the DEX provider to send transactions.
Must provide a signer via dexProvider to execute transactions.

#### Parameters

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}**

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}.approvalConfirmations?**: `number`

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}.transactionConfirmations?**: `number`

#### Returns

`Promise`\<`object`\>

A promise that resolves when all transactions are complete with the transaction receipts

##### approvalReceipts?

> `optional` **approvalReceipts**: `ContractReceipt`[]

##### transactionReceipt?

> `optional` **transactionReceipt**: `ContractReceipt`

#### Throws

If transactions fail or if no signer is available

### expectedLiquidity

> **expectedLiquidity**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The expected amount of liquidity to be added or removed.

### expectedShareOfPool

> **expectedShareOfPool**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The expected share of the pool after the liquidity operation.

### id

> **id**: `string`

The unique ID for the context

### liquidityDirection

> **liquidityDirection**: [`LiquidityDirection`](LiquidityDirection.md)

The direction of the liquidity operation (add or remove).

### lpTokenInfo?

> `optional` **lpTokenInfo**: [`LPTokenInfo`](LPTokenInfo.md)\<`TFormat`\>

Information about the liquidity pool (LP) token.

### minLiquidity?

> `optional` **minLiquidity**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount of liquidity acceptable for the operation, considering slippage.

### observer$

> **observer$**: `Observable`\<[`ObservableLiquidityContext`](ObservableLiquidityContext.md)\<`TFormat`\>\>

An observable stream that emits updates to the liquidity context.

### prices

> **prices**: [`LiquidityPrices`](LiquidityPrices.md)\<`TFormat`\>

The current prices between the two tokens in the pool.

### protocol

> **protocol**: [`DexProtocol`](DexProtocol.md)

The protocol of the DEX being used.

### shareOfPool

> **shareOfPool**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The current share of the pool.

### slippage

> **slippage**: `number`

The slippage tolerance for the liquidity operation, expressed as a decimal (e.g., 0.01 for 1%).

### tokenAInfo

> **tokenAInfo**: [`LiquidityTokenInfo`](LiquidityTokenInfo.md)\<`TFormat`\>

Information about the first token in the liquidity pair.

### tokenBInfo

> **tokenBInfo**: [`LiquidityTokenInfo`](LiquidityTokenInfo.md)\<`TFormat`\>

Information about the second token in the liquidity pair.

### transaction?

> `optional` **transaction**: [`DexTransaction`](DexTransaction.md)

The main transaction that will perform the liquidity operation.

### unsubscribe()

> **unsubscribe**: () => `void`

A function to clean up resources and subscriptions when the context is no longer needed.

#### Returns

`void`

### version

> **version**: [`Version`](Version.md)

The version of the DEX used for liquidity.

## Defined in

[packages/types/src/liquidity.types.ts:313](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L313)
