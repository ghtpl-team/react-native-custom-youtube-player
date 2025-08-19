package com.youtubevp

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments

class YoutubeViewPagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "YoutubeViewPagerModule"
    }

    @ReactMethod
    fun extractVideoId(url: String, promise: Promise) {
        try {
            val videoId = extractYouTubeVideoId(url)
            promise.resolve(videoId)
        } catch (e: Exception) {
            promise.reject("EXTRACT_ERROR", "Failed to extract video ID", e)
        }
    }

    @ReactMethod
    fun generateThumbnailUrl(videoId: String, promise: Promise) {
        try {
            val thumbnailUrl = generateYouTubeThumbnailUrl(videoId)
            promise.resolve(thumbnailUrl)
        } catch (e: Exception) {
            promise.reject("THUMBNAIL_ERROR", "Failed to generate thumbnail URL", e)
        }
    }

    @ReactMethod
    fun validateYoutubeUrl(url: String, promise: Promise) {
        try {
            val isValid = isValidYouTubeUrl(url)
            promise.resolve(isValid)
        } catch (e: Exception) {
            promise.reject("VALIDATION_ERROR", "Failed to validate URL", e)
        }
    }

    @ReactMethod
    fun getVideoInfo(videoId: String, promise: Promise) {
        try {
            val videoInfo = Arguments.createMap().apply {
                putString("videoId", videoId)
                putString("thumbnailUrl", generateYouTubeThumbnailUrl(videoId))
                putString("watchUrl", "https://www.youtube.com/watch?v=$videoId")
                putString("embedUrl", "https://www.youtube.com/embed/$videoId")
            }
            promise.resolve(videoInfo)
        } catch (e: Exception) {
            promise.reject("VIDEO_INFO_ERROR", "Failed to get video info", e)
        }
    }

    private fun extractYouTubeVideoId(url: String): String? {
        val pattern = """(?:(?:https?://)?(?:www\.)?(?:youtu\.be/|youtube\.com(?:/embed/|/v/|/watch\?v=))([\w-]{10,12}))"""
        val regex = Regex(pattern)
        val matchResult = regex.find(url)
        return matchResult?.groupValues?.getOrNull(1)
    }

    private fun generateYouTubeThumbnailUrl(videoId: String): String {
        return "https://img.youtube.com/vi/$videoId/maxresdefault.jpg"
    }

    private fun isValidYouTubeUrl(url: String): Boolean {
        val pattern = """^(https?://)?(www\.)?(youtube\.com|youtu\.be)/.+"""
        return Regex(pattern).matches(url)
    }

    override fun getConstants(): Map<String, Any>? {
        return mapOf(
            "YOUTUBE_DOMAINS" to listOf("youtube.com", "youtu.be"),
            "THUMBNAIL_QUALITIES" to mapOf(
                "DEFAULT" to "default.jpg",
                "MEDIUM" to "mqdefault.jpg", 
                "HIGH" to "hqdefault.jpg",
                "STANDARD" to "sddefault.jpg",
                "MAX" to "maxresdefault.jpg"
            )
        )
    }
}
