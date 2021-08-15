"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualDate = exports.isToday = void 0;
const isToday = (date) => {
    const today = new Date();
    return (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear());
};
exports.isToday = isToday;
const isEqualDate = (date1, date2) => {
    return (date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear());
};
exports.isEqualDate = isEqualDate;
//# sourceMappingURL=compareDate.js.map