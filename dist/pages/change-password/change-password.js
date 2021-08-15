"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const change_password_tmpl_1 = require("./change-password.tmpl");
const block_1 = require("../../components/block/block");
const Button_1 = require("../../components/Button/Button");
const formSubmit_1 = require("../../helpers/formSubmit");
const inputValidate_1 = require("../../helpers/inputValidate");
const user_controller_1 = require("../../controllers/user-controller");
const changePasswordTmpl = new templator_1.default(change_password_tmpl_1.default);
const userController = new user_controller_1.default();
class ChangePassword extends block_1.default {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { handleFocus: inputValidate_1.handleFocus,
            handleBlur: inputValidate_1.handleBlur, handleSubmit: (e) => {
                const data = formSubmit_1.default(e);
                if (data !== null) {
                    const { oldPassword, password: newPassword } = data;
                    userController.changePassword({ oldPassword, newPassword });
                }
            } }));
    }
    render() {
        const context = {
            saveButton: new Button_1.default({
                class: 'auth-form__button',
                text: 'Сохранить',
                type: 'submit',
            }).textContent,
        };
        return changePasswordTmpl.compile(context);
    }
}
exports.default = ChangePassword;
//# sourceMappingURL=change-password.js.map