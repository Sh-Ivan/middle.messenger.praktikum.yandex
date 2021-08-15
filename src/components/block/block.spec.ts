import { assert } from 'chai';
import Block from './block';

describe('Test Block', () => {
  function createBlock() {
    return new Block('div', {});
  }

  it('setProps should change block props', () => {
    const block = createBlock();
    const newProps = { id: 1 };
    block.setProps(newProps);
    // eslint-disable-next-line
    // @ts-ignore
    assert.equal(block.props.id, 1);
  });
});
