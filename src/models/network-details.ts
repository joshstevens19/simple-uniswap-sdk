import { ChainId } from '../enums/chain-id';

export interface NetworkDetails {
  id: ChainId;
  providerUrl?: string;
}
