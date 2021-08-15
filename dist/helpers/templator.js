"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getObjectValue_1 = require("./getObjectValue");
class Templator {
    constructor(template) {
        this._template = template;
    }
    compile(ctx = {}) {
        let newTemplate = this._template;
        if (!ctx || Object.keys(ctx).length === 0) {
            return this._template;
        }
        Object.entries(ctx).forEach(([key, value]) => {
            // eslint-disable-next-line no-useless-escape
            const templateVar = new RegExp(`\{\{\\s*${key}\\s*\}\}`, 'g');
            if (typeof value === 'function') {
                newTemplate = newTemplate.replace(templateVar, key);
            }
            else if (Array.isArray(value)) {
                let listElements = '';
                value.forEach((elem) => {
                    listElements = listElements.concat(elem);
                });
                newTemplate = newTemplate.replace(templateVar, listElements);
                const newCtx = Object.assign({}, ctx);
                newCtx[key] = null;
                return new Templator(newTemplate).compile(newCtx);
            }
            else if (typeof value === 'object' && value !== null) {
                // eslint-disable-next-line no-useless-escape
                const temolateObjectVar = new RegExp(`{{\\s*${key}\\s*\}\}?`, 'g');
                const varsInObject = newTemplate.match(temolateObjectVar);
                if (varsInObject !== null) {
                    varsInObject.forEach((nextVar) => {
                        const path = nextVar.slice(2, -2).trim();
                        console.log(ctx);
                        console.log(path);
                        const newValue = getObjectValue_1.default(ctx, path);
                        console.log(newValue);
                        const replacer = newValue === '' ? '""' : newValue;
                        newTemplate = newTemplate.replace(nextVar, replacer);
                    });
                }
            }
            else {
                let replacer = value === '' ? '&nbsp;' : value;
                if (value === null || value === undefined) {
                    replacer = '&nbsp;';
                }
                newTemplate = newTemplate.replace(templateVar, replacer);
            }
        });
        return newTemplate;
    }
}
exports.default = Templator;
//# sourceMappingURL=templator.js.map