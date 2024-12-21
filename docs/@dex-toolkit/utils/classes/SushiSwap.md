[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / SushiSwap

# Class: SushiSwap

App:
[Sushi Swap](https://www.sushi.com/ethereum/swap)

V2 Deployments:
[Classic AMM Deployment Addresses](https://docs.sushi.com/docs/Products/Classic%20AMM/Deployment%20Addresses)

V3 Deployments:
[Core Deployment Addresses](https://dev.sushi.com/docs/Products/V3%20AMM/Core/Deployment%20Addresses)
[Periphery Deployment Addresses](https://docs.sushi.com/docs/Products/V3%20AMM/Periphery/Deployment%20Addresses)

## Constructors

### new SushiSwap()

> **new SushiSwap**(): [`SushiSwap`](SushiSwap.md)

#### Returns

[`SushiSwap`](SushiSwap.md)

## Properties

### ARBITRUM

> `static` **ARBITRUM**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:66](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L66)

***

### AVALANCHE

> `static` **AVALANCHE**: `object`

#### FUJI()

> **FUJI**: () => `DexConfig`

##### Returns

`DexConfig`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:127](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L127)

***

### BASE

> `static` **BASE**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:216](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L216)

***

### BLAST

> `static` **BLAST**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:277](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L277)

***

### BSC

> `static` **BSC**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### TESTNET()

> **TESTNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:338](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L338)

***

### CELO

> `static` **CELO**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:427](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L427)

***

### ETH

> `static` **ETH**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### SEPOLIA()

> **SEPOLIA**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:463](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L463)

***

### OPTIMISM

> `static` **OPTIMISM**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:576](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L576)

***

### POLYGON

> `static` **POLYGON**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:637](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L637)

***

### ZKEVM

> `static` **ZKEVM**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:701](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L701)

## Methods

### getAllDexConfigs()

> `static` **getAllDexConfigs**(): `DexConfig`[]

#### Returns

`DexConfig`[]

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:798](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L798)

***

### getDexConfig()

> `static` **getDexConfig**(`chainId`): `undefined` \| `DexConfig`

#### Parameters

• **chainId**: `number`

#### Returns

`undefined` \| `DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/sushiSwap.dex.ts:765](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/sushiSwap.dex.ts#L765)
