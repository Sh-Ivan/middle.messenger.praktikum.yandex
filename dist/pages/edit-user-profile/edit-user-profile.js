"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const templator_1 = require("../../helpers/templator");
const edit_user_profile_tmpl_1 = require("./edit-user-profile.tmpl");
const block_1 = require("../../components/block/block");
const Button_1 = require("../../components/Button/Button");
const formSubmit_1 = require("../../helpers/formSubmit");
const inputValidate_1 = require("../../helpers/inputValidate");
const auth_controller_1 = require("../../controllers/auth-controller");
const user_controller_1 = require("../../controllers/user-controller");
const escape_1 = require("../../helpers/escape");
const editUserProfileTmpl = new templator_1.default(edit_user_profile_tmpl_1.default);
const authController = new auth_controller_1.default();
const userController = new user_controller_1.default();
class EditUserProfile extends block_1.default {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { handleFocus: inputValidate_1.handleFocus,
            handleBlur: inputValidate_1.handleBlur, handleSubmit: (e) => {
                const data = formSubmit_1.default(e);
                if (data !== null) {
                    const escapedData = {};
                    // eslint-disable-next-line array-callback-return
                    Object.entries(data).map(([key, value]) => {
                        escapedData[key] = escape_1.default(value);
                    });
                    userController.changeData(escapedData);
                }
            }, changeAvatar: () => {
                const avatar = document.getElementById('avatar');
                if (avatar && avatar.files && avatar.files.length > 0) {
                    const form = new FormData();
                    form.append('avatar', avatar.files[0]);
                    userController.changeAvatar({ form });
                }
            }, deleteAvatar: () => {
                const form = new FormData();
                form.append('avatar', '');
                userController.changeAvatar({ form });
            } }));
    }
    componentDidMount() {
        authController.getUserInfo((user) => {
            this.setProps({ user });
        });
    }
    render() {
        const button = {
            saveButton: new Button_1.default({
                class: 'auth-form__button auth-form__button_center',
                text: 'Сохранить изменения',
                type: 'submit',
            }).textContent,
        };
        const { user } = this.props;
        let userAvatar;
        if (user === null || user === void 0 ? void 0 : user.avatar) {
            userAvatar = `
        <img src="https://ya-praktikum.tech/api/v2/resources${user.avatar}" class="avatar-wrapper">
      `;
        }
        else {
            userAvatar = '<i class="avatar-icon"></i>';
        }
        const context = Object.assign(Object.assign(Object.assign({}, button), user), { userAvatar });
        return editUserProfileTmpl.compile(context);
    }
}
exports.default = EditUserProfile;
//# sourceMappingURL=edit-user-profile.js.map