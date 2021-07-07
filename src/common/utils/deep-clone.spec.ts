import { deepClone } from './deep-clone';

describe('deepClone', () => {
  it('should deepClone correctly', () => {
    const fooContext = { foo: true };
    const result = deepClone(fooContext);
    result.foo = false;
    expect(result.foo).not.toEqual(fooContext.foo);
  });
});
