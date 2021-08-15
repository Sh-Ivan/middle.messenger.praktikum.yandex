"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../helpers/http");
const userAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/user/');
class UserAPI {
    changeData(data) {
        return userAPIInstance.put('profile/', { data });
    }
    changeAvatar(data) {
        return userAPIInstance.put('profile/avatar', {
            data,
        });
    }
    changePassword(data) {
        return userAPIInstance.put('password/', { data });
    }
    getUser(id) {
        return userAPIInstance.get(`${id}`, {});
    }
    searchUser(login) {
        return userAPIInstance.post('search', { data: { login } });
    }
}
exports.default = UserAPI;
//# sourceMappingURL=user-api.js.map