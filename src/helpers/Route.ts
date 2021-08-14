import { TProps, IBlock } from '../components/block/block';
import render from './render';

function isEqual<T>(lhs: T, rhs: T): boolean {
  return lhs === rhs;
}

interface RouteProps extends TProps {
  rootQuery: string;
}

class Route {
  _pathname: string;
  _blockClass: any;
  _block: IBlock | null;
  _props: RouteProps;

  constructor(pathname: string, view: any, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      //this._block.hide();
      const root = document.querySelector(this._props.rootQuery);
      if (root !== null) {
        root.innerHTML = '';
      }
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props) as IBlock;
    }
    render(this._props.rootQuery, this._block);
  }
}

export default Route;
