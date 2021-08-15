"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const block_1 = require("./block");
describe('Test Block', () => {
    function createBlock() {
        return new block_1.default('div', {});
    }
    it('setProps should change block props', () => {
        const block = createBlock();
        const newProps = { id: 1 };
        block.setProps(newProps);
        // eslint-disable-next-line
        // @ts-ignore
        chai_1.assert.equal(block.props.id, 1);
    });
});
//# sourceMappingURL=block.spec.js.map