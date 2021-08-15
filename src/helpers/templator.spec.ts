import { assert } from 'chai';
import templator from './templator';

const testTemplate = new templator('<div class="{{className}}">{{value}}</div>');

describe('Test Templator', () => {
  it('Context with primitives values', () => {
    const context = {
      className: 'main',
      value: 42,
    };
    const resultTemplate = testTemplate.compile(context);
    assert.equal(resultTemplate, '<div class="main">42</div>');
  });
  it('Context with array', () => {
    const context = {
      className: ['main', ' hide'],
      value: ['<li>1</li>', '<li>2</li>'],
    };
    const resultTemplate = testTemplate.compile(context);
    assert.equal(resultTemplate, '<div class="main hide"><li>1</li><li>2</li></div>');
  });
});
