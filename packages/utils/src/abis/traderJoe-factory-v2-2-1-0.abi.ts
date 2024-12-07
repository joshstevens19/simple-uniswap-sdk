export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_flashLoanFee',
        type: 'uint256',
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
    name: 'LBFactory__AddressZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__BinStepHasNoPreset',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'lowerBound',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: 'binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'higherBound',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__BinStepRequirementsBreached',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'filterPeriod',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'decayPeriod',
        type: 'uint16',
      },
    ],
    name: 'LBFactory__DecreasingPeriods',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBFactory__FactoryLockIsAlreadyInTheSameState',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fees',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFees',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__FeesAboveMax',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fees',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFees',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__FlashLoanFeeAboveMax',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'LBFactory__FunctionIsLockedForUsers',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'LBFactory__IdenticalAddresses',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBFactory__ImplementationNotSet',
    type: 'error',
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
        internalType: 'uint256',
        name: '_binStep',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__LBPairAlreadyExists',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBFactory__LBPairIgnoredIsAlreadyInTheSameState',
    type: 'error',
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
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__LBPairNotCreated',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'LBPairImplementation',
        type: 'address',
      },
    ],
    name: 'LBFactory__LBPairSafetyCheckFailed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'protocolShare',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__ProtocolShareOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'quoteAsset',
        type: 'address',
      },
    ],
    name: 'LBFactory__QuoteAssetAlreadyWhitelisted',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'quoteAsset',
        type: 'address',
      },
    ],
    name: 'LBFactory__QuoteAssetNotWhitelisted',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'reductionFactor',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'max',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__ReductionFactorOverflows',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'feeRecipient',
        type: 'address',
      },
    ],
    name: 'LBFactory__SameFeeRecipient',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'flashLoanFee',
        type: 'uint256',
      },
    ],
    name: 'LBFactory__SameFlashLoanFee',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'LBPairImplementation',
        type: 'address',
      },
    ],
    name: 'LBFactory__SameImplementation',
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
    inputs: [],
    name: 'PendingOwnable__AddressZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PendingOwnable__NoPendingOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PendingOwnable__NotOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PendingOwnable__NotPendingOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PendingOwnable__PendingOwnerAlreadySet',
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
    name: 'SafeCast__Exceeds16Bits',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'unlocked',
        type: 'bool',
      },
    ],
    name: 'FactoryLockedStatusUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract ILBPair',
        name: 'LBPair',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseFactor',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filterPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'decayPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reductionFactor',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'variableFeeControl',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolShare',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxVolatilityAccumulated',
        type: 'uint256',
      },
    ],
    name: 'FeeParametersSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldRecipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newRecipient',
        type: 'address',
      },
    ],
    name: 'FeeRecipientSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldFlashLoanFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFlashLoanFee',
        type: 'uint256',
      },
    ],
    name: 'FlashLoanFeeSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'tokenX',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'tokenY',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract ILBPair',
        name: 'LBPair',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256',
      },
    ],
    name: 'LBPairCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract ILBPair',
        name: 'LBPair',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'ignored',
        type: 'bool',
      },
    ],
    name: 'LBPairIgnoredStateChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldLBPairImplementation',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'LBPairImplementation',
        type: 'address',
      },
    ],
    name: 'LBPairImplementationSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'PendingOwnerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
    ],
    name: 'PresetRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseFactor',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filterPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'decayPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reductionFactor',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'variableFeeControl',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolShare',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxVolatilityAccumulated',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sampleLifetime',
        type: 'uint256',
      },
    ],
    name: 'PresetSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'quoteAsset',
        type: 'address',
      },
    ],
    name: 'QuoteAssetAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'quoteAsset',
        type: 'address',
      },
    ],
    name: 'QuoteAssetRemoved',
    type: 'event',
  },
  {
    inputs: [],
    name: 'LBPairImplementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_BIN_STEP',
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
    inputs: [],
    name: 'MAX_FEE',
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
    inputs: [],
    name: 'MAX_PROTOCOL_SHARE',
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
    inputs: [],
    name: 'MIN_BIN_STEP',
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
        internalType: 'contract IERC20',
        name: '_quoteAsset',
        type: 'address',
      },
    ],
    name: 'addQuoteAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'allLBPairs',
    outputs: [
      {
        internalType: 'contract ILBPair',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'becomeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: '_LBPair',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'creationUnlocked',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeRecipient',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'flashLoanFee',
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
    ],
    name: 'forceDecay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllBinSteps',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'presetsBinStep',
        type: 'uint256[]',
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
    ],
    name: 'getAllLBPairs',
    outputs: [
      {
        components: [
          {
            internalType: 'uint16',
            name: 'binStep',
            type: 'uint16',
          },
          {
            internalType: 'contract ILBPair',
            name: 'LBPair',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'createdByOwner',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'ignoredForRouting',
            type: 'bool',
          },
        ],
        internalType: 'struct ILBFactory.LBPairInformation[]',
        name: 'LBPairsAvailable',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_tokenA',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: '_tokenB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_binStep',
        type: 'uint256',
      },
    ],
    name: 'getLBPairInformation',
    outputs: [
      {
        components: [
          {
            internalType: 'uint16',
            name: 'binStep',
            type: 'uint16',
          },
          {
            internalType: 'contract ILBPair',
            name: 'LBPair',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'createdByOwner',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'ignoredForRouting',
            type: 'bool',
          },
        ],
        internalType: 'struct ILBFactory.LBPairInformation',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumberOfLBPairs',
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
    inputs: [],
    name: 'getNumberOfQuoteAssets',
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
        internalType: 'uint16',
        name: '_binStep',
        type: 'uint16',
      },
    ],
    name: 'getPreset',
    outputs: [
      {
        internalType: 'uint256',
        name: 'baseFactor',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filterPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'decayPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reductionFactor',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'variableFeeControl',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'protocolShare',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxVolatilityAccumulated',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sampleLifetime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'getQuoteAsset',
    outputs: [
      {
        internalType: 'contract IERC20',
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
        name: '_token',
        type: 'address',
      },
    ],
    name: 'isQuoteAsset',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [
      {
        internalType: 'address',
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
        internalType: 'uint16',
        name: '_binStep',
        type: 'uint16',
      },
    ],
    name: 'removePreset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_quoteAsset',
        type: 'address',
      },
    ],
    name: 'removeQuoteAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'revokePendingOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_locked',
        type: 'bool',
      },
    ],
    name: 'setFactoryLockedState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeRecipient',
        type: 'address',
      },
    ],
    name: 'setFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint16',
        name: '_baseFactor',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_filterPeriod',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_decayPeriod',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_reductionFactor',
        type: 'uint16',
      },
      {
        internalType: 'uint24',
        name: '_variableFeeControl',
        type: 'uint24',
      },
      {
        internalType: 'uint16',
        name: '_protocolShare',
        type: 'uint16',
      },
      {
        internalType: 'uint24',
        name: '_maxVolatilityAccumulated',
        type: 'uint24',
      },
    ],
    name: 'setFeesParametersOnPair',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_flashLoanFee',
        type: 'uint256',
      },
    ],
    name: 'setFlashLoanFee',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint256',
        name: '_binStep',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_ignored',
        type: 'bool',
      },
    ],
    name: 'setLBPairIgnored',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_LBPairImplementation',
        type: 'address',
      },
    ],
    name: 'setLBPairImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner_',
        type: 'address',
      },
    ],
    name: 'setPendingOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_binStep',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_baseFactor',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_filterPeriod',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_decayPeriod',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_reductionFactor',
        type: 'uint16',
      },
      {
        internalType: 'uint24',
        name: '_variableFeeControl',
        type: 'uint24',
      },
      {
        internalType: 'uint16',
        name: '_protocolShare',
        type: 'uint16',
      },
      {
        internalType: 'uint24',
        name: '_maxVolatilityAccumulated',
        type: 'uint24',
      },
      {
        internalType: 'uint16',
        name: '_sampleLifetime',
        type: 'uint16',
      },
    ],
    name: 'setPreset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
