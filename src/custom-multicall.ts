import { Provider } from '@ethersproject/providers';
import { Multicall } from 'ethereum-multicall';

export class CustomMulticall extends Multicall {
  constructor(
    ethersProvider: Provider,
    multicallCustomContractAddress?: string | undefined
  ) {
    super({
      ethersProvider,
      tryAggregate: true,
      multicallCustomContractAddress,
    });
  }
}
