"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const getObjectValue_1 = require("./getObjectValue");
describe('Test getObjectValue', () => {
    it('should return true', () => {
        chai_1.assert.equal(getObjectValue_1.default({ a: false }, 'b', true), true);
    });
    it('should return false', () => {
        chai_1.assert.equal(getObjectValue_1.default({ a: false }, 'a', true), false);
    });
    it('should return "test"', () => {
        chai_1.assert.equal(getObjectValue_1.default({ a: { b: 'test' } }, 'a.b', 'default'), 'test');
    });
    it('should return "default"', () => {
        chai_1.assert.equal(getObjectValue_1.default({ a: { b: 'test' } }, 'a.c', 'default'), 'default');
    });
});
//# sourceMappingURL=getObjectValue.spec.js.map