"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_api_1 = require("../api/auth-api");
const UserStore_1 = require("../stores/UserStore");
const App_1 = require("../components/App");
const store_1 = require("../helpers/store");
const authAPIInstance = new auth_api_1.default();
class AuthController {
    signup(data) {
        authAPIInstance
            .signup(data)
            .then((result) => {
            console.log(result);
            if (result.status === 200) {
                App_1.AppRouter.go('/');
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    getUserInfo(cb) {
        return authAPIInstance.getUserInfo().then((result) => {
            if (result.status === 200) {
                const user = JSON.parse(result.response);
                UserStore_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
                UserStore_1.default.setState(user);
                return user;
            }
            App_1.AppRouter.go('/login');
        });
    }
    login(data) {
        authAPIInstance
            .login(data)
            .then((result) => {
            if (result.status === 200) {
                App_1.AppRouter.go('/');
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    logout() {
        authAPIInstance
            .logout()
            .then((result) => {
            if (result.status === 200) {
                App_1.AppRouter.go('/login');
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth-controller.js.map