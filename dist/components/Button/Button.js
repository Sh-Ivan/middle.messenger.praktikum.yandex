"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const Button_tmpl_1 = require("./Button.tmpl");
const block_1 = require("../block/block");
const buttonTmpl = new templator_1.default(Button_tmpl_1.default);
class Button extends block_1.default {
    constructor(props) {
        super('button', props);
    }
    render() {
        const context = Object.assign({}, this.props);
        return buttonTmpl.compile(context);
    }
}
exports.default = Button;
//# sourceMappingURL=Button.js.map