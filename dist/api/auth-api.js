"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../helpers/http");
const authAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/auth/');
class AuthAPI {
    signup(data) {
        return authAPIInstance.post('signup', { data });
    }
    getUserInfo() {
        return authAPIInstance.get('user', {});
    }
    login(data) {
        return authAPIInstance.post('signin', { data });
    }
    logout() {
        return authAPIInstance.post('logout', {});
    }
}
exports.default = AuthAPI;
//# sourceMappingURL=auth-api.js.map