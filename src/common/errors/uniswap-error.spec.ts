import { UniswapError } from '../..';
import { ErrorCodes } from './error-codes';

describe('UniswapError', () => {
  const message = 'message_error';
  const code = ErrorCodes.canNotFindChainId;
  const uniswapError = new UniswapError(message, code);

  it('should have the correct name on error', () => {
    expect(uniswapError.name).toEqual('UniswapError');
  });

  it('should have the correct code on error', () => {
    expect(uniswapError.code).toEqual(code);
  });

  it('should have the correct message on error', () => {
    expect(uniswapError.message).toEqual(message);
  });
});
