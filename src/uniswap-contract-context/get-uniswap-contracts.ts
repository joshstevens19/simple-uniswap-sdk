import { CloneUniswapContractDetails } from '../factories/pair/models/clone-uniswap-contract-details';
import { UniswapContractContextV2 } from './uniswap-contract-context-v2';
import { UniswapContractContextV3 } from './uniswap-contract-context-v3';

export const uniswapContracts = {
  v2: {
    getRouterAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override
      ) {
        return cloneUniswapContractDetails.v2Override.routerAddress;
      }

      return UniswapContractContextV2.routerAddress;
    },

    getFactoryAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override
      ) {
        return cloneUniswapContractDetails.v2Override.factoryAddress;
      }

      return UniswapContractContextV2.factoryAddress;
    },

    getPairAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override
      ) {
        return cloneUniswapContractDetails.v2Override.pairAddress;
      }

      return UniswapContractContextV2.pairAddress;
    },
  },
  v3: {
    getRouterAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v3Override
      ) {
        return cloneUniswapContractDetails.v3Override.routerAddress;
      }

      return UniswapContractContextV3.routerAddress;
    },

    getFactoryAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v3Override
      ) {
        return cloneUniswapContractDetails.v3Override.factoryAddress;
      }

      return UniswapContractContextV3.factoryAddress;
    },

    getQuoterAddress: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v3Override
      ) {
        return cloneUniswapContractDetails.v3Override.quoterAddress;
      }

      return UniswapContractContextV3.quoterAddress;
    },
  },
};
