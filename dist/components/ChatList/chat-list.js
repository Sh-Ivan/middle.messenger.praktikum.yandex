"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const chat_list_tmpl_1 = require("./chat-list.tmpl");
const block_1 = require("../block/block");
require("./chat-list.scss");
const chatTmpl = new templator_1.default(chat_list_tmpl_1.default);
class ChatList extends block_1.default {
    constructor(props = {}) {
        super('div', props);
    }
    render() {
        const context = {};
        return chatTmpl.compile(context);
    }
}
exports.default = ChatList;
//# sourceMappingURL=chat-list.js.map