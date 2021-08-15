"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const byTime = (a, b) => {
    const aTime = new Date(a.time);
    const bTime = new Date(b.time);
    return aTime.getTime() - bTime.getTime();
};
exports.default = byTime;
//# sourceMappingURL=sortUtils.js.map