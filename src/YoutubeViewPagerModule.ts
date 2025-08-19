import { NativeModules } from "react-native";
import { YoutubeViewPagerModule } from "./types";

const LINKING_ERROR =
  `The package 'react-native-custom-youtube-player' doesn't seem to be linked. Make sure: \n\n` +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

const YoutubeViewPagerModuleNative: YoutubeViewPagerModule =
  NativeModules.YoutubeViewPagerModule
    ? NativeModules.YoutubeViewPagerModule
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      );

export default YoutubeViewPagerModuleNative;
