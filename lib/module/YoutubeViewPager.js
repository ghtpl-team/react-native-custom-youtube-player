"use strict";

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { requireNativeComponent, UIManager, findNodeHandle } from 'react-native';

// Type for the native component that includes ref support
import { jsx as _jsx } from "react/jsx-runtime";
const LINKING_ERROR = `The package 'react-native-custom-youtube-player' doesn't seem to be linked. Make sure: \n\n` + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ComponentName = 'YoutubePlayerView';
const YoutubePlayerViewNative = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
const YoutubePlayer = /*#__PURE__*/forwardRef((props, ref) => {
  const nativeRef = useRef(null);
  useImperativeHandle(ref, () => ({
    playVideo: () => {
      const viewId = findNodeHandle(nativeRef.current);
      UIManager.dispatchViewManagerCommand(viewId, 'playVideo', []);
    },
    pauseVideo: () => {
      const viewId = findNodeHandle(nativeRef.current);
      UIManager.dispatchViewManagerCommand(viewId, 'pauseVideo', []);
    },
    stopVideo: () => {
      const viewId = findNodeHandle(nativeRef.current);
      UIManager.dispatchViewManagerCommand(viewId, 'stopVideo', []);
    },
    seekTo: seconds => {
      const viewId = findNodeHandle(nativeRef.current);
      UIManager.dispatchViewManagerCommand(viewId, 'seekTo', [seconds]);
    },
    getCurrentTime: () => {
      return new Promise(resolve => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, 'getCurrentTime', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(0);
      });
    },
    getDuration: () => {
      return new Promise(resolve => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, 'getDuration', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(0);
      });
    },
    getVideoId: () => {
      return new Promise(resolve => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, 'getVideoId', []);
        // Note: This would need to be implemented with a callback mechanism
        // For now, returning a placeholder
        resolve(null);
      });
    }
  }));
  return /*#__PURE__*/_jsx(YoutubePlayerViewNative, {
    ref: nativeRef,
    ...props
  });
});
YoutubePlayer.displayName = 'YoutubePlayer';
export default YoutubePlayer;
//# sourceMappingURL=YoutubeViewPager.js.map