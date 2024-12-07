export default [
  {
    inputs: [
      {
        internalType: 'contract ILBFactory',
        name: 'factory2_2',
        type: 'address',
      },
      {
        internalType: 'contract IJoeFactory',
        name: 'factoryV1',
        type: 'address',
      },
      {
        internalType: 'contract ILBLegacyFactory',
        name: 'legacyFactory',
        type: 'address',
      },
      {
        internalType: 'contract ILBLegacyRouter',
        name: 'legacyRouter',
        type: 'address',
      },
      {
        internalType: 'contract ILBFactory',
        name: 'factory2_1',
        type: 'address',
      },
      {
        internalType: 'contract IWNATIVE',
        name: 'wnative',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'JoeLibrary__InsufficientAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'JoeLibrary__InsufficientLiquidity',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountSlippage',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__AmountSlippageBPTooBig',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountXMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountX',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountY',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__AmountSlippageCaught',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__BinReserveOverflows',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__BrokenSwapSafetyCheck',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'currentTimestamp',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__DeadlineExceeded',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__FailedToSendNATIVE',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'idDesired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idSlippage',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__IdDesiredOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'id',
        type: 'int256',
      },
    ],
    name: 'LBRouter__IdOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'activeIdDesired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'idSlippage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'activeId',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__IdSlippageCaught',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__InsufficientAmountOut',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wrongToken',
        type: 'address',
      },
    ],
    name: 'LBRouter__InvalidTokenPath',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__InvalidVersion',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__LengthsMismatch',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountInMax',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__MaxAmountInExceeded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__NotFactoryOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenX',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenY',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__PairNotCreated',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__SenderIsNotWNATIVE',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__SwapOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'excess',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__TooMuchTokensIn',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reserve',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__WrongAmounts',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenX',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenY',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountX',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountY',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'msgValue',
        type: 'uint256',
      },
    ],
    name: 'LBRouter__WrongNativeLiquidityParameters',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__WrongTokenOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PackedUint128Math__SubUnderflow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokenHelper__TransferFailed',
    type: 'error',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'tokenX',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: 'tokenY',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'binStep',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountX',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountY',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountXMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountYMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'activeIdDesired',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'idSlippage',
            type: 'uint256',
          },
          {
            internalType: 'int256[]',
            name: 'deltaIds',
            type: 'int256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'distributionX',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'distributionY',
            type: 'uint256[]',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'refundTo',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILBRouter.LiquidityParameters',
        name: 'liquidityParameters',
        type: 'tuple',
      },
    ],
    name: 'addLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountXAdded',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYAdded',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountXLeft',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYLeft',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'depositIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'liquidityMinted',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'tokenX',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: 'tokenY',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'binStep',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountX',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountY',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountXMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountYMin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'activeIdDesired',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'idSlippage',
            type: 'uint256',
          },
          {
            internalType: 'int256[]',
            name: 'deltaIds',
            type: 'int256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'distributionX',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'distributionY',
            type: 'uint256[]',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'refundTo',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILBRouter.LiquidityParameters',
        name: 'liquidityParameters',
        type: 'tuple',
      },
    ],
    name: 'addLiquidityNATIVE',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountXAdded',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYAdded',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountXLeft',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYLeft',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'depositIds',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'liquidityMinted',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'tokenX',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'tokenY',
        type: 'address',
      },
      {
        internalType: 'uint24',
        name: 'activeId',
        type: 'uint24',
      },
      {
        internalType: 'uint16',
        name: 'binStep',
        type: 'uint16',
      },
    ],
    name: 'createLBPair',
    outputs: [
      {
        internalType: 'contract ILBPair',
        name: 'pair',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFactory',
    outputs: [
      {
        internalType: 'contract ILBFactory',
        name: 'lbFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFactoryV2_1',
    outputs: [
      {
        internalType: 'contract ILBFactory',
        name: 'lbFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILBPair',
        name: 'pair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'getIdFromPrice',
    outputs: [
      {
        internalType: 'uint24',
        name: '',
        type: 'uint24',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLegacyFactory',
    outputs: [
      {
        internalType: 'contract ILBLegacyFactory',
        name: 'legacyLBfactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLegacyRouter',
    outputs: [
      {
        internalType: 'contract ILBLegacyRouter',
        name: 'legacyRouter',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILBPair',
        name: 'pair',
        type: 'address',
      },
      {
        internalType: 'uint24',
        name: 'id',
        type: 'uint24',
      },
    ],
    name: 'getPriceFromId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILBPair',
        name: 'pair',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'amountOut',
        type: 'uint128',
      },
      {
        internalType: 'bool',
        name: 'swapForY',
        type: 'bool',
      },
    ],
    name: 'getSwapIn',
    outputs: [
      {
        internalType: 'uint128',
        name: 'amountIn',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'amountOutLeft',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'fee',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILBPair',
        name: 'pair',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'amountIn',
        type: 'uint128',
      },
      {
        internalType: 'bool',
        name: 'swapForY',
        type: 'bool',
      },
    ],
    name: 'getSwapOut',
    outputs: [
      {
        internalType: 'uint128',
        name: 'amountInLeft',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'amountOut',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'fee',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getV1Factory',
    outputs: [
      {
        internalType: 'contract IJoeFactory',
        name: 'factoryV1',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWNATIVE',
    outputs: [
      {
        internalType: 'contract IWNATIVE',
        name: 'wnative',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'tokenX',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'tokenY',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'amountXMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountYMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountX',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountY',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'amountTokenMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountNATIVEMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address payable',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityNATIVE',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountToken',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountNATIVE',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactNATIVEForTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactNATIVEForTokensSupportingFeeOnTransferTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMinNATIVE',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address payable',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForNATIVE',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMinNATIVE',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address payable',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForNATIVESupportingFeeOnTransferTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapNATIVEForExactTokens',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amountsIn',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountNATIVEOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountInMax',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address payable',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapTokensForExactNATIVE',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amountsIn',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountInMax',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapTokensForExactTokens',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amountsIn',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'sweep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ILBToken',
        name: 'lbToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'sweepLBToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]
