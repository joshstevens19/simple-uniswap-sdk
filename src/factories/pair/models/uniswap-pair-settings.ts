import { ErrorCodes } from '../../..';
import { UniswapError } from '../../../common/errors/uniswap-error';
import { UniswapVersion } from '../../../enums/uniswap-version';

export class UniswapPairSettings {
  slippage: number;
  deadlineMinutes: number;
  disableMultihops: boolean;
  uniswapVersions: UniswapVersion[] = [UniswapVersion.v2, UniswapVersion.v3];

  constructor(settings?: {
    slippage?: number | undefined;
    deadlineMinutes?: number | undefined;
    disableMultihops?: boolean | undefined;
    uniswapVersions?: UniswapVersion[] | undefined;
  }) {
    this.slippage = settings?.slippage || 0.005;
    this.deadlineMinutes = settings?.deadlineMinutes || 20;
    this.disableMultihops = settings?.disableMultihops || false;

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
      this.uniswapVersions = settings?.uniswapVersions;
    }
  }
}
