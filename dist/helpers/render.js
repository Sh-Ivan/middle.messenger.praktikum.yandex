"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(query, block) {
    const root = document.querySelector(query);
    if (root !== null) {
        root.appendChild(block.getContent());
    }
    return root;
}
exports.default = render;
//# sourceMappingURL=render.js.map