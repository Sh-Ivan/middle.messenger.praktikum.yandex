import Route from './Route';
import { TProps } from '../components/block/block';

export default class Router {
  static __instance: Router;

  routes: Route[];
  history: History;
  _currentRoute: Route | null;
  _rootQuery: string;
  private: { usePrivate: boolean; redirectRouter: string };

  constructor(rootQuery: string) {
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

  use(pathname: string, block: any, props?: TProps, isPrivate: boolean = false): Router {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery, isPrivate });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    let route = this.getRoute(pathname) || this.getRoute('404');
    if (!route) {
      return;
    }

    if (route._props.isPrivate && this.private.usePrivate) {
      route = this.getRoute(this.private.redirectRouter);
    }

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
