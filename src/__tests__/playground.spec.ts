import { ChainId } from '../enums/chain-id';
import { UniswapPair } from '../factories/pair/uniswap-pair';

const routeTest = async () => {
  const fromTokenContractAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b';
  const toTokenContractAddress = '0x1985365e9f78359a9B6AD760e32412f4a445E862';
  const ethereumAddress = '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9';

  const uniswapPair = new UniswapPair(
    fromTokenContractAddress,
    toTokenContractAddress,
    ethereumAddress,
    ChainId.MAINNET
  );

  const uniswapPairFactory = await uniswapPair.createFactory();

  // const routes = await uniswapFactory.routes.getAllPossibleRoutes();

  // const routesWithQuotes = await uniswapFactory.routes.getAllPossibleRoutesWithQuotes(
  //   new BigNumber(1)
  // );
  // console.log(JSON.stringify(routesWithQuotes));

  const trade = await uniswapPairFactory.findAllPossibleRoutes();
  console.log(JSON.stringify(trade));

  // console.log(uniswapPairFactory.generateApproveUniswapAllowanceData());
};

routeTest();
