"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBlur = exports.handleFocus = void 0;
const validate_1 = require("./validate");
function handleFocus(e) {
    const element = e.target;
    validate_1.validate(element);
}
exports.handleFocus = handleFocus;
function handleBlur(e) {
    const element = e.target;
    validate_1.validate(element);
}
exports.handleBlur = handleBlur;
//# sourceMappingURL=inputValidate.js.map