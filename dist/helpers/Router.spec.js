"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jsdom-global");
const chai_1 = require("chai");
const Router_1 = require("./Router");
// eslint-disable-next-line
// @ts-ignore
global.DOMParser = window.DOMParser;
const router = new Router_1.default('/');
describe('Router', () => {
    it('Use should change routes length ', () => {
        router.use('/', {});
        router.use('/login', {});
        chai_1.assert.equal(router.routes.length, 2);
    });
});
//# sourceMappingURL=Router.spec.js.map