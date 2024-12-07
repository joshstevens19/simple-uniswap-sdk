export default [
  {
    inputs: [
      { internalType: 'address', name: 'feeRecipient', type: 'address' },
      { internalType: 'address', name: 'initialOwner', type: 'address' },
      { internalType: 'uint256', name: 'flashLoanFee', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'key', type: 'bytes32' }],
    name: 'EnumerableMapNonexistentKey',
    type: 'error',
  },
  { inputs: [], name: 'LBFactory__AddressZero', type: 'error' },
  {
    inputs: [{ internalType: 'uint256', name: 'binStep', type: 'uint256' }],
    name: 'LBFactory__BinStepHasNoPreset',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'binStep', type: 'uint256' }],
    name: 'LBFactory__BinStepTooLow',
    type: 'error',
  },
  { inputs: [], name: 'LBFactory__CannotGrantDefaultAdminRole', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'fees', type: 'uint256' },
      { internalType: 'uint256', name: 'maxFees', type: 'uint256' },
    ],
    name: 'LBFactory__FlashLoanFeeAboveMax',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'token', type: 'address' },
    ],
    name: 'LBFactory__IdenticalAddresses',
    type: 'error',
  },
  { inputs: [], name: 'LBFactory__ImplementationNotSet', type: 'error' },
  { inputs: [], name: 'LBFactory__InvalidHooksParameters', type: 'error' },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint256', name: '_binStep', type: 'uint256' },
    ],
    name: 'LBFactory__LBPairAlreadyExists',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint256', name: 'binStep', type: 'uint256' },
    ],
    name: 'LBFactory__LBPairDoesNotExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBFactory__LBPairIgnoredIsAlreadyInTheSameState',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint256', name: 'binStep', type: 'uint256' },
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
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'binStep', type: 'uint256' },
    ],
    name: 'LBFactory__PresetIsLockedForUsers',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LBFactory__PresetOpenStateIsAlreadyInTheSameState',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'quoteAsset', type: 'address' },
    ],
    name: 'LBFactory__QuoteAssetAlreadyWhitelisted',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'quoteAsset', type: 'address' },
    ],
    name: 'LBFactory__QuoteAssetNotWhitelisted',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'feeRecipient', type: 'address' },
    ],
    name: 'LBFactory__SameFeeRecipient',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'flashLoanFee', type: 'uint256' },
    ],
    name: 'LBFactory__SameFlashLoanFee',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hooksImplementation', type: 'address' },
    ],
    name: 'LBFactory__SameHooksImplementation',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'hooksParameters', type: 'bytes32' },
    ],
    name: 'LBFactory__SameHooksParameters',
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
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  { inputs: [], name: 'PairParametersHelper__InvalidParameter', type: 'error' },
  { inputs: [], name: 'SafeCast__Exceeds16Bits', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'x', type: 'uint256' },
      { internalType: 'int256', name: 'y', type: 'int256' },
    ],
    name: 'Uint128x128Math__PowUnderflow',
    type: 'error',
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
      { indexed: false, internalType: 'uint256', name: 'pid', type: 'uint256' },
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
      { indexed: false, internalType: 'bool', name: 'ignored', type: 'bool' },
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
    name: 'OwnershipTransferStarted',
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
        internalType: 'uint256',
        name: 'binStep',
        type: 'uint256',
      },
      { indexed: true, internalType: 'bool', name: 'isOpen', type: 'bool' },
    ],
    name: 'PresetOpenStateChanged',
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
        name: 'maxVolatilityAccumulator',
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
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LB_HOOKS_MANAGER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'quoteAsset', type: 'address' },
    ],
    name: 'addQuoteAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint24', name: 'activeId', type: 'uint24' },
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
    ],
    name: 'createLBPair',
    outputs: [
      { internalType: 'contract ILBPair', name: 'pair', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract ILBPair', name: 'pair', type: 'address' },
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
        name: 'binStepWithPreset',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
    ],
    name: 'getAllLBPairs',
    outputs: [
      {
        components: [
          { internalType: 'uint16', name: 'binStep', type: 'uint16' },
          { internalType: 'contract ILBPair', name: 'LBPair', type: 'address' },
          { internalType: 'bool', name: 'createdByOwner', type: 'bool' },
          { internalType: 'bool', name: 'ignoredForRouting', type: 'bool' },
        ],
        internalType: 'struct ILBFactory.LBPairInformation[]',
        name: 'lbPairsAvailable',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFeeRecipient',
    outputs: [
      { internalType: 'address', name: 'feeRecipient', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFlashLoanFee',
    outputs: [
      { internalType: 'uint256', name: 'flashLoanFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'getLBPairAtIndex',
    outputs: [
      { internalType: 'contract ILBPair', name: 'lbPair', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLBPairImplementation',
    outputs: [
      {
        internalType: 'address',
        name: 'lbPairImplementation',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenA', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenB', type: 'address' },
      { internalType: 'uint256', name: 'binStep', type: 'uint256' },
    ],
    name: 'getLBPairInformation',
    outputs: [
      {
        components: [
          { internalType: 'uint16', name: 'binStep', type: 'uint16' },
          { internalType: 'contract ILBPair', name: 'LBPair', type: 'address' },
          { internalType: 'bool', name: 'createdByOwner', type: 'bool' },
          { internalType: 'bool', name: 'ignoredForRouting', type: 'bool' },
        ],
        internalType: 'struct ILBFactory.LBPairInformation',
        name: 'lbPairInformation',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMaxFlashLoanFee',
    outputs: [{ internalType: 'uint256', name: 'maxFee', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMinBinStep',
    outputs: [{ internalType: 'uint256', name: 'minBinStep', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumberOfLBPairs',
    outputs: [
      { internalType: 'uint256', name: 'lbPairNumber', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumberOfQuoteAssets',
    outputs: [
      { internalType: 'uint256', name: 'numberOfQuoteAssets', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOpenBinSteps',
    outputs: [
      { internalType: 'uint256[]', name: 'openBinStep', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'binStep', type: 'uint256' }],
    name: 'getPreset',
    outputs: [
      { internalType: 'uint256', name: 'baseFactor', type: 'uint256' },
      { internalType: 'uint256', name: 'filterPeriod', type: 'uint256' },
      { internalType: 'uint256', name: 'decayPeriod', type: 'uint256' },
      { internalType: 'uint256', name: 'reductionFactor', type: 'uint256' },
      { internalType: 'uint256', name: 'variableFeeControl', type: 'uint256' },
      { internalType: 'uint256', name: 'protocolShare', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'maxVolatilityAccumulator',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'isOpen', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'getQuoteAssetAtIndex',
    outputs: [
      { internalType: 'contract IERC20', name: 'asset', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'token', type: 'address' },
    ],
    name: 'isQuoteAsset',
    outputs: [{ internalType: 'bool', name: 'isQuote', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
    ],
    name: 'removeLBHooksOnPair',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint16', name: 'binStep', type: 'uint16' }],
    name: 'removePreset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'quoteAsset', type: 'address' },
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
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'callerConfirmation', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'feeRecipient', type: 'address' },
    ],
    name: 'setFeeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
      { internalType: 'uint16', name: 'baseFactor', type: 'uint16' },
      { internalType: 'uint16', name: 'filterPeriod', type: 'uint16' },
      { internalType: 'uint16', name: 'decayPeriod', type: 'uint16' },
      { internalType: 'uint16', name: 'reductionFactor', type: 'uint16' },
      { internalType: 'uint24', name: 'variableFeeControl', type: 'uint24' },
      { internalType: 'uint16', name: 'protocolShare', type: 'uint16' },
      {
        internalType: 'uint24',
        name: 'maxVolatilityAccumulator',
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
      { internalType: 'uint256', name: 'flashLoanFee', type: 'uint256' },
    ],
    name: 'setFlashLoanFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
      { internalType: 'bytes32', name: 'hooksParameters', type: 'bytes32' },
      { internalType: 'bytes', name: 'onHooksSetData', type: 'bytes' },
    ],
    name: 'setLBHooksParametersOnPair',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: 'tokenX', type: 'address' },
      { internalType: 'contract IERC20', name: 'tokenY', type: 'address' },
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
      { internalType: 'bool', name: 'ignored', type: 'bool' },
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
        name: 'newLBPairImplementation',
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
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
      { internalType: 'uint16', name: 'baseFactor', type: 'uint16' },
      { internalType: 'uint16', name: 'filterPeriod', type: 'uint16' },
      { internalType: 'uint16', name: 'decayPeriod', type: 'uint16' },
      { internalType: 'uint16', name: 'reductionFactor', type: 'uint16' },
      { internalType: 'uint24', name: 'variableFeeControl', type: 'uint24' },
      { internalType: 'uint16', name: 'protocolShare', type: 'uint16' },
      {
        internalType: 'uint24',
        name: 'maxVolatilityAccumulator',
        type: 'uint24',
      },
      { internalType: 'bool', name: 'isOpen', type: 'bool' },
    ],
    name: 'setPreset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint16', name: 'binStep', type: 'uint16' },
      { internalType: 'bool', name: 'isOpen', type: 'bool' },
    ],
    name: 'setPresetOpenState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
