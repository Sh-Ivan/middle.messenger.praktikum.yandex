"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const user_profile_tmpl_1 = require("./user-profile.tmpl");
const block_1 = require("../../components/block/block");
const auth_controller_1 = require("../../controllers/auth-controller");
const userProfileTmpl = new templator_1.default(user_profile_tmpl_1.default);
const authController = new auth_controller_1.default();
class UserProfile extends block_1.default {
    constructor(props = {}) {
        super('div', Object.assign(Object.assign({}, props), { handleSignout: (e) => {
                e.preventDefault();
                authController.logout();
            } }));
    }
    componentDidMount() {
        authController.getUserInfo((user) => {
            this.setProps({ user });
        });
    }
    render() {
        const { user } = this.props;
        const fullName = user ? `${user === null || user === void 0 ? void 0 : user.first_name} ${user === null || user === void 0 ? void 0 : user.second_name}` : '';
        let userAvatar;
        if (user === null || user === void 0 ? void 0 : user.avatar) {
            userAvatar = `
        <img src="https://ya-praktikum.tech/api/v2/resources${user.avatar}" class="avatar-wrapper">
      `;
        }
        else {
            userAvatar = '<i class="avatar-icon"></i>';
        }
        const context = Object.assign(Object.assign({}, user), { fullName, userAvatar });
        return userProfileTmpl.compile(context);
    }
}
exports.default = UserProfile;
//# sourceMappingURL=user-profile.js.map