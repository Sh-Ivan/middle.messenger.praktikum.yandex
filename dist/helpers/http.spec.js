"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const http_1 = require("./http");
const http = new http_1.default('https://ya-praktikum.tech/api/v2/auth/');
describe('Test Http', () => {
    it('Get should add paarmeters to query from options', (done) => {
        http
            .get('user', { data: { userId: '111' } })
            .then((result) => {
            chai_1.assert.equal(result.responseURL, 'https://ya-praktikum.tech/api/v2/auth/user?userId=111');
            done();
        })
            .catch(done);
    });
    it('Should set data as body if method not GET', (done) => {
        http
            .post('signin', { data: { login: 'test', password: 'test' } })
            .then((result) => {
            chai_1.assert.equal(result.responseURL, 'https://ya-praktikum.tech/api/v2/auth/signin');
            done();
        })
            .catch(done);
    });
});
//# sourceMappingURL=http.spec.js.map