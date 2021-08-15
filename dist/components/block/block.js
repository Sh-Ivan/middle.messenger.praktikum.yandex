"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const event_bus_1 = require("../../helpers/event-bus");
class Block {
    constructor(tagName = 'div', props) {
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            const oldProps = this.props;
            this.props = this._makePropsProxy(Object.assign(Object.assign({}, oldProps), nextProps));
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
        };
        const eventBus = new event_bus_1.default();
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
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        var _a;
        const tagName = this._meta !== null ? (_a = this._meta) === null || _a === void 0 ? void 0 : _a.tagName : 'div';
        this._element = this._createDocumentElement(tagName);
        //this._element = document.createElement('template');
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (newProps !== oldProps) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
        else if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(_oldProps, _newProps) {
        return true;
    }
    get element() {
        return this._element;
    }
    _render() {
        this.textContent = this.render();
        this._element.innerHTML = this.textContent;
        this._element = this._element.firstElementChild
            ? this._element.firstElementChild
            : this._element;
        const elements = this._element.querySelectorAll('*');
        for (let i = 0; i < elements.length; i += 1) {
            const element = elements[i];
            for (let j = 0; j < element.attributes.length; j += 1) {
                const attribute = element.attributes[j];
                if (attribute.name.search(/on:/) !== -1) {
                    const eventName = attribute.name.trim().slice(3);
                    const eventHandler = attribute.value.slice(2, -2);
                    // eslint-disable-next-line keyword-spacing
                    const listener = this.props[eventHandler];
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
    _makePropsProxy(props) {
        const proxedProps = new Proxy(props, {
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
        return proxedProps;
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        this._element.style.display = 'block';
    }
    hide() {
        this._element.style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
};
exports.default = Block;
//# sourceMappingURL=block.js.map