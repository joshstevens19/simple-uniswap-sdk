import { Token } from '../../../factories/token/models/token';
import { DFORCE } from './dForce';
import { MAI } from './mkr';

const _tokenOverrideInfo: Token[] = [DFORCE.MAINNET(), MAI.MAINNET()];

export const isTokenOverrideInfo = (contractAddress: string) => {
  return _tokenOverrideInfo.find(
    (info) =>
      info.contractAddress.toLowerCase() === contractAddress.toLowerCase()
  );
};
