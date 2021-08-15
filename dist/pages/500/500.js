"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templator_1 = require("../../helpers/templator");
const _500_tmpl_1 = require("./500.tmpl");
const block_1 = require("../../components/block/block");
const page500Tmpl = new templator_1.default(_500_tmpl_1.default);
class Page500 extends block_1.default {
    constructor(props = {}) {
        super('div', props);
    }
    render() {
        return page500Tmpl.compile();
    }
}
exports.default = Page500;
//# sourceMappingURL=500.js.map