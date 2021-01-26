import { Provider } from '@ethersproject/providers';

export interface ProviderWeb3 {
  // so we can support any version of web3 typings
  // tslint:disable-next-line: no-any
  web3Instance: any;
}

export interface ProviderEthers {
  ethersProvider: Provider;
}

export interface ProviderCustomJsonRpcProvider {
  nodeUrl: string;
}
