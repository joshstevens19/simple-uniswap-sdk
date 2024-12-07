import { ethers } from 'ethers'
import { isHexString } from 'ethers/lib/utils'
import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockDexConfig,
  MockWrapped,
  MockFunToken,
  MockAaveToWPLSPairAddressV2,
  MockRecipientAddress,
  MockWalletAddress,
  MockDexVersionTagV2,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { PairContract } from '../../src/pair/pair.contract'

if (MockDexConfig.protocols.protocolV2) {
  describe('PairContract', () => {
    const { pair } =
      MockDexConfig.protocols.protocolV2?.[MockDexVersionTagV2] ?? {}

    if (!pair) {
      throw new Error('Pair contract not found')
    }

    const contract = new PairContract(
      { chainId: MockChainId, tryAggregate: true },
      { ...pair, address: MockAaveToWPLSPairAddressV2 },
    )

    const spenderAddress = MockRecipientAddress

    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct DOMAIN_SEPARATOR', async () => {
      const result = await contract.DOMAIN_SEPARATOR()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct MINIMUM_LIQUIDITY', async () => {
      const result = await contract.MINIMUM_LIQUIDITY()
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct PERMIT_TYPEHASH', async () => {
      const result = await contract.PERMIT_TYPEHASH()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct allowance', async () => {
      const result = await contract.allowance(
        MockFunToken.contractAddress,
        MockWrapped.contractAddress,
      )
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct reserves', async () => {
      const result = await contract.getReserves()
      expect(result._reserve0?._isBigNumber).toEqual(true)
      expect(result._reserve1?._isBigNumber).toEqual(true)
    })

    it('should return the correct factory address', async () => {
      const result = await contract.factory()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct kLast value', async () => {
      const result = await contract.kLast()
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct balance of an address', async () => {
      const result = await contract.balanceOf(MockFunToken.contractAddress)
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct token0 address', async () => {
      const result = await contract.token0()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct token1 address', async () => {
      const result = await contract.token1()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct total supply', async () => {
      const result = await contract.totalSupply()
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct name of the token', async () => {
      const result = await contract.name()
      expect(result).toBeTruthy()
    })

    it('should return the correct symbol of the token', async () => {
      const result = await contract.symbol()
      expect(result).toBeTruthy()
    })

    it('should return the correct number of decimals', async () => {
      const result = await contract.decimals()
      expect(typeof result).toEqual('number')
    })

    it('should return the correct price0CumulativeLast', async () => {
      const result = await contract.price0CumulativeLast()
      expect(result._isBigNumber).toEqual(true)
    })

    it('should return the correct price1CumulativeLast', async () => {
      const result = await contract.price1CumulativeLast()
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct nonce for an address', async () => {
      const result = await contract.nonces(MockFunToken.contractAddress)
      expect(result?._isBigNumber).toEqual(true)
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    it('should correctly encode the initialize function', () => {
      const result = contract.encodeInitialize(
        MockWrapped.contractAddress,
        MockFunToken.contractAddress,
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the mint function', () => {
      const result = contract.encodeMint(MockRecipientAddress)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the burn function', () => {
      const result = contract.encodeBurn(MockRecipientAddress)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the swap function', () => {
      const result = contract.encodeSwap(1000, 2000, MockRecipientAddress, '0x')
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the skim function', () => {
      const result = contract.encodeSkim(MockRecipientAddress)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the sync function', () => {
      const result = contract.encodeSync()
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the approve function', () => {
      const result = contract.encodeApprove(MockRecipientAddress, 1000)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the transfer function', () => {
      const result = contract.encodeTransfer(MockRecipientAddress, 1000)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the transferFrom function', () => {
      const result = contract.encodeTransferFrom(
        MockRecipientAddress,
        MockWalletAddress,
        1000,
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the permit function', () => {
      const r = '0x' + 'a'.repeat(64) // 32 bytes, filled with 'a'
      const s = '0x' + 'b'.repeat(64) // 32 bytes, filled with 'b'
      const v = 27 // Common value for v in ECDSA signatures
      const amount = 1000
      const deadline = 1234567890

      const result = contract.encodePermit(
        MockRecipientAddress,
        MockWalletAddress,
        amount,
        deadline,
        v, // Signature part v
        r, // Signature part r
        s, // Signature part s
      )

      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: {
          domain,
          minLiquidity,
          permitTypeHash,
          allowance,
          getReserves,
          factory,
          kLast,
          balanceOf,
          token0,
          token1,
          totalSupply,
          name,
          symbol,
          decimals,
          price0CumulativeLast,
          price1CumulativeLast,
          nonces,
        },
      } = await contract.call({
        domain: contract.DOMAIN_SEPARATORCallContext(),
        minLiquidity: contract.MINIMUM_LIQUIDITYCallContext(),
        permitTypeHash: contract.PERMIT_TYPEHASHCallContext(),
        allowance: contract.allowanceCallContext(
          MockFunToken.contractAddress,
          spenderAddress,
        ),
        getReserves: contract.getReservesCallContext(),
        factory: contract.factoryCallContext(),
        kLast: contract.kLastCallContext(),
        balanceOf: contract.balanceOfCallContext(MockFunToken.contractAddress),
        token0: contract.token0CallContext(),
        token1: contract.token1CallContext(),
        totalSupply: contract.totalSupplyCallContext(),
        name: contract.nameCallContext(),
        symbol: contract.symbolCallContext(),
        decimals: contract.decimalsCallContext(),
        price0CumulativeLast: contract.price0CumulativeLastCallContext(),
        price1CumulativeLast: contract.price1CumulativeLastCallContext(),
        nonces: contract.noncesCallContext(MockFunToken.contractAddress),
      })

      expect(domain.value).toMatch(/^0x[a-fA-F0-9]+$/)
      expect(ethers.BigNumber.isBigNumber(minLiquidity.value)).toEqual(true)
      expect(permitTypeHash.value).toMatch(/^0x[a-fA-F0-9]+$/)
      expect(ethers.BigNumber.isBigNumber(allowance.value)).toEqual(true)
      expect(ethers.BigNumber.isBigNumber(getReserves.value._reserve0)).toEqual(
        true,
      )
      expect(ethers.BigNumber.isBigNumber(getReserves.value._reserve1)).toEqual(
        true,
      )
      expect(factory.value).toMatch(/^0x[a-fA-F0-9]+$/)
      expect(ethers.BigNumber.isBigNumber(kLast.value)).toEqual(true)
      expect(ethers.BigNumber.isBigNumber(balanceOf.value)).toEqual(true)
      expect(token0.value).toMatch(/^0x[a-fA-F0-9]+$/)
      expect(token1.value).toMatch(/^0x[a-fA-F0-9]+$/)
      expect(ethers.BigNumber.isBigNumber(totalSupply.value)).toEqual(true)
      expect(name.value).toBeTruthy()
      expect(symbol.value).toBeTruthy()
      expect(typeof decimals.value).toEqual('number')
      expect(ethers.BigNumber.isBigNumber(price0CumulativeLast.value)).toEqual(
        true,
      )
      expect(ethers.BigNumber.isBigNumber(price1CumulativeLast.value)).toEqual(
        true,
      )
      expect(ethers.BigNumber.isBigNumber(nonces.value)).toEqual(true)
    })
  })
} else {
  describe.skip('PairContract')
}
