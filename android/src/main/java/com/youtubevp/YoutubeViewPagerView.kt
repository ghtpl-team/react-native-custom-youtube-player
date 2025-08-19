package com.youtubevp

import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.view.View
import android.widget.FrameLayout
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.pierfrancescosoffritti.androidyoutubeplayer.core.customui.DefaultPlayerUiController
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.PlayerConstants
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.YouTubePlayer
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.listeners.AbstractYouTubePlayerListener
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.listeners.FullscreenListener
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.options.IFramePlayerOptions
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.views.YouTubePlayerView

class YoutubePlayerView(
    private val reactContext: ReactContext,
    private val activity: Activity
) : FrameLayout(reactContext), LifecycleOwner {

    private var youTubePlayerView: YouTubePlayerView? = null
    private var youTubePlayer: YouTubePlayer? = null
    private var videoUrl: String? = null
    private var videoId: String? = null
    private var autoPlay: Boolean = false
    private var showControls: Boolean = true
    private var enableFullscreen: Boolean = true
    private var isPlayerReady: Boolean = false
    
    private val uiHandler = Handler(Looper.getMainLooper())

    init {
        setupYouTubePlayer()
    }

    private fun setupYouTubePlayer() {
        youTubePlayerView = YouTubePlayerView(context)
        addView(youTubePlayerView)
        
        val options = IFramePlayerOptions.Builder()
            .controls(if (showControls) 1 else 0)
            .fullscreen(if (enableFullscreen) 1 else 0)
            .rel(0)
            .ccLoadPolicy(0)
            .build()

        youTubePlayerView?.enableAutomaticInitialization = false
        
        if (context is LifecycleOwner) {
            (context as LifecycleOwner).lifecycle.addObserver(youTubePlayerView!!)
        }

        youTubePlayerView?.initialize(object : AbstractYouTubePlayerListener() {
            override fun onReady(player: YouTubePlayer) {
                youTubePlayer = player
                isPlayerReady = true
                
                val defaultPlayerUiController = DefaultPlayerUiController(youTubePlayerView!!, player)
                defaultPlayerUiController.showFullscreenButton(enableFullscreen)
                defaultPlayerUiController.showYouTubeButton(false)
                
                if (enableFullscreen) {
                    defaultPlayerUiController.setFullscreenButtonClickListener {
                        sendEvent("onFullscreenEnter", Arguments.createMap())
                    }
                }
                
                youTubePlayerView?.setCustomPlayerUi(defaultPlayerUiController.rootView)
                
                sendEvent("onVideoReady", Arguments.createMap())
                
                // Load video if URL is already set
                videoId?.let { id ->
                    if (autoPlay) {
                        player.loadVideo(id, 0f)
                    } else {
                        player.cueVideo(id, 0f)
                    }
                }
            }

            override fun onStateChange(player: YouTubePlayer, state: PlayerConstants.PlayerState) {
                when (state) {
                    PlayerConstants.PlayerState.PLAYING -> {
                        sendEvent("onVideoPlay", Arguments.createMap())
                    }
                    PlayerConstants.PlayerState.PAUSED -> {
                        sendEvent("onVideoPause", Arguments.createMap())
                    }
                    PlayerConstants.PlayerState.ENDED -> {
                        sendEvent("onVideoEnd", Arguments.createMap())
                    }
                    else -> {}
                }
            }

            override fun onError(player: YouTubePlayer, error: PlayerConstants.PlayerError) {
                val params = Arguments.createMap().apply {
                    putString("error", error.toString())
                }
                sendEvent("onVideoError", params)
            }

            override fun onVideoDuration(player: YouTubePlayer, duration: Float) {
                val params = Arguments.createMap().apply {
                    putDouble("duration", duration.toDouble())
                }
                sendEvent("onVideoDuration", params)
            }

            override fun onCurrentSecond(player: YouTubePlayer, second: Float) {
                val params = Arguments.createMap().apply {
                    putDouble("currentTime", second.toDouble())
                }
                sendEvent("onVideoProgress", params)
            }
        }, options)

        youTubePlayerView?.addFullscreenListener(object : FullscreenListener {
            override fun onEnterFullscreen(fullscreenView: View, exitFullscreen: () -> Unit) {
                sendEvent("onFullscreenEnter", Arguments.createMap())
            }

            override fun onExitFullscreen() {
                sendEvent("onFullscreenExit", Arguments.createMap())
            }
        })
    }

    fun setVideoUrl(url: String) {
        videoUrl = url
        videoId = extractYouTubeVideoId(url)
        
        if (isPlayerReady && videoId != null) {
            youTubePlayer?.let { player ->
                if (autoPlay) {
                    player.loadVideo(videoId!!, 0f)
                } else {
                    player.cueVideo(videoId!!, 0f)
                }
            }
        }
    }

    fun setAutoPlay(autoPlay: Boolean) {
        this.autoPlay = autoPlay
    }

    fun setShowControls(showControls: Boolean) {
        this.showControls = showControls
        // Note: Controls setting is applied during player initialization
    }

    fun setEnableFullscreen(enableFullscreen: Boolean) {
        this.enableFullscreen = enableFullscreen
        // Note: Fullscreen setting is applied during player initialization
    }

    fun playVideo() {
        youTubePlayer?.play()
    }

    fun pauseVideo() {
        youTubePlayer?.pause()
    }

    fun stopVideo() {
        youTubePlayer?.pause()
        youTubePlayer?.seekTo(0f)
    }

    fun seekTo(seconds: Float) {
        youTubePlayer?.seekTo(seconds)
    }

    fun getCurrentTime() {
        // Note: This would need to be implemented with a callback mechanism
        // The current time is already sent via onVideoProgress events
    }

    fun getDuration() {
        // Note: This would need to be implemented with a callback mechanism
        // The duration is already sent via onVideoDuration events
    }

    fun getVideoId() {
        // Note: This would need to be implemented with a callback mechanism
        // For now, we can send it as an event
        val params = Arguments.createMap().apply {
            putString("videoId", videoId)
        }
        sendEvent("onVideoId", params)
    }

    private fun extractYouTubeVideoId(url: String): String? {
        val pattern = """(?:(?:https?://)?(?:www\.)?(?:youtu\.be/|youtube\.com(?:/embed/|/v/|/watch\?v=))([\w-]{10,12}))"""
        val regex = Regex(pattern)
        val matchResult = regex.find(url)
        return matchResult?.groupValues?.getOrNull(1)
    }

    private fun sendEvent(eventName: String, params: com.facebook.react.bridge.WritableMap) {
        reactContext.getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(id, eventName, params)
    }

    override fun getLifecycle(): androidx.lifecycle.Lifecycle {
        return (context as? androidx.lifecycle.LifecycleOwner)?.lifecycle 
            ?: throw IllegalStateException("Context must be a LifecycleOwner")
    }
}
