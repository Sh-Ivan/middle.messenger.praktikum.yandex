"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_api_1 = require("../api/user-api");
const UserStore_1 = require("../stores/UserStore");
const ListUsers_1 = require("../stores/ListUsers");
const store_1 = require("../helpers/store");
const userAPIInstance = new user_api_1.default();
class UserController {
    changeData(data) {
        return userAPIInstance
            .changeData(data)
            .then((result) => {
            console.log(result);
            const newData = JSON.parse(result.response);
            if (result.status === 200) {
                UserStore_1.default.setState(newData);
            }
            return newData;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    changeAvatar(data) {
        userAPIInstance
            .changeAvatar(data)
            .then((result) => {
            console.log(result);
            if (result.status === 200) {
                UserStore_1.default.setState(JSON.parse(result.response));
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    changePassword(data) {
        userAPIInstance
            .changePassword(data)
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    getUser(id) {
        return userAPIInstance
            .getUser(id)
            .then((result) => {
            console.log(result);
            return JSON.parse(result.response);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    searchUser(login) {
        return userAPIInstance
            .searchUser(login)
            .then((result) => {
            const listUsers = JSON.parse(result.response);
            ListUsers_1.default.setState(listUsers);
            return listUsers;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    subscribeToListUsersStoreEvent(cb) {
        ListUsers_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map