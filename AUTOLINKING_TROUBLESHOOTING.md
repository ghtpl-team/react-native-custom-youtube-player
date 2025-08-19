# React Native Autolinking Troubleshooting

This document provides solutions for common autolinking issues when using `react-native-custom-youtube-player` with React Native 0.71+ projects.

## Common Error

If you encounter this error when building your project:

```
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
```

This indicates a compatibility issue with React Native's new autolinking system introduced in version 0.71+.

## Solutions

### Solution 1: Update Your Project's settings.gradle

In your main project's `android/settings.gradle` file, ensure you have the proper React Native configuration:

```gradle
// Add this at the top of your settings.gradle
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_PROJECT)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
    }
}

// Your existing settings
rootProject.name = 'YourAppName'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')

// React Native New Architecture
if (settings.hasProperty("newArchEnabled") && settings.newArchEnabled == "true") {
    include(":ReactAndroid")
    project(":ReactAndroid").projectDir = file("../node_modules/react-native/ReactAndroid")
    include(":ReactAndroid:hermes-engine")
    project(":ReactAndroid:hermes-engine").projectDir = file("../node_modules/react-native/ReactAndroid/hermes-engine")
}
```

### Solution 2: Update Your Project's build.gradle (Project Level)

In your main project's `android/build.gradle` file (the one in the root android folder, not the app folder):

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.8.10"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.0.2")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

### Solution 3: Clean and Rebuild

After making the above changes:

1. Clean your project:

   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. Clear React Native cache:

   ```bash
   npx react-native start --reset-cache
   ```

3. Rebuild your project:
   ```bash
   npx react-native run-android
   ```

### Solution 4: Manual Linking (If Autolinking Fails)

If autolinking continues to fail, you can manually link the library:

1. In your `android/settings.gradle`:

   ```gradle
   include ':react-native-custom-youtube-player'
   project(':react-native-custom-youtube-player').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-custom-youtube-player/android')
   ```

2. In your `android/app/build.gradle`:

   ```gradle
   dependencies {
       implementation project(':react-native-custom-youtube-player')
       // ... other dependencies
   }
   ```

3. In your `MainApplication.java` or `MainApplication.kt`:

   ```java
   import com.youtubevp.YoutubePlayerPackage;

   @Override
   protected List<ReactPackage> getPackages() {
       return Arrays.<ReactPackage>asList(
           new MainReactPackage(),
           new YoutubePlayerPackage() // Add this line
       );
   }
   ```

## Version Compatibility

- React Native 0.71+: Use autolinking (recommended)
- React Native 0.60-0.70: Use autolinking with legacy configuration
- React Native < 0.60: Use manual linking

## Additional Notes

- Make sure your React Native CLI is up to date: `npm install -g @react-native-community/cli`
- Ensure your Android Gradle Plugin version is compatible with your React Native version
- If you're using Expo, you may need to eject or use a development build

## Getting Help

If you continue to experience issues:

1. Check that all versions are compatible
2. Try creating a fresh React Native project and adding the library
3. Open an issue on the GitHub repository with your React Native version and error details
