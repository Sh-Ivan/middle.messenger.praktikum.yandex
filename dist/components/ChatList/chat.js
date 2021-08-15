"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const chat_tmpl_1 = require("./chat.tmpl");
const block_1 = require("../block/block");
require("./chat.scss");
const chatTmpl = new templator_1.default(chat_tmpl_1.default);
class chat extends block_1.default {
    constructor(props = {}) {
        super('div', props);
    }
    render() {
        const context = {};
        return chatTmpl.compile(context);
    }
}
exports.default = chat;
//# sourceMappingURL=chat.js.map