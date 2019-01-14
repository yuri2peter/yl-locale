"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

var _ylPersistentVar = _interopRequireDefault(require("yl-persistent-var"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YlLocale =
/*#__PURE__*/
function () {
  /**
   * 传入语言数据(json对象)
   *
   * @param cacheKey {string}
   * @param messages {object}
   * @param lang {{ zhCN, enUS }}
   */
  function YlLocale(_ref) {
    var _ref$cacheKey = _ref.cacheKey,
        cacheKey = _ref$cacheKey === void 0 ? 'yl-cache' : _ref$cacheKey,
        _ref$messages = _ref.messages,
        messages = _ref$messages === void 0 ? {} : _ref$messages,
        lang = _objectWithoutProperties(_ref, ["cacheKey", "messages"]);

    _classCallCheck(this, YlLocale);

    this.pv = new _ylPersistentVar.default(cacheKey);
    this.messages = messages;
    this.lang = lang;
  }

  _createClass(YlLocale, [{
    key: "setLocaleType",
    value: function setLocaleType(type) {
      this.pv.setState({
        type: type
      });
    }
  }, {
    key: "getLocaleType",
    value: function getLocaleType() {
      var _this$pv$getState = this.pv.getState(),
          type = _this$pv$getState.type;

      if (!type) {
        if (YlLocale.getBrowserLanguage() === 'zh-cn') {
          this.setLocaleType(YlLocale.LOCALE_TYPE.ZH_CN);
          return YlLocale.LOCALE_TYPE.ZH_CN;
        } else {
          this.setLocaleType(YlLocale.LOCALE_TYPE.EN_US);
          return YlLocale.LOCALE_TYPE.EN_US;
        }
      } else {
        return type;
      }
    }
    /**
     * 根据当前语言，简单返回对应的中文或英文
     * @param ch mixed 中文条件下的返回值
     * @param en mixed 英文条件下的返回值
     * @return mixed
     * */

  }, {
    key: "localeMessageFormat",
    value: function localeMessageFormat(_ref2) {
      var zh = _ref2.zh,
          en = _ref2.en;
      return this.getLocaleType() === YlLocale.LOCALE_TYPE.ZH_CN ? zh : en;
    }
    /**
     * 根据当前语言，返回指定项
     * @param message string 语言id，选自LOCALE_MESSAGE
     * @param locale string 本次指定的语言
     * @return string
     * */

  }, {
    key: "localeMessage",
    value: function localeMessage(message) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      try {
        var path = message.split('.');
        var lang = (locale || this.getLocaleType()) === YlLocale.LOCALE_TYPE.ZH_CN ? this.lang.zhCN : this.lang.enUS;

        var rel = _objectSpread({}, lang);

        path.forEach(function (t) {
          rel = rel[t];
        });
        return rel || message;
      } catch (e) {
        return message || '[NOT FOUND]';
      }
    }
  }]);

  return YlLocale;
}();

exports.default = YlLocale;

YlLocale.getBrowserLanguage = function () {
  return (navigator.language || navigator.browserLanguage).toLowerCase();
};

YlLocale.LOCALE_TYPE = {
  ZH_CN: 'ZH_CN',
  EN_US: 'EN_US'
};
//# sourceMappingURL=index.js.map