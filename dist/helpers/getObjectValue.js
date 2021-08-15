"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getObjectValue(obj, path, defaultValue) {
    const objectKeys = path.split('.');
    let result = obj;
    for (let i = 0; i < objectKeys.length; i += 1) {
        result = result[objectKeys[i]];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result;
}
exports.default = getObjectValue;
//# sourceMappingURL=getObjectValue.js.map