import { CloneUniswapContractDetails } from '../factories/pair/models/clone-uniswap-contract-details';
import { UniswapContractContextV2 } from './uniswap-contract-context-v2';
import { UniswapContractContextV3 } from './uniswap-contract-context-v3';

export const uniswapContracts = {
  v2: {
    getDescription: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override
      ) {
        return cloneUniswapContractDetails.v2Override.description;
      }

      return UniswapContractContextV2.description;
    },

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

    getRouterAbi: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override &&
        cloneUniswapContractDetails.v2Override.routerAbi
      ) {
        return cloneUniswapContractDetails.v2Override.routerAbi;
      }

      return UniswapContractContextV2.routerAbi;
    },

    getRouterMethods: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v2Override &&
        cloneUniswapContractDetails.v2Override.routerMethods
      ) {
        return cloneUniswapContractDetails.v2Override.routerMethods;
      }

      return UniswapContractContextV2.routerMethods;
    },
  },
  v3: {
    getDescription: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v3Override
      ) {
        return cloneUniswapContractDetails.v3Override.description;
      }

      return UniswapContractContextV3.description;
    },

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

    getRouterAbi: (
      cloneUniswapContractDetails: CloneUniswapContractDetails | undefined
    ) => {
      if (
        cloneUniswapContractDetails &&
        cloneUniswapContractDetails.v3Override &&
        cloneUniswapContractDetails.v3Override.routerAbi
      ) {
        return cloneUniswapContractDetails.v3Override.routerAbi;
      }

      return UniswapContractContextV3.routerAbi;
    },
  },
};
