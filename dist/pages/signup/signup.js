"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const signup_tmpl_1 = require("./signup.tmpl");
const block_1 = require("../../components/block/block");
const Button_1 = require("../../components/Button/Button");
const formSubmit_1 = require("../../helpers/formSubmit");
const inputValidate_1 = require("../../helpers/inputValidate");
const auth_controller_1 = require("../../controllers/auth-controller");
const signupTmpl = new templator_1.default(signup_tmpl_1.default);
const authController = new auth_controller_1.default();
class Signup extends block_1.default {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { handleBlur: inputValidate_1.handleBlur,
            handleFocus: inputValidate_1.handleFocus, handleSubmit: (e) => {
                const data = formSubmit_1.default(e);
                if (data !== null) {
                    const escapedData = {};
                    Object.entries(data).map(([key, value]) => {
                        escapedData[key] = escape(value);
                    });
                    authController.signup(escapedData);
                }
            } }));
    }
    render() {
        const context = {
            signupButton: new Button_1.default({
                class: 'auth-form__button',
                text: 'Зарегистрироваться',
                type: 'submit',
            }).textContent,
        };
        return signupTmpl.compile(context);
    }
}
exports.default = Signup;
//# sourceMappingURL=signup.js.map