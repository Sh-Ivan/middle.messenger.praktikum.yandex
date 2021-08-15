"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const login_tmpl_1 = require("./login.tmpl");
const block_1 = require("../../components/block/block");
const Button_1 = require("../../components/Button/Button");
const formSubmit_1 = require("../../helpers/formSubmit");
const inputValidate_1 = require("../../helpers/inputValidate");
const auth_controller_1 = require("../../controllers/auth-controller");
const App_1 = require("../../components/App");
const loginTmpl = new templator_1.default(login_tmpl_1.default);
const authController = new auth_controller_1.default();
class Login extends block_1.default {
    constructor(props) {
        super('div', Object.assign(Object.assign({}, props), { handleBlur: inputValidate_1.handleBlur,
            handleFocus: inputValidate_1.handleFocus, handleSubmit: (e) => {
                const data = formSubmit_1.default(e);
                if (data !== null) {
                    authController.login(data);
                }
            } }));
    }
    componentDidMount() {
        authController
            .getUserInfo((user) => {
            this.setProps({ user });
        })
            .then((user) => {
            if (user) {
                App_1.default.go('/');
            }
        });
    }
    render() {
        const context = {
            loginButton: new Button_1.default({
                class: 'auth-form__button',
                text: 'Авторизоваться',
                type: 'submit',
            }).textContent,
        };
        return loginTmpl.compile(context);
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map