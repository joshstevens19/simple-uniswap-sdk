import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { ChainId } from '../../../../dist';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';
import { UniswapContractQuoterV3Public } from './uniswap-contract.quoter.v3.public';

export enum FeeAmount {
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

const FEE_SIZE = 3;
function encodePath(path: string[], fees: FeeAmount[]): string {
  // if (path.length != fees.length + 1) {
  //   throw new Error('path/fee lengths do not match');
  // }

  let encoded = '0x';
  for (let i = 0; i < fees.length; i++) {
    // 20 byte encoding of the address
    encoded += path[i].slice(2);
    // 3 byte encoding of the fee
    encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, '0');
  }
  // encode the final token
  encoded += path[path.length - 1].slice(2);

  return encoded.toLowerCase();
}

xdescribe('UniswapContractQuoterV3Public', () => {
  const uniswapContractQuoterPublic = new UniswapContractQuoterV3Public(
    ChainId.MAINNET
  );

  it('quoteExactInput', async () => {
    const result = await uniswapContractQuoterPublic.quoteExactInput(
      encodePath(
        [
          '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
          '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
        ],
        [FeeAmount.HIGH, FeeAmount.HIGH]
      ),
      500
    );
    expect(result.toHexString()).toEqual(result.toHexString());
  });
});

describe('UniswapContractQuoterV3Public > Multicall', () => {
  it('quoteExactOutput', async () => {
    const multicall = new Multicall({
      ethersProvider: new EthersProvider(ChainId.MAINNET).provider,
      tryAggregate: true,
    });

    const contractCallContext: ContractCallContext = {
      reference: 'uniswap-pairs',
      contractAddress: UniswapContractContextV3.quoterAddress,
      abi: UniswapContractContextV3.quoterAbi,
      calls: [
        // {
        //   reference: `1`,
        //   methodName: 'quoteExactOutput',
        //   methodParameters: [
        //     encodePath(
        //       [MOCKFUN().contractAddress, WETH.MAINNET().contractAddress],
        //       [3000]
        //     ),
        //     '10000',
        //   ],
        // },
        {
          reference: `1`,
          methodName: 'quoteExactOutput',
          methodParameters: [
            encodePath(
              [
                '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
                '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
              ],
              [3000]
            ),
            '100',
          ],
        },
      ],
    };

    const contractCallResults = await multicall.call(contractCallContext);

    const results = contractCallResults.results[contractCallContext.reference];

    expect(results.callsReturnContext[0].returnValues).toEqual(false);
  });
});
