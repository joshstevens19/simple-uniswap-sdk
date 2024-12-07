import { describe, it, expect } from 'vitest'

import { ErrorCodes, DexError } from '../../src/errors'

describe('DexError', () => {
  const message = 'message_error'
  const code = ErrorCodes.canNotFindChainId
  const uniswapError = new DexError(message, code)

  it('should have the correct name on error', () => {
    expect(uniswapError.name).toEqual('DexError')
  })

  it('should have the correct code on error', () => {
    expect(uniswapError.code).toEqual(code)
  })

  it('should have the correct message on error', () => {
    expect(uniswapError.message).toEqual(message)
  })
})
