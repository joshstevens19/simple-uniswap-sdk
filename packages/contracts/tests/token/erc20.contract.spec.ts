import { parseDecimals } from '@dex-toolkit/number'
import { BigNumber, ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockRecipientAddress,
  MockFunToken,
  MockWalletAddress,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { Erc20Contract } from '../../src/token/erc20.contract'

describe('Erc20Contract', () => {
  const contract = new Erc20Contract(
    {
      chainId: MockChainId,
      tryAggregate: true,
    },
    {
      address: MockFunToken.contractAddress,
    },
  )

  const spenderAddress = MockRecipientAddress

  // ------------------------
  // Testing read methods
  // ------------------------

  it('should return the correct token name', async () => {
    const result = await contract.name()
    expect(result).toBe(MockFunToken.name)
  })

  it('should return the correct token symbol', async () => {
    const result = await contract.symbol()
    expect(result).toBe(MockFunToken.symbol)
  })

  it('should return the correct number of decimals', async () => {
    const result = await contract.decimals()
    expect(parseDecimals(result)).toBe(MockFunToken.decimals)
  })

  it('should return the correct total supply', async () => {
    const result = await contract.totalSupply()
    expect(result).toBeInstanceOf(BigNumber)
    expect(result.gt(0)).toBe(true)
  })

  it('should return the correct balanceOf a specified address', async () => {
    const result = await contract.balanceOf(MockWalletAddress)
    expect(result).toBeInstanceOf(BigNumber)
  })

  it('should return the correct allowance for a spender', async () => {
    const result = await contract.allowance(MockWalletAddress, spenderAddress)
    expect(result).toBeInstanceOf(BigNumber)
  })

  // ------------------------
  // Testing encode methods
  // ------------------------

  it('should correctly encode the approve function', () => {
    const result = contract.encodeApprove(spenderAddress, 1000)
    expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
  })

  it('should correctly encode the transfer function', () => {
    const result = contract.encodeTransfer(spenderAddress, 1000)
    expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
  })

  it('should correctly encode the transferFrom function', () => {
    const result = contract.encodeTransferFrom(
      MockWalletAddress,
      spenderAddress,
      1000,
    )
    expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
  })

  // ------------------------
  // Testing Multicall
  // ------------------------

  it('should correctly perform a multicall', async () => {
    const {
      results: { name, symbol, totalSupply, balanceOf },
    } = await contract.call({
      name: contract.nameCallContext(),
      symbol: contract.symbolCallContext(),
      totalSupply: contract.totalSupplyCallContext(),
      balanceOf: contract.balanceOfCallContext(MockWalletAddress),
    })

    expect(name.value).toBe(MockFunToken.name)
    expect(symbol.value).toBe(MockFunToken.symbol)
    expect(ethers.BigNumber.isBigNumber(totalSupply.value)).toEqual(true)
    expect(ethers.BigNumber.isBigNumber(balanceOf.value)).toEqual(true)
  })
})
