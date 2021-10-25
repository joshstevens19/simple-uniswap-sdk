import { ErrorCodes } from '../../../common/errors/error-codes';
import { UniswapError } from '../../../common/errors/uniswap-error';
import { UniswapVersion } from '../../../enums/uniswap-version';
import { CloneUniswapContractDetails } from './clone-uniswap-contract-details';
import { CustomNetwork } from './custom-network';
import { GasSettings } from './gas-settings';

export class UniswapPairSettings {
  slippage: number;
  deadlineMinutes: number;
  disableMultihops: boolean;
  uniswapVersions: UniswapVersion[] = [UniswapVersion.v2, UniswapVersion.v3];
  gasSettings?: GasSettings = undefined;
  cloneUniswapContractDetails?: CloneUniswapContractDetails = undefined;
  customNetwork?: CustomNetwork = undefined;

  constructor(settings?: {
    slippage?: number | undefined;
    deadlineMinutes?: number | undefined;
    disableMultihops?: boolean | undefined;
    uniswapVersions?: UniswapVersion[] | undefined;
    gasSettings?: GasSettings | undefined;
    cloneUniswapContractDetails?: CloneUniswapContractDetails | undefined;
    customNetwork?: CustomNetwork | undefined;
  }) {
    this.slippage = settings?.slippage || 0.005;
    this.deadlineMinutes = settings?.deadlineMinutes || 20;
    this.disableMultihops = settings?.disableMultihops || false;
    this.gasSettings = settings?.gasSettings;
    this.cloneUniswapContractDetails = settings?.cloneUniswapContractDetails;
    this.customNetwork = settings?.customNetwork;

    if (
      Array.isArray(settings?.uniswapVersions) &&
      settings?.uniswapVersions.length === 0
    ) {
      throw new UniswapError(
        '`uniswapVersions` must not be an empty array',
        ErrorCodes.uniswapVersionsMustNotBeAnEmptyArray
      );
    }

    if (
      settings &&
      Array.isArray(settings.uniswapVersions) &&
      settings.uniswapVersions.length > 0
    ) {
      if (
        settings.uniswapVersions.find(
          (u) => u !== UniswapVersion.v2 && u !== UniswapVersion.v3
        )
      ) {
        throw new UniswapError(
          '`uniswapVersions` only accepts v2 or v3',
          ErrorCodes.uniswapVersionsUnsupported
        );
      }

      this.uniswapVersions = settings?.uniswapVersions;
    }
  }
}
