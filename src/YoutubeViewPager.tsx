import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  NativeModules,
  ViewStyle,
} from "react-native";
import { YoutubeViewPagerProps, YoutubeViewPagerRef } from "./types";

// Type for the native component that includes ref support
type NativeYoutubeViewPagerProps = YoutubeViewPagerProps & {
  ref?: React.Ref<any>;
};

const LINKING_ERROR =
  `The package 'react-native-custom-youtube-player' doesn't seem to be linked. Make sure: \n\n` +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

const ComponentName = "YoutubeViewPagerView";

const YoutubeViewPagerViewNative =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeYoutubeViewPagerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

const YoutubeViewPager = forwardRef<YoutubeViewPagerRef, YoutubeViewPagerProps>(
  (props, ref) => {
    const nativeRef = useRef(null);

    useImperativeHandle(ref, () => ({
      playVideo: () => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, "playVideo", []);
      },
      pauseVideo: () => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, "pauseVideo", []);
      },
      stopVideo: () => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, "stopVideo", []);
      },
      seekTo: (seconds: number) => {
        const viewId = findNodeHandle(nativeRef.current);
        UIManager.dispatchViewManagerCommand(viewId, "seekTo", [seconds]);
      },
      getCurrentTime: (): Promise<number> => {
        return new Promise((resolve) => {
          const viewId = findNodeHandle(nativeRef.current);
          UIManager.dispatchViewManagerCommand(viewId, "getCurrentTime", []);
          // Note: This would need to be implemented with a callback mechanism
          // For now, returning a placeholder
          resolve(0);
        });
      },
      getDuration: (): Promise<number> => {
        return new Promise((resolve) => {
          const viewId = findNodeHandle(nativeRef.current);
          UIManager.dispatchViewManagerCommand(viewId, "getDuration", []);
          // Note: This would need to be implemented with a callback mechanism
          // For now, returning a placeholder
          resolve(0);
        });
      },
      getVideoId: (): Promise<string | null> => {
        return new Promise((resolve) => {
          const viewId = findNodeHandle(nativeRef.current);
          UIManager.dispatchViewManagerCommand(viewId, "getVideoId", []);
          // Note: This would need to be implemented with a callback mechanism
          // For now, returning a placeholder
          resolve(null);
        });
      },
    }));

    return <YoutubeViewPagerViewNative ref={nativeRef} {...props} />;
  }
);

YoutubeViewPager.displayName = "YoutubeViewPager";

export default YoutubeViewPager;
