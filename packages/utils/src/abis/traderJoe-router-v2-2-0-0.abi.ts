export default [
  {
    inputs: [
      {
        internalType: 'contract ILBFactory',
        name: '_factory',
        type: 'address',
      },
      {
        internalType: 'contract IJoeFactory',
        name: '_oldFactory',
        type: 'address',
      },
      {
        internalType: 'contract IWAVAX',
        name: '_wavax',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'bp',
        type: 'uint256',
      },
    ],
    name: 'BinHelper__BinStepOverflows',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BinHelper__IdOverflows',
    type: 'error',
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
    name: 'LBRouter__FailedToSendAVAX',
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
    name: 'LBRouter__SenderIsNotWAVAX',
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
    name: 'LBRouter__WrongAvaxLiquidityParameters',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBRouter__WrongTokenOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Math128x128__LogUnderflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
      {
        internalType: 'int256',
        name: 'y',
        type: 'int256',
      },
    ],
    name: 'Math128x128__PowerUnderflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'denominator',
        type: 'uint256',
      },
    ],
    name: 'Math512Bits__MulDivOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'prod1',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
    ],
    name: 'Math512Bits__MulShiftOverflow',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
    ],
    name: 'Math512Bits__OffsetOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
    ],
    name: 'SafeCast__Exceeds128Bits',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
    ],
    name: 'SafeCast__Exceeds40Bits',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokenHelper__CallFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokenHelper__NonContract',
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
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILBRouter.LiquidityParameters',
        name: '_liquidityParameters',
        type: 'tuple',
      },
    ],
    name: 'addLiquidity',
    outputs: [
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
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILBRouter.LiquidityParameters',
        name: '_liquidityParameters',
        type: 'tuple',
      },
    ],
    name: 'addLiquidityAVAX',
    outputs: [
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
        name: '_tokenX',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_tokenY',
        type: 'address',
      },
      {
        internalType: 'uint24',
        name: '_activeId',
        type: 'uint24',
      },
      {
        internalType: 'uint16',
        name: '_binStep',
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
    name: 'factory',
    outputs: [
      {
        internalType: 'contract ILBFactory',
        name: '',
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
        name: '_LBPair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_price',
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
    inputs: [
      {
        internalType: 'contract ILBPair',
        name: '_LBPair',
        type: 'address',
      },
      {
        internalType: 'uint24',
        name: '_id',
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
        name: '_LBPair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amountOut',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_swapForY',
        type: 'bool',
      },
    ],
    name: 'getSwapIn',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feesIn',
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
        name: '_LBPair',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amountIn',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_swapForY',
        type: 'bool',
      },
    ],
    name: 'getSwapOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feesIn',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oldFactory',
    outputs: [
      {
        internalType: 'contract IJoeFactory',
        name: '',
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
        name: '_tokenX',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_tokenY',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: '_binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '_amountXMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountYMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
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
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: '_binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '_amountTokenMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountAVAXMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: '_amounts',
        type: 'uint256[]',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'removeLiquidityAVAX',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountToken',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountAVAX',
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
        name: '_amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapAVAXForExactTokens',
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
        name: '_amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactAVAXForTokens',
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
        name: '_amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactAVAXForTokensSupportingFeeOnTransferTokens',
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
        name: '_amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountOutMinAVAX',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForAVAX',
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
        name: '_amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountOutMinAVAX',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForAVAXSupportingFeeOnTransferTokens',
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
        name: '_amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
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
        name: '_amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
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
        name: '_amountAVAXOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountInMax',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256',
      },
    ],
    name: 'swapTokensForExactAVAX',
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
        name: '_amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amountInMax',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_pairBinSteps',
        type: 'uint256[]',
      },
      {
        internalType: 'contract IERC20[]',
        name: '_tokenPath',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_deadline',
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
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'sweep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'wavax',
    outputs: [
      {
        internalType: 'contract IWAVAX',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]
