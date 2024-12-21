[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / processTokenCallResults

# Function: processTokenCallResults()

> **processTokenCallResults**\<`TFormat`\>(`params`): `object`

Parses the results from a token contract call context, extracting details like symbol, decimals, name, balance, and allowances.

## Type Parameters

• **TFormat** *extends* `TradeFormat` = `"dexnumber"`

The format type.

## Parameters

• **params**

The parameters for parsing the token call results.

• **params.contractResults**: `ContractResults`\<`Contract`, `TokenCalls`\<`true`, `true`\>\>

The full results of contract call execution.'

• **params.format?**: `TradeFormatOptions`\<`TFormat`\> = `...`

The format in which the balance and allowance values are returned. Defaults to `dexnumber` if not provided.

## Returns

`object`

An object containing the parsed token details. If `dexTag` is provided, the object will include `allowanceV2` and `allowanceV3`.

### allowanceInfoByDex?

> `optional` **allowanceInfoByDex**: `AllowancesByDex`\<`TFormat`\>

### balanceOf?

> `optional` **balanceOf**: `TradeFormatValue`\<`TFormat`\>

### decimals?

> `optional` **decimals**: `GetReturnType`\<`Erc20Types.Contract`, `"decimals"`\>

### name?

> `optional` **name**: `GetReturnType`\<`Erc20Types.Contract`, `"name"`\>

### symbol?

> `optional` **symbol**: `GetReturnType`\<`Erc20Types.Contract`, `"symbol"`\>

## Defined in

[packages/utils/src/multicall/token-multicall.utils.ts:106](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/multicall/token-multicall.utils.ts#L106)
