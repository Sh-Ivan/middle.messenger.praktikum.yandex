import EventBus from '../../helpers/event-bus';

type TProps = { [key: string]: unknown };

export interface IBlock {
  element: HTMLElement;
  props: unknown;
  init: () => void;
  hide: () => void;
  show: () => void;
  render: () => string;
  componentDidMount: () => void;
  componentDidUpdate: () => boolean;
  setProps: (nextProps: unknown) => void;
  getContent: () => HTMLElement;
}

type Meta = {
  tagName: string;
  props: TProps;
};

class Block<T> implements IBlock {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: HTMLElement;

  _meta: Meta | null = null;

  eventBus: () => EventBus;

  props: TProps;

  constructor(tagName = 'div', props: TProps) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    if (props) {
      this.props = this._makePropsProxy(props);
    }

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const tagName = this._meta !== null ? this._meta?.tagName : 'div';
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  _componentDidUpdate(oldProps: T, newProps: T) {
    if (newProps !== oldProps) {
      const response = this.componentDidUpdate();
      if (response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: TProps): void => {
    if (!nextProps) {
      return;
    }
    const oldProps = this.props;
    this.props = this._makePropsProxy(Object.assign(oldProps, nextProps));
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._element.innerHTML = block;
    this._element = this._element.firstElementChild
      ? (this._element.firstElementChild as HTMLElement)
      : this._element;
    const elements = this._element.querySelectorAll('*');

    for (let i = 0; i < elements.length; i += 1) {
      const element = <HTMLElement>elements[i];
      for (let j = 0; j < element.attributes.length; j += 1) {
        const attribute = element.attributes[j];
        if (attribute.name.search(/on:/) !== -1) {
          const eventName = attribute.name.trim().slice(3);
          const eventHandler: string = attribute.value.slice(2, -2);
          // eslint-disable-next-line keyword-spacing
          const listener = <EventListener>this.props[eventHandler];
          element.addEventListener(eventName, listener);
        }
      }
    }
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: {}) {
    const proxedProps = new Proxy(props, {
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });

    return proxedProps;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show(): void {
    this._element.style.display = 'block';
  }

  hide() {
    this._element.style.display = 'none';
  }
}

export default Block;