import { UniswapVersion } from '../../../enums/uniswap-version';
import { UniswapPairSettings } from './uniswap-pair-settings';

describe('UniswapPairSettings', () => {
  describe('slippage', () => {
    it('should set the correct default if not passed in', () => {
      const uniswapPairSettings = new UniswapPairSettings();

      expect(uniswapPairSettings.slippage).toEqual(0.005);
    });

    it('should set the slippage', () => {
      const uniswapPairSettings = new UniswapPairSettings({ slippage: 0.1 });

      expect(uniswapPairSettings.slippage).toEqual(0.1);
    });
  });

  describe('deadlineMinutes', () => {
    it('should set the correct default if not passed in', () => {
      const uniswapPairSettings = new UniswapPairSettings();

      expect(uniswapPairSettings.deadlineMinutes).toEqual(20);
    });

    it('should set the value', () => {
      const uniswapPairSettings = new UniswapPairSettings({
        deadlineMinutes: 60,
      });

      expect(uniswapPairSettings.deadlineMinutes).toEqual(60);
    });
  });

  describe('disableMultihops', () => {
    it('should set the correct default if not passed in', () => {
      const uniswapPairSettings = new UniswapPairSettings();

      expect(uniswapPairSettings.disableMultihops).toEqual(false);
    });

    it('should set the value', () => {
      const uniswapPairSettings = new UniswapPairSettings({
        disableMultihops: true,
      });

      expect(uniswapPairSettings.disableMultihops).toEqual(true);
    });
  });

  describe('uniswapVersions', () => {
    it('should set the correct default if not passed in', () => {
      const uniswapPairSettings = new UniswapPairSettings();

      expect(uniswapPairSettings.uniswapVersions).toEqual([
        UniswapVersion.v2,
        UniswapVersion.v3,
      ]);
    });

    it('should set the value', () => {
      const uniswapPairSettings = new UniswapPairSettings({
        uniswapVersions: [UniswapVersion.v2],
      });

      expect(uniswapPairSettings.uniswapVersions).toEqual([UniswapVersion.v2]);
    });

    it('should ignore it if you pass in a none array', () => {
      const uniswapPairSettings = new UniswapPairSettings({
        uniswapVersions: '' as any,
      });

      expect(uniswapPairSettings.uniswapVersions).toEqual([
        UniswapVersion.v2,
        UniswapVersion.v3,
      ]);
    });

    it('should throw if empty array is passed in', () => {
      expect(() => {
        new UniswapPairSettings({
          uniswapVersions: [],
        });
      }).toThrowError('`uniswapVersions` must not be an empty array');
    });

    it('should throw if empty array is passed in', () => {
      expect(() => {
        new UniswapPairSettings({
          uniswapVersions: ['bobob' as any],
        });
      }).toThrowError('`uniswapVersions` only accepts v2 or v3');
    });
  });
});
