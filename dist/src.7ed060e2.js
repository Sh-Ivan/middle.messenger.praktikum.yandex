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
})({"../utils/getObjectValue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getObjectValue;

function getObjectValue(obj, path, defaultValue) {
  var arrPath = path.split('.');
  var result = arrPath.reduce(function (result, value) {
    if (result) return result[value];
  }, obj);
  return result || defaultValue;
}
},{}],"../utils/templator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getObjectValue = _interopRequireDefault(require("./getObjectValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Templator = /*#__PURE__*/function () {
  function Templator(template) {
    _classCallCheck(this, Templator);

    this._template = template;
  }

  _createClass(Templator, [{
    key: "compile",
    value: function compile(ctx) {
      var newTemplate = this._template;
      Object.entries(ctx).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var templateVar = new RegExp("{{\\s*".concat(key, "\\s*}}"), 'g');

        if (typeof value === 'function') {
          window.handleClick = ctx[key];
          newTemplate = newTemplate.replace(templateVar, "window.".concat(key, "()"));
        } else if (_typeof(value) === 'object') {
          var temolateObjectVar = new RegExp("{{\\s*".concat(key, "..*?}}"), 'g');
          var varsInObject = newTemplate.match(temolateObjectVar);
          varsInObject.forEach(function (nextVar) {
            var path = nextVar.slice(2, -2).trim();
            var newValue = (0, _getObjectValue.default)(ctx, path);
            newTemplate = newTemplate.replace(nextVar, newValue);
          });
        } else {
          newTemplate = newTemplate.replace(templateVar, value);
        }
      });
      return newTemplate;
    }
  }]);

  return Templator;
}();

exports.default = Templator;
},{"./getObjectValue":"../utils/getObjectValue.js"}],"../src/pages/login/login.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  <main>\n    <h1>\u0412\u0445\u043E\u0434</h1>\n    <form class=\"form\">\n      <label for=\"login\" class=\"form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"form__input\">\n      <label for=\"password\" lass=\"form__label\">\u041F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" class=\"form__input\">\n      <button type=\"submit\">\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n    </form>\n    <a href=\"/signup\">\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?</a>\n  </main>\n";
exports.default = _default;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../src/pages/login/login.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/login/login.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _login = _interopRequireDefault(require("./login.tmpl"));

require("./login.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginTmpl = new _templator.default(_login.default);
var context = {
  name: 'Ivan',
  isLogin: true
};

var _default = loginTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./login.tmpl":"../src/pages/login/login.tmpl.js","./login.scss":"../src/pages/login/login.scss"}],"../src/pages/signup/signup.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var per = "\n  <main>\n    <h1>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h1>\n    <form class=\"form\">\n      <label for=\"email\" class=\"form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n      <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"form__input\">\n      <label for=\"login\" class=\"form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"form__input\">\n      <label for=\"first_name\" class=\"form__label\">\u0418\u043C\u044F</label>\n      <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"form__input\">\n      <label for=\"second_name\" class=\"form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n      <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"form__input\">\n      <label for=\"phone\" class=\"form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n      <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"form__input\">\n      <label for=\"password\" class=\"form__label\">\u041F\u0430\u0440\u043E\u043B\u044C</label>\n      <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" class=\"form__input\">\n      <label for=\"password2\" class=\"form__label\">\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)</label>\n      <input type=\"password\" id=\"password2\" name=\"password2\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C (\u0435\u0449\u0435 \u0440\u0430\u0437)\" class=\"form__input\">\n      <button type=\"submit\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n    </form>\n    <a href=\"/login\">\u0412\u043E\u0439\u0442\u0438</a>\n  </main>\n";
var _default = per;
exports.default = _default;
},{}],"../src/pages/signup/signup.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/signup/signup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _signup = _interopRequireDefault(require("./signup.tmpl"));

require("./signup.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signupTmpl = new _templator.default(_signup.default);
var context = {
  name: 'John Doe'
};

var _default = signupTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./signup.tmpl":"../src/pages/signup/signup.tmpl.js","./signup.scss":"../src/pages/signup/signup.scss"}],"../src/pages/404/404.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  <h1>\u041E\u0448\u0438\u0431\u043A\u0430 404</h1>\n  <p>\u041D\u0435\u0442 \u0442\u0430\u043A\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B</p>\n  <a href=\"/\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443</a>\n";
exports.default = _default;
},{}],"../src/pages/404/404.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/404/404.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _ = _interopRequireDefault(require("./404.tmpl"));

require("./404.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginTmpl = new _templator.default(_.default);
var context = {
  name: 'Ivan',
  isLogin: true
};

var _default = loginTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./404.tmpl":"../src/pages/404/404.tmpl.js","./404.scss":"../src/pages/404/404.scss"}],"../src/pages/500/500.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  <h1>\u041E\u0448\u0438\u0431\u043A\u0430 500</h1>\n  <p>\u0417\u043D\u0430\u0435\u043C, \u0447\u0438\u043D\u0438\u043C</p>\n  <a href=\"/\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443</a>\n";
exports.default = _default;
},{}],"../src/pages/500/500.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/500/500.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _ = _interopRequireDefault(require("./500.tmpl"));

require("./500.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginTmpl = new _templator.default(_.default);
var context = {
  name: 'Ivan',
  isLogin: true
};

var _default = loginTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./500.tmpl":"../src/pages/500/500.tmpl.js","./500.scss":"../src/pages/500/500.scss"}],"../src/pages/chat/chat.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var loginTemplate = "\n  <h1>\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435</h1>\n   <ul>\n    <li>\n      <a href=\"/login\">\u0412\u043E\u0439\u0442\u0438</a>\n      <a href=\"/signup\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</a>\n      <a href=\"/user\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</a>\n      <a href=\"/page404\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 404</a>\n      <a href=\"/page500\">\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 500</a>\n    </li>\n   </ul>\n";
var _default = loginTemplate;
exports.default = _default;
},{}],"../src/pages/chat/chat.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/chat/chat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _chat = _interopRequireDefault(require("./chat.tmpl"));

require("./chat.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginTmpl = new _templator.default(_chat.default);
var context = {
  name: 'Ivan',
  isLogin: true
};

var _default = loginTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./chat.tmpl":"../src/pages/chat/chat.tmpl.js","./chat.scss":"../src/pages/chat/chat.scss"}],"../src/pages/userProfile/userProfile.tmpl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var loginTemplate = "\n  <form class=\"form\">\n      <label for=\"email\" class=\"form__label\">\u041F\u043E\u0447\u0442\u0430</label>\n      <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"\u041F\u043E\u0447\u0442\u0430\" class=\"form__input\">\n\n      <label for=\"login\" class=\"form__label\">\u041B\u043E\u0433\u0438\u043D</label>\n      <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"\u041B\u043E\u0433\u0438\u043D\" class=\"form__input\">\n\n      <label for=\"first_name\" class=\"form__label\">\u0418\u043C\u044F</label>\n      <input type=\"text\" id=\"first_name\" name=\"first_name\" placeholder=\"\u0418\u043C\u044F\" class=\"form__input\">\n\n      <label for=\"second_name\" class=\"form__label\">\u0424\u0430\u043C\u0438\u043B\u0438\u044F</label>\n      <input type=\"text\" id=\"second_name\" name=\"second_name\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u0438\u044F\" class=\"form__input\">\n\n      <label for=\"display_name\" class=\"form__label\">\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435</label>\n      <input type=\"text\" id=\"display_name\" name=\"display_name\" placeholder=\"\u0418\u043C\u044F \u0432 \u0447\u0430\u0442\u0435\" class=\"form__input\">\n\n      <label for=\"phone\" class=\"form__label\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n      <input type=\"tel\" id=\"phone\" name=\"phone\" placeholder=\"\u0422\u0435\u043B\u0435\u0444\u043E\u043D\" class=\"form__input\">\n      <button type=\"submit\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n    </form>\n    <button>\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435</button>\n    <button>\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C</button>\n    <a href=\"/login\">\u0412\u044B\u0439\u0442\u0438</a>\n  </main>\n";
var _default = loginTemplate;
exports.default = _default;
},{}],"../src/pages/userProfile/userProfile.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/userProfile/userProfile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templator = _interopRequireDefault(require("../../../utils/templator"));

var _userProfile = _interopRequireDefault(require("./userProfile.tmpl"));

require("./userProfile.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userProfileTmpl = new _templator.default(_userProfile.default);
var context = {
  name: 'Ivan',
  isLogin: true
};

var _default = userProfileTmpl.compile(context);

exports.default = _default;
},{"../../../utils/templator":"../utils/templator.js","./userProfile.tmpl":"../src/pages/userProfile/userProfile.tmpl.js","./userProfile.scss":"../src/pages/userProfile/userProfile.scss"}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _login = _interopRequireDefault(require("./pages/login/login"));

var _signup = _interopRequireDefault(require("./pages/signup/signup"));

var _ = _interopRequireDefault(require("./pages/404/404"));

var _2 = _interopRequireDefault(require("./pages/500/500"));

var _chat = _interopRequireDefault(require("./pages/chat/chat"));

var _userProfile = _interopRequireDefault(require("./pages/userProfile/userProfile"));

var _router$pathname;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathname = window.location.pathname;
console.log(_login.default);
var router = {
  '/': _chat.default,
  '/login': _login.default,
  '/signup': _signup.default,
  '/chat': _chat.default,
  '/user': _userProfile.default,
  '/page404': _.default,
  '/page500': _2.default
};
var pageContent = (_router$pathname = router[pathname]) !== null && _router$pathname !== void 0 ? _router$pathname : _.default;
var root = document.querySelector('.root');
root.innerHTML = pageContent;
},{"./pages/login/login":"../src/pages/login/login.js","./pages/signup/signup":"../src/pages/signup/signup.js","./pages/404/404":"../src/pages/404/404.js","./pages/500/500":"../src/pages/500/500.js","./pages/chat/chat":"../src/pages/chat/chat.js","./pages/userProfile/userProfile":"../src/pages/userProfile/userProfile.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55774" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map