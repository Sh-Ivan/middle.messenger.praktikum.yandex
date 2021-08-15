"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = void 0;
const event_bus_1 = require("./event-bus");
var EVENTS;
(function (EVENTS) {
    EVENTS["STORE_CHANGED"] = "store-changed";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));
class Store extends event_bus_1.default {
    constructor(initialState = {}) {
        super();
        this._state = initialState;
    }
    setState(state) {
        this._state = state;
        this.emit(EVENTS.STORE_CHANGED, this._state);
    }
    getState() {
        return this._state;
    }
}
exports.default = Store;
//# sourceMappingURL=store.js.map