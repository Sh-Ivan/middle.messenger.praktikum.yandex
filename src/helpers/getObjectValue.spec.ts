import { assert } from 'chai';

import getObjectValue from './getObjectValue';

describe('Test getObjectValue', () => {
  it('should return true', () => {
    assert.equal(getObjectValue({ a: false }, 'b', true), true);
  });
  it('should return false', () => {
    assert.equal(getObjectValue({ a: false }, 'a', true), false);
  });
  it('should return "test"', () => {
    assert.equal(getObjectValue({ a: { b: 'test' } }, 'a.b', 'default'), 'test');
  });
  it('should return "default"', () => {
    assert.equal(getObjectValue({ a: { b: 'test' } }, 'a.c', 'default'), 'default');
  });
});
