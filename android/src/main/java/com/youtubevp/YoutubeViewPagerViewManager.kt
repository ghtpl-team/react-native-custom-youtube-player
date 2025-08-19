package com.youtubevp

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class YoutubePlayerViewManager(private val reactContext: ReactApplicationContext) : SimpleViewManager<YoutubePlayerView>() {

    companion object {
        const val REACT_CLASS = "YoutubePlayerView"
        
        // Event names
        const val EVENT_ON_VIDEO_READY = "onVideoReady"
        const val EVENT_ON_VIDEO_PLAY = "onVideoPlay"
        const val EVENT_ON_VIDEO_PAUSE = "onVideoPause"
        const val EVENT_ON_VIDEO_END = "onVideoEnd"
        const val EVENT_ON_VIDEO_ERROR = "onVideoError"
        const val EVENT_ON_VIDEO_DURATION = "onVideoDuration"
        const val EVENT_ON_VIDEO_PROGRESS = "onVideoProgress"
        const val EVENT_ON_FULLSCREEN_ENTER = "onFullscreenEnter"
        const val EVENT_ON_FULLSCREEN_EXIT = "onFullscreenExit"
    }

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): YoutubePlayerView {
        val activity = reactContext.currentActivity as? Activity
            ?: throw IllegalStateException("Activity is required for YoutubePlayerView")
        
        return YoutubePlayerView(reactContext, activity)
    }

    @ReactProp(name = "videoUrl")
    fun setVideoUrl(view: YoutubePlayerView, videoUrl: String?) {
        videoUrl?.let {
            view.setVideoUrl(it)
        }
    }

    @ReactProp(name = "autoPlay", defaultBoolean = false)
    fun setAutoPlay(view: YoutubePlayerView, autoPlay: Boolean) {
        view.setAutoPlay(autoPlay)
    }

    @ReactProp(name = "showControls", defaultBoolean = true)
    fun setShowControls(view: YoutubePlayerView, showControls: Boolean) {
        view.setShowControls(showControls)
    }

    @ReactProp(name = "enableFullscreen", defaultBoolean = true)
    fun setEnableFullscreen(view: YoutubePlayerView, enableFullscreen: Boolean) {
        view.setEnableFullscreen(enableFullscreen)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.builder<String, Any>()
            .put(EVENT_ON_VIDEO_READY, MapBuilder.of("registrationName", "onVideoReady"))
            .put(EVENT_ON_VIDEO_PLAY, MapBuilder.of("registrationName", "onVideoPlay"))
            .put(EVENT_ON_VIDEO_PAUSE, MapBuilder.of("registrationName", "onVideoPause"))
            .put(EVENT_ON_VIDEO_END, MapBuilder.of("registrationName", "onVideoEnd"))
            .put(EVENT_ON_VIDEO_ERROR, MapBuilder.of("registrationName", "onVideoError"))
            .put(EVENT_ON_VIDEO_DURATION, MapBuilder.of("registrationName", "onVideoDuration"))
            .put(EVENT_ON_VIDEO_PROGRESS, MapBuilder.of("registrationName", "onVideoProgress"))
            .put(EVENT_ON_FULLSCREEN_ENTER, MapBuilder.of("registrationName", "onFullscreenEnter"))
            .put(EVENT_ON_FULLSCREEN_EXIT, MapBuilder.of("registrationName", "onFullscreenExit"))
            .build()
    }

    override fun getCommandsMap(): Map<String, Int>? {
        return MapBuilder.of(
            "playVideo", 1,
            "pauseVideo", 2,
            "stopVideo", 3,
            "seekTo", 4,
            "getCurrentTime", 5,
            "getDuration", 6,
            "getVideoId", 7
        )
    }

    override fun receiveCommand(view: YoutubePlayerView, commandId: Int, args: ReadableArray?) {
        when (commandId) {
            1 -> view.playVideo()
            2 -> view.pauseVideo()
            3 -> view.stopVideo()
            4 -> args?.getDouble(0)?.let { view.seekTo(it.toFloat()) }
            5 -> view.getCurrentTime()
            6 -> view.getDuration()
            7 -> view.getVideoId()
        }
    }
}
