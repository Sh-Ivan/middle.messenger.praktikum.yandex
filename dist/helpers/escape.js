"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escape(str) {
    if (!str)
        return str;
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}
exports.default = escape;
//# sourceMappingURL=escape.js.map