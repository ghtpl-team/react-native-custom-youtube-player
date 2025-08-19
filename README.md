# React Native Custom YouTube Player

A React Native wrapper for native YouTube video playback with custom controls and full player functionality.

## Features

- 🎥 Native YouTube video playback
- 🎛️ Full control over video player (play, pause, stop, seek)
- 📊 Video progress tracking and duration information
- 🔍 Fullscreen support
- 🎨 Customizable controls
- ⚡ High performance native implementation
- 📱 Lifecycle-aware player management

## Installation

```sh
npm install react-native-custom-youtube-player
```

### Auto-linking (React Native 0.60+)

This package supports auto-linking. After installation, simply rebuild your app:

```sh
# For Android
npx react-native run-android

# For iOS (when iOS support is added)
npx react-native run-ios
```

### Manual Setup (if auto-linking fails)

If auto-linking doesn't work, you can manually add the package to your `MainApplication.java`:

```java
import com.youtubevp.YoutubePlayerPackage;

@Override
protected List<ReactPackage> getPackages() {
  @SuppressWarnings("UnnecessaryLocalVariable")
  List<ReactPackage> packages = new PackageList(this).getPackages();
  packages.add(new YoutubePlayerPackage());
  return packages;
}
```

### Required Dependencies

Make sure you have the required dependencies in your app's `build.gradle`:

```gradle
dependencies {
  implementation 'com.pierfrancescosoffritti.androidyoutubeplayer:core:11.1.0'
  implementation 'androidx.lifecycle:lifecycle-common:2.5.1'
}
```

## Usage

### Basic Usage

```tsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import {
  YoutubePlayer,
  YoutubePlayerRef,
} from 'react-native-custom-youtube-player';

const App = () => {
  const playerRef = useRef<YoutubePlayerRef>(null);

  const handleVideoReady = () => {
    console.log('Video is ready to play');
  };

  const handleVideoPlay = () => {
    console.log('Video started playing');
  };

  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        ref={playerRef}
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        autoPlay={false}
        showControls={true}
        enableFullscreen={true}
        onVideoReady={handleVideoReady}
        onVideoPlay={handleVideoPlay}
        style={{ height: 250 }}
      />
    </View>
  );
};

export default App;
```

### Advanced Usage with Module Functions

```tsx
import React, { useEffect, useState } from 'react';
import { YoutubePlayerModule } from 'react-native-custom-youtube-player';

const VideoComponent = () => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    const loadVideoInfo = async () => {
      try {
        const videoId = await YoutubePlayerModule.extractVideoId(
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        );

        if (videoId) {
          const info = await YoutubePlayerModule.getVideoInfo(videoId);
          setVideoInfo(info);
        }
      } catch (error) {
        console.error('Error loading video info:', error);
      }
    };

    loadVideoInfo();
  }, []);

  return (
    // Your component JSX
  );
};
```

### Controlling the Player

```tsx
const playerRef = useRef<YoutubePlayerRef>(null);

// Play video
const playVideo = () => {
  playerRef.current?.playVideo();
};

// Pause video
const pauseVideo = () => {
  playerRef.current?.pauseVideo();
};

// Stop video
const stopVideo = () => {
  playerRef.current?.stopVideo();
};

// Seek to specific time
const seekTo = (seconds: number) => {
  playerRef.current?.seekTo(seconds);
};
```

## API Reference

### Props

| Prop               | Type        | Default      | Description                       |
| ------------------ | ----------- | ------------ | --------------------------------- |
| `videoUrl`         | `string`    | **Required** | YouTube video URL                 |
| `autoPlay`         | `boolean`   | `false`      | Whether to auto-play the video    |
| `showControls`     | `boolean`   | `true`       | Whether to show video controls    |
| `enableFullscreen` | `boolean`   | `true`       | Whether to enable fullscreen mode |
| `style`            | `ViewStyle` | `undefined`  | Custom styling for the component  |

### Event Handlers

| Event               | Type                            | Description                                    |
| ------------------- | ------------------------------- | ---------------------------------------------- |
| `onVideoReady`      | `() => void`                    | Called when video is ready to play             |
| `onVideoPlay`       | `() => void`                    | Called when video starts playing               |
| `onVideoPause`      | `() => void`                    | Called when video is paused                    |
| `onVideoEnd`        | `() => void`                    | Called when video ends                         |
| `onVideoError`      | `(error: string) => void`       | Called when video encounters an error          |
| `onVideoDuration`   | `(duration: number) => void`    | Called when video duration is available        |
| `onVideoProgress`   | `(currentTime: number) => void` | Called during video playback with current time |
| `onFullscreenEnter` | `() => void`                    | Called when entering fullscreen mode           |
| `onFullscreenExit`  | `() => void`                    | Called when exiting fullscreen mode            |

### Ref Methods

| Method           | Parameters        | Description                                |
| ---------------- | ----------------- | ------------------------------------------ |
| `playVideo`      | `none`            | Start video playback                       |
| `pauseVideo`     | `none`            | Pause video playback                       |
| `stopVideo`      | `none`            | Stop video playback and reset to beginning |
| `seekTo`         | `seconds: number` | Seek to specific time in seconds           |
| `getCurrentTime` | `none`            | Get current playback time (via events)     |
| `getDuration`    | `none`            | Get video duration (via events)            |
| `getVideoId`     | `none`            | Get current video ID (via events)          |

### Module Functions

| Function               | Parameters        | Returns                   | Description                            |
| ---------------------- | ----------------- | ------------------------- | -------------------------------------- |
| `extractVideoId`       | `url: string`     | `Promise<string \| null>` | Extract video ID from YouTube URL      |
| `generateThumbnailUrl` | `videoId: string` | `Promise<string>`         | Generate thumbnail URL for video       |
| `validateYoutubeUrl`   | `url: string`     | `Promise<boolean>`        | Validate if URL is a valid YouTube URL |
| `getVideoInfo`         | `videoId: string` | `Promise<VideoInfo>`      | Get comprehensive video information    |

## Types

### VideoInfo

```typescript
interface VideoInfo {
  videoId: string;
  thumbnailUrl: string;
  watchUrl: string;
  embedUrl: string;
}
```

### YoutubePlayerProps

```typescript
interface YoutubePlayerProps {
  videoUrl: string;
  autoPlay?: boolean;
  showControls?: boolean;
  enableFullscreen?: boolean;
  style?: any;
  // Event handlers...
}
```

### YoutubePlayerRef

```typescript
interface YoutubePlayerRef {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => Promise<number>;
  getDuration: () => Promise<number>;
  getVideoId: () => Promise<string | null>;
}
```

## Requirements

- React Native >= 0.60
- Android API Level >= 21
- Kotlin support in your Android project

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Troubleshooting

### Common Issues

1. **Build errors**: Make sure all required dependencies are added to your `build.gradle`
2. **Video not playing**: Check if the YouTube URL is valid and accessible
3. **Events not firing**: Ensure event handlers are properly connected
4. **Fullscreen issues**: Make sure your activity supports orientation changes

### Dependencies

This package requires:

- YouTube Player library (`com.pierfrancescosoffritti.androidyoutubeplayer:core`)
- AndroidX Lifecycle components
- React Native >= 0.60 with auto-linking support

For detailed setup instructions and troubleshooting, please refer to the documentation or create an issue on GitHub.
