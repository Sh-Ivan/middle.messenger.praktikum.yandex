"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./render");
function isEqual(lhs, rhs) {
    return lhs === rhs;
}
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            const root = document.querySelector(this._props.rootQuery);
            if (root !== null) {
                root.innerHTML = '';
            }
        }
    }
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
        }
        render_1.default(this._props.rootQuery, this._block);
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map