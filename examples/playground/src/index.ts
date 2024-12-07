import {
  simpleTrade,
  simpleTradeWithApproveAndSwap,
  simpleMultiDexTrade,
  simpleTradeWithSettings,
  simpleTradeWithPriceContext,
  AdvancedProviderTrade,
  customDexAndNetwork,
  simpleTradeWithQuoteChangedSubscription,
  simpleTradeWithManualRequote,
  approvingMaxRouterAllowanceDirectly,
  getVersionedRoutePathsByDex,
  getRouteQuotes,
  getPoolReserves,
  getTokens,
  getTokensWithCustomTokenList,
  getAllowancesAndBalanceOfForMultipleTokens,
  getToken,
  getTokenWithCustomTokenList,
  getBalanceOfCoin,
  getBalanceOfToken,
  encodeApproveAllowanceTxData,
  interactingWithTokenContract,
  interactingWithTokenContractMulticall,
  getTokenListAllTokensWithBalance,
  getTokenListAllTokens,
  getTokenListToken,
  getTokenListWithCustomTokenList,
  interactingWithErc20Contract,
  interactingWithErc20ContractMulticall,
  prepareContractContextsWithDexMulticall,
  addLiquidity,
  removeLiquidity,
  liquidityWithApproveAndAdd,
  liquidityWithApproveAndRemove,
  liquidityAddWithSubscription,
  liquidityRemoveWithSubscription,
} from './playground'

export const functionConfig = {
  // ------------------------
  // Trade
  // ------------------------

  simpleTrade: true,
  simpleTradeWithApproveAndSwap: false,
  simpleMultiDexTrade: false,
  simpleTradeWithSettings: false,
  simpleTradeWithPriceContext: false,
  advancedProviderTrade: false,
  customDexAndNetwork: false,
  simpleTradeWithQuoteChangedSubscription: false,
  simpleTradeWithManualRequote: false,
  approvingMaxRouterAllowanceDirectly: false,

  // ------------------------
  // Router
  // ------------------------

  getVersionedRoutePathsByDex: false,
  getRouteQuotes: false,
  getPoolReserves: false,

  // ------------------------
  // Token
  // ------------------------

  getToken: false,
  getTokenWithCustomTokenList: false,
  getBalanceOfCoin: false,
  getBalanceOfToken: false,
  encodeApproveAllowanceTxData: false,
  interactingWithTokenContract: false,
  interactingWithTokenContractMulticall: false,

  // ------------------------
  // Tokens
  // ------------------------
  getTokens: false,
  getTokensWithCustomTokenList: false,
  getAllowancesAndBalanceOfForMultipleTokens: false,
  getTokenListAllTokensWithBalance: false,

  // ------------------------
  // Token List
  // ------------------------

  getTokenListAllTokens: false,
  getTokenListToken: false,
  getTokenListWithCustomTokenList: false,

  // ------------------------
  // Contract
  // ------------------------

  interactingWithErc20Contract: false,
  interactingWithErc20ContractMulticall: false,
  prepareContractContextsWithDexMulticall: false,

  // ------------------------
  // Liquidity
  // ------------------------

  addLiquidity: false,
  removeLiquidity: false,
  liquidityWithApproveAndAdd: false,
  liquidityWithApproveAndRemove: false,
  liquidityAddWithSubscription: false,
  liquidityRemoveWithSubscription: false,
}

export async function runConfiguredFunctions() {
  // ------------------------
  // Trade
  // ------------------------

  if (functionConfig.simpleTrade) await simpleTrade()
  if (functionConfig.simpleTradeWithApproveAndSwap)
    await simpleTradeWithApproveAndSwap()
  if (functionConfig.simpleMultiDexTrade) await simpleMultiDexTrade()
  if (functionConfig.simpleTradeWithSettings) await simpleTradeWithSettings()
  if (functionConfig.simpleTradeWithPriceContext)
    await simpleTradeWithPriceContext()
  if (functionConfig.advancedProviderTrade) await AdvancedProviderTrade()
  if (functionConfig.customDexAndNetwork) await customDexAndNetwork()
  if (functionConfig.simpleTradeWithQuoteChangedSubscription)
    await simpleTradeWithQuoteChangedSubscription()
  if (functionConfig.simpleTradeWithManualRequote)
    await simpleTradeWithManualRequote()
  if (functionConfig.approvingMaxRouterAllowanceDirectly)
    await approvingMaxRouterAllowanceDirectly()

  // ------------------------
  // Router
  // ------------------------

  if (functionConfig.getVersionedRoutePathsByDex)
    await getVersionedRoutePathsByDex()
  if (functionConfig.getRouteQuotes) await getRouteQuotes()
  if (functionConfig.getPoolReserves) await getPoolReserves()
  if (functionConfig.getTokens) await getTokens()
  if (functionConfig.getTokensWithCustomTokenList)
    await getTokensWithCustomTokenList()
  if (functionConfig.getAllowancesAndBalanceOfForMultipleTokens)
    await getAllowancesAndBalanceOfForMultipleTokens()

  // ------------------------
  // Token
  // ------------------------

  if (functionConfig.getToken) await getToken()
  if (functionConfig.getTokenWithCustomTokenList)
    await getTokenWithCustomTokenList()
  if (functionConfig.getBalanceOfCoin) await getBalanceOfCoin()
  if (functionConfig.getBalanceOfToken) await getBalanceOfToken()
  if (functionConfig.encodeApproveAllowanceTxData)
    await encodeApproveAllowanceTxData()
  if (functionConfig.interactingWithTokenContract)
    await interactingWithTokenContract()
  if (functionConfig.interactingWithTokenContractMulticall)
    await interactingWithTokenContractMulticall()
  if (functionConfig.getTokenListAllTokensWithBalance)
    await getTokenListAllTokensWithBalance()

  // ------------------------
  // Token List
  // ------------------------

  if (functionConfig.getTokenListAllTokens) await getTokenListAllTokens()
  if (functionConfig.getTokenListToken) await getTokenListToken()
  if (functionConfig.getTokenListWithCustomTokenList)
    await getTokenListWithCustomTokenList()

  // ------------------------
  // Contract
  // ------------------------

  if (functionConfig.interactingWithErc20Contract)
    await interactingWithErc20Contract()
  if (functionConfig.interactingWithErc20ContractMulticall)
    await interactingWithErc20ContractMulticall()
  if (functionConfig.prepareContractContextsWithDexMulticall)
    await prepareContractContextsWithDexMulticall()

  // ------------------------
  // Liquidity
  // ------------------------

  if (functionConfig.addLiquidity) await addLiquidity()
  if (functionConfig.removeLiquidity) await removeLiquidity()
  if (functionConfig.liquidityWithApproveAndAdd)
    await liquidityWithApproveAndAdd()
  if (functionConfig.liquidityWithApproveAndRemove)
    await liquidityWithApproveAndRemove()
  if (functionConfig.liquidityAddWithSubscription)
    await liquidityAddWithSubscription()
  if (functionConfig.liquidityRemoveWithSubscription)
    await liquidityRemoveWithSubscription()
}

runConfiguredFunctions()
