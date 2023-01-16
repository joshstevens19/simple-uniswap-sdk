import { ChainId } from '../enums/chain-id';
import { UniswapVersion } from '../enums/uniswap-version';
import { UniswapPairSettings } from '../factories/pair/models/uniswap-pair-settings';
import { UniswapPair } from '../factories/pair/uniswap-pair';
import { TradeDirection } from '../index';

// WBTC - 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
// FUN - 0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b
// REP - 0x1985365e9f78359a9B6AD760e32412f4a445E862
// WETH - 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
// UNI - 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// AAVE - 0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9
// GTC - 0xde30da39c46104798bb5aa3fe8b9e0e1f348163f

const routeTest = async () => {
  const fromTokenContractAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'; //'0xEf0e839Cf88E47be676E72D5a9cB6CED99FaD1CF';
  const toTokenContractAddress = '0x51e48670098173025C477D9AA3f0efF7BF9f7812'; // 0x1985365e9f78359a9B6AD760e32412f4a445E862
  // const fromTokenContractAddress = '0x51e48670098173025C477D9AA3f0efF7BF9f7812'; //'0xEf0e839Cf88E47be676E72D5a9cB6CED99FaD1CF';
  // const toTokenContractAddress = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'; // 0x1985365e9f78359a9B6AD760e32412f4a445E862
  const ethereumAddress = '0x33D318915ec26930539DEf4d884D3246DA65E3f8';

  const uniswapPair = new UniswapPair({
    fromTokenContractAddress,
    toTokenContractAddress,
    ethereumAddress,
    chainId: ChainId.AVALANCHE,
    providerUrl: 'https://api.avax.network/ext/bc/C/rpc',
    settings: new UniswapPairSettings({
      // if not supplied it use `0.005` which is 0.5%;
      // all figures
      slippage: 0.005,
      // if not supplied it will use 20 a deadline minutes
      deadlineMinutes: 20,
      disableMultihops: false,
      uniswapVersions: [UniswapVersion.v2, UniswapVersion.v3],
      cloneUniswapContractDetails: [
        {
          v2Override:
            {
              description: 'Trader Joe',
              routerAddress: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
              factoryAddress: '0x9ad6c38be94206ca50bb0d90783181662f0cfa10',
              pairAddress: '0x9ad6c38be94206ca50bb0d90783181662f0cfa10',
              // routerAbi: TraderJoeRouterABI,
              routerMethods: {
                swapETHForExactTokens: "swapAVAXForExactTokens",
                swapExactETHForTokens: "swapExactAVAXForTokens",
                swapExactETHForTokensSupportingFeeOnTransferTokens: "swapExactAVAXForTokensSupportingFeeOnTransferTokens",
                swapExactTokensForETH: "swapExactTokensForAVAX",
                swapExactTokensForETHSupportingFeeOnTransferTokens: "swapExactTokensForAVAXSupportingFeeOnTransferTokens",
                swapExactTokensForTokens: "swapExactTokensForTokens",
                swapExactTokensForTokensSupportingFeeOnTransferTokens: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
                swapTokensForExactETH: "swapTokensForExactAVAX",
                swapTokensForExactTokens: "swapTokensForExactTokens",
              }
            }
        },
        {
          v2Override:
            {
              description: 'Pangolin',
              routerAddress: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
              factoryAddress: '0xefa94de7a4656d787667c749f7e1223d71e9fd88',
              pairAddress: '0xefa94de7a4656d787667c749f7e1223d71e9fd88',
              // routerAbi: TraderJoeRouterABI
            }
        }
      ],
      // gasSettings: {
      //   getGasPrice: async () => '90',
      // },
      gasSettings: {
        getGasPrice: async () => {
          return 'GWEI_GAS_PRICE';
        },
      },
    }),
  });

  const startTime = new Date().getTime();

  const uniswapPairFactory = await uniswapPair.createFactory();

  const trade = await uniswapPairFactory.trade('0.0001', TradeDirection.input);

  console.log(new Date().getTime() - startTime);
  console.log(trade);

  // console.log(JSON.stringify(trade, null, 4));
  // console.log(trade);
  // console.log(
  //   trade.allTriedRoutesQuotes.filter(
  //     (c) => c.uniswapVersion === UniswapVersion.v3
  //   )
  // );

  // const ethers = new EthersProvider({ chainId: ChainId.AVALANCHE, providerUrl: 'https://api.avax.network/ext/bc/C/rpc' });
  // await ethers.provider.estimateGas(trade.transaction);
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

routeTest();
