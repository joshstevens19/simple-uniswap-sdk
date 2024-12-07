import { BigNumber, ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockWalletAddress,
  MockRecipientAddress,
  MockToken777,
  MockOperatorAddress,
  MockOperatorAddress2,
  MockProviderUrl,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { Erc777Contract } from '../../src/token/erc777.contract'

if (MockToken777) {
  describe.skip('Erc777Contract', () => {
    const contract = new Erc777Contract(
      {
        chainId: MockChainId,
        rpcUrl: MockProviderUrl,
        tryAggregate: true,
      },
      {
        address: MockToken777.contractAddress,
      },
    )

    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct token name', async () => {
      const result = await contract.name()
      expect(result).toBe(MockToken777.name)
    })

    it('should return the correct token symbol', async () => {
      const result = await contract.symbol()
      expect(result).toBe(MockToken777.symbol)
    })

    it('should return the correct granularity', async () => {
      const result = await contract.granularity()
      expect(result).toBeInstanceOf(BigNumber)
      // expect(result.gt(0)).toBe(true)
    })

    it('should return the list of default operators', async () => {
      const result = await contract.defaultOperators()
      expect(Array.isArray(result)).toBe(true)
    })

    it('should return the correct balanceOf a specified address', async () => {
      const result = await contract.balanceOf(MockWalletAddress)
      expect(result).toBeInstanceOf(BigNumber)
      // expect(result.gt(0)).toBe(true)
    })

    it('should return boolean for is operator check', async () => {
      const result = await contract.isOperatorFor(
        MockWalletAddress,
        MockOperatorAddress,
      )
      expect(typeof result).toBe('boolean')
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    it('should correctly encode the authorizeOperator function', () => {
      const result = contract.encodeAuthorizeOperator(MockOperatorAddress)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the revokeOperator function for a single address', () => {
      const result = contract.encodeRevokeOperator(MockOperatorAddress)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the revokeOperator function for multiple addresses', () => {
      const multipleOperators = [MockOperatorAddress, MockOperatorAddress2]
      const result = contract.encodeRevokeOperator(multipleOperators)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the operatorSend function', () => {
      const result = contract.encodeOperatorSend(
        MockWalletAddress,
        MockRecipientAddress,
        BigNumber.from(1000),
        '0x00',
        '0x00',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the send function', () => {
      const result = contract.encodeSend(
        MockWalletAddress,
        MockRecipientAddress,
        BigNumber.from(1000),
        '0x00',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: {
          name: { value: name },
          symbol: { value: symbol },
          balanceOf: { value: balanceOf },
          granularity: { value: granularity },
        },
      } = await contract.call({
        name: contract.nameCallContext(),
        symbol: contract.symbolCallContext(),
        balanceOf: contract.balanceOfCallContext(MockWalletAddress),
        granularity: contract.granularityCallContext(),
      })

      expect(name).toBe(MockToken777.name)
      expect(symbol).toBe(MockToken777.symbol)
      expect(ethers.BigNumber.isBigNumber(balanceOf)).toEqual(true)
      expect(ethers.BigNumber.isBigNumber(granularity)).toEqual(true)
    })
  })
} else {
  describe.skip('Erc777Contract')
}
