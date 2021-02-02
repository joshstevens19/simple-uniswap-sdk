import { ChainId } from '../..';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { TokenFactory } from './token.factory';

describe('TokenFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);
  const token = MOCKFUN();

  const tokenFactory = new TokenFactory(token.contractAddress, ethersProvider);

  it('getToken', async () => {
    const result = await tokenFactory.getToken();
    expect(result).toEqual(token);
  });

  it('allowance', async () => {
    const result = await tokenFactory.allowance(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('generateApproveAllowanceData', () => {
    const result = tokenFactory.generateApproveAllowanceData(
      ContractContext.routerAddress,
      '0x05'
    );
    expect(result).toEqual(
      '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000000000000000005'
    );
  });

  it('balanceOf', async () => {
    const result = await tokenFactory.balanceOf(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('totalSupply', async () => {
    const result = await tokenFactory.totalSupply();
    expect(result).toEqual('0x0f43f0ad89c30bb6');
  });

  it('getAllowanceAndBalanceOf', async () => {
    const result = await tokenFactory.getAllowanceAndBalanceOf(
      MockEthereumAddress()
    );
    expect(result).toEqual({
      allowance: '0x2386f01852b720',
      balanceOf: '0x4d3f3832f7',
    });
  });
});
