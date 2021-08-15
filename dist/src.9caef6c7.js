// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../static/img/union.svg":[["union.4fc3f647.svg","img/union.svg"],"img/union.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/helpers/getObjectValue.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getObjectValue(obj, path, defaultValue) {
  var objectKeys = path.split('.');
  var result = obj;

  for (var i = 0; i < objectKeys.length; i += 1) {
    result = result[objectKeys[i]];

    if (result === undefined) {
      return result;
    }
  }

  return result !== null && result !== void 0 ? result : defaultValue;
}

exports.default = getObjectValue;
},{}],"../src/helpers/templator.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getObjectValue_1 = __importDefault(require("./getObjectValue"));

var Templator = /*#__PURE__*/function () {
  function Templator(template) {
    _classCallCheck(this, Templator);

    this._template = template;
  }

  _createClass(Templator, [{
    key: "compile",
    value: function compile() {
      var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var newTemplate = this._template;

      if (!ctx || Object.keys(ctx).length === 0) {
        return this._template;
      }

      Object.entries(ctx).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        // eslint-disable-next-line no-useless-escape
        var templateVar = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');

        if (typeof value === 'function') {
          newTemplate = newTemplate.replace(templateVar, key);
        } else if (_typeof(value) === 'object') {
          // eslint-disable-next-line no-useless-escape
          var temolateObjectVar = new RegExp("{{\\s*".concat(key, "..*?}}"), 'g');
          var varsInObject = newTemplate.match(temolateObjectVar);

          if (varsInObject !== null) {
            varsInObject.forEach(function (nextVar) {
              var path = nextVar.slice(2, -2).trim();
              var newValue = getObjectValue_1.default(ctx, path);
              var replacer = newValue === '' ? '""' : newValue;
              newTemplate = newTemplate.replace(nextVar, replacer);
            });
          }
        } else {
          var replacer = value === '' ? '""' : value;
          newTemplate = newTemplate.replace(templateVar, replacer);
        }
      });
      return newTemplate;
    }
  }]);

  return Templator;
}();

exports.default = Templator;
},{"./getObjectValue":"../src/helpers/getObjectValue.ts"}],"../src/pages/login/login.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"auth-panel auth-panel_login\">\n    <h1 class=\"auth-panel__header\">\u0412\u0445\u043E\u0434</h1>\n    <form class=\"auth-form\" on:submit={{handleSubmit}}>\n      <label for=\"login\" class=\"auth-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"login\"></span>\n      <label for=\"password\" class=\"auth-form__label\">\u041F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password\"></span>\n      {{loginButton}}\n    </form>\n    <a href=\"/signup\" class=\"auth-panel__link\">\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?</a>\n  </main>\n";
},{}],"../src/helpers/event-bus.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.listeners = {};
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event] = this.listeners[event].filter(function (listener) {
        return listener !== callback;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event].forEach(function (listener) {
        listener.apply(void 0, args);
      });
    }
  }]);

  return EventBus;
}();

exports.default = EventBus;
},{}],"../src/components/block/block.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var event_bus_1 = __importDefault(require("../../helpers/event-bus"));

var Block = /*#__PURE__*/function () {
  function Block() {
    var _this = this;

    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var props = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Block);

    this._meta = null;

    this.setProps = function (nextProps) {
      if (!nextProps) {
        return;
      }

      var oldProps = _this.props;
      _this.props = _this._makePropsProxy(Object.assign(oldProps, nextProps));

      _this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
    };

    var eventBus = new event_bus_1.default();
    this._meta = {
      tagName: tagName,
      props: props
    };

    if (props) {
      this.props = this._makePropsProxy(props);
    }

    this.eventBus = function () {
      return eventBus;
    };

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _createClass(Block, [{
    key: "_registerEvents",
    value: function _registerEvents(eventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  }, {
    key: "_createResources",
    value: function _createResources() {
      var _a;

      var tagName = this._meta !== null ? (_a = this._meta) === null || _a === void 0 ? void 0 : _a.tagName : 'div';
      this._element = this._createDocumentElement(tagName);
    }
  }, {
    key: "init",
    value: function init() {
      this._createResources();

      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  }, {
    key: "_componentDidMount",
    value: function _componentDidMount() {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "_componentDidUpdate",
    value: function _componentDidUpdate(oldProps, newProps) {
      if (newProps !== oldProps) {
        var response = this.componentDidUpdate();

        if (response) {
          this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      return true;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }, {
    key: "_render",
    value: function _render() {
      this.textContent = this.render();
      this._element.innerHTML = this.textContent;
      this._element = this._element.firstElementChild ? this._element.firstElementChild : this._element;

      var elements = this._element.querySelectorAll('*');

      for (var i = 0; i < elements.length; i += 1) {
        var element = elements[i];

        for (var j = 0; j < element.attributes.length; j += 1) {
          var attribute = element.attributes[j];

          if (attribute.name.search(/on:/) !== -1) {
            var eventName = attribute.name.trim().slice(3);
            var eventHandler = attribute.value.slice(2, -2); // eslint-disable-next-line keyword-spacing

            var listener = this.props[eventHandler];
            element.addEventListener(eventName, listener);
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.element;
    }
  }, {
    key: "_makePropsProxy",
    value: function _makePropsProxy(props) {
      var proxedProps = new Proxy(props, {
        deleteProperty: function deleteProperty() {
          throw new Error('нет доступа');
        }
      });
      return proxedProps;
    }
  }, {
    key: "_createDocumentElement",
    value: function _createDocumentElement(tagName) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  }, {
    key: "show",
    value: function show() {
      this._element.style.display = 'block';
    }
  }, {
    key: "hide",
    value: function hide() {
      this._element.style.display = 'none';
    }
  }]);

  return Block;
}();

Block.EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_RENDER: 'flow:render',
  FLOW_CDU: 'flow:component-did-update'
};
exports.default = Block;
},{"../../helpers/event-bus":"../src/helpers/event-bus.ts"}],"../src/components/Button/Button.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <button type=\"{{type}}\" class=\"{{ class }}\">{{ text }}</button>\n";
},{}],"../src/components/Button/Button.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var Button_tmpl_1 = __importDefault(require("./Button.tmpl"));

var block_1 = __importDefault(require("../block/block"));

var buttonTmpl = new templator_1.default(Button_tmpl_1.default);

var Button = /*#__PURE__*/function (_block_1$default) {
  _inherits(Button, _block_1$default);

  var _super = _createSuper(Button);

  function Button(props) {
    _classCallCheck(this, Button);

    return _super.call(this, 'button', props);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var context = Object.assign({}, this.props);
      return buttonTmpl.compile(context);
    }
  }]);

  return Button;
}(block_1.default);

exports.default = Button;
},{"../../helpers/templator":"../src/helpers/templator.ts","./Button.tmpl":"../src/components/Button/Button.tmpl.ts","../block/block":"../src/components/block/block.ts"}],"../src/pages/login/login.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var login_tmpl_1 = __importDefault(require("./login.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var Button_1 = __importDefault(require("../../components/Button/Button"));

var loginTmpl = new templator_1.default(login_tmpl_1.default);

var Login = /*#__PURE__*/function (_block_1$default) {
  _inherits(Login, _block_1$default);

  var _super = _createSuper(Login);

  function Login(props) {
    _classCallCheck(this, Login);

    return _super.call(this, 'div', props);
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      var context = {
        loginButton: new Button_1.default({
          class: 'auth-form__button',
          text: 'Авторизоваться',
          type: 'submit'
        }).textContent
      };
      return loginTmpl.compile(context);
    }
  }]);

  return Login;
}(block_1.default);

exports.default = Login;
},{"../../helpers/templator":"../src/helpers/templator.ts","./login.tmpl":"../src/pages/login/login.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts"}],"../src/pages/signup/signup.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"auth-panel auth-panel_signup\">\n    <h1 class=\"auth-panel__header\">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h1>\n    <form class=\"auth-form\" on:submit={{handleSubmit}}>\n      <label for=\"email\" class=\"auth-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n      <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"email\"></span>\n      <label for=\"login\" class=\"auth-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"login\"></span>\n      <label for=\"first_name\" class=\"auth-form__label\">\u0418\u043C\u044F</label>\n      <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"first_name\"></span>\n      <label for=\"second_name\" class=\"auth-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n      <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"second_name\"></span>\n      <label for=\"phone\" class=\"auth-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n      <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"phone\"></span>\n      <label for=\"password\" class=\"auth-form__label\">\u041F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password\"></span>\n      <label for=\"password2\" class=\"auth-form__label\">\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)</label>\n      <input type=\"password\" id=\"password2\" name=\"password2\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password2\"></span>\n      {{ signupButton }}\n    </form>\n    <a href=\"/login\" class=\"auth-panel__link\">\u0412\u043E\u0439\u0442\u0438</a>\n  </main>\n";
},{}],"../src/pages/signup/signup.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var signup_tmpl_1 = __importDefault(require("./signup.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var Button_1 = __importDefault(require("../../components/Button/Button"));

var signupTmpl = new templator_1.default(signup_tmpl_1.default);

var Signup = /*#__PURE__*/function (_block_1$default) {
  _inherits(Signup, _block_1$default);

  var _super = _createSuper(Signup);

  function Signup(props) {
    _classCallCheck(this, Signup);

    return _super.call(this, 'div', props);
  }

  _createClass(Signup, [{
    key: "render",
    value: function render() {
      var context = {
        signupButton: new Button_1.default({
          class: 'auth-form__button',
          text: 'Зарегистрироваться',
          type: 'submit'
        }).textContent
      };
      return signupTmpl.compile(context);
    }
  }]);

  return Signup;
}(block_1.default);

exports.default = Signup;
},{"../../helpers/templator":"../src/helpers/templator.ts","./signup.tmpl":"../src/pages/signup/signup.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts"}],"../src/pages/404/404.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"error-page\">\n    <h1 class=\"error-page__header\">\u041E\u0448\u0438\u0431\u043A\u0430 404</h1>\n    <p class=\"error-page__message\">\u041D\u0435\u0442 \u0442\u0430\u043A\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B</p>\n    <a href=\"/\" class=\"error-page__link\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443</a>\n  </main>\n";
},{}],"../src/pages/404/404.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var _404_tmpl_1 = __importDefault(require("./404.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var page404Tmpl = new templator_1.default(_404_tmpl_1.default);

var Page404 = /*#__PURE__*/function (_block_1$default) {
  _inherits(Page404, _block_1$default);

  var _super = _createSuper(Page404);

  function Page404() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Page404);

    return _super.call(this, 'div', props);
  }

  _createClass(Page404, [{
    key: "render",
    value: function render() {
      return page404Tmpl.compile();
    }
  }]);

  return Page404;
}(block_1.default);

exports.default = Page404;
},{"../../helpers/templator":"../src/helpers/templator.ts","./404.tmpl":"../src/pages/404/404.tmpl.ts","../../components/block/block":"../src/components/block/block.ts"}],"../src/pages/500/500.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"error-page\">\n    <h1 class=\"error-page__header\">\u041E\u0448\u0438\u0431\u043A\u0430 500</h1>\n    <p class=\"error-page__message\">\u0417\u043D\u0430\u0435\u043C, \u0447\u0438\u043D\u0438\u043C</p>\n    <a href=\"/\" class=\"error-page__link\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443</a>\n  </main>\n";
},{}],"../src/pages/500/500.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var _500_tmpl_1 = __importDefault(require("./500.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var page500Tmpl = new templator_1.default(_500_tmpl_1.default);

var Page500 = /*#__PURE__*/function (_block_1$default) {
  _inherits(Page500, _block_1$default);

  var _super = _createSuper(Page500);

  function Page500() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Page500);

    return _super.call(this, 'div', props);
  }

  _createClass(Page500, [{
    key: "render",
    value: function render() {
      return page500Tmpl.compile();
    }
  }]);

  return Page500;
}(block_1.default);

exports.default = Page500;
},{"../../helpers/templator":"../src/helpers/templator.ts","./500.tmpl":"../src/pages/500/500.tmpl.ts","../../components/block/block":"../src/components/block/block.ts"}],"../src/pages/chat/chat.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"error-page\">\n    <h1 class=\"error-page__header\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435</h1>\n    <ul class=\"error-page__nav\">\n      <li>\n        <a href=\"/login\" class=\"error-page__link\">\u0412\u043E\u0439\u0442\u0438</a>\n      </li>\n      <li>\n        <a href=\"/signup\" class=\"error-page__link\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</a>\n      </li>\n      <li>\n        <a href=\"/user\" class=\"error-page__link\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</a>\n      </li>\n      <li>\n        <a href=\"/page404\" class=\"error-page__link\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 404</a>\n      </li>\n      <li>\n        <a href=\"/page500\" class=\"error-page__link\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 500</a>\n      </li>\n      <li>\n        <a href=\"/change-password\" class=\"error-page__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>\n      </li>\n      <li>\n        <a href=\"/edit-user-profile\" class=\"error-page__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</a>\n      </li>\n      </li>\n    </ul>\n  </main>\n";
},{}],"../src/pages/chat/chat.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var chat_tmpl_1 = __importDefault(require("./chat.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var chatTmpl = new templator_1.default(chat_tmpl_1.default);

var Chat = /*#__PURE__*/function (_block_1$default) {
  _inherits(Chat, _block_1$default);

  var _super = _createSuper(Chat);

  function Chat() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Chat);

    return _super.call(this, 'div', props);
  }

  _createClass(Chat, [{
    key: "render",
    value: function render() {
      return chatTmpl.compile(this.props);
    }
  }]);

  return Chat;
}(block_1.default);

exports.default = Chat;
},{"../../helpers/templator":"../src/helpers/templator.ts","./chat.tmpl":"../src/pages/chat/chat.tmpl.ts","../../components/block/block":"../src/components/block/block.ts"}],"../src/pages/user-profile/user-profile.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"user-profile\">\n    <header class=\"user-profile__wrapper\">\n      <div class=\"avatar-wrapper\">\n        <i class=\"avatar-icon\"></i>\n      </div>\n      <h2 class=\"user-profile__header\">\u0418\u0432\u0430\u043D</h2>\n    </header>\n\n    <form class=\"user-profile__form \">\n      <div class=\"user-profile__row\">\n        <label for=\"email\" class=\"user-profile-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n        <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"user-profile-form__input\" \n        disabled value={{email}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"login\" class=\"user-profile-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n        <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"user-profile-form__input\" \n        disabled value={{login}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"first_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F</label>\n        <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"user-profile-form__input\" \n        disabled value={{firstName}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"second_name\" class=\"user-profile-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n        <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"user-profile-form__input\" \n        disabled value={{secondName}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"display_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435</label>\n        <input type=\"text\" id=\"display_name\" name=\"display_name\" placeholder=\"\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435\" class=\"user-profile-form__input\" \n        disabled value={{displayName}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"phone\" class=\"user-profile-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n        <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"user-profile-form__input\" \n        disabled value={{phone}}>\n      </div>\n\n      <div class=\"user-profile__links\">\n        <a href=\"/edit-user-profile\" class=\"user-profile__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435</a>\n        <a href=\"/change-password\" class=\"user-profile__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>\n        <a href=\"/\" class=\"user-profile__link user-profile__link_reject\">\u0412\u044B\u0439\u0442\u0438</a>\n      </div>\n    </form>\n  </main>\n";
},{}],"../src/pages/user-profile/user-profile.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var user_profile_tmpl_1 = __importDefault(require("./user-profile.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var userProfileTmpl = new templator_1.default(user_profile_tmpl_1.default);

var UserProfile = /*#__PURE__*/function (_block_1$default) {
  _inherits(UserProfile, _block_1$default);

  var _super = _createSuper(UserProfile);

  function UserProfile() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserProfile);

    return _super.call(this, 'div', props);
  }

  _createClass(UserProfile, [{
    key: "render",
    value: function render() {
      var context = {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        displayName: '',
        phone: ''
      };
      return userProfileTmpl.compile(context);
    }
  }]);

  return UserProfile;
}(block_1.default);

exports.default = UserProfile;
},{"../../helpers/templator":"../src/helpers/templator.ts","./user-profile.tmpl":"../src/pages/user-profile/user-profile.tmpl.ts","../../components/block/block":"../src/components/block/block.ts"}],"../src/pages/change-password/change-password.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"auth-panel auth-panel_login\">\n    <h1 class=\"auth-panel__header\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</h1>\n    <form class=\"auth-form\" on:submit={{handleSubmit}}>\n      <label for=\"oldPassword\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"oldPassword\" name=\"oldPassword\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"oldPassword\"></span>\n      <label for=\"password\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password\"></span>\n      <label for=\"password2\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0435\u0449\u0435 \u0440\u0430\u0437</label>\n      <input type=\"password\" id=\"password2\" name=\"password2\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password2\"></span>\n      {{ saveButton }}\n    </form>\n    <a href=\"/user\" class=\"auth-panel__link\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043F\u0440\u043E\u0444\u0438\u043B\u044E</a>\n  </main>\n";
},{}],"../src/pages/change-password/change-password.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var change_password_tmpl_1 = __importDefault(require("./change-password.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var Button_1 = __importDefault(require("../../components/Button/Button"));

var changePasswordTmpl = new templator_1.default(change_password_tmpl_1.default);

var ChangePassword = /*#__PURE__*/function (_block_1$default) {
  _inherits(ChangePassword, _block_1$default);

  var _super = _createSuper(ChangePassword);

  function ChangePassword(props) {
    _classCallCheck(this, ChangePassword);

    return _super.call(this, 'div', props);
  }

  _createClass(ChangePassword, [{
    key: "render",
    value: function render() {
      var context = {
        saveButton: new Button_1.default({
          class: 'auth-form__button',
          text: 'Сохранить',
          type: 'submit'
        }).textContent
      };
      return changePasswordTmpl.compile(context);
    }
  }]);

  return ChangePassword;
}(block_1.default);

exports.default = ChangePassword;
},{"../../helpers/templator":"../src/helpers/templator.ts","./change-password.tmpl":"../src/pages/change-password/change-password.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts"}],"../src/pages/edit-user-profile/edit-user-profile.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"user-profile\">\n    <h2 class=\"user-profile__header user-profile__header-edit\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</h2>\n    <div class=\"user-profile__edit\">\n      <form class=\"user-profile__form \" on:submit={{handleSubmit}} novalidate>\n        <div class=\"user-profile__row\">\n          <label for=\"email\" class=\"user-profile-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n          <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"user-profile-form__input\"\n          value={{email}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"email\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"login\" class=\"user-profile-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n          <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"user-profile-form__input\" \n          value={{login}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"login\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"first_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F</label>\n          <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"user-profile-form__input\" \n          value={{firstName}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"first_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"second_name\" class=\"user-profile-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n          <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"user-profile-form__input\" \n          value={{secondName}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"second_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"display_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435</label>\n          <input type=\"text\" id=\"display_name\" name=\"display_name\" placeholder=\"\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435\" class=\"user-profile-form__input\" \n          value={{displayName}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"display_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"phone\" class=\"user-profile-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n          <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"user-profile-form__input\" \n          value={{phone}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"phone\"></span>\n\n        <div class=\"user-profile__links\">\n          <button type=\"submit\" class=\"auth-form__button auth-form__button_center\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F</button>\n          <a href=\"/user\" class=\"auth-panel__link user-profile__link_reject\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</a>\n        </div>\n      </form>\n\n      <aside class=\"user-profile__aside\">\n        <div class=\"avatar-wrapper\">\n          <i class=\"avatar-icon\"></i>\n        </div>\n          <a href=\"/user\" class=\"auth-panel__link\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u0444\u043E\u0442\u043E</a>\n          <a href=\"/user\" class=\"auth-panel__link user-profile__link_reject\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u043E\u0442\u043E</a>\n      </aside>\n    </div>\n  </main>\n";
},{}],"../src/pages/edit-user-profile/edit-user-profile.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable class-methods-use-this */

var templator_1 = __importDefault(require("../../helpers/templator"));

var edit_user_profile_tmpl_1 = __importDefault(require("./edit-user-profile.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var Button_1 = __importDefault(require("../../components/Button/Button"));

var editUserProfileTmpl = new templator_1.default(edit_user_profile_tmpl_1.default);
var initialContext = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  displayName: '',
  phone: ''
};

var EditUserProfile = /*#__PURE__*/function (_block_1$default) {
  _inherits(EditUserProfile, _block_1$default);

  var _super = _createSuper(EditUserProfile);

  function EditUserProfile(props) {
    _classCallCheck(this, EditUserProfile);

    return _super.call(this, 'div', props);
  }

  _createClass(EditUserProfile, [{
    key: "render",
    value: function render() {
      var button = {
        saveButton: new Button_1.default({
          class: 'auth-form__button auth-form__button_center',
          text: 'Сохранить изменения',
          type: 'submit'
        }).textContent
      };
      var context = Object.assign(Object.assign({}, initialContext), button);
      return editUserProfileTmpl.compile(context);
    }
  }]);

  return EditUserProfile;
}(block_1.default);

exports.default = EditUserProfile;
},{"../../helpers/templator":"../src/helpers/templator.ts","./edit-user-profile.tmpl":"../src/pages/edit-user-profile/edit-user-profile.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts"}],"../src/components/ChatList/chat.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n<div class=\"chat-page\">\n  <aside class=\"chat-list\">\n    <div class=\"chat-list__search\">\n      <div class=\"chat-list-search__avatar\"></div>\n      <div class=\"chat-list-search__field\">\n        <i class=\"search-icon\"></i>\n        <input type=\"text\" placeholder=\"\u041F\u043E\u0438\u0441\u043A\" class=\"chat-list-search__input\"\">\n      </div>\n    </div>\n    <ul class=\"chat-list__items\">\n      <li class=\"chat-list__item\">\n        <div class=\"chat-list-item__avatar\">\n        </div>\n        <div class=\"chat-list-item__rows\">\n          <div class=\"chat-list-item__row\">\n            <div class=\"chat-list-item__name\">\n              \u0412\u0438\u043A\u0442\u043E\u0440 \u0421\u0438\u043A\u043E\u0440\u0441\u043A\u0438\u0439\n            </div>\n            <div class=\"chat-list-item__time\">\n              12:15\n            </div>\n          </div>\n          <div class=\"chat-list-item__row\">\n            <div class=\"chat-list-item__message\">\n              \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E \u0432\u0441\u0442\u0440\u0435\u0447\u0443 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 19.00\n            </div>\n            <div class=\"chat-list-item__badge\">\n              16\n            </div>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </aside>\n  <main class=\"chat-window\">\n    <haeder>Header</haeder>\n    <section>ChatWindoe</section>\n  </main>\n</div>\n";
},{}],"../src/components/ChatList/chat.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../../static/img/search.svg":[["search.1e31d98f.svg","img/search.svg"],"img/search.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/components/ChatList/chat.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var templator_1 = __importDefault(require("../../helpers/templator"));

var chat_tmpl_1 = __importDefault(require("./chat.tmpl"));

var block_1 = __importDefault(require("../block/block"));

require("./chat.scss");

var chatTmpl = new templator_1.default(chat_tmpl_1.default);

var chat = /*#__PURE__*/function (_block_1$default) {
  _inherits(chat, _block_1$default);

  var _super = _createSuper(chat);

  function chat() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, chat);

    return _super.call(this, 'div', props);
  }

  _createClass(chat, [{
    key: "render",
    value: function render() {
      var context = {};
      return chatTmpl.compile(context);
    }
  }]);

  return chat;
}(block_1.default);

exports.default = chat;
},{"../../helpers/templator":"../src/helpers/templator.ts","./chat.tmpl":"../src/components/ChatList/chat.tmpl.ts","../block/block":"../src/components/block/block.ts","./chat.scss":"../src/components/ChatList/chat.scss"}],"../src/helpers/validate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.toggleErrorElement = void 0;
var EMAIL_REG_EXP = /.+@.+\..+/i;
var PHONE_REG_EXP = /^\+?\d+[0-9-]{5,15}$/;

function toggleErrorElement(element, validateResult) {
  var _a;

  var errorElement = (_a = element.closest('form')) === null || _a === void 0 ? void 0 : _a.querySelector("[data-error=\"".concat(element.name, "\"]"));

  if (errorElement) {
    if (validateResult !== 'valid') {
      errorElement.textContent = validateResult;
      errorElement.classList.remove('hide');
    } else {
      errorElement.classList.add('hide');
    }
  }
}

exports.toggleErrorElement = toggleErrorElement;

function validate(element) {
  var validateResult = '';

  switch (element.type) {
    case 'email':
      if (!element.value.match(EMAIL_REG_EXP)) {
        validateResult = 'Email должен содержать знаки @ и .';
      }

      break;

    case 'text':
      if (element.value.length < 2 || element.value.length > 20) {
        validateResult = 'Длина поля должна быть более 1 и менее 20 символов';
      }

      break;

    case 'tel':
      if (!element.value.match(PHONE_REG_EXP)) {
        validateResult = "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0446\u0438\u0444\u0440\u044B \u0438 \n        \u0441\u0438\u043C\u0432\u043E\u043B\u044B + \u0438\u043B\u0438 - \u0438 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 5 \u0446\u0438\u0444\u0440";
      }

      break;

    case 'password':
      if (element.name === 'password2') {
        var form = element.closest('form');

        if ((form === null || form === void 0 ? void 0 : form.password) && (form === null || form === void 0 ? void 0 : form.password.value) !== element.value) {
          validateResult = 'Пароли не совпадают';
        }
      }

      if (element.value.length < 8) {
        validateResult = 'Пароль должен содержать не менее 8 символов';
      }

      break;

    default:
      validateResult = 'valid';
  }

  toggleErrorElement(element, validateResult);
  return validateResult;
}

exports.validate = validate;
},{}],"../src/helpers/formSubmit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var validate_1 = require("./validate");

function handleSubmit(e) {
  e.preventDefault();
  var formData = {};
  var target = e.currentTarget;
  var elements = target.elements;

  for (var i = 0; i < elements.length; i += 1) {
    var element = elements[i];
    validate_1.validate(element);

    if (element.type !== 'submit') {
      formData[element.name] = element.value;
    }
  } // eslint-disable-next-line no-console


  console.log(formData);
}

exports.default = handleSubmit;
},{"./validate":"../src/helpers/validate.ts"}],"../src/helpers/inputValidate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = exports.handleFocus = void 0;

var validate_1 = require("./validate");

function handleFocus(e) {
  var element = e.target;
  validate_1.validate(element);
}

exports.handleFocus = handleFocus;

function handleBlur(e) {
  var element = e.target;
  validate_1.validate(element);
}

exports.handleBlur = handleBlur;
},{"./validate":"../src/helpers/validate.ts"}],"../src/components/App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../index.scss");

var login_1 = __importDefault(require("../pages/login/login"));

var signup_1 = __importDefault(require("../pages/signup/signup"));

var _404_1 = __importDefault(require("../pages/404/404"));

var _500_1 = __importDefault(require("../pages/500/500"));

var chat_1 = __importDefault(require("../pages/chat/chat"));

var user_profile_1 = __importDefault(require("../pages/user-profile/user-profile"));

var change_password_1 = __importDefault(require("../pages/change-password/change-password"));

var edit_user_profile_1 = __importDefault(require("../pages/edit-user-profile/edit-user-profile"));

var chat_2 = __importDefault(require("./ChatList/chat"));

var formSubmit_1 = __importDefault(require("../helpers/formSubmit"));

var inputValidate_1 = require("../helpers/inputValidate");

var pathname = window.location.pathname;
var defaultPage = new chat_1.default();
var editProfile = new edit_user_profile_1.default({
  handleSubmit: formSubmit_1.default,
  handleFocus: inputValidate_1.handleFocus,
  handleBlur: inputValidate_1.handleBlur
});
var router = {
  '/': defaultPage,
  '/login': new login_1.default({
    handleSubmit: formSubmit_1.default,
    handleFocus: inputValidate_1.handleFocus,
    handleBlur: inputValidate_1.handleBlur
  }),
  '/signup': new signup_1.default({
    handleSubmit: formSubmit_1.default,
    handleFocus: inputValidate_1.handleFocus,
    handleBlur: inputValidate_1.handleBlur
  }),
  '/chat': new chat_2.default(),
  '/user': new user_profile_1.default(),
  '/page404': new _404_1.default(),
  '/page500': new _500_1.default(),
  '/change-password': new change_password_1.default({
    handleSubmit: formSubmit_1.default,
    handleFocus: inputValidate_1.handleFocus,
    handleBlur: inputValidate_1.handleBlur
  }),
  '/edit-user-profile': editProfile
};
var App = router[pathname] !== undefined ? router[pathname] : router['/page404'];
exports.default = App;
},{"../index.scss":"../src/index.scss","../pages/login/login":"../src/pages/login/login.ts","../pages/signup/signup":"../src/pages/signup/signup.ts","../pages/404/404":"../src/pages/404/404.ts","../pages/500/500":"../src/pages/500/500.ts","../pages/chat/chat":"../src/pages/chat/chat.ts","../pages/user-profile/user-profile":"../src/pages/user-profile/user-profile.ts","../pages/change-password/change-password":"../src/pages/change-password/change-password.ts","../pages/edit-user-profile/edit-user-profile":"../src/pages/edit-user-profile/edit-user-profile.ts","./ChatList/chat":"../src/components/ChatList/chat.ts","../helpers/formSubmit":"../src/helpers/formSubmit.ts","../helpers/inputValidate":"../src/helpers/inputValidate.ts"}],"../src/helpers/render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function render(query, block) {
  var root = document.querySelector(query);

  if (root !== null) {
    root.appendChild(block.getContent());
  }

  return root;
}

exports.default = render;
},{}],"../src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var App_1 = __importDefault(require("./components/App"));

var render_1 = __importDefault(require("./helpers/render"));

render_1.default('.root', App_1.default);
},{"./components/App":"../src/components/App.ts","./helpers/render":"../src/helpers/render.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50142" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map