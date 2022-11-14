import { TradeContext } from './../factories/pair/models/trade-context';
import { providers } from 'ethers'
import { Networkish } from '@ethersproject/networks';
import { TokensFactoryPublic } from './../factories/token/tokens.factory.public';
import { TokenWithAllowanceInfo } from './../factories/token/models/token-with-allowance-info';
import { ChainId } from '../enums/chain-id';
import { UniswapVersion } from '../enums/uniswap-version';
import { UniswapPairSettings } from '../factories/pair/models/uniswap-pair-settings';
import { UniswapPair } from '../factories/pair/uniswap-pair';
import { ETH, EthersProvider, TradeDirection } from '../index';

// WBTC - 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
// FUN - 0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b
// REP - 0x1985365e9f78359a9B6AD760e32412f4a445E862
// WETH - 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
// UNI - 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// AAVE - 0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9
// GTC - 0xde30da39c46104798bb5aa3fe8b9e0e1f348163f

const routeTest = async () => {
  const fromTokenContractAddress = ETH.MAINNET().contractAddress; //'0xEf0e839Cf88E47be676E72D5a9cB6CED99FaD1CF';
  const toTokenContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'; // 0x1985365e9f78359a9B6AD760e32412f4a445E862
  const ethereumAddress = '0x37c81284caA97131339415687d192BF7D18F0f2a';

  const uniswapPair = new UniswapPair({
    fromTokenContractAddress,
    toTokenContractAddress,
    ethereumAddress,
    chainId: ChainId.MAINNET,
    settings: new UniswapPairSettings({
      // if not supplied it use `0.005` which is 0.5%;
      // all figures
      slippage: 0.005,
      // if not supplied it will use 20 a deadline minutes
      deadlineMinutes: 20,
      disableMultihops: false,
      disableObserver: false,
      uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
      gasSettings: {
        getGasPrice: async () => '90',
      },
    }),
  });

  // const startTime = new Date().getTime();

  const uniswapPairFactory = await uniswapPair.createFactory();

  const trade = await uniswapPairFactory.trade('0.0001', TradeDirection.input);

  // console.log(new Date().getTime() - startTime);
  // console.log(trade);

  // console.log(JSON.stringify(trade, null, 4));
  // console.log(trade);
  // console.log(
  //   trade.allTriedRoutesQuotes.filter(
  //     (c) => c.uniswapVersion === UniswapVersion.v3
  //   )
  // );

  const ethers = new EthersProvider({ chainId: ChainId.MAINNET });
  await ethers.provider.estimateGas(trade.transaction);
  // console.log(
  //   'gas',
  //   (await ethers.provider.estimateGas(trade.transaction)).toHexString()
  // );

  // process.stdin.resume();

  // console.log(JSON.stringify(trade));

  // const data = await uniswapPairFactory.generateApproveMaxAllowanceData();
  // console.log(data);

  // const toToken = uniswapPairFactory.toToken;
  // console.log(toToken);

  // const fromToken = uniswapPairFactory.fromToken;
  // console.log(fromToken);

  // const tokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';

  // const tokenFactoryPublic = new TokenFactoryPublic(
  //   fromTokenContractAddress,
  //   ChainId.MAINNET
  // );

  // console.log(
  //   await tokenFactoryPublic.getAllowanceAndBalanceOf(ethereumAddress)
  // );

  // // the contract address for which you are allowing to move tokens on your behalf
  // const spender = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  // // the amount you wish to allow them to move, this example just uses the max
  // // hex. If not each time they do a operation which needs to move tokens then
  // // it will cost them 2 transactions, 1 to approve the allowance then 1 to actually
  // // do the contract call to move the tokens.
  // const value =
  //   '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  // const data = tokenFactoryPublic.generateApproveAllowanceData(spender, value);
  // console.log(data);
};

const manualObserverTest = async () => {
  const { provider } = new EthersProvider({chainId: ChainId.MAINNET})

  const fromTokenContractAddress = ETH.MAINNET().contractAddress;
  const toTokenContractAddress = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'; // AAVE
  const ethereumAddress = '0x37c81284caA97131339415687d192BF7D18F0f2a';

  const settings = new UniswapPairSettings({
    // if not supplied it use `0.005` which is 0.5%;
    // all figures
    slippage: 0.005,
    // if not supplied it will use 20 a deadline minutes
    deadlineMinutes: 20,
    disableMultihops: false,
    // Prevent the built-in requoting
    disableObserver: true,
    uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
    gasSettings: {
      getGasPrice: async () => '90',
    },
  });

  const uniswapPair = new UniswapPair({
    ethereumProvider: provider,
    fromTokenContractAddress,
    toTokenContractAddress,
    ethereumAddress,
    settings
  });

  const uniswapPairFactory = await uniswapPair.createFactory();
  const trade = await uniswapPairFactory.trade('1', TradeDirection.input);

  console.log(`Quote: ${trade.expectedConvertQuote} ${trade.toToken.symbol}`);

  // Listen for changes in our quote
  trade.quoteChanged$.subscribe((value: TradeContext) => {
    console.log(`Quote changed: ${value.expectedConvertQuote} ${value.toToken.symbol}`);
  });

  // Manually requote for the newest prices
  provider.on(
    'block',
    async () => {
      console.log('Requoting...');
      await uniswapPairFactory.requote();
    }
  );
};

const customNetworkBalancesTest = async () => {
  const ethereumAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
  const chainId: Networkish = 941
  const provider = new providers.JsonRpcProvider('https://rpc.v2b.testnet.pulsechain.com',
    chainId
  )

  const tokensFactoryPublic = new TokensFactoryPublic({
    ethereumProvider: provider,
    customNetwork: {
      nameNetwork: 'PulseChain Testnet',
      multicallContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
      nativeCurrency: {
        name: 'Pulse',
        symbol: 'tPLS',
      },
      nativeWrappedTokenInfo: {
        chainId,
        contractAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
        decimals: 18,
        symbol: 'WPLS',
        name: 'Wrapped Pulse (PLS)',
      },
    },
  })

  let balances: TokenWithAllowanceInfo[] = []
  const formatBalances = true

  try {
    balances =
      await tokensFactoryPublic.getAllowanceAndBalanceOfForContracts(
        ethereumAddress,
        ['0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39', '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', '0xdac17f958d2ee523a2206206994597c13d831ec7'],
        formatBalances
      )
  } catch (err) {
    console.log(err)
    balances = []
  }

  console.log(balances);
}

if (false) routeTest();
if (true) manualObserverTest();
if (false) customNetworkBalancesTest();
