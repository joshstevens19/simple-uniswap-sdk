# uniswap-sdk

Uniswap SDK which handles the routes, best prices and all the uniswap logic for you in a simple to easy understand interface.

# Motivation

As a ethereum dApp developer you try to get your dApp experience as integrated as possible, Ethereum right now is hard to show in a web2.0 world. On top of this as a developer you have to learn all the complex stuff for the blockchain. When I was integrating uniswap on our wallet I found the their `SDK` to be a bit too much for what I needed. I also found myself having to write a lot of custom code which I thought could be abstracted away so nobody has to deal with that again. `Uniswap` is one of the best projects on ethereum at the moment and my motivation here is to great a library which allows more people to integrate it on their dApp making the whole user experience better. Also growing the usage of it.

# Installing

NEED TO PUBLISH NPM PACKAGE

# SDK guide

## Creating a uniswap pair factory

The uniswap pair factory is an instance which is joint together with the `from` token and the `to` token, it is all self contained in the instance and exposes easy methods for you to call to start using uniswap.

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();
```

## Uniswap pair factory

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
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

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
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

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

### Trade

This will generate you the trade with all the information you need to show to the user on the dApp. It will find the best route price for you automatically. You will still need to send the transaction if they confirm, this will just generate you the `data` for the transaction, which you will need to get them to sign on the dApp.

It will throw an error if you try to do a trade but the allowance approved for to move tokens is below the amount sending. The error message will say this. We advise you check the allowance before you execute this trade which you should do anyway. You can use our allowance method below to check.

```ts
async trade(amount: string): Promise<PriceContext>
```

```ts
export interface PriceContext {
  // the amount you requested to convert
  // this will be formatted in readable number
  // so you can render straight out the box
  baseConvertRequest: string;
  // the min amount you will receive
  // if the price changes below that then
  // the uniswap contract will throw
  // this will be formatted in readable number
  // so you can render straight out the box
  minAmountConvertQuote: string;
  // the expected amount you will receive
  // this will be formatted in readable number
  // so you can render straight out the box
  expectedConvertQuote: string;
  // the route path mapped with full token info
  routePathTokenMap: Token[];
  // the route text so you can display it on the dApp easily
  routeText: string;
  // the pure route path, only had the arrays in nothing else
  routePath: string[];
  // the generated data for this which if they accept you have tp
  // have in your transaction data when you send it
  data: string;
}
```

#### Usage

#### ERC20 > ERC20

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10 or the hex of 10 and
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');
console.log(trade);
{
  baseConvertRequest: '10',
  minAmountConvertQuote: '0.014400465273974444',
  expectedConvertQuote: '0.014472825273974444',
  routePathTokenMap:
   [ { chainId: 1,
       contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
       decimals: 8,
       symbol: 'FUN',
       name: 'FunFair' },
     { chainId: 1,
       contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
       decimals: 18,
       symbol: 'DAI',
       name: 'Wrapped Ether' },
     { chainId: 1,
       contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
       decimals: 18,
       symbol: 'WETH',
       name: 'Wrapped Ether' },
     { chainId: 1,
       contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
       decimals: 18,
       symbol: 'REP',
       name: 'Reputation' } ],
  routeText: 'FUN > DAI > WETH > REP',
  routePath:['0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', '0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2','0x1985365e9f78359a9B6AD760e32412f4a445E862' ],
  data:'0x38ed1739000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000033292599416eac00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd900000000000000000000000000000000000000000000000000000000601440cd0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001985365e9f78359a9b6ad760e32412f4a445e862'
}
```

#### ETH > ERC20

```ts
import { UniswapPair, WETH } from 'uniswap-sdk';

// use the WETH import from the lib, bare in mind you should use the
// network which yours on, so if your on rinkeby you should use
// WETH.RINKEBY
const fromTokenContractAddress = WETH.MAINNET().contractAddress;
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10 or the hex of 10 and
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');
console.log(trade);
{
  baseConvertRequest: '10',
  minAmountConvertQuote: '446.575481378746866504',
  expectedConvertQuote: '448.819579275122478898',
  routePathTokenMap:
   [ { chainId: 1,
       contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
       decimals: 18,
       symbol: 'WETH',
       name: 'Wrapped Ether' },
     { chainId: 1,
       contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
       decimals: 18,
       symbol: 'REP',
       name: 'Reputation' } ],
  routeText: 'WETH > REP',
  routePath:['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2','0x1985365e9f78359a9B6AD760e32412f4a445E862' ],
  data:
   '0x7ff36ab5000000000000000000000000000000000000000000000018357ad24173471b480000000000000000000000000000000000000000000000000000000000000080000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd900000000000000000000000000000000000000000000000000000000601446b60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001985365e9f78359a9b6ad760e32412f4a445e862'
}
```

#### ERC20 > ETH

```ts
import { UniswapPair, WETH } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b'
// use the WETH import from the lib, bare in mind you should use the
// network which yours on, so if your on rinkeby you should use
// WETH.RINKEBY
const toTokenContractAddress = WETH.MAINNET().contractAddress
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  fromTokenContractAddress,
  toTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// the amount is the proper entered amount
// so if they enter 10 pass in 10 or the hex of 10 and
// it will work it all out for you
const trade = await uniswapPairFactory.trade('10');
console.log(trade);
{
  baseConvertRequest: '10',
  minAmountConvertQuote: '0.000210298899917128',
  expectedConvertQuote: '0.000211358899917128',
  routePathTokenMap:
   [ { chainId: 1,
       contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
       decimals: 8,
       symbol: 'FUN',
       name: 'FunFair' },
     { chainId: 1,
       contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
       decimals: 18,
       symbol: 'WETH',
       name: 'Wrapped Ether' } ],
  routeText: 'FUN > WETH',
  routePath: ['0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
  data:
   '0x18cbafe5000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000bf440739e94800000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000b1e6079212888f0be0cf55874b2eb9d7a5e02cd9000000000000000000000000000000000000000000000000000000006014474f0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
}
```

### hasGotEnoughAllowance

This method will return true or false if the user has enough allowance to move the tokens. If you call this when doing `eth` > `erc20` it will always return true as you only need to check this when moving erc20 > eth and erc20 > erc20.

```ts
async hasGotEnoughAllowance(amount: string): Promise<boolean>
```

#### Usage

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const hasGotEnoughAllowance = await uniswapPairFactory.hasGotEnoughAllowance(
  '10'
);
console.log(hasGotEnoughAllowance);
true;
```

### allowance

This method will return the allowance the user has to move tokens from the from token they have picked. This is always returned as a hex. If you call this when doing `eth` > `erc20` it will always return the max hex as you only need to check this when moving erc20 > eth and erc20 > erc20.

```ts
async allowance(): Promise<boolean>
```

#### Usage

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const allowance = await uniswapPairFactory.allowance();
console.log(allowance);
// '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
```

### generateApproveUniswapAllowanceData

This method will generate the data for the approval of moving tokens for the user. This uses the max hex possible which means they will not have to do this again if they want to move later. You have to send the transaction yourself, this only generates the data for you to send. Remember when they do not have enough allowance it will meaning doing 2 transaction, 1 to extend the allowance using this data then the next one to actually execute the trade. If you call this when doing `eth` > `erc20` it will always throw an error as you only need to check this when moving erc20 > eth and erc20 > erc20.

```ts
generateApproveUniswapAllowanceData(): string
```

#### Usage

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const data = uniswapPairFactory.generateApproveUniswapAllowanceData();
console.log(data);
// '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
```

### findBestRoute

This method will return you the best route for the amount you want to trade.

```ts
async findBestRoute(amountToTrade: string): Promise<RouteQuote>
```

#### Usage

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const bestRoute = await uniswapPairFactory.findBestRoute('10');
console.log(bestRoute);
{
  // sort this convert quote out
  convertQuote: BigNumber { s: 1, e: -2, c: [ 1562073588233, 96260000000000 ] },
  routePathArrayTokenMap: [
      { chainId: 1,
       contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
       decimals: 8,
       symbol: 'FUN',
       name: 'FunFair' },
     { chainId: 1,
       contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
       decimals: 18,
       symbol: 'WETH',
       name: 'Wrapped Ether' },
     { chainId: 1,
       contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
       decimals: 18,
       symbol: 'REP',
       name: 'Reputation' } ],
  routeText: 'FUN > WETH > REP',
  routePathArray: ['0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' '0x1985365e9f78359a9B6AD760e32412f4a445E862']
}
```

### findAllPossibleRoutes

This method will return you all the possible routes with quotes ordered by the best quote first (index 0).

```ts
async findAllPossibleRoutesWithQuote(amountToTrade: string): Promise<RouteQuote[]>
```

#### Usage

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const bestRoute = await uniswapPairFactory.findAllPossibleRoutesWithQuote('10');
console.log(bestRoute);
[
  {
    convertQuote: BigNumber { s: 1, e: -2, c: [ 1562073588233, 96260000000000 ] },
    routePathArrayTokenMap: [
      {
        chainId: 1,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        decimals: 8,
        symbol: 'FUN',
        name: 'FunFair',
      },
      {
        chainId: 1,
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18,
        symbol: 'DAI',
        name: 'Wrapped Ether',
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
        decimals: 18,
        symbol: 'REP',
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
  },
  {
    convertQuote: BigNumber { s: 1, e: -2, c: [ 1562073588233, 96260000000000 ] },
    routePathArrayTokenMap: [
      {
        chainId: 1,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        decimals: 8,
        symbol: 'FUN',
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
        decimals: 18,
        symbol: 'REP',
        name: 'Reputation',
      },
    ],
    routeText: 'FUN > WETH > REP',
    routePathArray: [
      '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    ],
  },
  {
    convertQuote: BigNumber { s: 1, e: -2, c: [ 1562073588233, 96260000000000 ] },
    routePathArrayTokenMap: [
      {
        chainId: 1,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        decimals: 8,
        symbol: 'FUN',
        name: 'FunFair',
      },
      {
        chainId: 1,
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        decimals: 18,
        symbol: 'USDC',
        name: 'Wrapped Ether',
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
        decimals: 18,
        symbol: 'REP',
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
  },
  {
    convertQuote: BigNumber { s: 1, e: -2, c: [ 1562073588233, 96260000000000 ] },
    routePathArrayTokenMap: [
      {
        chainId: 1,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        decimals: 8,
        symbol: 'FUN',
        name: 'FunFair',
      },
      {
        chainId: 1,
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 18,
        symbol: 'USDT',
        name: 'Wrapped Ether',
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
        decimals: 18,
        symbol: 'REP',
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
  },
];
```

### findAllPossibleRoutes

This method will return you the all the possible routes you can take when trading.

```ts
async findAllPossibleRoutes(): Promise<Token[][]>
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
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

const bestRoute = await uniswapPairFactory.findAllPossibleRoutes();
console.log(bestRoute);
[
  [
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      decimals: 8,
      symbol: 'FUN',
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
      decimals: 18,
      symbol: 'REP',
      name: 'Reputation',
    },
  ],
  [
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      decimals: 8,
      symbol: 'FUN',
      name: 'FunFair',
    },
    {
      chainId: 1,
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 18,
      symbol: 'USDT',
      name: 'Wrapped Ether',
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
      decimals: 18,
      symbol: 'REP',
      name: 'Reputation',
    },
  ],
  [
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      decimals: 8,
      symbol: 'FUN',
      name: 'FunFair',
    },
    {
      chainId: 1,
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 18,
      symbol: 'USDC',
      name: 'Wrapped Ether',
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
      decimals: 18,
      symbol: 'REP',
      name: 'Reputation',
    },
  ],
  [
    {
      chainId: 1,
      contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
      decimals: 8,
      symbol: 'FUN',
      name: 'FunFair',
    },
    {
      chainId: 1,
      contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      symbol: 'DAI',
      name: 'Wrapped Ether',
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
      decimals: 18,
      symbol: 'REP',
      name: 'Reputation',
    },
  ],
];
```

### Contract calls

Along side this we also expose in here the uniswap pair contract calls. Any methods which are state changing will return you the data and you will have to send it. Only use these if your doing any bespoke stuff with pairs. The `UniswapPairContractFactoryPublic` is also exposed in the package which you can pass it a chainId or a providerUrl

```ts
export interface UniswapPair {
  allPairs(
    parameter0: BigNumberish,
  ): Promise<string>;

  allPairsLength(): Promise<string>;

  // state changing
  createPair(
    tokenA: string,
    tokenB: string,
  ): Promise<string>;

  feeTo(): Promise<string>;

  feeToSetter(): Promise<string>;

  getPair(
    parameter0: string,
    parameter1: string,
  ): Promise<string>;

  // state changing
  setFeeTo(
    _feeTo: string,
  ): Promise<string>;

  // state changing
  setFeeToSetter(
    _feeToSetter: string,
  ): Promise<string>;
```

#### Usage

#### In UniswapPairFactory

```ts
import { UniswapPair } from 'uniswap-sdk';

// the contract address of the token you want to convert FROM
const fromTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
// the contract address of the token you want to convert TO
const toTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
// the ethereum address of the user using this part of the dApp
const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';
// your network ID or if you want to only supply your node you can here as well
// if you supply your providerUrl you do not need to supply the chain id.
const networkDetails: NetworkDetails = {
  id: ChainId.MAINNET,
  providerUrl: 'YOUR_PROVIDER_URL',
};

const uniswapPair = new UniswapPair(
  toTokenContractAddress,
  fromTokenContractAddress,
  ethereumAddress,
  networkDetails
);

// now to create the factory you just do
const uniswapPairFactory = await uniswapPair.createFactory();

// contract calls our here, this is only for the uniswap pair contract https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#code
uniswapPairFactory.contractCalls;
```

#### Using UniswapPairContractFactoryPublic on its own

// TODO

### TokenFactoryPublic

Along side the above we also have exposed some helpful token calls.

// TODO

### UniswapContractFactoryPublic

// TODO

### UniswapRouterContractFactoryPublic

// TODO

## Issues

Please raise any issues in the below link.

https://github.com/joshstevens19/uniswap-sdk/issues

## Thanks

This package is brought to you by [Josh Stevens](https://github.com/joshstevens19). My aim is to be able to keep creating these awesome packages to help the Ethereum space grow with easier-to-use tools to allow the learning curve to get involved with blockchain development easier and also making Ethereum ecosystem better. So if you want to help out with that vision and allow me to invest more time into creating cool packages please [sponsor me](https://github.com/sponsors/joshstevens19), every little helps. By sponsoring me, you're supporting me to be able to maintain existing packages, extend existing packages (as Ethereum matures), and allowing me to build more packages for Ethereum due to being able to invest more time into it. Thanks, everyone!
