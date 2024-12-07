import { ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockDexConfig,
  MockDexProvider,
  MockDexVersionTagV2,
  MockFunToken,
  MockWrapped,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { RouterContractV2 } from '../../src/router/router-v2.contract'

if (MockDexConfig.protocols.protocolV2) {
  describe('RouterContractV2', () => {
    const { router, factory } =
      MockDexConfig.protocols.protocolV2?.[MockDexVersionTagV2] ?? {}

    if (!router) {
      throw new Error('Router contract not found')
    }

    if (!factory) {
      throw new Error('Factory not found')
    }

    const contract = new RouterContractV2(
      {
        chainId: MockChainId,
        provider: MockDexProvider.provider,
        tryAggregate: true,
      },
      router,
    )

    const tokenA = MockFunToken.contractAddress
    const tokenB = MockWrapped.contractAddress

    // ------------------------
    // Testing read methods
    // ------------------------

    // it('should return the correct WETH address', async () => {
    //   const result = await contract.WETH()
    //   expect(result).toBe(MockWrapped.contractAddress)
    // })

    // it('should return the correct factory address', async () => {
    //   const result = await contract.factory()
    //   expect(result).toBe(factory.address)
    // })

    // it('should return the correct amount required to obtain a specific output', async () => {
    //   const result = await contract.getAmountIn(
    //     '1000000000000000000',
    //     '2000000000000000000',
    //     '3000000000000000000',
    //   )
    //   expect(result._isBigNumber).toEqual(true)
    // })

    // it('should return the correct output amount for a specific input', async () => {
    //   const result = await contract.getAmountOut(
    //     '1000000000000000000',
    //     '2000000000000000000',
    //     '3000000000000000000',
    //   )
    //   expect(result._isBigNumber).toEqual(true)
    // })

    // it('should return the correct input amounts for each token in a path', async () => {
    //   const result = await contract.getAmountsIn('1000000000000000000', [
    //     tokenA,
    //     tokenB,
    //   ])
    //   expect(result).toBeInstanceOf(Array)
    //   expect(result[0]._isBigNumber).toEqual(true)
    // })

    // it('should return the correct output amounts for each token in a path', async () => {
    //   const result = await contract.getAmountsOut(
    //     '1000000000000000000',
    //     [tokenA, tokenB],
    //   )
    //   expect(result).toBeInstanceOf(Array)
    //   expect(result[0]._isBigNumber).toEqual(true)
    // })

    // it('should return the correct quoted amount', async () => {
    //   const result = await contract.quote(
    //     '1000000000000000000',
    //     '2000000000000000000',
    //     '3000000000000000000',
    //   )
    //   expect(result._isBigNumber).toEqual(true)
    // })

    // // ------------------------
    // // Testing encode methods
    // // ------------------------

    // it('should correctly encode the addLiquidity function', () => {
    //   const result = contract.encodeAddLiquidity(
    //     tokenA,
    //     tokenB,
    //     '1000000000000000000',
    //     '2000000000000000000',
    //     '500000000000000000',
    //     '1000000000000000000',
    //     router.address,
    //     '9999999999',
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    // it('should correctly encode the addLiquidityETH function', () => {
    //   const result = contract.encodeAddLiquidityETH(
    //     tokenA,
    //     '1000000000000000000',
    //     '500000000000000000',
    //     '1000000000000000000',
    //     router.address,
    //     '9999999999',
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    // it('should correctly encode the removeLiquidity function', () => {
    //   const result = contract.encodeRemoveLiquidity(
    //     tokenA,
    //     tokenB,
    //     '1000000000000000000',
    //     '500000000000000000',
    //     '1000000000000000000',
    //     router.address,
    //     '9999999999',
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    // it('should correctly encode the removeLiquidityETH function', () => {
    //   const result = contract.encodeRemoveLiquidityETH(
    //     tokenA,
    //     '1000000000000000000',
    //     '500000000000000000',
    //     '1000000000000000000',
    //     router.address,
    //     '9999999999',
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    // it('should correctly encode the swapExactTokensForTokens function', () => {
    //   const result = contract.encodeSwapExactTokensForTokens(
    //     '1000000000000000000',
    //     '500000000000000000',
    //     [tokenA, tokenB],
    //     router.address,
    //     '9999999999',
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: {
          weth,
          factoryAddress,
          getAmountIn,
          getAmountOut,
          // getAmountsIn,
          // getAmountsOut,
        },
      } = await contract.call({
        weth: contract.WETHCallContext(),
        factoryAddress: contract.factoryCallContext(),
        getAmountIn: contract.getAmountInCallContext(
          '1000000000000000000',
          '2000000000000000000',
          '3000000000000000000',
        ),
        getAmountOut: contract.getAmountOutCallContext(
          '1000000000000000000',
          '2000000000000000000',
          '3000000000000000000',
        ),
        getAmountsIn: contract.getAmountsInCallContext('1000000000000000000', [
          tokenA,
          tokenB,
        ]),
        getAmountsOut: contract.getAmountsOutCallContext(
          '1000000000000000000',
          [tokenA, tokenB],
        ),
      })

      expect(weth.value).toBe(MockWrapped.contractAddress)
      expect(factoryAddress.value).toBe(factory.address)
      expect(ethers.BigNumber.isBigNumber(getAmountIn.value)).toEqual(true)
      expect(ethers.BigNumber.isBigNumber(getAmountOut.value)).toEqual(true)
      // expect(
      //   getAmountsIn.value.every((v) => ethers.BigNumber.isBigNumber(v)),
      // ).toEqual(true)
      // expect(
      //   getAmountsOut.value.every((v) => ethers.BigNumber.isBigNumber(v)),
      // ).toEqual(true)
    })
  })
} else {
  describe.skip('RouterContractV2')
}
