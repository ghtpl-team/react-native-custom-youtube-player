"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YoutubePlayer: true,
  YoutubePlayerModule: true
};
Object.defineProperty(exports, "YoutubePlayer", {
  enumerable: true,
  get: function () {
    return _YoutubeViewPager.default;
  }
});
Object.defineProperty(exports, "YoutubePlayerModule", {
  enumerable: true,
  get: function () {
    return _YoutubeViewPagerModule.default;
  }
});
var _YoutubeViewPager = _interopRequireDefault(require("./YoutubeViewPager"));
var _YoutubeViewPagerModule = _interopRequireDefault(require("./YoutubeViewPagerModule"));
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map