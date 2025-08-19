"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-custom-youtube-player' doesn't seem to be linked. Make sure: \n\n` + "- You rebuilt the app after installing the package\n" + "- You are not using Expo Go\n";
const YoutubePlayerModuleNative = _reactNative.NativeModules.YoutubePlayerModule ? _reactNative.NativeModules.YoutubePlayerModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
var _default = exports.default = YoutubePlayerModuleNative;
//# sourceMappingURL=YoutubeViewPagerModule.js.map