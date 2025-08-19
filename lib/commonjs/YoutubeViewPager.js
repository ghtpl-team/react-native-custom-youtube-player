"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Type for the native component that includes ref support

const LINKING_ERROR = `The package 'react-native-custom-youtube-player' doesn't seem to be linked. Make sure: \n\n` + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'YoutubePlayerView';
const YoutubePlayerViewNative = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const YoutubePlayer = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const nativeRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({
    playVideo: () => {
      const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'playVideo', []);
    },
    pauseVideo: () => {
      const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'pauseVideo', []);
    },
    stopVideo: () => {
      const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'stopVideo', []);
    },
    seekTo: seconds => {
      const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
      _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'seekTo', [seconds]);
    },
    getCurrentTime: () => {
      return new Promise(resolve => {
        const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
        _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'getCurrentTime', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(0);
      });
    },
    getDuration: () => {
      return new Promise(resolve => {
        const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
        _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'getDuration', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(0);
      });
    },
    getVideoId: () => {
      return new Promise(resolve => {
        const viewId = (0, _reactNative.findNodeHandle)(nativeRef.current);
        _reactNative.UIManager.dispatchViewManagerCommand(viewId, 'getVideoId', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(null);
      });
    }
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YoutubePlayerViewNative, {
    ref: nativeRef,
    ...props
  });
});
YoutubePlayer.displayName = 'YoutubePlayer';
var _default = exports.default = YoutubePlayer;
//# sourceMappingURL=YoutubeViewPager.js.map