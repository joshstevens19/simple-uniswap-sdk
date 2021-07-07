# simple-uniswap-sdk

[![npm version](https://badge.fury.io/js/simple-uniswap-sdk.svg)](https://badge.fury.io/js/simple-uniswap-sdk)
![downloads](https://img.shields.io/npm/dw/simple-uniswap-sdk)

Uniswap SDK which handles the routes automatically for you, changes in trade quotes reactive subscriptions, exposure to formatted easy to understand information, bringing back the best trade quotes automatically, generating transactions for you and much more. All the uniswap logic for you in a simple to easy understand interface to hook straight into your dApp without having to understand how it all works.

Please note this is not owned or maintained by uniswap and is a open source package for anyone to use freely.

## Features 🚀

🚀 Supports uniswap v2 and v3 prices together and returns you the best price, so you do not need to query both yourself
<br/>
🚀 Queries all the best routes and finds the best price for you
<br/>
🚀 Exposes all the route paths it tried so you can see every detail in how it worked out the best price
<br/>
🚀 Easy subscriptions to get alerted when the price moves or the trade expires
<br/>
🚀 The transaction is generated for you, just fill it with the gas details and send it on its way
<br/>
🚀 All the figures are all formatted for you, no need to worry about timing it back to its decimal formatted place, just render it straight onto your UI
<br/>
🚀 Exposes all the tokens metadata for you, name, symbol, decimals
<br/>
🚀 Uses [multicall](https://github.com/joshstevens19/ethereum-multicall) for every on chain lookup, so even though it could be doing 100 JSONRPC calls it is all put into a few calls meaning it can stay very fast
<br/>
🚀 Tidy bundle size
<br/>
🚀 Fully typescript supported with full generated typings
<br/>
🚀 query many tokens in 1 jsonrpc call perfect to get token metadata fast
<br/>
🚀 and much more!!

# Motivation

As a ethereum dApp developer you try to get your dApp experience as integrated as possible, Ethereum right now is hard to show in a web2.0 world as it is. On top of this as a developer you have to learn all the complex stuff for the blockchain which can take its toll on you.

When I was integrating uniswap on our wallet I found that their `SDK` was a bit too much for what I needed. Deepdown from the dApp point of view I only really cared about getting the best price for the user with all the fees related. I also found myself having to write a lot of custom code which I thought could be abstracted away so nobody has to deal with that again. A lot of the uniswap features like routing is all done in their client itself which is great but not when you want to use it in a more integrated approach in your on dApp.

`Uniswap` is one of the BEST projects on ethereum and one of my favourites. My motivation here is to create a library which allows more people to integrate it on their dApp without having to worry about how their amazing software links together. This makes the whole user experience better and allows more developers to get involved integrating uniswap in their dApp with a web2.0 experience, and on top of this also growing the usage of it.

p.s I have huge love for unicorns

# Installing

## npm

```bash
$ npm install simple-uniswap-sdk
```

## yarn

```bash
$ yarn add simple-uniswap-sdk
```

# SDK guide

## Creating a uniswap pair factory

The uniswap pair factory is an instance which is joint together with the `from` token and the `to` token, it is all self contained in the instance and exposes easy methods for you to call to start using uniswap.

```ts
export class UniswapPair {
  constructor(
    private _uniswapPairContext:
      | UniswapPairContextForChainId
      | UniswapPairContextForProviderUrl
      | UniswapPairContextForEthereumProvider
)
```

```ts
export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

interface UniswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: UniswapPairSettings | undefined;
}

export interface UniswapPairContextForEthereumProvider
  extends UniswapPairContextBase {
  // can take any ethers provider, web3 provider or custom ethereum provider
  ethereumProvider: any;
}

export interface UniswapPairContextForChainId extends UniswapPairContextBase {
  chainId: ChainId | number;
}

export interface UniswapPairContextForProviderUrl
  extends UniswapPairContextForChainId {
  providerUrl: string;
}
```

```ts
export class UniswapPairSettings {
  slippage: number;
  deadlineMinutes: number;
  disableMultihops: boolean;
  uniswapVersions: UniswapVersion[] = [UniswapVersion.v2, UniswapVersion.v3];

  constructor(settings?: {
    slippage?: number | undefined;
    deadlineMinutes?: number | undefined;
    disableMultihops?: boolean | undefined;
    uniswapVersions?: UniswapVersion[] | undefined;
  }) {
    this.slippage = settings?.slippage || 0.005;
    this.deadlineMinutes = settings?.deadlineMinutes || 20;
    this.disableMultihops = settings?.disableMultihops || false;

    if (
      Array.isArray(settings?.uniswapVersions) &&
      settings?.uniswapVersions.length === 0
    ) {
      throw new UniswapError(
        '`uniswapVersions` must not be an empty array',
        ErrorCodes.uniswapVersionsMustNotBeAnEmptyArray
      );
    }

    if (
      settings &&
      Array.isArray(settings.uniswapVersions) &&
      settings.uniswapVersions.length > 0
    ) {
      this.uniswapVersions = settings?.uniswapVersions;
    }
  }
}
```

### Ethereum provider

This will use your ethereum provider you pass in. This will work with any web3 provider, ethers provider or custom provider. For example when using MetaMask you can pass in the window.ethereum and it work. You must supply the ethereum address and the wallet be approved to use for the dApp and unlocked before passing it in. The uniswap sdk makes those assumptions without them it will not work as MetaMask is not allowed access to your dApp. Any change of network or ethereum address change you will need to handle in your dApp and regenerate the uniswap pair context. Most the time the contract addresses for your tokens are different anyway.

```ts
import { UniswapPair, ChainId, UniswapVersion, ETH } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: ETH.MAINNET().contractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  settings: new UniswapPairSettings({
    // if not supplied it will use `0.005` which is 0.5%
    // please pass it in as a full number decimal so 0.7%
    // would be 0.007
    slippage: 0.005,
    // if not supplied it will use 20 a deadline minutes
    deadlineMinutes: 20,
    // if not supplied it will try to use multihops
    // if this is true it will require swaps to direct
    // pairs
    disableMultihops: false,
    // for example if you only wanted to turn on quotes for v3 and not v3
    // you can only support the v3 enum same works if you only want v2 quotes
    // if you do not supply anything it query both v2 and v3
    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
  }),
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();
```

### With only the chainId

This will use a infura endpoint without you having to pass in a node

```ts
import { UniswapPair, ChainId, UniswapVersion, ETH } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: ETH.MAINNET().contractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  chainId: ChainId.MAINNET,
  settings: new UniswapPairSettings({
    // if not supplied it will use `0.005` which is 0.5%
    // please pass it in as a full number decimal so 0.7%
    // would be 0.007
    slippage: 0.005,
    // if not supplied it will use 20 a deadline minutes
    deadlineMinutes: 20,
    // if not supplied it will try to use multihops
    // if this is true it will require swaps to direct
    // pairs
    disableMultihops: false,
    // for example if you only wanted to turn on quotes for v3 and not v3
    // you can only support the v3 enum same works if you only want v2 quotes
    // if you do not supply anything it query both v2 and v3
    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
  }),
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();
```

### With your own provider url

This will use your node you pass in you must pass us the chainId as well, this stops the ethers instance calling pointless `JSONRPC` calls to get the chain id before every `JSONRPC` call.

```ts
import { UniswapPair, ChainId, UniswapVersion, ETH } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: ETH.MAINNET().contractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  chainId: ChainId.MAINNET,
  providerUrl: YOUR_PROVIDER_URL,
  settings: new UniswapPairSettings({
    // if not supplied it will use `0.005` which is 0.5%
    // please pass it in as a full number decimal so 0.7%
    // would be 0.007
    slippage: 0.005,
    // if not supplied it will use 20 a deadline minutes
    deadlineMinutes: 20,
    // if not supplied it will try to use multihops
    // if this is true it will require swaps to direct
    // pairs
    disableMultihops: false,
    // for example if you only wanted to turn on quotes for v3 and not v3
    // you can only support the v3 enum same works if you only want v2 quotes
    // if you do not supply anything it query both v2 and v3
    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
  }),
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();
```

## Catching error

I know randomly throwing errors with no error codes is a pain when writing dApps. In this package when we throw we have our own custom error. This has error codes you can map to what actually happened to allow your dApp to handle them gracefully.

```ts
export class UniswapError extends Error {
  public name = 'UniswapError';
  public code: ErrorCodes;
  public message: string;
  constructor(message: string, code: ErrorCodes) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
```

```ts
export enum ErrorCodes {
  noRoutesFound = 1,
  canNotFindChainId = 2,
  tokenChainIdContractDoesNotExist = 3,
  tradePathIsNotSupported = 4,
  generateApproveMaxAllowanceDataNotAllowed = 5,
  fromTokenContractAddressRequired = 6,
  fromTokenContractAddressNotValid = 7,
  toTokenContractAddressRequired = 8,
  toTokenContractAddressNotValid = 9,
  ethereumAddressRequired = 10,
  ethereumAddressNotValid = 11,
  invalidPairContext = 12,
  invalidFromOrToContractToken = 13,
  uniswapVersionNotSupported = 14,
  uniswapVersionsMustNotBeAnEmptyArray = 15,
  canNotFindProviderUrl = 16,
  wrongEthersProviderContext = 17,
  chainIdNotSupported = 18,
  chainIdCanNotBeFound = 19,
}
```

## Uniswap pair factory

### Trade

This will generate you the trade with all the information you need to show to the user on the dApp. It will find the best route price for you automatically. we generate the transaction for you but you will still need to sign and send the transaction on your dApp once they confirm the swap.

Please note `ROPSTEN`, `RINKEBY`, `GÖRLI` and `KOVAN` will only use `ETH` as a main currency unlike `MAINNET` which uses everything, so you will get less routes on those testnets.

```ts
 /**
   * Generate trade - this will return amount but you still need to send the transaction
   * if you want it to be executed on the blockchain
   * @param amount The amount you want to swap formatted. Aka if you want to swap 1 AAVE you pass in 1
   * @param direction The direction you want to get the quote from
   */
async trade(amount: string, direction: TradeDirection = TradeDirection.input): Promise<TradeContext>
```

#### Trade direction

Trade direction is a way to ask for quotes for input and output.

- input = information for the quote from the FROM
- ouput = information for the quote from the TO

for example if i was swapping AAVE > ETH if i pass in amount 1 and trade direction input, the information would be how much ETH you will get back from 1 AAVE. if i pass in amount 1 and trade direction ouput, the information would be how much AAVE you will get back from 1 ETH.

```ts
export interface TradeContext {
  // this tells you the uniswap version the best quotes is at so for example
  // you sometimes may get better quotes on v2 then v3.
  uniswapVersion: UniswapVersion;
  // This will tell you what the trade direction is
  // input = information for the quote from the FROM
  // ouput = information for the quote from the TO
  // for example if i was swapping AAVE > ETH
  // if i pass in amount 1 and trade direction input, the information
  // would be how much ETH you will get back from 1 AAVE.
  // if i pass in amount 1 and trade direction ouput, the information
  // would be how much AAVE you will get back from 1 ETH.
  quoteDirection: TradeDirection;
  // the amount you requested to convert
  // this will be formatted in readable number
  // so you can render straight out the box
  baseConvertRequest: string;
  // the min amount you will receive taking off the slippage
  // if the price changes below that then
  // the uniswap contract will throw
  // this will be formatted in readable number
  // so you can render straight out the box
  // if you have done a output trade direction then this will be null
  minAmountConvertQuote: string | null;
  // the maximum amount it will send when doing an output trade direction
  // will be null if you have done a input trade direction
  maximumSent: string | null;
  // the expected amount you will receive
  // this will be formatted in readable number
  // so you can render straight out the box
  expectedConvertQuote: string;
  // A portion of each trade goes to
  // liquidity providers as a protocol of incentive
  // v2 always = (0.3%)
  // v3 depends on the fee amount sent on that pool
  // - low = 0.05%
  // - medium = 0.3%
  // - high = 1%
  liquidityProviderFee: string;
  // A portion of each trade goes to
  // liquidity providers as a protocol of incentive
  // v2 always = (0.3%)
  // v3 depends on the fee amount sent on that pool
  // - low = 0.05%
  // - medium = 0.3%
  // - high = 1%
  // the amount will always come back as full figures
  // aka 0.05% = 0.0005
  // 0.3% = 0.003
  // 1% = 0.01
  liquidityProviderFeePercent: number;
  // A unix datestamp in when this trade expires
  // if it does expiry while looking at it as long
  // as you are hooked onto `quoteChanged$` that will
  // emit you a new valid quote
  tradeExpires: number;
  // the route path mapped with full token info
  routePathTokenMap: Token[];
  // the route text so you can display it on the dApp easily
  routeText: string;
  // the pure route path, only had the arrays in nothing else
  routePath: string[];
  // full list of every route it tried with the expected convert quotes
  // this will be ordered from the best expected convert quote to worse [0] = best
  allTriedRoutesQuotes: {
    expectedConvertQuote: string;
    routePathArrayTokenMap: Token[];
    routeText: string;
    routePathArray: string[];
    uniswapVersion: UniswapVersion;
    liquidityProviderFee: number;
  }[];
  // if the allowance approved for moving tokens is below the amount sending to the
  // uniswap router this will be false if not true
  // this is not reactive so if you get the trade quote
  // and this returns false but then you do the approval
  // transaction, this old context will still say false
  hasEnoughAllowance: boolean;
  // this is the transaction you need to send first if approve the swap
  // but do not have any allowance for the router to move the token on their
  // behalf.
  approvalTransaction:
    | {
        to: string;
        from: string;
        data: string;
        value: string;
      }
    | undefined;
  // the from token info
  fromToken: Token;
  // holds the from balance context
  // this is not reactive so if they top
  // up their account after this is generated
  // then you need to query that yourself
  // or regen the trade info
  fromBalance: {
    // if the balance of the users has enough to perform this trade, does not consider gas prices
    // right now if your doing ETH > ERC20
    hasEnough: boolean;
    // the total balance that user has on the from formatted for you already
    balance: string;
  };
  // the to token info
  toToken: Token;
  // the total balance that user has on the to formatted for you already
  toBalance: string;
  // this is the transaction you need to send to execute the trade
  transaction: {
    to: string;
    from: string;
    data: string;
    value: string;
  };
  // this is a stream which emits if the quote has changed, this will emit
  // not matter what you should listen to this for the source of truth
  // for a reactive dApp. If you dont listen to this the user could end up
  // sending a uniswap transaction which price is now out of date
  quoteChanged$: Observable<TradeContext>;
  // when you generate a trade it does more then just return data, it makes
  // sure your data stays in sync with the `quoteChanged$`, so once you have
  // finished with a trade please call this to do a general clear up so we do
  // not keep timeouts and streams running.
  // when you call this it will kill all `quoteChanged$` subscriptions and
  // some watcher timeouts. If you execute a new trade with a new amount on
  // the same instance it will clear it for you.
  destroy: () => void;
}
```

```ts
export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

export enum UniswapVersion {
  v2 = 'v2',
  v3 = 'v3',
}
```

#### Usage

#### ethers example

```ts
import { ethers } from 'ethers';
import { ChainId, UniswapPair } from 'simple-uniswap-sdk';

const etherTradeExample = async () => {
  const uniswapPair = new UniswapPair({
    // the contract address of the token you want to convert FROM
    fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    // the contract address of the token you want to convert TO
    toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    // the ethereum address of the user using this part of the dApp
    ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
    // you can pass in the provider url as well if you want
    // providerUrl: YOUR_PROVIDER_URL,
    // OR if you want to inject your own ethereum provider (no need for chainId if so)
    // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
    chainId: ChainId.MAINNET,
  });

  // this example shows erc20 > erc20 but its a simple change for eth > erc20
  // or erc20 > eth example below by using `ETH.MAINNET().contractAddress`
  // which can be imported within `simple-uniswap-sdk`
  // aka > import { ETH } from 'simple-uniswap-sdk';

  //   ETH > ERC20
  // const uniswapPair = new UniswapPair({
  //   fromTokenContractAddress: ETH.MAINNET().contractAddress,
  //   toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  //   chainId: ChainId.RINKEBY,
  // });

  //   ERC20 > ETH
  // const uniswapPair = new UniswapPair({
  //   fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  //   toTokenContractAddress: ETH.MAINNET().contractAddress,,
  //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  //   chainId: ChainId.RINKEBY,
  // });

  // now to create the factory you just do
  const uniswapPairFactory = await uniswapPair.createFactory();

  // the amount is the proper entered amount
  // so if they enter 10 pass in 10
  // it will work it all out for you
  const trade = await uniswapPairFactory.trade('10');

  // can also pass in a trade direction here, for example if you want the output
  // aka your doing ETH > AAVE but want to know how much you get for 5 AAVE.
  // const trade = await uniswapPairFactory.trade('10', TradeDirection.output);

  // you should probably check this before they confirm the swap again
  // this is just so its simple to read
  if (!trade.fromBalance.hasEnough) {
    throw new Error('You do not have enough from balance to execute this swap');
  }

  // subscribe to quote changes this is just in example so your dont miss it
  trade.quoteChanged$.subscribe((value: TradeContext) => {
    // value will hold the same info as below but obviously with
    // the new trade info.
  });

  // obviously dont create your provider + wallet everytime again and again!
  // this is just like this for ease of reading!
  const provider = new ethers.providers.JsonRpcProvider(
    uniswapPairFactory.providerUrl
  );
  const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, provider);

  // Please note when you do your trade if `approvalTransaction` is defined the user does not have enough allowance to perform this trade
  // aka the router can not move their erc20 tokens on their behalf of the user.
  // This will generate the transaction for the approval of moving tokens for the user.
  // This uses the max hex possible which means they will not have to do this again if they want to swap from the SAME from token again later.
  // If they have only approved moving on uniswap v2 and try to execute a v3 trade they would have to approve that but again once approved
  // the v3 router then they will not have to again for that version.
  // Please note the approval is per each erc20 token, so if they picked another from token after they swapped they would need to do this again.
  // You have to send and sign the transaction from within your dApp. Remember when they do not have enough allowance it will mean doing 2 transaction,
  // 1 to allow uniswap to move tokens on their behalf then the next one to actually execute the trade.
  // On `eth` > `erc20` the `approvalTransaction` will always be undefined as you only need to do this when moving `erc20 > eth` and `erc20 > erc20`.
  if (trade.approvalTransaction) {
    const approved = await wallet.sendTransaction(trade.approvalTransaction);
    console.log('approved txHash', approved.hash);
    const approvedReceipt = await approved.wait();
    console.log('approved receipt', approvedReceipt);
  }

  const tradeTransaction = await wallet.sendTransaction(trade.transaction);
  console.log('trade txHash', tradeTransaction.hash);
  const tradeReceipt = await tradeTransaction.wait();
  console.log('trade receipt', tradeReceipt);

  // once done with trade aka they have sent it and you don't need it anymore call
  trade.destroy();
};

etherTradeExample();
```

#### web3 example

```ts
import { ChainId, TradeContext, UniswapPair } from 'simple-uniswap-sdk';
import Web3 from 'web3';

const web3TradeExample = async () => {
  const uniswapPair = new UniswapPair({
    // the contract address of the token you want to convert FROM
    fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    // the contract address of the token you want to convert TO
    toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    // the ethereum address of the user using this part of the dApp
    ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
    // you can pass in the provider url as well if you want
    // providerUrl: YOUR_PROVIDER_URL,
    // OR if you want to inject your own ethereum provider (no need for chainId if so)
    // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
    chainId: ChainId.RINKEBY,
  });

  // this example shows erc20 > erc20 but its a simple change for eth > erc20
  // or erc20 > eth example below by using `ETH.MAINNET().contractAddress`
  // which can be imported within `simple-uniswap-sdk`
  // aka > import { ETH } from 'simple-uniswap-sdk';

  //   ETH > ERC20
  // const uniswapPair = new UniswapPair({
  //   fromTokenContractAddress: ETH.MAINNET().contractAddress,
  //   toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  //   chainId: ChainId.RINKEBY,
  // });

  //   ERC20 > ETH
  // const uniswapPair = new UniswapPair({
  //   fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  //   toTokenContractAddress: ETH.MAINNET().contractAddress,,
  //   ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  //   chainId: ChainId.RINKEBY,
  // });

  // now to create the factory you just do
  const uniswapPairFactory = await uniswapPair.createFactory();

  // the amount is the proper entered amount
  // so if they enter 10 pass in 10
  // it will work it all out for you
  // can also pass in a trade direction here if you want for the output
  const trade = await uniswapPairFactory.trade('10');

  // can also pass in a trade direction here, for example if you want the output
  // aka your doing ETH > AAVE but want to know how much you get for 5 AAVE.
  // const trade = await uniswapPairFactory.trade('10', TradeDirection.output);

  // can also pass in a trade direction here, for example if you want the output
  // aka your doing ETH > AAVE but want to know how much you get for 5 AAVE.
  // const trade = await uniswapPairFactory.trade('10', TradeDirection.output);

  // you should probably check this before they confirm the swap again
  // this is just so its simple to read
  if (!trade.fromBalance.hasEnough) {
    throw new Error('You do not have enough from balance to execute this swap');
  }

  // subscribe to quote changes this is just in example so your dont miss it
  trade.quoteChanged$.subscribe((value: TradeContext) => {
    // value will hold the same info as below but obviously with
    // the new trade info.
  });

  // obviously dont create your web3 instance everytime again and again!
  // this is just like this for ease of reading!
  const web3 = new Web3(uniswapPairFactory.providerUrl);

  // Please note when you do your trade if `approvalTransaction` is defined the user does not have enough allowance to perform this trade
  // aka the router can not move their erc20 tokens on their behalf of the user.
  // This will generate the transaction for the approval of moving tokens for the user.
  // This uses the max hex possible which means they will not have to do this again if they want to swap from the SAME from token again later.
  // If they have only approved moving on uniswap v2 and try to execute a v3 trade they would have to approve that but again once approved
  // the v3 router then they will not have to again for that version.
  // Please note the approval is per each erc20 token, so if they picked another from token after they swapped they would need to do this again.
  // You have to send and sign the transaction from within your dApp. Remember when they do not have enough allowance it will mean doing 2 transaction,
  // 1 to allow uniswap to move tokens on their behalf then the next one to actually execute the trade.
  // On `eth` > `erc20` the `approvalTransaction` will always be undefined as you only need to do this when moving `erc20 > eth` and `erc20 > erc20`.
  if (trade.approvalTransaction) {
    const signedTransaction = await web3.eth.accounts.signTransaction(
      trade.approvalTransaction,
      YOUR_PRIVATE_KEY
    );

    if (!signedTransaction.rawTransaction) {
      throw new Error('Could not find tx');
    }

    web3.eth
      .sendSignedTransaction(signedTransaction.rawTransaction)
      .once('transactionHash', (transactionHash) => {
        console.log('approved txHash', transactionHash);
      })
      .once('receipt', async (receipt) => {
        console.log('approved receipt', receipt);
        await executeTrade(web3, trade);
      })
      .on('error', async (error: any) => {
        console.log(`ERROR ${error.message}`);
      });
  } else {
    console.log(
      'already has approved uniswap to move tokens on your behalf or its eth > erc20 token swap'
    );
    await executeTrade(web3, trade);
  }
};

const executeTrade = async (web3: Web3, trade: TradeContext) => {
  const signedTransaction = await web3.eth.accounts.signTransaction(
    trade.transaction,
    YOUR_PRIVATE_KEY
  );

  if (!signedTransaction.rawTransaction) {
    throw new Error('Could not find tx');
  }

  web3.eth
    .sendSignedTransaction(signedTransaction.rawTransaction)
    .once('transactionHash', (transactionHash) => {
      console.log('trade txHash', transactionHash);
    })
    .once('receipt', (receipt) => {
      console.log('trade receipt', receipt);
      // once done with trade aka they have sent it and you don't need it anymore call
      trade.destroy();
    })
    .on('error', async (error: any) => {
      console.log(`ERROR ${error.message}`);
    });
};

web3TradeExample();
```

#### ERC20 > ERC20 Output example

```ts
import { UniswapPair, ChainId, TradeContext } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  // if you want to ever swap native erc20 WETH then import WETH
  // from the simple-uniswap-sdk then use the correct network yours on object
  // so if i was on mainnet i would use WETH.MAINNET().contractAddress
  fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');

// subscribe to quote changes
trade.quoteChanged$.subscribe((value: TradeContext) => {
  // value will hold the same info as below but obviously with
  // the new trade info.
});

console.log(trade);
{
  uniswapVersion: 'v3',
  quoteDirection: 'input'
  baseConvertRequest: '10',
  minAmountConvertQuote: '0.014400465273974444',
  maximumSent: null,
  expectedConvertQuote: '0.014730394044348867',
  liquidityProviderFee: '0.030000000000000000',
  liquidityProviderFeePercent: 0.003,
  tradeExpires: 1612189240,
  routePathTokenMap: [
     {
       chainId: 1,
       contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
       decimals: 8,
       symbol: 'FUN',
       name: 'FunFair'
     },
     {
       chainId: 1,
       contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
       decimals: 18,
       symbol: 'DAI',
       name: 'Dai Stablecoin'
     },
     {
       chainId: 1,
       contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
       decimals: 18,
       symbol: 'WETH',
       name: 'Wrapped Ether'
     },
     {
       chainId: 1,
       contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
       decimals: 18,
       symbol: 'REP',
       name: 'Reputation'
     }
   ],
  routeText: 'FUN > DAI > WETH > REP',
  routePath:['0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2','0x1985365e9f78359a9B6AD760e32412f4a445E862' ],
  allTriedRoutesQuotes: [
      {
        expectedConvertQuote: '0.014730394044348867',
        routePathArrayTokenMap: [
          {
            chainId: 1,
            contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            symbol: FUN,
            decimals: 8,
            name: 'FunFair',
          },
          {
            chainId: 1,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
          {
            chainId: 1,
            contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
            symbol: 'REP',
            decimals: 18,
            name: 'Reputation',
          },
        ],
        routeText: 'FUN > WETH > REP',
        routePathArray: [
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          '0x1985365e9f78359a9B6AD760e32412f4a445E862',
        ],
        uniswapVersion: 'v2',
        liquidityProviderFee: 0.003
      },
      {
        expectedConvertQuote: '0.014606303273323544',
        routePathArrayTokenMap: [
          {
            chainId: 1,
            contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            symbol: 'FUN',
            decimals: 8,
            name: 'FunFair',
          },
          {
            chainId: 1,
            contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            decimals: 18,
            symbol: 'DAI',
            name: 'Dai Stablecoin',
          },
          {
            chainId: 1,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
          {
            chainId: 1,
            contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
            symbol: 'REP',
            decimals: 18,
            name: 'Reputation',
          },
        ],
        routeText: 'FUN > DAI > WETH > REP',
        routePathArray: [
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          '0x1985365e9f78359a9B6AD760e32412f4a445E862',
        ],
        uniswapVersion: 'v3',
        liquidityProviderFee: 0.0005
      },
      {
        expectedConvertQuote: '0.013997397994408657',
        routePathArrayTokenMap: [
          {
            chainId: 1,
            contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            symbol: 'FUN',
            decimals: 8,
            name: 'FunFair',
          },
          {
            chainId: 1,
            contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 18,
            symbol: 'USDC',
            name: 'USD Coin',
          },
          {
            chainId: 1,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
          {
            chainId: 1,
            contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
            symbol: 'REP',
            decimals: 18,
            name: 'Reputation',
          },
        ],
        routeText: 'FUN > USDC > WETH > REP',
        routePathArray: [
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          '0x1985365e9f78359a9B6AD760e32412f4a445E862',
        ],
        uniswapVersion: 'v3',
        liquidityProviderFee: 0.0005
      },
      {
        expectedConvertQuote: '0.000000298264906505',
        routePathArrayTokenMap: [
          {
            chainId: 1,
            contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            symbol: 'FUN',
            decimals: 8,
            name: 'FunFair',
          },
          {
            chainId: 1,
            contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 18,
            symbol: 'USDT',
            name: 'Tether USD',
          },
          {
            chainId: 1,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: 'WETH',
            name: 'Wrapped Ether',
          },
          {
            chainId: 1,
            contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
            symbol: 'REP',
            decimals: 18,
            name: 'Reputation',
          },
        ],
        routeText: 'FUN > USDT > WETH > REP',
        routePathArray: [
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          '0x1985365e9f78359a9B6AD760e32412f4a445E862',
        ],
        uniswapVersion: 'v3',
        liquidityProviderFee: 0.0005
      },
  ],
  hasEnoughAllowance: true,
  approvalTransaction: undefined,
  toToken: {
    chainId: 1,
    contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    decimals: 18,
    symbol: 'REP',
    name: 'Reputation'
  },
  toBalance: '1500.2632',
  fromToken: {
    chainId: 1,
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    decimals: 8,
    symbol: 'FUN',
    name: 'FunFair'
  },
  fromBalance: {
    hasEnough: true,
    balance: "3317.73129463"
  },
  transaction: {
    to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    from: "0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9",
    data:"0x38ed1739000000000000000000000000000000000000000000000000000000003b9aca0000000000000000000000000000000000000000000000000000359578d85cf61000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd900000000000000000000000000000000000000000000000000000000601683e30000000000000000000000000000000000000000000000000000000000000003000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001985365e9f78359a9b6ad760e32412f4a445e862",
    value: "0x00"
  }
}

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();
```

#### ETH > ERC20 Output example

```ts
import { UniswapPair, ETH, ChainId, TradeContext } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // use the ETH import from the lib, bare in mind you should use the
  // network which yours on, so if your on rinkeby you should use
  // ETH.RINKEBY
  fromTokenContractAddress: ETH.MAINNET().contractAddress,
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10 and
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');


// subscribe to quote changes
trade.quoteChanged$.subscribe((value: TradeContext) => {
  // value will hold the same info as below but obviously with
  // the new trade info.
});

console.log(trade);
{
  uniswapVersion: 'v3',
  quoteDirection: 'input',
  baseConvertRequest: '10',
  minAmountConvertQuote: '446878.20758208',
  maximumSent: null,
  expectedConvertQuote: '449123.82671566',
  liquidityProviderFee: '0.030000000000000000',
  liquidityProviderFeePercent: 0.003,
  tradeExpires: 1612189240,
  routePathTokenMap: [
    {
      chainId: 1,
      contractAddress: 'NO_CONTRACT_ADDRESS',
      symbol: 'ETH',
      decimals: 18,
      name: 'Ethers'
    },
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      symbol: 'FUN',
      decimals: 8,
      name: 'FunFair',
    },
  ],
  routeText: 'ETH > FUN',
  routePath: [
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  ],
  hasEnoughAllowance: true,
  approvalTransaction: undefined,
  toToken: {
    chainId: 1,
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    symbol: 'FUN',
    decimals: 8,
    name: 'FunFair',
  },
  toBalance: '1500.2634',
  fromToken: {
    chainId: 1,
    contractAddress: 'NO_CONTRACT_ADDRESS',
    symbol: 'ETH',
    decimals: 18,
    name: 'Ethers'
  },
  fromBalance: {
    hasEnough: false,
    balance: '0.008474677789598637',
  },
  transaction: {
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
    data:
      '0x7ff36ab5000000000000000000000000000000000000000000000000000028a4b1ae9cc00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd90000000000000000000000000000000000000000000000000000000060168ee30000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b',
    value: '0x8ac7230489e80000',
  },
  allTriedRoutesQuotes: [
    {
      expectedConvertQuote: '449123.82671566',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v2',
      liquidityProviderFee: 0.003
    },
    {
      expectedConvertQuote: '446400.4834047',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '446400.4834047',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '446356.68778218',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '446356.68778218',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '446345.24608428',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '446345.24608428',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '347402.73288796',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '346246.52439964',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '346246.52439964',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '346246.52439964',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '345845.48248206',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '345845.48248206',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '345845.48248206',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153353.27776886',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153171.51955671',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153171.51955671',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153171.51955671',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153099.84287111',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153099.84287111',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '153099.84287111',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '10090.42827381',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '10090.42827381',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > DAI > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '176.25846115',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '176.25846115',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > USDC > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > DAI > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > COMP > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00167195',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: 'NO_CONTRACT_ADDRESS',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers'
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
      ],
      routeText: 'ETH > USDC > USDT > FUN',
      routePathArray: [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
  ],
}

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();

```

#### ERC20 > ETH Output example

```ts
import { UniswapPair, ETH, ChainId, TradeContext } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // use the ETH import from the lib, bare in mind you should use the
  // network which yours on, so if your on rinkeby you should use
  // ETH.RINKEBY
  toTokenContractAddress: ETH.MAINNET().contractAddress,
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');

// subscribe to quote changes
trade.quoteChanged$.subscribe((value: TradeContext) => {
  // value will hold the same info as below but obviously with
  // the new trade info.
});

console.log(trade);
{
  uniswapVersion: 'v3',
  quoteDirection: 'input',
  baseConvertRequest: '10',
  minAmountConvertQuote: '0.00022040807282109',
  maximumSent: null,
  expectedConvertQuote: '0.00022151807282109',
  liquidityProviderFee: '0.03000000',
  liquidityProviderFeePercent: 0.003,
  tradeExpires: 1612189240,
  routePathTokenMap: [
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      symbol: 'FUN',
      decimals: 8,
      name: 'FunFair',
    },
    {
      chainId: 1,
      contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      symbol: 'DAI',
      name: 'Dai Stablecoin',
    },
    {
      chainId: 1,
      contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    },
    {
      chainId: 1,
      contractAddress: 'NO_CONTRACT_ADDRESS',
      symbol: 'ETH',
      decimals: 18,
      name: 'Ethers'
    },
  ],
  routeText: 'FUN > DAI > COMP > ETH',
  routePath: [
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ],
  allTriedRoutesQuotes: [
    {
      expectedConvertQuote: '0.00022151807282109',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v2',
      liquidityProviderFee: 0.003
    },
    {
      expectedConvertQuote: '0.00022151807282109',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000217400884509221',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216692105524981',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216165414503092',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216165414503092',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216165414503092',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216113740987982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216113740987982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000216113740987982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > DAI > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000207416610491746',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206879660311982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206879660311982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206879660311982',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206675889551395',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206675889551395',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000206675889551395',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000201332888879835',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000201332888879835',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDC > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00000000454541448',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.00000000454541448',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          decimals: 18,
          symbol: 'COMP',
          name: 'Compound',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > COMP > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000004421040886',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000004406314787',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000004406314787',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000004406314787',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          decimals: 18,
          symbol: 'DAI',
          name: 'Dai Stablecoin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > DAI > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000003689610342',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000003689610342',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
    {
      expectedConvertQuote: '0.000000003689610342',
      routePathArrayTokenMap: [
        {
          chainId: 1,
          contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          symbol: 'FUN',
          decimals: 8,
          name: 'FunFair',
        },
        {
          chainId: 1,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          decimals: 18,
          symbol: 'USDT',
          name: 'Tether USD',
        },
        {
          chainId: 1,
          contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          decimals: 18,
          symbol: 'USDC',
          name: 'USD Coin',
        },
        {
          chainId: 1,
          contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          symbol: 'ETH',
          decimals: 18,
          name: 'Ethers',
        },
      ],
      routeText: 'FUN > USDT > USDC > ETH',
      routePathArray: [
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      ],
      uniswapVersion: 'v3',
      liquidityProviderFee: 0.0005
    },
  ],
  hasEnoughAllowance: true,
  approvalTransaction: undefined,
  toToken: {
    chainId: 1,
    contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'ETH',
    decimals: 18,
    name: 'Ethers',
  },
  toBalance: '1.564',
  fromToken: {
    chainId: 1,
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    symbol: 'FUN',
    decimals: 8,
    name: 'FunFair',
  },
  fromBalance: {
    hasEnough: true,
    balance: '3317.73129463',
  },
  transaction: {
    to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
    data:
      '0x18cbafe5000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000c875c0e2d96200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd90000000000000000000000000000000000000000000000000000000060168fe80000000000000000000000000000000000000000000000000000000000000004000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000c00e94cb662c3520282e6f5717214004a7f26888000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    value: '0x00',
  },
}

// once done with trade aka they have sent it and you don't need it anymore call
trade.destroy();
```

### toToken

This exposes the to token contract information, like decimals, symbol and name.

```ts
get toToken(): Token
```

```ts
export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}
```

#### Usage

```ts
import { UniswapPair, ChainId } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const toToken = uniswapPairFactory.toToken;
console.log(toToken);
// toToken:
{
  chainId: 1,
  contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  decimals: 18,
  symbol: 'REP',
  name: 'Reputation'
}
```

### fromToken

This exposes the from token contract information, like decimals, symbol and name.

```ts
get fromToken(): Token
```

```ts
export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}
```

#### Usage

```ts
import { UniswapPair, ChainId } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const fromToken = uniswapPairFactory.fromToken;
console.log(fromToken);
// fromToken:
{
  chainId: 1,
  contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  decimals: 8,
  symbol: 'FUN',
  name: 'FunFair'
}
```

### providerUrl

This exposes the provider url it is using will be undefined if you injected a ethereum provider

```ts
get providerUrl(): string | undefined
```

#### Usage

```ts
import { UniswapPair, ChainId } from 'simple-uniswap-sdk';

const uniswapPair = new UniswapPair({
  // the contract address of the token you want to convert FROM
  fromTokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  // the contract address of the token you want to convert TO
  toTokenContractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
  // the ethereum address of the user using this part of the dApp
  ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
  // OR if you want to inject your own ethereum provider (no need for chainId if so)
  // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
  chainId: ChainId.MAINNET,
});

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const providerUrl = uniswapPairFactory.providerUrl;
console.log(providerUrl);
// https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
```

## TokenFactoryPublic

Along side the above we also have exposed some helpful erc20 token calls.

### getToken

This method will return you the token information like decimals, name etc.

```ts
async getToken(): Promise<Token>
```

```ts
export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}
```

#### Usage

```ts
import { TokenFactoryPublic, ChainId } from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(
  toTokenContractAddress,
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

const token = await tokenFactoryPublic.getToken();
console.log(token);
{
  chainId: 1,
  contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  decimals: 8,
  symbol: 'FUN',
  name: 'FunFair',
},
```

### allowance

This method will return the allowance the user has allowed to be able to be moved on his behalf. Uniswap needs this allowance to be higher then the amount swapping for it to be able to move the tokens for the user. This is always returned as a hex and not formatted for you.

```ts
async allowance(uniswapVersion: UniswapVersion, ethereumAddress: string): Promise<string>
```

#### Usage

```ts
import {
  TokenFactoryPublic,
  ChainId,
  UniswapVersion,
} from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(
  toTokenContractAddress,
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

const allowance = await tokenFactoryPublic.allowance(
  UniswapVersion.v3,
  ethereumAddress
);
console.log(allowance);
// '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
```

### balanceOf

This method will return the balance this user holds of this token. This always returned as a hex and not formatted for you.

```ts
async balanceOf(ethereumAddress: string): Promise<string>
```

#### Usage

```ts
import { TokenFactoryPublic, ChainId } from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(
  toTokenContractAddress,
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

const balanceOf = await tokenFactoryPublic.balanceOf(ethereumAddress);
console.log(balanceOf);
// '0x00';
```

### totalSupply

This method will return the total supply of tokens which exist. This always returned as a hex.

```ts
async totalSupply(): Promise<string>
```

#### Usage

```ts
import { TokenFactoryPublic, ChainId } from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(toTokenContractAddress, {
  chainId: ChainId.MAINNET,
  // you can pass in the provider url as well if you want
  // providerUrl: YOUR_PROVIDER_URL,
});

const totalSupply = await tokenFactoryPublic.totalSupply();
console.log(totalSupply);
// '0x09195731e2ce35eb000000';
```

### generateApproveAllowanceData

This method will generate the data for the approval of being able to move tokens for the user. You have to send the transaction yourself, this only generates the data for you to send.

```ts
generateApproveAllowanceData(spender: string, value: string): string
```

#### Usage

```ts
import { TokenFactoryPublic, ChainId } from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(
  tokenContractAddress,
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

// the contract address for which you are allowing to move tokens on your behalf
const spender = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

// the amount you wish to allow them to move, this example just uses the max
// hex. If not each time they do a operation which needs to move tokens then
// it will cost them 2 transactions, 1 to approve the allowance then 1 to actually
// do the contract call to move the tokens.
const value =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const data = tokenFactoryPublic.generateApproveAllowanceData(spender, value);
console.log(data);
// '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
```

### getAllowanceAndBalanceOf

This method will get the allowance and balance for the token in a multicall request. Will return as hex and NOT formatted for you.

```ts
async getAllowanceAndBalanceOf(uniswapVersion: UniswapVersion, ethereumAddress: string): Promise<AllowanceAndBalanceOf>
```

```ts
export interface AllowanceAndBalanceOf {
  allowance: string;
  balanceOf: string;
}
```

#### Usage

```ts
import { TokenFactoryPublic, ChainId, UniswapVersion } from 'simple-uniswap-sdk';

const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

const tokenFactoryPublic = new TokenFactoryPublic(
  tokenContractAddress,
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

const result = await tokenFactoryPublic.getAllowanceAndBalanceOf(
  UniswapVersion.v3,
  ethereumAddress
);
console.log(result);
{
  allowance: '0x2386f01852b720',
  balanceOf: '0x4d3f3832f7'
}
```

## TokensFactoryPublic

Along side the `TokenFactoryPublic` we also have exposed a way to call many contracts at once, this uses `multicall` so its super fast.

### getTokens

This method will return you the tokens information like decimals, name etc.

```ts
async getTokens(tokenContractAddresses: string[]): Promise<Token[]>
```

```ts
export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}
```

#### Usage

```ts
import { TokensFactoryPublic, ChainId } from 'simple-uniswap-sdk';

const tokensFactoryPublic = new TokensFactoryPublic(
  // this can take the same interface as pair context aka
  // `ChainIdAndProvider` | `EthereumProvider`
  // so you can pass in a providerUrl or a ethereumProvider
  { chainId: ChainId.MAINNET }
);

const tokens = await tokensFactoryPublic.getTokens([
  '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
  '0x1985365e9f78359a9B6AD760e32412f4a445E862',
]);
console.log(tokens);
[
  {
    chainId: 1,
    contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    symbol: 'REP',
    decimals: 18,
    name: 'Reputation',
  },
  {
    chainId: 1,
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    symbol: 'FUN',
    decimals: 8,
    name: 'FunFair',
  },
];
```

## Tests

The whole repo is covered in tests output below:

```
Test Suites: 25 passed, 25 total
Tests:       5 skipped, 234 passed, 239 total
Snapshots:   0 total
Time:        33.238s
Ran all test suites.
```

## Issues

Please raise any issues in the below link.

https://github.com/joshstevens19/uniswap-sdk/issues

## Thanks And Support

This package is brought to you by [Josh Stevens](https://github.com/joshstevens19). My aim is to be able to keep creating these awesome packages to help the Ethereum space grow with easier-to-use tools to allow the learning curve to get involved with blockchain development easier and making Ethereum ecosystem better. If you want to help with that vision and allow me to invest more time into creating cool packages or if this package has saved you a lot of development time donations are welcome, every little helps. By donating, you are supporting me to be able to maintain existing packages, extend existing packages (as Ethereum matures), and allowing me to build more packages for Ethereum due to being able to invest more time into it. Thanks, everyone!

## Direct donations

Direct donations any token accepted - Eth address > `0x699c2daD091ffcF18f3cd9E8495929CA3a64dFe1`

## Github sponsors

[sponsor me](https://github.com/sponsors/joshstevens19) via github using fiat money
