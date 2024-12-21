import {
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  blastMainChainId,
  bscMainChainId,
  celoMainChainId,
  energiMainChainId,
  ethMainChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  zkEVMMainChainId,
  zksyncMainChainId,
  zoraMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { DexType } from '@dex-toolkit/types'
import {
  AVAXToken,
  AVIAToken,
  BNBToken,
  CAKEToken,
  CELOToken,
  COQToken,
  DAIToken,
  ENJOYToken,
  ESEToken,
  ETHCoin,
  IMAGINEToken,
  JOEToken,
  LINKToken,
  MOBIToken,
  NRGToken,
  NYAToken,
  PEPEToken,
  PLSCoin,
  PNGToken,
  POLToken,
  RDNTToken,
  RINGToken,
  SUSHIToken,
  UNIToken,
  USDCToken,
  USDBToken,
  USDTToken,
  WAVAXToken,
  WBNBToken,
  WBTCToken,
  WETHToken,
  WIFToken,
  WNRGToken,
  WPOLToken,
  WPLSToken,
  XVSToken,
  YOLOToken,
  YTSToken,
  ZROToken,
  HEXToken,
  INCToken,
  AAVEToken,
} from '@dex-toolkit/utils'

import type { DexTestCase } from './mock.types'

// Rules for test cases:
// `primaryToken` should have an allowance for both v2 and v3
// `primaryToken` should have a pool with `nativeWrapped` for both v2 and v3
// `primaryToken` to `stableToken` should have direct route/pool
// `primaryToken` to `nativeWrapped` should have direct route/pool
// `primaryToken` to `noAllowanceToken` should NOT have direct route
// `noAllowanceToken` should have no allowance

export const TestCases: Record<DexType, Record<ChainId, DexTestCase>> = {
  DOVESWAP: {
    [zkEVMMainChainId]: {
      chainId: zkEVMMainChainId,
      dexType: 'DOVESWAP',
      tokens: {
        primaryToken: CAKEToken.ZKEVM.MAINNET(),
        noAllowanceToken: WBTCToken.ZKEVM.MAINNET(),
        noDirectToken: WBTCToken.ZKEVM.MAINNET(),
        stableToken: DAIToken.ZKEVM.MAINNET(),
        nativeCoin: ETHCoin.ZKEVM.MAINNET(),
        nativeWrapped: WETHToken.ZKEVM.MAINNET(),
      },
      versions: {
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://zkevm.polygonscan.com/address/0xdE474Db1Fa59898BC91314328D29507AcD0D593c#readContract
              primaryToWrapped: {
                address: '',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
  },

  ENERGISWAP: {
    [energiMainChainId]: {
      chainId: energiMainChainId,
      dexType: 'ENERGISWAP',
      tokens: {
        primaryToken: UNIToken.ENERGI.MAINNET(),
        noAllowanceToken: WBTCToken.ENERGI.MAINNET(),
        noDirectToken: WBTCToken.ENERGI.MAINNET(),
        stableToken: DAIToken.ENERGI.MAINNET(),
        nativeCoin: NRGToken.ENERGI.MAINNET(),
        nativeWrapped: WNRGToken.ENERGI.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://explorer.energi.network/address/0x56054dD259EE91adD53a988C079cfb17bE9a2108/read-contract
              primaryToWrapped: '0xe21B85cF558F929424d91eAB45f63017FA79cA5B',
              secondaryToWrapped: '0x7b957726c894a61ffbcc907daaeb1a908b032863',
              stableToWrapped: '0x5cc8b3d89ae2ca30a08b6697e33606fc3437d392',
              fee: 0.003,
            },
          },
        ],
      },
    },
  },

  PANCAKESWAP: {
    [arbitrumMainChainId]: {
      chainId: arbitrumMainChainId,
      dexType: 'PANCAKESWAP',
      tokens: {
        primaryToken: CAKEToken.ARBITRUM.MAINNET(),
        noAllowanceToken: ZROToken.ARBITRUM.MAINNET(),
        noDirectToken: ZROToken.ARBITRUM.MAINNET(),
        stableToken: USDCToken.ARBITRUM.MAINNET(),
        nativeCoin: ETHCoin.ARBITRUM.MAINNET(),
        nativeWrapped: WETHToken.ARBITRUM.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://arbiscan.io/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
              primaryToWrapped: '0x727Bf942612adEa70167DceaF618AC38d37421E1',
              secondaryToWrapped: '0x1D0817247427C8F5c507ed70c27CBb66eA1606D1',
              stableToWrapped: '0xc0a75521fd441132E859E1533550029165de699f',
              fee: 0.0025,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://arbiscan.io/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
              primaryToWrapped: {
                address: '0xd1f41d5154585213A19516A4a9d161e3A323D7D7',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '0xf0346b437Fe43e64Fa799C2BD3cf5Db1F7e9327C',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0xd9e2a1a61B6E61b275cEc326465d417e52C1b95c',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    [baseMainChainId]: {
      chainId: baseMainChainId,
      dexType: 'PANCAKESWAP',
      tokens: {
        primaryToken: CAKEToken.BASE.MAINNET(),
        noAllowanceToken: ZROToken.BASE.MAINNET(),
        noDirectToken: ZROToken.BASE.MAINNET(),
        stableToken: USDCToken.BASE.MAINNET(),
        nativeCoin: ETHCoin.BASE.MAINNET(),
        nativeWrapped: WETHToken.BASE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://basescan.org/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
              primaryToWrapped: '0xc637ab6D3aB0c55a7812B0b23955bA6E40859447',
              secondaryToWrapped: '0xDdd1a5443c0f85BcFa2AFA4D42F2bbE5286C3abf',
              stableToWrapped: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
              fee: 0.0025,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://basescan.org/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
              primaryToWrapped: {
                address: '0x03bf0449150ca9E84c6fae422cB741710246EA5f',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '0xbee435c7Ff6Cb814124281C4C2532476A094Ac87',
                feeTier: 2_500,
              },
              stableToWrapped: {
                address: '0xB775272E537cc670C65DC852908aD47015244EaF',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    [bscMainChainId]: {
      chainId: bscMainChainId,
      dexType: 'PANCAKESWAP',
      tokens: {
        primaryToken: CAKEToken.BSC.MAINNET(),
        noAllowanceToken: ZROToken.BSC.MAINNET(),
        noDirectToken: ZROToken.BSC.MAINNET(),
        stableToken: USDCToken.BSC.MAINNET(),
        nativeCoin: BNBToken.BSC.MAINNET(),
        nativeWrapped: WBNBToken.BSC.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73#readContract
              primaryToWrapped: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
              secondaryToWrapped: '0x0B514089B57ECcF7a36F7969837E4544b3AEd434',
              stableToWrapped: '0xd99c7F6C65857AC913a8f880A4cb84032AB2FC5b',
              fee: 0.0025,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://bscscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
              primaryToWrapped: {
                address: '0xAfB2Da14056725E3BA3a30dD846B6BBbd7886c56',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '0x3E95c2226a1D1CD7f4bC667750DFD69FdCA3d091',
                feeTier: 2_500,
              },
              stableToWrapped: {
                address: '0x81A9b5F18179cE2bf8f001b8a634Db80771F1824',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    // [bscTestChainId]: {
    //   chainId: bscTestChainId,
    //   dexType: 'PANCAKESWAP',
    //   tokens: {
    //     primary: UNIToken.BSC.TESTNET(),
    //     secondary: AAVEToken.BSC.TESTNET(),
    //     tertiary: COMPToken.BSC.TESTNET(),
    //     noAllowance: WBTCToken.BSC.TESTNET(),
    //   },
    //   stableTokens: {
    //     primary: DAIToken.BSC.TESTNET(),
    //     secondary: USDTToken.BSC.TESTNET(),
    //   },
    //   nativeTokens: {
    //     coin: BNBToken.BSC.TESTNET(),
    //     wrapped: WBNBToken.BSC.TESTNET(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    // fee: 0.0025,
    //         },
    //       },
    //     ],
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         poolAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [ethMainChainId]: {
      chainId: ethMainChainId,
      dexType: 'PANCAKESWAP',
      tokens: {
        primaryToken: WBTCToken.ETH.MAINNET(),
        noAllowanceToken: USDTToken.ETH.MAINNET(),
        noDirectToken: USDTToken.ETH.MAINNET(),
        stableToken: USDCToken.ETH.MAINNET(),
        nativeCoin: ETHCoin.ETH.MAINNET(),
        nativeWrapped: WETHToken.ETH.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://etherscan.io/address/0x1097053Fd2ea711dad45caCcc45EfF7548fCB362#readContract
              primaryToWrapped: '0x4AB6702B3Ed3877e9b1f203f90cbEF13d663B0e8',
              secondaryToWrapped: '0x17C1Ae82D99379240059940093762c5e4539aba5',
              stableToWrapped: '0x2E8135bE71230c6B1B4045696d41C09Db0414226',
              fee: 0.0025,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://etherscan.io/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
              primaryToWrapped: {
                address: '0x702283A9B82445EAAB6A2C7abFA8551bF4AB9f3b',
                feeTier: 2_500,
              },
              secondaryToWrapped: {
                address: '0x6CA298D2983aB03Aa1dA7679389D955A4eFEE15C',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    [zksyncMainChainId]: {
      chainId: zksyncMainChainId,
      dexType: 'PANCAKESWAP',
      tokens: {
        primaryToken: CAKEToken.ZKSYNC.MAINNET(),
        noAllowanceToken: WBTCToken.ZKSYNC.MAINNET(),
        noDirectToken: WBTCToken.ZKSYNC.MAINNET(),
        stableToken: DAIToken.ZKSYNC.MAINNET(),
        nativeCoin: ETHCoin.ZKSYNC.MAINNET(),
        nativeWrapped: WETHToken.ZKSYNC.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://era.zksync.network/address/0xd03D8D566183F0086d8D09A84E1e30b58Dd5619d#readContract
              primaryToWrapped: '0x6221D55a5dA5f89970aA4E3A54142948E5120E1D',
              secondaryToWrapped: '0x59CF6B2C0e3CaDBEEFDCEEC60246aE8BfFa30b74',
              stableToWrapped: '0xdC421dc25ecdb00988bf5Ac6AAC1b221a878992E',
              fee: 0.0025,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://era.zksync.network/address/0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB#readContract
              primaryToWrapped: {
                address: '0xB212e5909503244beba1e2bdb04349772b2c3337',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '0x9cB8b12cb0223e105155318B72AdddA15D588fB9',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0xDa135Dfc5d89737Dd9f58580cA43b8b071024ca2',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
  },

  PANGOLIN: {
    [avaxMainChainId]: {
      chainId: avaxMainChainId,
      dexType: 'PANGOLIN',
      tokens: {
        // primaryToken: UNIToken.AVALANCHE.MAINNET(),
        primaryToken: AAVEToken.AVALANCHE.MAINNET(),
        noAllowanceToken: PNGToken.AVALANCHE.MAINNET(),
        noDirectToken: LINKToken.AVALANCHE.MAINNET(),
        stableToken: DAIToken.AVALANCHE.MAINNET(),
        nativeCoin: AVAXToken.AVALANCHE.MAINNET(),
        nativeWrapped: WAVAXToken.AVALANCHE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0xefa94DE7a4656D787667C749f7E1223D71E9FD88/contract/43114/readContract?chainid=43114
              // primaryToWrapped: '0x99dD520748eB0355c69DAE2692E4615C8Ab031ce', // UNI
              primaryToWrapped: '0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367', // PNG
              secondaryToWrapped: '0x7a6131110B82dAcBb5872C7D352BfE071eA6A17C',
              stableToWrapped: '0xbA09679Ab223C6bdaf44D45Ba2d7279959289AB0',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [avaxFujiChainId]: {
    //   chainId: avaxFujiChainId,
    //   dexType: 'PANGOLIN',
    //   tokens: {
    //     primary: UNIToken.AVALANCHE.FUJI(),
    //     secondary: AAVEToken.AVALANCHE.FUJI(),
    //     tertiary: COMPToken.AVALANCHE.FUJI(),
    //     noAllowance: WBTCToken.AVALANCHE.FUJI(),
    //   },
    //   stableTokens: {
    //     primary: DAIToken.AVALANCHE.FUJI(),
    //     secondary: USDTToken.AVALANCHE.FUJI(),
    //   },
    //   nativeTokens: {
    //     coin: AVAXToken.AVALANCHE.FUJI(),
    //     wrapped: WAVAXToken.AVALANCHE.FUJI(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //           fee: 0.003,
    //         },
    //       },
    //     ],
    //   },
    // },
  },

  PULSEX: {
    [plsMainChainId]: {
      chainId: plsMainChainId,
      dexType: 'PULSEX',
      tokens: {
        primaryToken: INCToken.PULSE.MAINNET(),
        noAllowanceToken: HEXToken.PULSE.MAINNET(),
        noDirectToken: UNIToken.PULSE.TESTNET(),
        stableToken: DAIToken.PULSE.MAINNET(),
        nativeCoin: PLSCoin.PULSE.MAINNET(),
        nativeWrapped: WPLSToken.PULSE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // http://localhost:3694/#/address/0x1715a3E4A142d8b698131108995174F37aEBA10D?tab=read_contract
              primaryToWrapped: '0xf808Bb6265e9Ca27002c0A04562Bf50d4FE37EAA',
              secondaryToWrapped: '0xAa1Ea17e7499f892ab9E45E139D843049942Fb7a',
              stableToWrapped: '0xE56043671df55dE5CDf8459710433C10324DE0aE',
              fee: 0.003,
            },
          },
          {
            versionTag: '2-0-0',
            version: { major: 2, minor: 0, patch: 0 },
            pairAddresses: {
              // http://localhost:3694/#/address/0x29eA7545DEf87022BAdc76323F373EA1e707C523?tab=read_contract
              primaryToWrapped: '0x5B9661276708202DD1A0dD2346A3856b00d3c251',
              secondaryToWrapped: '0xF0eA3efE42C11c8819948Ec2D3179F4084863D3F',
              stableToWrapped: '0x146E1f1e060e5b5016Db0D118D2C5a11A240ae32',
              fee: 0.003,
            },
          },
        ],
      },
    },
    [plsTestChainId]: {
      chainId: plsTestChainId,
      dexType: 'PULSEX',
      tokens: {
        primaryToken: INCToken.PULSE.TESTNET(),
        noAllowanceToken: HEXToken.PULSE.TESTNET(),
        noDirectToken: UNIToken.PULSE.TESTNET(),
        stableToken: DAIToken.PULSE.TESTNET(),
        nativeCoin: PLSCoin.PULSE.TESTNET(),
        nativeWrapped: WPLSToken.PULSE.TESTNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://scan.v4.testnet.pulsechain.com/#/address/0xFf0538782D122d3112F75dc7121F61562261c0f7?tab=read_contract
              primaryToWrapped: '0x66990cD1F928Bf3EbE2CBcb2B139E858Ca249D86',
              secondaryToWrapped: '0x36Ee7730B16b6AFdaB13ae66Bf3D793Df1FD17b5',
              stableToWrapped: '0xA2D510bf42D2B9766DB186F44a902228E76ef262',
              fee: 0.003,
            },
          },
          {
            versionTag: '2-0-0',
            version: { major: 2, minor: 0, patch: 0 },
            pairAddresses: {
              // https://scan.v4.testnet.pulsechain.com/#/address/0x3B53e9270d0210214B9c242eb16C252474c5be01?tab=read_contract
              primaryToWrapped: '0x3aEe4417fFD6b1a0AdA0152A43eF168E7e4e9379',
              secondaryToWrapped: '0x1969607168ffdfdfa95b09588b65D3765F26eC3e',
              stableToWrapped: '0xf8077D17A58731b11de439e791Cd01d1804e1d1F',
              fee: 0.003,
            },
          },
        ],
      },
    },
  },

  QUICKSWAP: {
    [zkEVMMainChainId]: {
      chainId: zkEVMMainChainId,
      dexType: 'DOVESWAP',
      tokens: {
        primaryToken: LINKToken.ZKEVM.MAINNET(),
        noAllowanceToken: WBTCToken.ZKEVM.MAINNET(),
        noDirectToken: WBTCToken.ZKEVM.MAINNET(),
        stableToken: DAIToken.ZKEVM.MAINNET(),
        nativeCoin: ETHCoin.ZKEVM.MAINNET(),
        nativeWrapped: WETHToken.ZKEVM.MAINNET(),
      },
      versions: {
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://zkevm.polygonscan.com/address/0xdE474Db1Fa59898BC91314328D29507AcD0D593c#readContract
              primaryToWrapped: {
                // https://zkevm.polygonscan.com/address/0x43a2ff02bd9117a116a3c97a0af02b1cf5c6c49b#readContract
                address: '0x43a2ff02bd9117a116a3c97a0af02b1cf5c6c49b',
                feeTier: 2037, // 0.2037%
              },
              secondaryToWrapped: {
                // https://zkevm.polygonscan.com/address/0xFC4A3A7dc6b62bd2EA595b106392f5E006083b83#readContract
                address: '0xFC4A3A7dc6b62bd2EA595b106392f5E006083b83',
                feeTier: 962, // 0.0962%
              },
              stableToWrapped: {
                // https://zkevm.polygonscan.com/address/0xcAaA9869581000cd760884A663C05B0F6B1B8b5F#readContract
                address: '0xcAaA9869581000cd760884A663C05B0F6B1B8b5F',
                feeTier: 1836, // 0.1836%
              },
            },
          },
        ],
      },
    },
  },

  SUSHISWAP: {
    [arbitrumMainChainId]: {
      chainId: arbitrumMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: UNIToken.ARBITRUM.MAINNET(),
        noAllowanceToken: WBTCToken.ARBITRUM.MAINNET(),
        noDirectToken: WBTCToken.ARBITRUM.MAINNET(),
        stableToken: USDCToken.ARBITRUM.MAINNET(),
        nativeCoin: ETHCoin.ARBITRUM.MAINNET(),
        nativeWrapped: WETHToken.ARBITRUM.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://arbiscan.io/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
              primaryToWrapped: '0xf4a6c89E06318717657D352D16cFC7739D9a8B85',
              secondaryToWrapped: '0x515e252b2b5c22b4b2b6Df66c2eBeeA871AA4d69',
              stableToWrapped: '0x57b85FEf094e10b5eeCDF350Af688299E9553378',
              fee: 0.003,
            },
          },
        ],
      },
    },
    [avaxMainChainId]: {
      chainId: avaxMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: JOEToken.AVALANCHE.MAINNET(),
        noAllowanceToken: WBTCToken.AVALANCHE.MAINNET(),
        noDirectToken: WBTCToken.AVALANCHE.MAINNET(),
        stableToken: USDCToken.AVALANCHE.MAINNET(),
        nativeCoin: AVAXToken.AVALANCHE.MAINNET(),
        nativeWrapped: WAVAXToken.AVALANCHE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0xb73c30C2741B8C62730B58B10CeAa55bdDdA7327',
              secondaryToWrapped: '0xAe0ffC93315A5215047Ded27880aC50a537e0a2E',
              stableToWrapped: '0x6539bF462F73fF9497054bA261C195DA8639ED61',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [avaxFujiChainId]: {
    //   chainId: avaxFujiChainId,
    //   dexType: 'SUSHISWAP',
    //   tokens: {
    //     primary: JOEToken.AVALANCHE.FUJI(),
    //     secondary: WBTCToken.AVALANCHE.FUJI(),
    //     noAllowance: WBTCToken.AVALANCHE.FUJI(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.AVALANCHE.FUJI(),
    //     secondary: USDTToken.AVALANCHE.FUJI(),
    //   },
    //   nativeTokens: {
    //     coin: AVAXToken.AVALANCHE.FUJI(),
    //     wrapped: WAVAXToken.AVALANCHE.FUJI(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [baseMainChainId]: {
      chainId: baseMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: SUSHIToken.BASE.MAINNET(),
        noAllowanceToken: ZROToken.BASE.MAINNET(),
        noDirectToken: ZROToken.BASE.MAINNET(),
        stableToken: USDCToken.BASE.MAINNET(),
        nativeCoin: ETHCoin.BASE.MAINNET(),
        nativeWrapped: WETHToken.BASE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://basescan.org/address/0x71524B4f93c58fcbF659783284E38825f0622859#readContract
              primaryToWrapped: '0xd31B95ee44AA380cf3BC9afB277b2c1eBaedc8a1',
              secondaryToWrapped: '0x747D703B45489BbB882b8902C1F91ee430F1d8dF',
              stableToWrapped: '0x2F8818D1B0f3e3E295440c1C0cDDf40aAA21fA87',
              fee: 0.003,
            },
          },
        ],
      },
    },
    [blastMainChainId]: {
      chainId: blastMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: WIFToken.BLAST.MAINNET(),
        noAllowanceToken: ESEToken.BLAST.MAINNET(),
        noDirectToken: ESEToken.BLAST.MAINNET(),
        stableToken: USDBToken.BLAST.MAINNET(),
        nativeCoin: ETHCoin.BLAST.MAINNET(),
        nativeWrapped: WETHToken.BLAST.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://blastscan.io/address/0x42Fa929fc636e657AC568C0b5Cf38E203b67aC2b#readContract
              primaryToWrapped: '0x3bbc43819974cc57845E31B8207b6D0460C7daD1',
              secondaryToWrapped: '0x137624053778943b2E68365F6224e594aa4cDEdF',
              stableToWrapped: '0x0EbC523eFe22165058e0c441e108Dc65a53808f2',
              fee: 0.003,
            },
          },
        ],
      },
    },
    [bscMainChainId]: {
      chainId: bscMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: CAKEToken.BSC.MAINNET(),
        noAllowanceToken: UNIToken.BSC.MAINNET(),
        noDirectToken: UNIToken.BSC.MAINNET(),
        stableToken: USDCToken.BSC.MAINNET(),
        nativeCoin: BNBToken.BSC.MAINNET(),
        nativeWrapped: WBNBToken.BSC.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://bscscan.com/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
              primaryToWrapped: '0x70a164a8eCcee2b7a1873aF71EFdFA82904F937D',
              secondaryToWrapped: '0x8c213a1479fC94D0F7af4c4e9129ba8e4b318352',
              stableToWrapped: '0xc7632B7b2d768bbb30a404E13E1dE48d1439ec21',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [bscTestChainId]: {
    //   chainId: bscTestChainId,
    //   dexType: 'SUSHISWAP',
    //   tokens: {
    //     primary: UNIToken.BSC.TESTNET(),
    //     secondary: AAVEToken.BSC.TESTNET(),
    //     tertiary: COMPToken.BSC.TESTNET(),
    //     noAllowance: WBTCToken.BSC.TESTNET(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.BSC.TESTNET(),
    //     secondary: USDTToken.BSC.TESTNET(),
    //   },
    //   nativeTokens: {
    //     coin: BNBToken.BSC.TESTNET(),
    //     wrapped: WBNBToken.BSC.TESTNET(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [celoMainChainId]: {
      chainId: celoMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: SUSHIToken.CELO.MAINNET(),
        noAllowanceToken: MOBIToken.CELO.MAINNET(),
        noDirectToken: MOBIToken.CELO.MAINNET(),
        stableToken: DAIToken.CELO.MAINNET(),
        nativeCoin: ETHCoin.CELO.MAINNET(),
        nativeWrapped: WETHToken.CELO.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://explorer.celo.org/mainnet/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4/read-contract
              primaryToWrapped: '0x02f726b5e819ecf33aa93be5274c94a22df3619f',
              secondaryToWrapped: '0x8ecded81a2abf3b7e724978060739edbeb01b24f',
              stableToWrapped: '0x31609c8d7c5cc9ee46b021c6ecc597181d464688',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [celoAlfajoresChainId]: {
    //   chainId: celoAlfajoresChainId,
    //   dexType: 'SUSHISWAP',
    //   tokens: {
    //     primary: UNIToken.CELO.ALFAJORES(),
    //     secondary: AAVEToken.CELO.ALFAJORES(),
    //     tertiary: COMPToken.CELO.ALFAJORES(),
    //     noAllowance: WBTCToken.CELO.ALFAJORES(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.CELO.ALFAJORES(),
    //     secondary: USDTToken.CELO.ALFAJORES(),
    //   },
    //   nativeTokens: {
    //     coin: ETHCoin.CELO.ALFAJORES(),
    //     wrapped: WETHToken.CELO.ALFAJORES(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [ethMainChainId]: {
      chainId: ethMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: UNIToken.ETH.MAINNET(),
        noAllowanceToken: WBTCToken.ETH.MAINNET(),
        noDirectToken: WBTCToken.ETH.MAINNET(),
        stableToken: USDCToken.ETH.MAINNET(),
        nativeCoin: ETHCoin.ETH.MAINNET(),
        nativeWrapped: WETHToken.ETH.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://etherscan.io/address/0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac#readContract
              primaryToWrapped: '0xDafd66636E2561b0284EDdE37e42d192F2844D40',
              secondaryToWrapped: '0xCEfF51756c56CeFFCA006cD410B03FFC46dd3a58',
              stableToWrapped: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [ethSepoliaChainId]: {
    //   chainId: ethSepoliaChainId,
    //   dexType: 'SUSHISWAP',
    //   tokens: {
    //     primaryToken: UNIToken.SEPOLIA.MAINNET(),
    //     noAllowanceToken: WBTCToken.SEPOLIA.MAINNET(),
    //     stableToken: USDCToken.SEPOLIA.MAINNET(),
    //     nativeCoin: ETHCoin.SEPOLIA.MAINNET(),
    //     nativeWrapped: WETHToken.SEPOLIA.MAINNET(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //           fee: 0.003,
    //         },
    //       },
    //     ],
    //   },
    // },
    [optimismMainChainId]: {
      chainId: optimismMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: DAIToken.OPTIMISM.MAINNET(),
        noAllowanceToken: USDTToken.OPTIMISM.MAINNET(),
        noDirectToken: USDTToken.OPTIMISM.MAINNET(),
        stableToken: USDCToken.OPTIMISM.MAINNET(),
        nativeCoin: ETHCoin.OPTIMISM.MAINNET(),
        nativeWrapped: WETHToken.OPTIMISM.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://optimistic.etherscan.io/address/0xFbc12984689e5f15626Bad03Ad60160Fe98B303C#readContract
              primaryToWrapped: '0x96e48f738E52876155Fd62C7640906dAdc325509',
              secondaryToWrapped: '0xf456306b81eE689FC12E76Bb1bC320441455DF94',
              stableToWrapped: '0x010370653d85cFC3d9756fDE6A6Fb8A86Ff9EDE3',
              fee: 0.003,
            },
          },
        ],
      },
    },
    [polygonMainChainId]: {
      chainId: polygonMainChainId,
      dexType: 'SUSHISWAP',
      tokens: {
        primaryToken: UNIToken.POLYGON.MAINNET(),
        noAllowanceToken: WBTCToken.POLYGON.MAINNET(),
        noDirectToken: WBTCToken.POLYGON.MAINNET(),
        stableToken: USDCToken.POLYGON.MAINNET(),
        nativeCoin: POLToken.POLYGON.MAINNET(),
        nativeWrapped: WPOLToken.POLYGON.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://polygonscan.com/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
              primaryToWrapped: '0x7FAe0648684ec375176E2d0F171cA9814798D920',
              secondaryToWrapped: '0x8531c4e29491fE6e5e87AF6054FC20FcCf0b4290',
              stableToWrapped: '0xcd353F79d9FADe311fC3119B841e1f456b54e858',
              fee: 0.003,
            },
          },
        ],
      },
    },
  },

  TRADERJOE: {
    [avaxMainChainId]: {
      chainId: avaxMainChainId,
      dexType: 'TRADERJOE',
      tokens: {
        primaryToken: JOEToken.AVALANCHE.MAINNET(),
        noAllowanceToken: WBTCToken.AVALANCHE.MAINNET(),
        noDirectToken: AAVEToken.AVALANCHE.MAINNET(),
        stableToken: USDCToken.AVALANCHE.MAINNET(),
        nativeCoin: AVAXToken.AVALANCHE.MAINNET(),
        nativeWrapped: WAVAXToken.AVALANCHE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x454E67025631C065d3cFAD6d71E6892f74487a15',
              secondaryToWrapped: '0xbeB0b5FBd99b8e7498A4063CB419646922F6Eef8',
              stableToWrapped: '0xf4003F4efBE8691B60249E6afbD307aBE7758adb',
              fee: 0.003,
            },
          },
          {
            versionTag: '2-0-0',
            version: { major: 2, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0x6E77932A92582f504FF6c4BdbCef7Da6c198aEEf/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x0000000000000000000000000000000000000000',
              secondaryToWrapped: '0x0000000000000000000000000000000000000000',
              stableToWrapped: '0x0000000000000000000000000000000000000000',
              fee: 0.003,
            },
          },
          {
            versionTag: '2-1-0',
            version: { major: 2, minor: 1, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x0000000000000000000000000000000000000000',
              secondaryToWrapped: '0x0000000000000000000000000000000000000000',
              stableToWrapped: '0x0000000000000000000000000000000000000000',
              fee: 0.003,
            },
          },
          {
            versionTag: '2-2-0',
            version: { major: 2, minor: 2, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x0000000000000000000000000000000000000000',
              secondaryToWrapped: '0x0000000000000000000000000000000000000000',
              stableToWrapped: '0x0000000000000000000000000000000000000000',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [avaxFujiChainId]: {
    //   chainId: avaxFujiChainId,
    //   dexType: 'TRADERJOE',
    //   tokens: {
    //     primary: UNIToken.AVALANCHE.FUJI(),
    //     secondary: AAVEToken.AVALANCHE.FUJI(),
    //     tertiary: COMPToken.AVALANCHE.FUJI(),
    //     noAllowance: WBTCToken.AVALANCHE.FUJI(),
    //   },
    //   stableTokens: {
    //     primary: DAIToken.AVALANCHE.FUJI(),
    //     secondary: USDTToken.AVALANCHE.FUJI(),
    //   },
    //   nativeTokens: {
    //     coin: AVAXToken.AVALANCHE.FUJI(),
    //     wrapped: WAVAXToken.AVALANCHE.FUJI(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //       {
    //         versionTag: '2-0-0',
    //         version: { major: 2, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //       {
    //         versionTag: '2-1-0',
    //         version: { major: 2, minor: 1, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //       {
    //         versionTag: '2-2-0',
    //         version: { major: 2, minor: 2, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [arbitrumMainChainId]: {
      chainId: arbitrumMainChainId,
      dexType: 'TRADERJOE',
      tokens: {
        primaryToken: JOEToken.ARBITRUM.MAINNET(),
        noAllowanceToken: WBTCToken.ARBITRUM.MAINNET(),
        noDirectToken: WBTCToken.ARBITRUM.MAINNET(),
        stableToken: USDCToken.ARBITRUM.MAINNET(),
        nativeCoin: ETHCoin.ARBITRUM.MAINNET(),
        nativeWrapped: WETHToken.ARBITRUM.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://arbiscan.io/address/0xaE4EC9901c3076D0DdBe76A520F9E90a6227aCB7#readContract
              primaryToWrapped: '0x4bD82226469519cB9336303bA2dE3897d7eC2a15',
              secondaryToWrapped: '0x65aF2910107E73fb1B1F6DF6bd844E33cEc7D36C',
              stableToWrapped: '0xe22831E8aC9fcac3Bb80C73b77Ee84f5501724d7',
              fee: 0.003,
            },
          },
          // {
          //   versionTag: '2-0-0',
          //   version: { major: 2, minor: 0, patch: 0 },
          //   pairAddresses: {
          //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     stableToWrapped: '0x0000000000000000000000000000000000000000',
          //     fee: 0.003,
          //   },
          // },
          // {
          //   versionTag: '2-1-0',
          //   version: { major: 2, minor: 1, patch: 0 },
          //   pairAddresses: {
          //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     stableToWrapped: '0x0000000000000000000000000000000000000000',
          //     fee: 0.003,
          //   },
          // },
          // {
          //   versionTag: '2-2-0',
          //   version: { major: 2, minor: 2, patch: 0 },
          //   pairAddresses: {
          //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     stableToWrapped: '0x0000000000000000000000000000000000000000',
          //     fee: 0.003,
          //   },
          // },
        ],
      },
    },
    [bscMainChainId]: {
      chainId: bscMainChainId,
      dexType: 'TRADERJOE',
      tokens: {
        primaryToken: JOEToken.BSC.MAINNET(),
        noAllowanceToken: RDNTToken.BSC.MAINNET(),
        noDirectToken: RDNTToken.BSC.MAINNET(),
        stableToken: USDCToken.BSC.MAINNET(),
        nativeCoin: BNBToken.BSC.MAINNET(),
        nativeWrapped: WBNBToken.BSC.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://bscscan.com/address/0x4f8bdc85E3eec5b9dE67097c3f59B6Db025d9986#readContract
              primaryToWrapped: '0x3e008F9c8d42cF2DC5A7EEE63F4e389ac5eAD233',
              secondaryToWrapped: '0x9F5E2954e388aa2763F77e9EA607823C7A53de43',
              stableToWrapped: '0x36Ef351f325652fd1FB4ae3797bd26D20FC83d46',
              fee: 0.003,
            },
          },
          // {
          //   versionTag: '2-0-0',
          //   version: { major: 2, minor: 0, patch: 0 },
          //   pairAddresses: {
          //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     stableToWrapped: '0x0000000000000000000000000000000000000000',
          //     fee: 0.003,
          //   },
          // },
          // {
          //   versionTag: '2-1-0',
          //   version: { major: 2, minor: 1, patch: 0 },
          //   pairAddresses: {
          //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
          //     stableToWrapped: '0x0000000000000000000000000000000000000000',
          //     fee: 0.003,
          //   },
          // },
        ],
      },
    },
    // [bscTestChainId]: {
    //   chainId: bscTestChainId,
    //   dexType: 'TRADERJOE',
    //   tokens: {
    //     primary: UNIToken.BSC.TESTNET(),
    //     secondary: AAVEToken.BSC.TESTNET(),
    //     tertiary: COMPToken.BSC.TESTNET(),
    //     noAllowance: WBTCToken.BSC.TESTNET(),
    //   },
    //   stableTokens: {
    //     primary: DAIToken.BSC.TESTNET(),
    //     secondary: USDTToken.BSC.TESTNET(),
    //   },
    //   nativeTokens: {
    //     coin: BNBToken.BSC.TESTNET(),
    //     wrapped: WBNBToken.BSC.TESTNET(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     stableToWrapped: '0x0000000000000000000000000000000000000000',
    //     fee: 0.003,
    //   },
    // },
    // {
    //   versionTag: '2-0-0',
    //   version: { major: 2, minor: 0, patch: 0 },
    //   pairAddresses: {
    //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     stableToWrapped: '0x0000000000000000000000000000000000000000',
    //     fee: 0.003,
    //   },
    // },
    // {
    //   versionTag: '2-1-0',
    //   version: { major: 2, minor: 1, patch: 0 },
    //   pairAddresses: {
    //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     stableToWrapped: '0x0000000000000000000000000000000000000000',
    //     fee: 0.003,
    //   },
    //       },
    //     ],
    //   },
    // },
    // [ethMainChainId]: {
    //   chainId: ethMainChainId,
    //   dexType: 'TRADERJOE',
    //   tokens: {
    //     primaryToken: UNIToken.ETH.MAINNET(),
    //     noAllowanceToken: WBTCToken.ETH.MAINNET(),
    //     stableToken: DAIToken.ETH.MAINNET(),
    //     nativeCoin: ETHCoin.ETH.MAINNET(),
    //     nativeWrapped: WETHToken.ETH.MAINNET(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '2-1-0',
    //         version: { major: 2, minor: 1, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //           fee: 0.003,
    //         },
    //       },
    //     ],
    //   },
    // },
  },

  UNISWAP: {
    [arbitrumMainChainId]: {
      chainId: arbitrumMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: UNIToken.ARBITRUM.MAINNET(),
        noAllowanceToken: WBTCToken.ARBITRUM.MAINNET(),
        noDirectToken: WBTCToken.ARBITRUM.MAINNET(),
        stableToken: USDCToken.ARBITRUM.MAINNET(),
        nativeCoin: ETHCoin.ARBITRUM.MAINNET(),
        nativeWrapped: WETHToken.ARBITRUM.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://arbiscan.io/address/0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9#readContract
              primaryToWrapped: '0xFCa2b3892435C4d5B5E0e0E04312022ecE647fa2',
              secondaryToWrapped: '0x8c1D83A25eE2dA1643A5d937562682b1aC6C856B',
              stableToWrapped: '0xF64Dfe17C8b87F012FCf50FbDA1D62bfA148366a',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://arbiscan.io/address/0x1f98431c8ad98523631ae4a59f267346ea31f984#readContract
              primaryToWrapped: {
                address: '0xff96D42dc8E2700ABAb1f1F82Ecf699caA1a2056',
                feeTier: 500,
              },
              secondaryToWrapped: {
                address: '0x2f5e87C9312fa29aed5c179E456625D79015299c',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0xa7992f17a1fb235cc090FD08e81c1730F5E2997F',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    // [arbitrumSepoliaChainId]: {
    //   chainId: arbitrumSepoliaChainId,
    //   dexType: 'UNISWAP',
    //   tokens: {
    //     primary: UNIToken.ARBITRUM.SEPOLIA(),
    //     secondary: AAVEToken.ARBITRUM.SEPOLIA(),
    //     tertiary: COMPToken.ARBITRUM.SEPOLIA(),
    //     noAllowance: WBTCToken.ARBITRUM.SEPOLIA(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.ARBITRUM.SEPOLIA(),
    //     secondary: USDTToken.ARBITRUM.SEPOLIA(),
    //   },
    //   nativeTokens: {
    //     coin: ETHCoin.ARBITRUM.SEPOLIA(),
    //     wrapped: WETHToken.ARBITRUM.SEPOLIA(),
    //   },
    //   pairAddresses: {
    //     primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //     secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //   },
    //   versions: {
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //       },
    //     ],
    //   },
    // },
    [avaxMainChainId]: {
      chainId: avaxMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: COQToken.AVALANCHE.MAINNET(),
        noAllowanceToken: AVIAToken.AVALANCHE.MAINNET(),
        noDirectToken: AVIAToken.AVALANCHE.MAINNET(),
        stableToken: USDCToken.AVALANCHE.MAINNET(),
        nativeCoin: AVAXToken.AVALANCHE.MAINNET(),
        nativeWrapped: WAVAXToken.AVALANCHE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x0CB193E49a14A455F764fE7996997599ba1edaEB',
              secondaryToWrapped: '0x42242dD79999c01b7019b87281554627C2d0dF74',
              stableToWrapped: '0x6239aE4D661379b71A90c4c79f0a95297342e391',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            tokenOverrides: {
              noAllowanceToken: NYAToken.AVALANCHE.MAINNET(),
            },
            poolAddresses: {
              // https://snowtrace.io/address/0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD/contract/43114/readContract?chainid=43114
              primaryToWrapped: {
                address: '0xe1e870FdFF3Ad67f2879542D841d8AB3e1406f4C',
                feeTier: 10_000,
              },
              secondaryToWrapped: {
                address: '0x9BA9C677D19347aBfbA1d6B6d6ceB61942071561',
                feeTier: 100,
              },
              stableToWrapped: {
                address: '0xfAe3f424a0a47706811521E3ee268f00cFb5c45E',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    [baseMainChainId]: {
      chainId: baseMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: PEPEToken.BASE.MAINNET(),
        noAllowanceToken: ZROToken.BASE.MAINNET(),
        noDirectToken: ZROToken.BASE.MAINNET(),
        stableToken: USDCToken.BASE.MAINNET(),
        nativeCoin: ETHCoin.BASE.MAINNET(),
        nativeWrapped: WETHToken.BASE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://basescan.org/address/0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6#readContract
              primaryToWrapped: '0xA2f5BA2C95C50eB3E5e83A2A08F8f1b0c6B30E06',
              secondaryToWrapped: '0x79Cf037d91E0445909B79A2D446385352E73c1B0',
              stableToWrapped: '0x88A43bbDF9D098eEC7bCEda4e2494615dfD9bB9C',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://basescan.org/address/0x33128a8fC17869897dcE68Ed026d694621f6FDfD#readContract
              primaryToWrapped: {
                address: '0x0FB597D6cFE5bE0d5258A7f017599C2A4Ece34c7',
                feeTier: 10_000,
              },
              secondaryToWrapped: {
                address: '0xa2d4A8e00dAaD32aCACe1A0dD0905f6aaF57E84e',
                feeTier: 3_000,
              },
              stableToWrapped: {
                address: '0xd0b53D9277642d899DF5C87A3966A349A798F224',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    // [baseSepoliaChainId]: {
    //   chainId: baseSepoliaChainId,
    //   dexType: 'UNISWAP',
    //   tokens: {
    //     primary: UNIToken.BASE.SEPOLIA(),
    //     secondary: AAVEToken.BASE.SEPOLIA(),
    //     tertiary: COMPToken.BASE.SEPOLIA(),
    //     noAllowance: WBTCToken.BASE.SEPOLIA(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.BASE.SEPOLIA(),
    //     secondary: USDTToken.BASE.SEPOLIA(),
    //   },
    //   nativeTokens: {
    //     coin: ETHCoin.BASE.SEPOLIA(),
    //     wrapped: WETHToken.BASE.SEPOLIA(),
    //   },
    //   versions: {
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //   secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //   stableToWrapped: '0x0000000000000000000000000000000000000000',
    //   fee: 0.003,
    // },
    //       },
    //     ],
    //   },
    // },
    [blastMainChainId]: {
      chainId: blastMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: RINGToken.BLAST.MAINNET(),
        noAllowanceToken: ESEToken.BLAST.MAINNET(),
        noDirectToken: ESEToken.BLAST.MAINNET(),
        stableToken: USDBToken.BLAST.MAINNET(),
        nativeCoin: ETHCoin.BLAST.MAINNET(),
        nativeWrapped: WETHToken.BLAST.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://blastscan.io/address/0x5C346464d33F90bABaf70dB6388507CC889C1070#readContract
              primaryToWrapped: '0x2cC64137E59f29BD16E486ea2C5d94962dF6Fa1c',
              secondaryToWrapped: '0xF2bF40Ea6307b74b90Ba95b22E10Fb52922a7889',
              stableToWrapped: '0xAd06cD451fe4034a6dD515Af08E222a3d95B4A1C',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            tokenOverrides: {
              primaryToken: YOLOToken.BLAST.MAINNET(),
            },
            poolAddresses: {
              // https://blastscan.io/address/0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd#readContract
              primaryToWrapped: {
                address: '0x258bA3B253e5cc3BaB01c28d2f527aacD6D96793',
                feeTier: 10_000,
              },
              secondaryToWrapped: {
                address: '0x0f6C5fDCB927B99b3040c609BEF07BDFc59a6173',
                feeTier: 3_000,
              },
              stableToWrapped: {
                address: '0xf5A23bDD36a56EDe75D503F6f643d5eaF25B1a8F',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    [celoMainChainId]: {
      chainId: celoMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: CELOToken.CELO.MAINNET(),
        noAllowanceToken: WBTCToken.CELO.MAINNET(),
        noDirectToken: WBTCToken.CELO.MAINNET(),
        stableToken: USDCToken.CELO.MAINNET(),
        nativeCoin: ETHCoin.CELO.MAINNET(),
        nativeWrapped: WETHToken.CELO.MAINNET(),
      },
      versions: {
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://celoscan.io/address/0xAfE208a311B21f13EF87E33A90049fC17A7acDEc#readContract
              primaryToWrapped: {
                address: '0xd88D5F9E6c10E6FebC9296A454f6C2589b1E8fAE',
                feeTier: 3_000,
              },
              secondaryToWrapped: {
                address: '0xBd6313D0796984c578caE6bC5b5E23b27c5540c5',
                feeTier: 3_000,
              },
              stableToWrapped: {
                address: '0xE426E1305f5e6093864762Bf9d2D8B44BC211c59',
                feeTier: 3_000,
              },
            },
          },
        ],
      },
    },
    // [celoAlfajoresChainId]: {
    //   chainId: celoAlfajoresChainId,
    //   dexType: 'UNISWAP',
    //   tokens: {
    //     primary: UNIToken.CELO.ALFAJORES(),
    //     secondary: AAVEToken.CELO.ALFAJORES(),
    //     tertiary: COMPToken.CELO.ALFAJORES(),
    //     noAllowance: WBTCToken.CELO.ALFAJORES(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.CELO.ALFAJORES(),
    //     secondary: USDTToken.CELO.ALFAJORES(),
    //   },
    //   nativeTokens: {
    //     coin: ETHCoin.CELO.ALFAJORES(),
    //     wrapped: WETHToken.CELO.ALFAJORES(),
    //   },
    //   versions: {
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [ethMainChainId]: {
      chainId: ethMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: UNIToken.ETH.MAINNET(),
        noAllowanceToken: WBTCToken.ETH.MAINNET(),
        noDirectToken: WBTCToken.ETH.MAINNET(),
        stableToken: USDCToken.ETH.MAINNET(),
        nativeCoin: ETHCoin.ETH.MAINNET(),
        nativeWrapped: WETHToken.ETH.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#readContract
              primaryToWrapped: '0xd3d2E2692501A5c9Ca623199D38826e513033a17',
              secondaryToWrapped: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940',
              stableToWrapped: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#readContract
              primaryToWrapped: {
                address: '0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801',
                feeTier: 3_000,
              },
              secondaryToWrapped: {
                address: '0xCBCdF9626bC03E24f779434178A73a0B4bad62eD',
                feeTier: 3_000,
              },
              stableToWrapped: {
                address: '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    // [ethSepoliaChainId]: {
    //   chainId: ethSepoliaChainId,
    //   dexType: 'UNISWAP',
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         tokens: {
    //           primaryToken: UNIToken.ETH.SEPOLIA(),
    //           noAllowanceToken: WBTCToken.ETH.SEPOLIA(),
    //           stableToken: USDCToken.ETH.SEPOLIA(),
    //           nativeCoin: ETHCoin.ETH.SEPOLIA(),
    //           nativeWrapped: WETHToken.ETH.SEPOLIA(),
    //         },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //           fee: 0.003,
    //         },
    //       },
    //     ],
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         tokens: {
    //           primaryToken: UNIToken.ETH.SEPOLIA(),
    //           noAllowanceToken: WBTCToken.ETH.SEPOLIA(),
    //           stableToken: USDCToken.ETH.SEPOLIA(),
    //           nativeCoin: ETHCoin.ETH.SEPOLIA(),
    //           nativeWrapped: WETHToken.ETH.SEPOLIA(),
    //         },
    //         poolAddresses: {
    //           primaryToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 500,
    //           },
    //           secondaryToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 500,
    //           },
    //           stableToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 500,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
    [polygonMainChainId]: {
      chainId: polygonMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: UNIToken.POLYGON.MAINNET(),
        noAllowanceToken: LINKToken.POLYGON.MAINNET(),
        noDirectToken: LINKToken.POLYGON.MAINNET(),
        stableToken: USDCToken.POLYGON.MAINNET(),
        nativeCoin: POLToken.POLYGON.MAINNET(),
        nativeWrapped: WPOLToken.POLYGON.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://polygonscan.com/address/0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C#readContract
              primaryToWrapped: '0x024Bb5A825b4ea68De28A7075F6e7Fc66916c93a',
              secondaryToWrapped: '0x2197aDCA6079CB864D96618033ad61eD2c058e78',
              stableToWrapped: '0x1f0c5400A3C7E357CC7c9A3D2f7Fe6DDF629D868',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://polygonscan.com/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#readContract
              primaryToWrapped: {
                address: '0x357faF5843c7FD7fb4E34FBEabDAc16eabE8a5bc',
                feeTier: 3_000,
              },
              secondaryToWrapped: {
                address: '0x0A28C2F5E0E8463E047C203F00F649812aE67E4f',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0xB6e57ed85c4c9dbfEF2a68711e9d6f36c56e0FcB',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
    // [polygonAmoyChainId]: {
    //   chainId: polygonAmoyChainId,
    //   dexType: 'UNISWAP',
    //   tokens: {
    //     primary: UNIToken.POLYGON.AMOY(),
    //     secondary: AAVEToken.POLYGON.AMOY(),
    //     tertiary: COMPToken.POLYGON.AMOY(),
    //     noAllowance: WBTCToken.POLYGON.AMOY(),
    //   },
    //   stableTokens: {
    //     primary: USDCToken.POLYGON.AMOY(),
    //     secondary: USDTToken.POLYGON.AMOY(),
    //   },
    //   nativeTokens: {
    //     coin: POLToken.POLYGON.AMOY(),
    //     wrapped: WPOLToken.POLYGON.AMOY(),
    //   },
    //   versions: {
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
    [zoraMainChainId]: {
      chainId: zoraMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: IMAGINEToken.ZORA.MAINNET(),
        noAllowanceToken: ENJOYToken.ZORA.MAINNET(),
        noDirectToken: ENJOYToken.ZORA.MAINNET(),
        stableToken: USDCToken.ZORA.MAINNET(),
        nativeCoin: ETHCoin.ZORA.MAINNET(),
        nativeWrapped: WETHToken.ZORA.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://explorer.zora.energy/address/0x0F797dC7efaEA995bB916f268D919d0a1950eE3C?tab=read_contract
              primaryToWrapped: '0x6F82d1F7fb194f7C7e597123D810c688612d682F',
              secondaryToWrapped: '0x3a3F615b05AAD54d8A7Af1D1B20854f0513278Da',
              stableToWrapped: '0x88Ac3948338b624b0A66015D8A9c9d1D7eD9FdAd',
              fee: 0.003,
            },
          },
        ],
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://explorer.zora.energy/address/0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb?tab=read_contract
              primaryToWrapped: {
                address: '0x86c2Fd1C99D8b7FF541767A4748B2Eb38Fd43dA8',
                feeTier: 10_000,
              },
              secondaryToWrapped: {
                address: '0x1Ed9b524d6f395ECc61aa24537f87a0482933069',
                feeTier: 3_000,
              },
              stableToWrapped: {
                address: '0xbC59f8F3b275AA56A90D13bAE7cCe5e6e11A3b17',
                feeTier: 3_000,
              },
            },
          },
        ],
      },
    },
    // [zoraSepoliaChainId]: {
    //   chainId: zoraSepoliaChainId,
    //   dexType: 'UNISWAP',
    //   versions: {
    //     v3: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         tokens: {
    //           primaryToken: UNIToken.ZORA.SEPOLIA(),
    //           noAllowanceToken: WBTCToken.ZORA.SEPOLIA(),
    //           stableToken: USDCToken.ZORA.SEPOLIA(),
    //           nativeCoin: ETHCoin.ZORA.SEPOLIA(),
    //           nativeWrapped: WETHToken.ZORA.SEPOLIA(),
    //         },
    //         poolAddresses: {
    //           primaryToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 3_000,
    //           },
    //           secondaryToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 500,
    //           },
    //           stableToWrapped: {
    //             address: '0x0000000000000000000000000000000000000000',
    //             feeTier: 500,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
    [zksyncMainChainId]: {
      chainId: zksyncMainChainId,
      dexType: 'UNISWAP',
      tokens: {
        primaryToken: XVSToken.ZKSYNC.MAINNET(),
        noAllowanceToken: WBTCToken.ZKSYNC.MAINNET(),
        noDirectToken: WBTCToken.ZKSYNC.MAINNET(),
        stableToken: USDCToken.ZKSYNC.MAINNET(),
        nativeCoin: ETHCoin.ZKSYNC.MAINNET(),
        nativeWrapped: WETHToken.ZKSYNC.MAINNET(),
      },
      versions: {
        v3: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            poolAddresses: {
              // https://era.zksync.network/address/0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422#readContract
              primaryToWrapped: {
                address: '0x4152fDBf1CE1957B6FAFD55737f96A26b787eE9A',
                feeTier: 3_000,
              },
              secondaryToWrapped: {
                address: '0xf8C42655373A280e8800BEeE44fcC12ffC99E797',
                feeTier: 500,
              },
              stableToWrapped: {
                address: '0xbEEA3B382696669e0E67C08Ea9f4aaE8d528Af0F',
                feeTier: 500,
              },
            },
          },
        ],
      },
    },
  },

  YETISWAP: {
    [avaxMainChainId]: {
      chainId: avaxMainChainId,
      dexType: 'YETISWAP',
      tokens: {
        primaryToken: YTSToken.AVALANCHE.MAINNET(),
        noAllowanceToken: USDTToken.AVALANCHE.MAINNET(),
        noDirectToken: WBTCToken.AVALANCHE.MAINNET(),
        stableToken: DAIToken.AVALANCHE.MAINNET(),
        nativeCoin: AVAXToken.AVALANCHE.MAINNET(),
        nativeWrapped: WAVAXToken.AVALANCHE.MAINNET(),
      },
      versions: {
        v2: [
          {
            versionTag: '1-0-0',
            version: { major: 1, minor: 0, patch: 0 },
            pairAddresses: {
              // https://snowtrace.io/address/0x58C8CD291Fa36130119E6dEb9E520fbb6AcA1c3a/contract/43114/readContract?chainid=43114
              primaryToWrapped: '0x07099b26f36FCB7E086d5A879EC1261271319829',
              secondaryToWrapped: '0x9AAb3C24ea953Dfa9BC09068a72A376a98451611',
              stableToWrapped: '0xe3194E0B3e5Def41342D43555EaD79c8Dc336684',
              fee: 0.003,
            },
          },
        ],
      },
    },
    // [avaxFujiChainId]: {
    //   chainId: avaxFujiChainId,
    //   dexType: 'YETISWAP',
    //   tokens: {
    //     primary: UNIToken.AVALANCHE.FUJI(),
    //     secondary: AAVEToken.AVALANCHE.FUJI(),
    //     tertiary: COMPToken.AVALANCHE.FUJI(),
    //     noAllowance: WBTCToken.AVALANCHE.FUJI(),
    //   },
    //   stableTokens: {
    //     primary: DAIToken.AVALANCHE.FUJI(),
    //     secondary: USDTToken.AVALANCHE.FUJI(),
    //   },
    //   nativeTokens: {
    //     coin: AVAXToken.AVALANCHE.FUJI(),
    //     wrapped: WAVAXToken.AVALANCHE.FUJI(),
    //   },
    //   versions: {
    //     v2: [
    //       {
    //         versionTag: '1-0-0',
    //         version: { major: 1, minor: 0, patch: 0 },
    //         pairAddresses: {
    //           primaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           secondaryToWrapped: '0x0000000000000000000000000000000000000000',
    //           stableToWrapped: '0x0000000000000000000000000000000000000000',
    //         },
    //       },
    //     ],
    //   },
    // },
  },
} as const
