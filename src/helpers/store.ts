import EventBus from './event-bus';
import TChat from './TChat';

export type State =
  | {
      [key: string]: unknown;
    }
  | TChat[];

export enum EVENTS {
  STORE_CHANGED = 'store-changed',
}

export default class Store extends EventBus {
  _state: State;

  constructor(initialState: State = {}) {
    super();
    this._state = initialState;
  }

  setState(state: State): void {
    this._state = state;
    this.emit(EVENTS.STORE_CHANGED, this._state);
  }

  getState(): State {
    return this._state;
  }
}
