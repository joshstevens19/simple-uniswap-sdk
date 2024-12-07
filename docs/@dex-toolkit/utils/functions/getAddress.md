[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getAddress

# Function: getAddress()

> **getAddress**(`address`, `keepEthPrefix`): `Address`

Converts and returns the address in its checksummed format.
Optionally, the address is converted back to its original coin address if it was a wrapped address.

## Parameters

• **address**: `string`

The address to convert.

• **keepEthPrefix**: `boolean` = `false`

Whether to keep the ETH prefix for coin addresses. Defaults to `false`.

## Returns

`Address`

The checksummed address.

## Throws

If the address is not a valid address.

## Defined in

packages/utils/src/utils/address.utils.ts:51
