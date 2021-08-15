"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const _404_tmpl_1 = require("./404.tmpl");
const block_1 = require("../../components/block/block");
const page404Tmpl = new templator_1.default(_404_tmpl_1.default);
class Page404 extends block_1.default {
    constructor(props = {}) {
        super('div', props);
    }
    render() {
        return page404Tmpl.compile();
    }
}
exports.default = Page404;
//# sourceMappingURL=404.js.map