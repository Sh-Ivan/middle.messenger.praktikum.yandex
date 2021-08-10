import { assert } from 'chai';

import getObjectValue from './getObjectValue';

describe('Test getObjectValue', () => {
  it('should return true', () => {
    assert.equal(getObjectValue({ a: true }, 'a'), true);
  });
});
