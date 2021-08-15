"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const templator_1 = require("./templator");
const testTemplate = new templator_1.default('<div class="{{className}}">{{value}}</div>');
describe('Test Templator', () => {
    it('Context with primitives values', () => {
        const context = {
            className: 'main',
            value: 42,
        };
        const resultTemplate = testTemplate.compile(context);
        chai_1.assert.equal(resultTemplate, '<div class="main">42</div>');
    });
    it('Context with array', () => {
        const context = {
            className: ['main', ' hide'],
            value: ['<li>1</li>', '<li>2</li>'],
        };
        const resultTemplate = testTemplate.compile(context);
        chai_1.assert.equal(resultTemplate, '<div class="main hide"><li>1</li><li>2</li></div>');
    });
});
//# sourceMappingURL=templator.spec.js.map