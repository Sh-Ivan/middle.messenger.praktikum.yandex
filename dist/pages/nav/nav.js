"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const nav_tmpl_1 = require("./nav.tmpl");
const block_1 = require("../../components/block/block");
const auth_controller_1 = require("../../controllers/auth-controller");
const chatTmpl = new templator_1.default(nav_tmpl_1.default);
const authController = new auth_controller_1.default();
class Chat extends block_1.default {
    constructor(props = {}) {
        super('div', props);
    }
    componentDidMount() {
        authController.getUserInfo((user) => {
            this.setProps({ user });
        });
    }
    render() {
        return chatTmpl.compile(this.props);
    }
}
exports.default = Chat;
//# sourceMappingURL=nav.js.map