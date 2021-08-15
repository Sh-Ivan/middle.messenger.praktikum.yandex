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
      return defaultValue;
    }
  }

  return result;
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
        } else if (Array.isArray(value)) {
          var listElements = '';
          value.forEach(function (elem) {
            listElements = listElements.concat(elem);
          });
          newTemplate = newTemplate.replace(templateVar, listElements);
          var newCtx = Object.assign({}, ctx);
          newCtx[key] = null;
          return new Templator(newTemplate).compile(newCtx);
        } else if (_typeof(value) === 'object' && value !== null) {
          // eslint-disable-next-line no-useless-escape
          var temolateObjectVar = new RegExp("{{\\s*".concat(key, "\\s*}}?"), 'g');
          var varsInObject = newTemplate.match(temolateObjectVar);

          if (varsInObject !== null) {
            varsInObject.forEach(function (nextVar) {
              var path = nextVar.slice(2, -2).trim();
              console.log(ctx);
              console.log(path);
              var newValue = getObjectValue_1.default(ctx, path);
              console.log(newValue);
              var replacer = newValue === '' ? '""' : newValue;
              newTemplate = newTemplate.replace(nextVar, replacer);
            });
          }
        } else {
          var replacer = value === '' ? '&nbsp;' : value;

          if (value === null || value === undefined) {
            replacer = '&nbsp;';
          }

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
/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

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
      _this.props = _this._makePropsProxy(Object.assign(Object.assign({}, oldProps), nextProps));

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
      this._element = this._createDocumentElement(tagName); //this._element = document.createElement('template');
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
      var response = this.componentDidUpdate(oldProps, newProps);

      if (newProps !== oldProps) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      } else if (response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_oldProps, _newProps) {
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
},{"../../helpers/templator":"../src/helpers/templator.ts","./Button.tmpl":"../src/components/Button/Button.tmpl.ts","../block/block":"../src/components/block/block.ts"}],"../src/helpers/validate.ts":[function(require,module,exports) {
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
  var validateResult = 'valid';

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
  var formDataValid = true;
  var formData = {};
  var target = e.currentTarget;
  var elements = target.elements;

  for (var i = 0; i < elements.length; i += 1) {
    var element = elements[i];
    var validateResult = validate_1.validate(element);
    formDataValid = formDataValid && validateResult === 'valid';

    if (element.type !== 'submit') {
      formData[element.name] = element.value;
    }
  } // eslint-disable-next-line no-console


  console.log(formData);
  return formDataValid ? formData : null;
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
},{"./validate":"../src/helpers/validate.ts"}],"../src/helpers/http.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable implicit-arrow-linebreak */

var METHODS;

(function (METHODS) {
  METHODS["GET"] = "GET";
  METHODS["PUT"] = "PUT";
  METHODS["POST"] = "POST";
  METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));

function queryStringify(data) {
  if (!data) {
    throw new Error('Не переданы данные!');
  }

  var queryString = '?';
  Object.entries(data).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    queryString += "".concat(key, "=").concat(value, "&");
  });
  return queryString.slice(0, -1);
}

var HTTPTransport = function HTTPTransport(baseUrl) {
  var _this = this;

  _classCallCheck(this, HTTPTransport);

  this.get = function (url, options) {
    return _this.request(url, Object.assign(Object.assign({}, options), {
      method: METHODS.GET
    }));
  };

  this.post = function (url, options) {
    return _this.request(url, Object.assign(Object.assign({}, options), {
      method: METHODS.POST
    }));
  };

  this.put = function (url, options) {
    return _this.request(url, Object.assign(Object.assign({}, options), {
      method: METHODS.PUT
    }));
  };

  this.delete = function (url, options) {
    return _this.request(url, Object.assign(Object.assign({}, options), {
      method: METHODS.DELETE
    }));
  };

  this.request = function (url, options) {
    var fullUrl = _this.baseUrl + url;
    var method = options.method,
        _options$timeout = options.timeout,
        timeout = _options$timeout === void 0 ? 5000 : _options$timeout,
        _options$headers = options.headers,
        headers = _options$headers === void 0 ? {
      'Content-Type': 'application/json'
    } : _options$headers,
        data = options.data;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method || METHODS.GET, method === METHODS.GET && !!data ? "".concat(fullUrl).concat(queryStringify(data)) : fullUrl);
      xhr.timeout = timeout;
      Object.entries(headers).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if ((data === null || data === void 0 ? void 0 : data.form) && key === 'Content-Type') {
          return;
        }

        xhr.setRequestHeader(key, value);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data.form) {
        xhr.send(data.form);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };

  this.baseUrl = baseUrl;
};

exports.default = HTTPTransport;
},{}],"../src/api/auth-api.ts":[function(require,module,exports) {
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

var http_1 = __importDefault(require("../helpers/http"));

var authAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/auth/');

var AuthAPI = /*#__PURE__*/function () {
  function AuthAPI() {
    _classCallCheck(this, AuthAPI);
  }

  _createClass(AuthAPI, [{
    key: "signup",
    value: function signup(data) {
      return authAPIInstance.post('signup', {
        data: data
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return authAPIInstance.get('user', {});
    }
  }, {
    key: "login",
    value: function login(data) {
      return authAPIInstance.post('signin', {
        data: data
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      return authAPIInstance.post('logout', {});
    }
  }]);

  return AuthAPI;
}();

exports.default = AuthAPI;
},{"../helpers/http":"../src/helpers/http.ts"}],"../src/helpers/store.ts":[function(require,module,exports) {
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
exports.EVENTS = void 0;

var event_bus_1 = __importDefault(require("./event-bus"));

var EVENTS;

(function (EVENTS) {
  EVENTS["STORE_CHANGED"] = "store-changed";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));

var Store = /*#__PURE__*/function (_event_bus_1$default) {
  _inherits(Store, _event_bus_1$default);

  var _super = _createSuper(Store);

  function Store() {
    var _this;

    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    _this = _super.call(this);
    _this._state = initialState;
    return _this;
  }

  _createClass(Store, [{
    key: "setState",
    value: function setState(state) {
      this._state = state;
      this.emit(EVENTS.STORE_CHANGED, this._state);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this._state;
    }
  }]);

  return Store;
}(event_bus_1.default);

exports.default = Store;
},{"./event-bus":"../src/helpers/event-bus.ts"}],"../src/stores/UserStore.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var store_1 = __importDefault(require("../helpers/store"));

var initialState = {
  user: null
};
var UserStore = new store_1.default(initialState);
exports.default = UserStore;
},{"../helpers/store":"../src/helpers/store.ts"}],"../src/controllers/auth-controller.ts":[function(require,module,exports) {
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

var auth_api_1 = __importDefault(require("../api/auth-api"));

var UserStore_1 = __importDefault(require("../stores/UserStore"));

var App_1 = require("../components/App");

var store_1 = require("../helpers/store");

var authAPIInstance = new auth_api_1.default();

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "signup",
    value: function signup(data) {
      authAPIInstance.signup(data).then(function (result) {
        console.log(result);

        if (result.status === 200) {
          App_1.AppRouter.go('/');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(cb) {
      return authAPIInstance.getUserInfo().then(function (result) {
        if (result.status === 200) {
          var user = JSON.parse(result.response);
          UserStore_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
          UserStore_1.default.setState(user);
          return user;
        }

        App_1.AppRouter.go('/login');
      });
    }
  }, {
    key: "login",
    value: function login(data) {
      authAPIInstance.login(data).then(function (result) {
        if (result.status === 200) {
          App_1.AppRouter.go('/');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      authAPIInstance.logout().then(function (result) {
        if (result.status === 200) {
          App_1.AppRouter.go('/login');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return AuthController;
}();

exports.default = AuthController;
},{"../api/auth-api":"../src/api/auth-api.ts","../stores/UserStore":"../src/stores/UserStore.ts","../components/App":"../src/components/App.ts","../helpers/store":"../src/helpers/store.ts"}],"../src/pages/login/login.ts":[function(require,module,exports) {
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

var formSubmit_1 = __importDefault(require("../../helpers/formSubmit"));

var inputValidate_1 = require("../../helpers/inputValidate");

var auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));

var App_1 = __importDefault(require("../../components/App"));

var loginTmpl = new templator_1.default(login_tmpl_1.default);
var authController = new auth_controller_1.default();

var Login = /*#__PURE__*/function (_block_1$default) {
  _inherits(Login, _block_1$default);

  var _super = _createSuper(Login);

  function Login(props) {
    _classCallCheck(this, Login);

    return _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      handleBlur: inputValidate_1.handleBlur,
      handleFocus: inputValidate_1.handleFocus,
      handleSubmit: function handleSubmit(e) {
        var data = formSubmit_1.default(e);

        if (data !== null) {
          authController.login(data);
        }
      }
    }));
  }

  _createClass(Login, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      authController.getUserInfo(function (user) {
        _this.setProps({
          user: user
        });
      }).then(function (user) {
        if (user) {
          App_1.default.go('/');
        }
      });
    }
  }, {
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
},{"../../helpers/templator":"../src/helpers/templator.ts","./login.tmpl":"../src/pages/login/login.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts","../../helpers/formSubmit":"../src/helpers/formSubmit.ts","../../helpers/inputValidate":"../src/helpers/inputValidate.ts","../../controllers/auth-controller":"../src/controllers/auth-controller.ts","../../components/App":"../src/components/App.ts"}],"../src/pages/signup/signup.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"auth-panel auth-panel_signup\">\n    <h1 class=\"auth-panel__header\">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h1>\n    <form class=\"auth-form\" on:submit={{handleSubmit}}>\n      <label for=\"email\" class=\"auth-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n      <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"email\"></span>\n      <label for=\"login\" class=\"auth-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"login\"></span>\n      <label for=\"first_name\" class=\"auth-form__label\">\u0418\u043C\u044F</label>\n      <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"first_name\"></span>\n      <label for=\"second_name\" class=\"auth-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n      <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"second_name\"></span>\n      <label for=\"phone\" class=\"auth-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n      <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"phone\"></span>\n      <label for=\"password\" class=\"auth-form__label\">\u041F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password\"></span>\n      <label for=\"password2\" class=\"auth-form__label\">\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)</label>\n      <input type=\"password\" id=\"password2\" name=\"password2\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password2\"></span>\n      {{ signupButton }}\n    </form>\n    <a href=\"/login\" class=\"auth-panel__link\">\u0412\u043E\u0439\u0442\u0438</a>\n  </main>\n";
},{}],"../src/pages/signup/signup.ts":[function(require,module,exports) {
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

var formSubmit_1 = __importDefault(require("../../helpers/formSubmit"));

var inputValidate_1 = require("../../helpers/inputValidate");

var auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));

var signupTmpl = new templator_1.default(signup_tmpl_1.default);
var authController = new auth_controller_1.default();

var Signup = /*#__PURE__*/function (_block_1$default) {
  _inherits(Signup, _block_1$default);

  var _super = _createSuper(Signup);

  function Signup(props) {
    _classCallCheck(this, Signup);

    return _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      handleBlur: inputValidate_1.handleBlur,
      handleFocus: inputValidate_1.handleFocus,
      handleSubmit: function handleSubmit(e) {
        var data = formSubmit_1.default(e);

        if (data !== null) {
          var escapedData = {};
          Object.entries(data).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            escapedData[key] = escape(value);
          });
          authController.signup(escapedData);
        }
      }
    }));
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
},{"../../helpers/templator":"../src/helpers/templator.ts","./signup.tmpl":"../src/pages/signup/signup.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts","../../helpers/formSubmit":"../src/helpers/formSubmit.ts","../../helpers/inputValidate":"../src/helpers/inputValidate.ts","../../controllers/auth-controller":"../src/controllers/auth-controller.ts"}],"../src/pages/404/404.tmpl.ts":[function(require,module,exports) {
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
},{"../../helpers/templator":"../src/helpers/templator.ts","./500.tmpl":"../src/pages/500/500.tmpl.ts","../../components/block/block":"../src/components/block/block.ts"}],"../src/pages/user-profile/user-profile.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"user-profile\">\n    <header class=\"user-profile__wrapper\">\n      <div class=\"avatar-wrapper\">\n        {{userAvatar}}\n      </div>\n      <h2 class=\"user-profile__header\">{{fullName}}</h2>\n    </header>\n\n    <form class=\"user-profile__form \">\n      <div class=\"user-profile__row\">\n        <label for=\"email\" class=\"user-profile-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n        <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"user-profile-form__input\" \n        disabled value={{email}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"login\" class=\"user-profile-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n        <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"user-profile-form__input\" \n        disabled value={{login}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"first_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F</label>\n        <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"user-profile-form__input\" \n        disabled value={{first_name}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"second_name\" class=\"user-profile-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n        <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"user-profile-form__input\" \n        disabled value={{second_name}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"display_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435</label>\n        <input type=\"text\" id=\"display_name\" name=\"display_name\" placeholder=\"\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435\" class=\"user-profile-form__input\" \n        disabled value={{display_name}}>\n      </div>\n      <div class=\"user-profile__row\">\n        <label for=\"phone\" class=\"user-profile-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n        <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"user-profile-form__input\" \n        disabled value={{phone}}>\n      </div>\n\n      <div class=\"user-profile__links\">\n        <a href=\"/edit-user-profile\" class=\"user-profile__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435</a>\n        <a href=\"/change-password\" class=\"user-profile__link\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</a>\n        <a href=\"/login\" class=\"user-profile__link user-profile__link_reject\" on:click={{handleSignout}}>\u0412\u044B\u0439\u0442\u0438</a>\n      </div>\n    </form>\n  </main>\n";
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

var auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));

var userProfileTmpl = new templator_1.default(user_profile_tmpl_1.default);
var authController = new auth_controller_1.default();

var UserProfile = /*#__PURE__*/function (_block_1$default) {
  _inherits(UserProfile, _block_1$default);

  var _super = _createSuper(UserProfile);

  function UserProfile() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserProfile);

    return _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      handleSignout: function handleSignout(e) {
        e.preventDefault();
        authController.logout();
      }
    }));
  }

  _createClass(UserProfile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      authController.getUserInfo(function (user) {
        _this.setProps({
          user: user
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var user = this.props.user;
      var fullName = user ? "".concat(user === null || user === void 0 ? void 0 : user.first_name, " ").concat(user === null || user === void 0 ? void 0 : user.second_name) : '';
      var userAvatar;

      if (user === null || user === void 0 ? void 0 : user.avatar) {
        userAvatar = "\n        <img src=\"https://ya-praktikum.tech/api/v2/resources".concat(user.avatar, "\" class=\"avatar-wrapper\">\n      ");
      } else {
        userAvatar = '<i class="avatar-icon"></i>';
      }

      var context = Object.assign(Object.assign({}, user), {
        fullName: fullName,
        userAvatar: userAvatar
      });
      return userProfileTmpl.compile(context);
    }
  }]);

  return UserProfile;
}(block_1.default);

exports.default = UserProfile;
},{"../../helpers/templator":"../src/helpers/templator.ts","./user-profile.tmpl":"../src/pages/user-profile/user-profile.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../controllers/auth-controller":"../src/controllers/auth-controller.ts"}],"../src/pages/change-password/change-password.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"auth-panel auth-panel_login\">\n    <h1 class=\"auth-panel__header\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</h1>\n    <form class=\"auth-form\" on:submit={{handleSubmit}}>\n      <label for=\"oldPassword\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"oldPassword\" name=\"oldPassword\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"oldPassword\"></span>\n      <label for=\"password\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password\"></span>\n      <label for=\"password2\" class=\"auth-form__label\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0435\u0449\u0435 \u0440\u0430\u0437</label>\n      <input type=\"password\" id=\"password2\" name=\"password2\" class=\"auth-form__input\"\n      on:focus={{handleFocus}} on:blur={{handleBlur}}>\n      <span class=\"input-error hide\" data-error=\"password2\"></span>\n      {{ saveButton }}\n    </form>\n    <a href=\"/user\" class=\"auth-panel__link\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043F\u0440\u043E\u0444\u0438\u043B\u044E</a>\n  </main>\n";
},{}],"../src/api/user-api.ts":[function(require,module,exports) {
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

var http_1 = __importDefault(require("../helpers/http"));

var userAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/user/');

var UserAPI = /*#__PURE__*/function () {
  function UserAPI() {
    _classCallCheck(this, UserAPI);
  }

  _createClass(UserAPI, [{
    key: "changeData",
    value: function changeData(data) {
      return userAPIInstance.put('profile/', {
        data: data
      });
    }
  }, {
    key: "changeAvatar",
    value: function changeAvatar(data) {
      return userAPIInstance.put('profile/avatar', {
        data: data
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(data) {
      return userAPIInstance.put('password/', {
        data: data
      });
    }
  }, {
    key: "getUser",
    value: function getUser(id) {
      return userAPIInstance.get("".concat(id), {});
    }
  }, {
    key: "searchUser",
    value: function searchUser(login) {
      return userAPIInstance.post('search', {
        data: {
          login: login
        }
      });
    }
  }]);

  return UserAPI;
}();

exports.default = UserAPI;
},{"../helpers/http":"../src/helpers/http.ts"}],"../src/stores/ListUsers.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var store_1 = __importDefault(require("../helpers/store"));

var initialState = {
  user: null
};
var ListUsers = new store_1.default(initialState);
exports.default = ListUsers;
},{"../helpers/store":"../src/helpers/store.ts"}],"../src/controllers/user-controller.ts":[function(require,module,exports) {
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

var user_api_1 = __importDefault(require("../api/user-api"));

var UserStore_1 = __importDefault(require("../stores/UserStore"));

var ListUsers_1 = __importDefault(require("../stores/ListUsers"));

var store_1 = require("../helpers/store");

var userAPIInstance = new user_api_1.default();

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "changeData",
    value: function changeData(data) {
      return userAPIInstance.changeData(data).then(function (result) {
        console.log(result);
        var newData = JSON.parse(result.response);

        if (result.status === 200) {
          UserStore_1.default.setState(newData);
        }

        return newData;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "changeAvatar",
    value: function changeAvatar(data) {
      userAPIInstance.changeAvatar(data).then(function (result) {
        console.log(result);

        if (result.status === 200) {
          UserStore_1.default.setState(JSON.parse(result.response));
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(data) {
      userAPIInstance.changePassword(data).then(function (result) {
        console.log(result);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getUser",
    value: function getUser(id) {
      return userAPIInstance.getUser(id).then(function (result) {
        console.log(result);
        return JSON.parse(result.response);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "searchUser",
    value: function searchUser(login) {
      return userAPIInstance.searchUser(login).then(function (result) {
        var listUsers = JSON.parse(result.response);
        ListUsers_1.default.setState(listUsers);
        return listUsers;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "subscribeToListUsersStoreEvent",
    value: function subscribeToListUsersStoreEvent(cb) {
      ListUsers_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
    }
  }]);

  return UserController;
}();

exports.default = UserController;
},{"../api/user-api":"../src/api/user-api.ts","../stores/UserStore":"../src/stores/UserStore.ts","../stores/ListUsers":"../src/stores/ListUsers.ts","../helpers/store":"../src/helpers/store.ts"}],"../src/pages/change-password/change-password.ts":[function(require,module,exports) {
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

var formSubmit_1 = __importDefault(require("../../helpers/formSubmit"));

var inputValidate_1 = require("../../helpers/inputValidate");

var user_controller_1 = __importDefault(require("../../controllers/user-controller"));

var changePasswordTmpl = new templator_1.default(change_password_tmpl_1.default);
var userController = new user_controller_1.default();

var ChangePassword = /*#__PURE__*/function (_block_1$default) {
  _inherits(ChangePassword, _block_1$default);

  var _super = _createSuper(ChangePassword);

  function ChangePassword(props) {
    _classCallCheck(this, ChangePassword);

    return _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      handleFocus: inputValidate_1.handleFocus,
      handleBlur: inputValidate_1.handleBlur,
      handleSubmit: function handleSubmit(e) {
        var data = formSubmit_1.default(e);

        if (data !== null) {
          var oldPassword = data.oldPassword,
              newPassword = data.password;
          userController.changePassword({
            oldPassword: oldPassword,
            newPassword: newPassword
          });
        }
      }
    }));
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
},{"../../helpers/templator":"../src/helpers/templator.ts","./change-password.tmpl":"../src/pages/change-password/change-password.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts","../../helpers/formSubmit":"../src/helpers/formSubmit.ts","../../helpers/inputValidate":"../src/helpers/inputValidate.ts","../../controllers/user-controller":"../src/controllers/user-controller.ts"}],"../src/pages/edit-user-profile/edit-user-profile.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <main class=\"user-profile\">\n    <h2 class=\"user-profile__header user-profile__header-edit\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C</h2>\n    <div class=\"user-profile__edit\">\n      <form class=\"user-profile__form \" on:submit={{handleSubmit}} novalidate>\n        <div class=\"user-profile__row\">\n          <label for=\"email\" class=\"user-profile-form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n          <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"user-profile-form__input\"\n          value={{email}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"email\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"login\" class=\"user-profile-form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n          <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"user-profile-form__input\" \n          value={{login}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"login\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"first_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F</label>\n          <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"user-profile-form__input\" \n          value={{first_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"first_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"second_name\" class=\"user-profile-form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n          <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"user-profile-form__input\" \n          value={{second_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"second_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"display_name\" class=\"user-profile-form__label\">\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435</label>\n          <input type=\"text\" id=\"display_name\" name=\"display_name\" placeholder=\"\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435\" class=\"user-profile-form__input\" \n          value={{display_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"display_name\"></span>\n        <div class=\"user-profile__row\">\n          <label for=\"phone\" class=\"user-profile-form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n          <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"user-profile-form__input\" \n          value={{phone}} on:focus={{handleFocus}} on:blur={{handleBlur}}>\n        </div>\n        <span class=\"input-error hide\" data-error=\"phone\"></span>\n\n        <div class=\"user-profile__links\">\n          <button type=\"submit\" class=\"auth-form__button auth-form__button_center\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F</button>\n          <a href=\"#\" on:click={{back}} class=\"auth-panel__link user-profile__link_reject\">\u041D\u0430\u0437\u0430\u0434</a>\n        </div>\n      </form>\n\n      <aside class=\"user-profile__aside\">\n        <div class=\"avatar-wrapper\">\n          {{userAvatar}}\n        </div>\n        <label for=\"avatar\" class=\"auth-panel__link\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u0444\u043E\u0442\u043E</label>\n          <input type=\"file\" id=\"avatar\" accept=\"image/*\" class=\"hide\" on:change={{changeAvatar}}>\n          <a href=\"#\" class=\"auth-panel__link user-profile__link_reject\" on:click={{deleteAvatar}}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0444\u043E\u0442\u043E</a>\n      </aside>\n    </div>\n  </main>\n";
},{}],"../src/helpers/escape.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function escape(str) {
  if (!str) return str;
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, function (match) {
    return htmlEscapes[match];
  });
}

exports.default = escape;
},{}],"../src/pages/edit-user-profile/edit-user-profile.ts":[function(require,module,exports) {
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

var formSubmit_1 = __importDefault(require("../../helpers/formSubmit"));

var inputValidate_1 = require("../../helpers/inputValidate");

var auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));

var user_controller_1 = __importDefault(require("../../controllers/user-controller"));

var escape_1 = __importDefault(require("../../helpers/escape"));

var editUserProfileTmpl = new templator_1.default(edit_user_profile_tmpl_1.default);
var authController = new auth_controller_1.default();
var userController = new user_controller_1.default();

var EditUserProfile = /*#__PURE__*/function (_block_1$default) {
  _inherits(EditUserProfile, _block_1$default);

  var _super = _createSuper(EditUserProfile);

  function EditUserProfile(props) {
    _classCallCheck(this, EditUserProfile);

    return _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      handleFocus: inputValidate_1.handleFocus,
      handleBlur: inputValidate_1.handleBlur,
      handleSubmit: function handleSubmit(e) {
        var data = formSubmit_1.default(e);

        if (data !== null) {
          var escapedData = {}; // eslint-disable-next-line array-callback-return

          Object.entries(data).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            escapedData[key] = escape_1.default(value);
          });
          userController.changeData(escapedData);
        }
      },
      changeAvatar: function changeAvatar() {
        var avatar = document.getElementById('avatar');

        if (avatar && avatar.files && avatar.files.length > 0) {
          var form = new FormData();
          form.append('avatar', avatar.files[0]);
          userController.changeAvatar({
            form: form
          });
        }
      },
      deleteAvatar: function deleteAvatar() {
        var form = new FormData();
        form.append('avatar', '');
        userController.changeAvatar({
          form: form
        });
      }
    }));
  }

  _createClass(EditUserProfile, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      authController.getUserInfo(function (user) {
        _this.setProps({
          user: user
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var button = {
        saveButton: new Button_1.default({
          class: 'auth-form__button auth-form__button_center',
          text: 'Сохранить изменения',
          type: 'submit'
        }).textContent
      };
      var user = this.props.user;
      var userAvatar;

      if (user === null || user === void 0 ? void 0 : user.avatar) {
        userAvatar = "\n        <img src=\"https://ya-praktikum.tech/api/v2/resources".concat(user.avatar, "\" class=\"avatar-wrapper\">\n      ");
      } else {
        userAvatar = '<i class="avatar-icon"></i>';
      }

      var context = Object.assign(Object.assign(Object.assign({}, button), user), {
        userAvatar: userAvatar
      });
      return editUserProfileTmpl.compile(context);
    }
  }]);

  return EditUserProfile;
}(block_1.default);

exports.default = EditUserProfile;
},{"../../helpers/templator":"../src/helpers/templator.ts","./edit-user-profile.tmpl":"../src/pages/edit-user-profile/edit-user-profile.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../components/Button/Button":"../src/components/Button/Button.ts","../../helpers/formSubmit":"../src/helpers/formSubmit.ts","../../helpers/inputValidate":"../src/helpers/inputValidate.ts","../../controllers/auth-controller":"../src/controllers/auth-controller.ts","../../controllers/user-controller":"../src/controllers/user-controller.ts","../../helpers/escape":"../src/helpers/escape.ts"}],"../src/pages/chat/chat-list.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../../static/img/search.svg":[["search.1e31d98f.svg","img/search.svg"],"img/search.svg"],"/Users/svetlanasarafutdinova/VS projects/middle.messenger.praktikum.yandex/static/img/menu-3-dots.svg":[["menu-3-dots.f1836123.svg","img/menu-3-dots.svg"],"img/menu-3-dots.svg"],"/Users/svetlanasarafutdinova/VS projects/middle.messenger.praktikum.yandex/static/img/attach.svg":[["attach.bdeb78df.svg","img/attach.svg"],"img/attach.svg"],"/Users/svetlanasarafutdinova/VS projects/middle.messenger.praktikum.yandex/static/img/arrow-button.svg":[["arrow-button.044d0075.svg","img/arrow-button.svg"],"img/arrow-button.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chat/chat.tmpl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  <div class=\"chat-page\" on:click={{}}>\n  <aside class=\"chat-list\">\n    <div class=\"chat-list__search\">\n      <div class=\"chat-list-search__avatar\" on:click={{toggleMainMenu}}>\n      {{userAvatar}}\n      </div>\n      <div class=\"chat-list__menu hide\" on:click={{toggleMainMenu}}>\n        <a href=\"/user\" class=\"list-menu__item\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</a>\n        <div class=\"list-menu__item\" on:click={{createChat}}>\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0430\u0442</div>\n        <div class=\"list-menu__item\" on:click={{logout}}>\u0412\u044B\u0439\u0442\u0438</div>\n      </div>\n      <div class=\"chat-list-search__field\">\n        <i class=\"search-icon\"></i>\n        <input type=\"text\" placeholder=\"\u041F\u043E\u0438\u0441\u043A\" class=\"chat-list-search__input\" on:change={{handleSearchUser}}>\n          {{findUsers}}\n      </div>\n    </div>\n    <ul class=\"chat-list__items\">\n    {{chatsLayout}}\n    </ul>\n  </aside>\n  <main class=\"chat-window\">\n    <header class=\"chat-header\">\n      <div class=\"chat-header__avatar\"></div>\n      <div class=\"chat-header__name\">{{activeChatTitle}}</div>\n      <i class=\"chat-header__menu-icon\" on:click={{toggleMenu}}></i>\n      <div class=\"chat-header__menu hide\" on:click={{toggleMenu}}>\n        <div class=\"header-menu__item\" on:click={{addUsers}}>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div>\n        <div class=\"header-menu__item\" on:click={{deleteUsers}}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</div>\n        <div class=\"header-menu__item\" on:click={{deleteChat}}>\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0447\u0430\u0442</div>\n      </div>\n    </header>\n    <section class=\"chat-main\">\n      {{messagesLayout}}\n      \n    </section>\n    <form class=\"send-message\" on:submit={{sendMessage}}>\n        <label for=\"attach-file\" class=\"send-message__icons send-message__icons_attach\"></label>\n        <input type=\"file\" class=\"hide\" id=\"attach-file\" on:change={{sendFile}}>\n        <input type=\"text\" placeholder=\"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\" class=\"send-message__input\" name=\"message\">\n        <button class=\"send-message__icons send-message__icons_send\" type=\"submit\"></button>\n    </form>\n  </main>\n</div>\n  \n";
},{}],"../src/api/chat-api.ts":[function(require,module,exports) {
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

var http_1 = __importDefault(require("../helpers/http"));

var chatAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/chats/');

var ChatAPI = /*#__PURE__*/function () {
  function ChatAPI() {
    _classCallCheck(this, ChatAPI);
  }

  _createClass(ChatAPI, [{
    key: "getChats",
    value: function getChats() {
      return chatAPIInstance.get('', {});
    }
  }, {
    key: "createChat",
    value: function createChat(data) {
      return chatAPIInstance.post('', {
        data: data
      });
    }
  }, {
    key: "deleteChat",
    value: function deleteChat(data) {
      return chatAPIInstance.delete('', {
        data: data
      });
    }
  }, {
    key: "getToken",
    value: function getToken(chatId) {
      return chatAPIInstance.post("token/".concat(chatId), {});
    }
  }, {
    key: "addUsers",
    value: function addUsers(data) {
      return chatAPIInstance.put('users', {
        data: data
      });
    }
  }, {
    key: "getChatUsers",
    value: function getChatUsers(data) {
      return chatAPIInstance.get("".concat(data.id, "/users"), {});
    }
  }, {
    key: "deleteUsers",
    value: function deleteUsers(data) {
      return chatAPIInstance.delete('users', {
        data: data
      });
    }
  }]);

  return ChatAPI;
}();

exports.default = ChatAPI;
},{"../helpers/http":"../src/helpers/http.ts"}],"../src/stores/ChatStore.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var store_1 = __importDefault(require("../helpers/store"));

var ChatStore = new store_1.default([]);
exports.default = ChatStore;
},{"../helpers/store":"../src/helpers/store.ts"}],"../src/controllers/chat-socket-controller.ts":[function(require,module,exports) {
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

var ChatStore_1 = __importDefault(require("../stores/ChatStore"));

var socketHost = 'wss://ya-praktikum.tech/ws/chats/';

var ChatSocketController = /*#__PURE__*/function () {
  function ChatSocketController(userId, chatId, token) {
    var _this = this;

    _classCallCheck(this, ChatSocketController);

    this._chatId = chatId;
    this.socket = new WebSocket("".concat(socketHost).concat(userId, "/").concat(chatId, "/").concat(token));
    this.socket.addEventListener('open', function () {
      _this.getMessages();

      _this.intervalId = setInterval(function () {
        return _this.sendMessage('', 'ping');
      }, 20000);
    });
    this.socket.addEventListener('message', function (event) {
      var state = ChatStore_1.default.getState();
      var messages = JSON.parse(event.data);
      if (messages.type === 'pong') return;
      var chatIndex = state.findIndex(function (chat) {
        return chat.id === _this._chatId;
      });

      if (chatIndex !== -1) {
        if (Array.isArray(messages)) {
          state[chatIndex].messages = messages;
        } else if (messages.type === 'message' || messages.type === 'file') {
          state[chatIndex].messages.unshift(messages);
        }
      }

      ChatStore_1.default.setState(state);
    });
    this.socket.addEventListener('close', function (event) {
      if (event.wasClean) {
        console.log('Socket connection closed clearly');
      } else {
        console.log('Connection interrupped!');
      }

      console.log("Code: ".concat(event.code, " | Reason: ").concat(event.reason));
      clearInterval(_this.intervalId);
    });
    this.socket.addEventListener('error', function (event) {
      console.log("Error: ".concat(event));
    });
  }

  _createClass(ChatSocketController, [{
    key: "sendMessage",
    value: function sendMessage(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'message';
      this.socket.send(JSON.stringify({
        content: message,
        type: type
      }));
    }
  }, {
    key: "getMessages",
    value: function getMessages() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.socket.send(JSON.stringify({
        content: from,
        type: 'get old'
      }));
    }
  }]);

  return ChatSocketController;
}();

exports.default = ChatSocketController;
},{"../stores/ChatStore":"../src/stores/ChatStore.ts"}],"../src/controllers/chat-controller.ts":[function(require,module,exports) {
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

var chat_api_1 = __importDefault(require("../api/chat-api"));

var ChatStore_1 = __importDefault(require("../stores/ChatStore"));

var store_1 = require("../helpers/store");

var chat_socket_controller_1 = __importDefault(require("./chat-socket-controller"));

var chatAPIInstance = new chat_api_1.default();

var ChatController = /*#__PURE__*/function () {
  function ChatController() {
    _classCallCheck(this, ChatController);
  }

  _createClass(ChatController, [{
    key: "getChats",
    value: function getChats(userId) {
      var _this = this;

      return chatAPIInstance.getChats().then(function (result) {
        var chats = JSON.parse(result.response);

        if (result.status === 200) {
          console.log(chats);
          ChatStore_1.default.setState(chats);

          if (chats.length > 0) {
            _this.getToken({
              chatId: chats[0].id,
              userId: userId
            });
          }
        }

        return chats;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "createChat",
    value: function createChat(data, userId) {
      var _this2 = this;

      chatAPIInstance.createChat(data).then(function (result) {
        if (result.status === 200) {
          _this2.getChats(userId);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getToken",
    value: function getToken(data) {
      chatAPIInstance.getToken(data.chatId).then(function (result) {
        var _a;

        if (result.status === 200) {
          var token = (_a = JSON.parse(result.response)) === null || _a === void 0 ? void 0 : _a.token;
          var chatSocketController = new chat_socket_controller_1.default(data.userId, data.chatId, token);
          var state = ChatStore_1.default.getState();
          var chatIndex = state.findIndex(function (chat) {
            return chat.id === data.chatId;
          });

          if (chatIndex === -1) {
            state.push({
              id: data.chatId,
              token: token,
              users: [],
              messages: [],
              controller: chatSocketController
            });
          } else {
            state[chatIndex].token = token;
            state[chatIndex].controller = chatSocketController;
          }

          ChatStore_1.default.setState(state);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "deleteChat",
    value: function deleteChat(data, userId) {
      var _this3 = this;

      chatAPIInstance.deleteChat(data).then(function (result) {
        if (result.status === 200) {
          _this3.getChats(userId);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "addUsers",
    value: function addUsers(data) {
      var _this4 = this;

      chatAPIInstance.addUsers(data).then(function (result) {
        if (result.status === 200) {
          _this4.getChatUsers({
            id: +data.chatId
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getChatUsers",
    value: function getChatUsers(data) {
      return chatAPIInstance.getChatUsers(data).then(function (result) {
        var chatUsers = JSON.parse(result.response);
        console.log(chatUsers);
        return chatUsers;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "deleteUsers",
    value: function deleteUsers(data) {
      var _this5 = this;

      chatAPIInstance.deleteUsers(data).then(function (result) {
        if (result.status === 200) {
          _this5.getChatUsers({
            id: +data.chatId
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "subscribeToChatStoreEvent",
    value: function subscribeToChatStoreEvent(cb) {
      ChatStore_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
    }
  }]);

  return ChatController;
}();

exports.default = ChatController;
},{"../api/chat-api":"../src/api/chat-api.ts","../stores/ChatStore":"../src/stores/ChatStore.ts","../helpers/store":"../src/helpers/store.ts","./chat-socket-controller":"../src/controllers/chat-socket-controller.ts"}],"../src/api/resource-api.ts":[function(require,module,exports) {
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

var http_1 = __importDefault(require("../helpers/http"));

var resourceAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/resources/');

var resorceAPI = /*#__PURE__*/function () {
  function resorceAPI() {
    _classCallCheck(this, resorceAPI);
  }

  _createClass(resorceAPI, [{
    key: "sendFile",
    value: function sendFile(data) {
      return resourceAPIInstance.post('', {
        data: data
      });
    }
  }]);

  return resorceAPI;
}();

exports.default = resorceAPI;
},{"../helpers/http":"../src/helpers/http.ts"}],"../src/controllers/resource-controller.ts":[function(require,module,exports) {
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

var resource_api_1 = __importDefault(require("../api/resource-api"));

var resourceAPIInstance = new resource_api_1.default();

var ResorceController = /*#__PURE__*/function () {
  function ResorceController() {
    _classCallCheck(this, ResorceController);
  }

  _createClass(ResorceController, [{
    key: "sendFile",
    value: function sendFile(data) {
      return resourceAPIInstance.sendFile(data).then(function (result) {
        return JSON.parse(result.response);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return ResorceController;
}();

exports.default = ResorceController;
},{"../api/resource-api":"../src/api/resource-api.ts"}],"../src/helpers/sortUtils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var byTime = function byTime(a, b) {
  var aTime = new Date(a.time);
  var bTime = new Date(b.time);
  return aTime.getTime() - bTime.getTime();
};

exports.default = byTime;
},{}],"../src/helpers/compareDate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqualDate = exports.isToday = void 0;

var isToday = function isToday(date) {
  var today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

exports.isToday = isToday;

var isEqualDate = function isEqualDate(date1, date2) {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
};

exports.isEqualDate = isEqualDate;
},{}],"../src/pages/chat/chat.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
/* eslint-disable no-alert */

var templator_1 = __importDefault(require("../../helpers/templator"));

require("./chat-list.scss");

var chat_tmpl_1 = __importDefault(require("./chat.tmpl"));

var block_1 = __importDefault(require("../../components/block/block"));

var auth_controller_1 = __importDefault(require("../../controllers/auth-controller"));

var chat_controller_1 = __importDefault(require("../../controllers/chat-controller"));

var user_controller_1 = __importDefault(require("../../controllers/user-controller"));

var resource_controller_1 = __importDefault(require("../../controllers/resource-controller"));

var sortUtils_1 = __importDefault(require("../../helpers/sortUtils"));

var compareDate_1 = require("../../helpers/compareDate");

var escape_1 = __importDefault(require("../../helpers/escape"));

var chatTmpl = new templator_1.default(chat_tmpl_1.default);
var authController = new auth_controller_1.default();
var chatController = new chat_controller_1.default();
var userController = new user_controller_1.default();
var resourceController = new resource_controller_1.default();
var RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

var Chat = /*#__PURE__*/function (_block_1$default) {
  _inherits(Chat, _block_1$default);

  var _super = _createSuper(Chat);

  function Chat() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Chat);

    return _this = _super.call(this, 'div', Object.assign(Object.assign({}, props), {
      createChat: function createChat() {
        var user = _this.props.user;

        if (user) {
          chatController.createChat({
            title: 'Test chat'
          }, user.id);
        }
      },
      deleteChat: function deleteChat() {
        var answer = confirm('Удалить чат?');

        if (answer) {
          var _this$props = _this.props,
              activeChat = _this$props.activeChat,
              user = _this$props.user;

          if (activeChat && user) {
            chatController.deleteChat({
              chatId: activeChat.id
            }, user.id);
          }
        }
      },
      addUsers: function addUsers() {
        var userLogin = prompt('Введите логин пользователя');
        console.log(userLogin);

        if (userLogin) {
          userController.searchUser(userLogin).then(function (listUsers) {
            console.log(listUsers);
            var user = listUsers.find(function (user) {
              return user.login === userLogin;
            });
            console.log(user);
            var activeChat = _this.props.activeChat;
            console.log(activeChat);

            if (user && activeChat) {
              chatController.addUsers({
                users: [user.id],
                chatId: activeChat.id
              });
            } else {
              console.log("User ".concat(userLogin, " not found!"));
            }
          });
        }
      },
      deleteUsers: function deleteUsers() {
        var userLogin = prompt('Введите логин пользователя');
        console.log(userLogin);

        if (userLogin) {
          userController.searchUser(userLogin).then(function (listUsers) {
            console.log(listUsers);
            var user = listUsers.find(function (user) {
              return user.login === userLogin;
            });
            console.log(user);
            var activeChat = _this.props.activeChat;
            console.log(activeChat);

            if (user && activeChat) {
              chatController.deleteUsers({
                users: [user.id],
                chatId: activeChat.id
              });
            } else {
              console.log("User ".concat(userLogin, " not found!"));
            }
          });
        }
      },
      toggleMenu: function toggleMenu() {
        var menu = document.querySelector('.chat-header__menu');
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hide');
      },
      toggleMainMenu: function toggleMainMenu() {
        var menu = document.querySelector('.chat-list__menu');
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hide');
      },
      hideMenu: function hideMenu(event) {
        var chatListMenu = document.querySelector('.chat-list__menu');
        var chatHeaderMenu = document.querySelector('.chat-header__menu');

        if (event.target !== chatListMenu) {
          chatListMenu === null || chatListMenu === void 0 ? void 0 : chatListMenu.classList.add('hide');
        }

        if (event.target !== chatHeaderMenu) {
          chatHeaderMenu === null || chatHeaderMenu === void 0 ? void 0 : chatHeaderMenu.classList.add('hide');
        }
      },
      connectToChat: function connectToChat(event) {
        var userId = _this.props.user.id;
        var target = event.currentTarget;
        var chatId = target.dataset.id;

        if (chatId !== undefined) {
          chatId = +chatId;
          chatController.getToken({
            userId: userId,
            chatId: chatId
          });
        }

        var chats = _this.props.chats;
        var chat = chats === null || chats === void 0 ? void 0 : chats.find(function (chat) {
          return chat.id === chatId;
        });

        _this.setProps({
          activeChat: chat
        });
      },
      sendMessage: function sendMessage(event) {
        var _a;

        event.preventDefault();
        var target = event.target;
        var message = (_a = target.message) === null || _a === void 0 ? void 0 : _a.value;
        var escapedMessage = escape_1.default(message);
        var chat = _this.props.activeChat;

        if (chat) {
          chat.controller.sendMessage(escapedMessage);
        }
      },
      sendFile: function sendFile(event) {
        var image = event.target;

        if (image && image.files && image.files.length > 0) {
          var form = new FormData();
          form.append('resource', image.files[0]);
          resourceController.sendFile({
            form: form
          }).then(function (result) {
            var chat = _this.props.activeChat;

            if (chat) {
              chat.controller.sendMessage(result === null || result === void 0 ? void 0 : result.id, 'file');
            }
          });
        }
      },
      logout: function logout() {
        authController.logout();
      }
    }));
  }

  _createClass(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      authController.getUserInfo(function (user) {
        _this2.setProps({
          user: user
        });

        chatController.getChats(user.id).then(function (chats) {
          if (chats) {
            _this2.setProps({
              activeChat: chats[0]
            });
          }
        });
      });
      chatController.subscribeToChatStoreEvent(function (chats) {
        _this2.setProps({
          chats: chats
        });
      });
      userController.subscribeToListUsersStoreEvent(function (listUsers) {
        _this2.setProps({
          listUsers: listUsers
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var _a;

      if (props && props.chats && props.chats.length > 0) {
        if (((_a = props.chats) === null || _a === void 0 ? void 0 : _a.findIndex(function (chat) {
          var _a;

          return chat.id === ((_a = props.activeChat) === null || _a === void 0 ? void 0 : _a.id);
        })) === -1) {
          this.setProps({
            activeChat: props.chats[0]
          });
        }
      }

      var messageList = document.querySelector('section.chat-main');

      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line object-curly-newline
      var _this$props2 = this.props,
          user = _this$props2.user,
          chats = _this$props2.chats,
          activeChat = _this$props2.activeChat,
          listUsers = _this$props2.listUsers;
      var messages = activeChat === null || activeChat === void 0 ? void 0 : activeChat.messages;
      var chatsLayout = chats === null || chats === void 0 ? void 0 : chats.map(function (chat) {
        var _a, _b;

        var time = '';

        if (chat.last_message) {
          var dateTime = new Date((_a = chat.last_message) === null || _a === void 0 ? void 0 : _a.time);
          time = "".concat(dateTime.getHours(), ":").concat(dateTime.getMinutes());
        }

        var classList = 'chat-list__item';

        if (chat.id === (activeChat === null || activeChat === void 0 ? void 0 : activeChat.id)) {
          classList += ' chat-active';
        }

        return "<li class=\"".concat(classList, "\" on:click={{connectToChat}} data-id=").concat(chat.id, ">\n      <div class=\"chat-list-item__avatar\">\n      </div>\n      <div class=\"chat-list-item__rows\">\n        <div class=\"chat-list-item__row\">\n          <div class=\"chat-list-item__name\">\n            ").concat(chat.title, "\n          </div>\n          <div class=\"chat-list-item__time\">\n            ").concat(time, "\n          </div>\n        </div>\n        <div class=\"chat-list-item__row\">\n          <div class=\"chat-list-item__message\">\n           ").concat(escape_1.default(((_b = chat.last_message) === null || _b === void 0 ? void 0 : _b.content) || ''), "\n          </div>\n          <div class=\"chat-list-item__badge\">\n            ").concat(chat.unread_count, "\n          </div>\n        </div>\n      </div>\n    </li>");
      });
      var prevDate;
      var messagesLayout;
      messagesLayout = messages === null || messages === void 0 ? void 0 : messages.sort(sortUtils_1.default).map(function (message) {
        var _a;

        var dateSeparator;
        var dateTime = new Date(message.time);
        var options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };

        if (prevDate && compareDate_1.isEqualDate(dateTime, prevDate)) {
          dateSeparator = '';
        } else if (!compareDate_1.isToday(dateTime)) {
          dateSeparator = "<div class=\"chat-main__date\">".concat(dateTime.toLocaleString('ru-Ru', options), "</div>");
        } else {
          dateSeparator = '<div class="chat-main__date">Сегодня</div>';
        }

        prevDate = dateTime;
        var time = "".concat(dateTime.getHours(), ":").concat(dateTime.getMinutes());
        var classes = 'chat-main__message';

        if (+message.user_id === (user === null || user === void 0 ? void 0 : user.id)) {
          classes += ' chat-main__message_left';
        } else {
          classes += ' chat-main__message_right';
        }

        var messageLayout;

        if (message.type === 'file') {
          messageLayout = "<div class=\"".concat(classes, "\">\n          <img src=\"").concat(RESOURCES_URL).concat((_a = message === null || message === void 0 ? void 0 : message.file) === null || _a === void 0 ? void 0 : _a.path, "\" alt=\"image\" \n          class=\"chat-main__message-image\"/>\n          <span class=\"message-date\">").concat(time, "</span>\n        </div>");
        } else {
          messageLayout = "\n        <div class=\"".concat(classes, "\">\n          ").concat(escape_1.default(message.content), "\n          <span class=\"message-date\">").concat(time, "</span>\n        </div>");
        }

        return "\n      ".concat(dateSeparator, " ").concat(messageLayout);
      });

      if ((messagesLayout === null || messagesLayout === void 0 ? void 0 : messagesLayout.length) === 0) {
        messagesLayout = '<div class="chat-main__no-message">Отправьте первое сообщение</div>';
      }

      var findUsers = null;

      if (listUsers && listUsers.length > 0) {
        var _findUsers;

        findUsers = ['<ul class="list-search__users">'];
        var listUsersLayout = listUsers === null || listUsers === void 0 ? void 0 : listUsers.map(function (user) {
          var userLogin = "".concat(user.login);
          var userName = "".concat(user.first_name, " ").concat(user.second_name);
          return "<li class=\"list-search__item\" on:click={{createChat}} \n          data-user=".concat(user.id, ">").concat(userLogin, ": ").concat(userName, "}</li>");
        });

        (_findUsers = findUsers).push.apply(_findUsers, _toConsumableArray(listUsersLayout));

        findUsers.push('</ul>');
      }

      var activeChatTitle = (activeChat === null || activeChat === void 0 ? void 0 : activeChat.title) || null;
      var userAvatar;

      if (user === null || user === void 0 ? void 0 : user.avatar) {
        userAvatar = "\n        <img src=\"".concat(RESOURCES_URL).concat(user.avatar, "\" class=\"chat-list-search__avatar\">\n      ");
      } else {
        userAvatar = null;
      }

      var context = Object.assign(Object.assign({}, user), {
        chats: chats,
        chatsLayout: chatsLayout,
        messagesLayout: messagesLayout,
        findUsers: findUsers,
        activeChatTitle: activeChatTitle,
        userAvatar: userAvatar
      });
      return chatTmpl.compile(context);
    }
  }]);

  return Chat;
}(block_1.default);

exports.default = Chat;
},{"../../helpers/templator":"../src/helpers/templator.ts","./chat-list.scss":"../src/pages/chat/chat-list.scss","./chat.tmpl":"../src/pages/chat/chat.tmpl.ts","../../components/block/block":"../src/components/block/block.ts","../../controllers/auth-controller":"../src/controllers/auth-controller.ts","../../controllers/chat-controller":"../src/controllers/chat-controller.ts","../../controllers/user-controller":"../src/controllers/user-controller.ts","../../controllers/resource-controller":"../src/controllers/resource-controller.ts","../../helpers/sortUtils":"../src/helpers/sortUtils.ts","../../helpers/compareDate":"../src/helpers/compareDate.ts","../../helpers/escape":"../src/helpers/escape.ts"}],"../src/helpers/render.ts":[function(require,module,exports) {
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
},{}],"../src/helpers/Route.ts":[function(require,module,exports) {
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

var render_1 = __importDefault(require("./render"));

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

var Route = /*#__PURE__*/function () {
  function Route(pathname, view, props) {
    _classCallCheck(this, Route);

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  _createClass(Route, [{
    key: "navigate",
    value: function navigate(pathname) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      if (this._block) {
        var root = document.querySelector(this._props.rootQuery);

        if (root !== null) {
          root.innerHTML = '';
        }
      }
    }
  }, {
    key: "match",
    value: function match(pathname) {
      return isEqual(pathname, this._pathname);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._block) {
        this._block = new this._blockClass(this._props);
      }

      render_1.default(this._props.rootQuery, this._block);
    }
  }]);

  return Route;
}();

exports.default = Route;
},{"./render":"../src/helpers/render.ts"}],"../src/helpers/Router.ts":[function(require,module,exports) {
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

var Route_1 = __importDefault(require("./Route"));

var auth_controller_1 = __importDefault(require("../controllers/auth-controller"));

var authController = new auth_controller_1.default();

var Router = /*#__PURE__*/function () {
  function Router(rootQuery) {
    _classCallCheck(this, Router);

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this.private = {
      usePrivate: true,
      redirectRouter: '/'
    };
    Router.__instance = this;
    this.back = this.back.bind(this);
    this.forward = this.forward.bind(this);
    this.go = this.go.bind(this);
  }

  _createClass(Router, [{
    key: "use",
    value: function use(pathname, block, props) {
      var isPrivate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var route = new Route_1.default(pathname, block, Object.assign(Object.assign({}, props), {
        rootQuery: this._rootQuery,
        isPrivate: isPrivate
      }));
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      window.onpopstate = function () {
        _this._onRoute(window.location.pathname);
      };

      this._onRoute(window.location.pathname);
    }
  }, {
    key: "_onRoute",
    value: function _onRoute(pathname) {
      var _this2 = this;

      var route = this.getRoute(pathname) || this.getRoute('404');

      if (!route) {
        return;
      }

      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      if (pathname !== '/login' && pathname !== '/signup') {
        authController.getUserInfo(function () {}).then(function (user) {
          if (!user) {
            _this2.go('/login');
          }
        });
      }

      this._currentRoute = route;
      route.render();
    }
  }, {
    key: "go",
    value: function go(pathname) {
      this.history.pushState({}, '', pathname);

      this._onRoute(pathname);
    }
  }, {
    key: "back",
    value: function back() {
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      this.history.forward();
    }
  }, {
    key: "getRoute",
    value: function getRoute(pathname) {
      return this.routes.find(function (route) {
        return route.match(pathname);
      });
    }
  }]);

  return Router;
}();

exports.default = Router;
},{"./Route":"../src/helpers/Route.ts","../controllers/auth-controller":"../src/controllers/auth-controller.ts"}],"../src/components/App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRouter = void 0;

require("../index.scss");

var login_1 = __importDefault(require("../pages/login/login"));

var signup_1 = __importDefault(require("../pages/signup/signup"));

var _404_1 = __importDefault(require("../pages/404/404"));

var _500_1 = __importDefault(require("../pages/500/500"));

var user_profile_1 = __importDefault(require("../pages/user-profile/user-profile"));

var change_password_1 = __importDefault(require("../pages/change-password/change-password"));

var edit_user_profile_1 = __importDefault(require("../pages/edit-user-profile/edit-user-profile"));

var chat_1 = __importDefault(require("../pages/chat/chat"));

var Router_1 = __importDefault(require("../helpers/Router"));

exports.AppRouter = new Router_1.default('.root');
exports.AppRouter.use('/login', login_1.default).use('/', chat_1.default).use('/login', login_1.default).use('/signup', signup_1.default).use('/page404', _404_1.default).use('/page500', _500_1.default).use('/user', user_profile_1.default).use('/change-password', change_password_1.default).use('/edit-user-profile', edit_user_profile_1.default, {
  back: exports.AppRouter.back
}).use('/chat', chat_1.default).use('404', _404_1.default).start();
var App = exports.AppRouter;
exports.default = App;
},{"../index.scss":"../src/index.scss","../pages/login/login":"../src/pages/login/login.ts","../pages/signup/signup":"../src/pages/signup/signup.ts","../pages/404/404":"../src/pages/404/404.ts","../pages/500/500":"../src/pages/500/500.ts","../pages/user-profile/user-profile":"../src/pages/user-profile/user-profile.ts","../pages/change-password/change-password":"../src/pages/change-password/change-password.ts","../pages/edit-user-profile/edit-user-profile":"../src/pages/edit-user-profile/edit-user-profile.ts","../pages/chat/chat":"../src/pages/chat/chat.ts","../helpers/Router":"../src/helpers/Router.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59363" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/App.ts"], null)
//# sourceMappingURL=/App.089f02b6.js.map