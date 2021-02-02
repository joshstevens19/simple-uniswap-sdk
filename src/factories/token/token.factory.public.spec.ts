import { ChainId, TokenFactoryPublic } from '../..';
import { ContractContext } from '../../common/contract-context';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';

describe('TokenFactoryPublic', () => {
  const token = MOCKFUN();

  const tokenFactoryPublic = new TokenFactoryPublic(
    token.contractAddress,
    ChainId.MAINNET
  );

  it('getToken', async () => {
    const result = await tokenFactoryPublic.getToken();
    expect(result).toEqual(token);
  });

  it('allowance', async () => {
    const result = await tokenFactoryPublic.allowance(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('generateApproveAllowanceData', () => {
    const result = tokenFactoryPublic.generateApproveAllowanceData(
      ContractContext.routerAddress,
      '0x05'
    );
    expect(result).toEqual(
      '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000000000000000005'
    );
  });

  it('balanceOf', async () => {
    const result = await tokenFactoryPublic.balanceOf(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('totalSupply', async () => {
    const result = await tokenFactoryPublic.totalSupply();
    expect(result).toEqual('0x0f43f0ad89c30bb6');
  });

  it('getAllowanceAndBalanceOf', async () => {
    const result = await tokenFactoryPublic.getAllowanceAndBalanceOf(
      MockEthereumAddress()
    );
    expect(result).toEqual({
      allowance: '0x2386f01852b720',
      balanceOf: '0x4d3f3832f7',
    });
  });
});
