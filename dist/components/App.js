"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
require("../index.scss");
const login_1 = require("../pages/login/login");
const signup_1 = require("../pages/signup/signup");
const _404_1 = require("../pages/404/404");
const _500_1 = require("../pages/500/500");
const user_profile_1 = require("../pages/user-profile/user-profile");
const change_password_1 = require("../pages/change-password/change-password");
const edit_user_profile_1 = require("../pages/edit-user-profile/edit-user-profile");
const chat_1 = require("../pages/chat/chat");
const Router_1 = require("../helpers/Router");
exports.AppRouter = new Router_1.default('.root');
exports.AppRouter.use('/login', login_1.default)
    .use('/', chat_1.default)
    .use('/login', login_1.default)
    .use('/signup', signup_1.default)
    .use('/page404', _404_1.default)
    .use('/page500', _500_1.default)
    .use('/user', user_profile_1.default)
    .use('/change-password', change_password_1.default)
    .use('/edit-user-profile', edit_user_profile_1.default, {
    back: exports.AppRouter.back,
})
    .use('/chat', chat_1.default)
    .use('404', _404_1.default)
    .start();
const App = exports.AppRouter;
exports.default = App;
//# sourceMappingURL=App.js.map