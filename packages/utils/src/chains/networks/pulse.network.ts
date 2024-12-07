import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { PLSCoin } from '../../tokens/configs/pls.token'
import { WPLSToken } from '../../tokens/configs/wpls.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { plsMainChainId, plsTestChainId } from '../chainIds'

const commonProps: Omit<
  ChainConfig,
  | 'name'
  | 'displayName'
  | 'chainId'
  | 'chainName'
  | 'nodes'
  | 'nativeCurrency'
  | 'nativeWrappedTokenInfo'
  | 'gasUrls'
  | 'multicallContractAddress'
  | 'tokens'
  | 'blockExplorerUrls'
> = {
  chainType: 'layer1',
  symbol: 'PLS',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: plsMainChainId }),
  color: 'rgb(5, 185, 213)',
  standards: {
    token20: {
      standard: 'PRC20',
      abi: erc20ABI,
    },
    token721: {
      standard: 'PRC721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'PRC777',
      abi: erc777ABI,
    },
    token1155: {
      standard: 'PRC1155',
      abi: erc1155ABI,
    },
  },
  supportedDexs: [dexTypeMap.PULSEX],
}

export class PulseNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: plsMainChainId,
      name: 'PulseChain',
      displayName: 'PulseChain',
      chainName: 'mainnet',
      nativeCurrency: PLSCoin.PULSE.MAINNET(),
      nativeWrappedTokenInfo: WPLSToken.PULSE.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(plsMainChainId),
      blockExplorerUrls: [
        { name: 'PulseChain Scan', url: 'https://scan.pulsechain.com' },
        { name: 'Otter PulseChain', url: 'https://otter.pulsechain.com/' },
      ],
      bridgeUrls: [{ name: 'PulseRamp', url: 'https://pulseramp.com/#/' }],
      nodes: {
        public: [
          {
            name: 'PulseChain RPC',
            url: 'https://rpc.pulsechain.com',
            chunkLimit: 500_000, // Limited by timeout, not count
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'PulseChain Public Node',
            url: 'https://pulsechain.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'G4MM4',
            url: 'https://rpc-pulsechain.g4mm4.io',
            chunkLimit: 5_000_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'PulseChain WSS RPC',
            url: 'wss://rpc.pulsechain.com',
            chunkLimit: 500_000, // Limited by timeout, not count
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'PulseChain WSS Public Node',
            url: 'wss://pulsechain.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'G4MM4 WSS',
            url: 'wss://rpc-pulsechain.g4mm4.io',
            chunkLimit: 5_000_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [
        {
          name: 'Beacon GasNow',
          url: 'https://beacon.pulsechain.com/api/v1/execution/gasnow',
        },
      ],
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: plsTestChainId,
      name: 'PulseChain Testnet V4',
      displayName: 'PulseChain Testnet V4',
      chainName: 'testnet_v4',
      nativeCurrency: PLSCoin.PULSE.TESTNET(),
      nativeWrappedTokenInfo: WPLSToken.PULSE.TESTNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(plsTestChainId),
      blockExplorerUrls: [
        {
          name: 'PulseChain Testnet Scan',
          url: 'https://scan.v4.testnet.pulsechain.com/',
        },
      ],
      bridgeUrls: [{ name: 'PulseRamp', url: 'https://pulseramp.com/#/' }],
      nodes: {
        public: [
          {
            name: 'PulseChain Testnet RPC',
            url: 'https://rpc.v4.testnet.pulsechain.com',
            chunkLimit: 500_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'PulseChain Testnet Public Node',
            url: 'https://pulsechain-testnet.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'G4MM4 Testnet',
            url: 'https://rpc-testnet-pulsechain.g4mm4.io',
            chunkLimit: 5_000_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'PulseChain Testnet WSS RPC',
            url: 'wss://rpc.v4.testnet.pulsechain.com',
            chunkLimit: 500_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'PulseChain Testnet WSS Public Node',
            url: 'wss://pulsechain-testnet.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'G4MM4 Testnet WSS',
            url: 'wss://rpc-testnet-pulsechain.g4mm4.io',
            chunkLimit: 5_000_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Pulse Faucet',
          url: 'https://faucet.v4.testnet.pulsechain.com/',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case plsMainChainId:
        return PulseNetwork.MAINNET()
      case plsTestChainId:
        return PulseNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
