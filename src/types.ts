export interface VideoInfo {
  videoId: string;
  thumbnailUrl: string;
  watchUrl: string;
  embedUrl: string;
}

export interface YoutubeViewPagerProps {
  videoUrl: string;
  autoPlay?: boolean;
  showControls?: boolean;
  enableFullscreen?: boolean;
  style?: any;

  // Event handlers
  onVideoReady?: () => void;
  onVideoPlay?: () => void;
  onVideoPause?: () => void;
  onVideoEnd?: () => void;
  onVideoError?: (error: string) => void;
  onVideoDuration?: (duration: number) => void;
  onVideoProgress?: (currentTime: number) => void;
  onFullscreenEnter?: () => void;
  onFullscreenExit?: () => void;
}

export interface YoutubeViewPagerRef {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => Promise<number>;
  getDuration: () => Promise<number>;
  getVideoId: () => Promise<string | null>;
}

export interface YoutubeViewPagerModule {
  extractVideoId: (url: string) => Promise<string | null>;
  generateThumbnailUrl: (videoId: string) => Promise<string>;
  validateYoutubeUrl: (url: string) => Promise<boolean>;
  getVideoInfo: (videoId: string) => Promise<VideoInfo>;

  // Constants
  YOUTUBE_DOMAINS: string[];
  THUMBNAIL_QUALITIES: {
    DEFAULT: string;
    MEDIUM: string;
    HIGH: string;
    STANDARD: string;
    MAX: string;
  };
}

// Keep backward compatibility aliases
export type YoutubePlayerProps = YoutubeViewPagerProps;
export type YoutubePlayerRef = YoutubeViewPagerRef;
export type YoutubePlayerModule = YoutubeViewPagerModule;
