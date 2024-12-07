export enum ErrorCodes {
  // General Errors
  internalError = 1001,
  functionArgumentError = 1002,
  multicallError = 1003,
  versionNotSupported = 1004,
  addressNotValid = 1005,

  // Route Errors
  noRoutesFound = 2001,
  invalidPairContext = 2002,
  invalidFromOrToContractToken = 2003,
  protocolNotSupported = 2004,
  protocolsMustNotBeAnEmptyArray = 2005,
  protocolsUnsupported = 2006,
  pairNotFound = 2007,
  invalidTokenListContext = 2008,

  // Token Errors
  fromTokenAddressRequired = 3001,
  fromTokenAddressNotValid = 3002,
  toTokenAddressRequired = 3003,
  toTokenAddressNotValid = 3004,
  tokenAddressNotValid = 3005,
  generateApproveRouterAllowanceTransactionNotAllowed = 3006,

  // Address Errors
  walletAddressRequired = 4001,
  walletAddressNotValid = 4002,

  // Chain Errors
  canNotFindChainId = 5001,
  tokenChainIdContractDoesNotExist = 5002,
  tradePathIsNotSupported = 5003,
  chainIdNotSupported = 5004,
  chainIdCanNotBeFound = 5005,
  nativeCoinMissingForChainId = 5006,
  nativeWrappedTokenMissingForChainId = 5007,

  // Provider Errors
  canNotFindProviderUrl = 6001,
  invalidDexProviderContext = 6002,

  // Liquidity Provider Fee Errors
  liquidityProviderFeeNotFound = 7001,
  liquidityPoolNotFound = 7002,
  liquidityPositionNotFound = 7003,

  // Contract Errors
  contractAddressNotFound = 8001,
  contractAbiNotFound = 8002,
  contractMethodsNotFound = 8003,
  contractDetailsNotFound = 8004,
  contractCallError = 8005,

  // Price Source Errors
  invalidPrice = 9001,
  invalidTickRange = 9002,

  // Reserve Errors
  poolNotFound = 10001,
  tokenNotFoundInReserves = 10002,

  // Config Errors
  dexConfigNotFound = 11001,

  // Transaction Errors
  transactionError = 12001,
}
