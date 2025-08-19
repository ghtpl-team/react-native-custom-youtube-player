import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import {
  YoutubePlayer,
  YoutubePlayerRef,
  YoutubePlayerModule,
} from 'react-native-custom-youtube-player';

const App = () => {
  const playerRef = useRef<YoutubePlayerRef>(null);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  useEffect(() => {
    loadVideoInfo();
  }, []);

  const loadVideoInfo = async () => {
    try {
      const videoId = await YoutubePlayerModule.extractVideoId(videoUrl);
      if (videoId) {
        const info = await YoutubePlayerModule.getVideoInfo(videoId);
        setVideoInfo(info);
        console.log('Video Info:', info);
      }
    } catch (error) {
      console.error('Error loading video info:', error);
    }
  };

  // Event handlers
  const handleVideoReady = () => {
    console.log('Video is ready');
  };

  const handleVideoPlay = () => {
    console.log('Video started playing');
  };

  const handleVideoPause = () => {
    console.log('Video paused');
  };

  const handleVideoEnd = () => {
    console.log('Video ended');
  };

  const handleVideoError = (error: string) => {
    console.log('Video error:', error);
  };

  const handleVideoDuration = (duration: number) => {
    console.log('Video duration:', duration);
    setDuration(duration);
  };

  const handleVideoProgress = (currentTime: number) => {
    setCurrentTime(currentTime);
  };

  const handleFullscreenEnter = () => {
    console.log('Entered fullscreen');
  };

  const handleFullscreenExit = () => {
    console.log('Exited fullscreen');
  };

  // Control functions
  const playVideo = () => {
    playerRef.current?.playVideo();
  };

  const pauseVideo = () => {
    playerRef.current?.pauseVideo();
  };

  const stopVideo = () => {
    playerRef.current?.stopVideo();
  };

  const seekTo = (seconds: number) => {
    playerRef.current?.seekTo(seconds);
  };

  const seekForward = () => {
    seekTo(currentTime + 10);
  };

  const seekBackward = () => {
    seekTo(Math.max(0, currentTime - 10));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            ref={playerRef}
            videoUrl={videoUrl}
            autoPlay={false}
            showControls={true}
            enableFullscreen={true}
            onVideoReady={handleVideoReady}
            onVideoPlay={handleVideoPlay}
            onVideoPause={handleVideoPause}
            onVideoEnd={handleVideoEnd}
            onVideoError={handleVideoError}
            onVideoDuration={handleVideoDuration}
            onVideoProgress={handleVideoProgress}
            onFullscreenEnter={handleFullscreenEnter}
            onFullscreenExit={handleFullscreenExit}
            style={styles.player}
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }
              ]} 
            />
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <Text style={styles.title}>Player Controls</Text>
          
          <View style={styles.buttonRow}>
            <Button title="Play" onPress={playVideo} />
            <Button title="Pause" onPress={pauseVideo} />
            <Button title="Stop" onPress={stopVideo} />
          </View>

          <View style={styles.buttonRow}>
            <Button title="← 10s" onPress={seekBackward} />
            <Button title="→ 10s" onPress={seekForward} />
          </View>

          <View style={styles.buttonRow}>
            <Button title="Seek to 30s" onPress={() => seekTo(30)} />
            <Button title="Seek to 60s" onPress={() => seekTo(60)} />
          </View>
        </View>

        {videoInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Video Information</Text>
            <Text style={styles.infoText}>Video ID: {videoInfo.videoId}</Text>
            <Text style={styles.infoText}>Thumbnail: {videoInfo.thumbnailUrl}</Text>
            <Text style={styles.infoText}>Watch URL: {videoInfo.watchUrl}</Text>
            <Text style={styles.infoText}>Embed URL: {videoInfo.embedUrl}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  videoContainer: {
    height: 250,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  player: {
    flex: 1,
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff0000',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
});

export default App;
