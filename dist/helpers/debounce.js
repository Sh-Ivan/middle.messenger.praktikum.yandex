"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(f, ms) {
    let lastCall = Date.now();
    let lastCallTimer;
    return function inner(...args) {
        const previousCall = lastCall;
        lastCall = Date.now();
        if (previousCall && lastCall - previousCall <= ms) {
            clearTimeout(lastCallTimer);
        }
        lastCallTimer = setTimeout(() => f.apply(this, args), ms);
    };
}
exports.default = debounce;
//# sourceMappingURL=debounce.js.map