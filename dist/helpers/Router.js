"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("./Route");
const auth_controller_1 = require("../controllers/auth-controller");
const authController = new auth_controller_1.default();
class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        this.private = { usePrivate: true, redirectRouter: '/' };
        Router.__instance = this;
        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);
        this.go = this.go.bind(this);
    }
    use(pathname, block, props, isPrivate = false) {
        const route = new Route_1.default(pathname, block, Object.assign(Object.assign({}, props), { rootQuery: this._rootQuery, isPrivate }));
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname) || this.getRoute('404');
        if (!route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        if (pathname !== '/login' && pathname !== '/signup') {
            authController
                .getUserInfo(() => { })
                .then((user) => {
                if (!user) {
                    this.go('/login');
                }
            });
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map