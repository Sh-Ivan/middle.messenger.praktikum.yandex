import { expect } from 'chai';

import getObjectValue from './getObjectValue';

describe('Test getObjectValue', () => {
  it('should return true', () => {
    expect(getObjectValue({ a: true }, a));
  });
});
