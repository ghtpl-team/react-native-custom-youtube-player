# React Native 0.80 Linking Fix for react-native-custom-youtube-player

This guide provides step-by-step solutions to fix the linking issue with `react-native-custom-youtube-player` in React Native CLI v0.80.

## Problem

Error: The package 'react-native-custom-youtube-player' doesn't seem to be linked.

## Root Causes

1. Class name mismatches between configuration and implementation
2. React Native 0.80 autolinking compatibility issues
3. Gradle configuration problems

## Solution Steps

### Step 1: Clean Your Project

```bash
# Navigate to your React Native project root
cd your-react-native-project

# Clean everything
rm -rf node_modules
npm install
# or
yarn install

# Clean Android build
cd android
./gradlew clean
cd ..

# Clear React Native cache
npx react-native start --reset-cache
```

### Step 2: Verify Package Installation

```bash
# Check if the package is properly installed
npm list react-native-custom-youtube-player
# or
yarn list react-native-custom-youtube-player
```

### Step 3: Update Your Android Configuration

#### 3.1 Update android/settings.gradle

Ensure your `android/settings.gradle` includes:

```gradle
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

rootProject.name = 'YourAppName'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../node_modules/@react-native/gradle-plugin')
```

#### 3.2 Update android/build.gradle (Project Level)

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
        ndkVersion = "25.1.8937393"
        kotlinVersion = "1.9.10"
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.1.1")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}
```

#### 3.3 Update android/app/build.gradle

Ensure you have:

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

android {
    compileSdkVersion rootProject.ext.compileSdkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation("com.facebook.react:react-android")
    implementation("com.facebook.react:flipper-integration")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
}
```

### Step 4: Force Autolinking Refresh

```bash
# Delete autolinking cache
rm -rf android/.gradle
rm -rf android/app/build

# Regenerate autolinking
npx react-native unlink react-native-custom-youtube-player
npx react-native link react-native-custom-youtube-player
```

### Step 5: Manual Linking (If Autolinking Fails)

If autolinking continues to fail, manually add to your `MainApplication.java` or `MainApplication.kt`:

#### For Java (MainApplication.java):

```java
import com.youtubevp.YoutubeViewPagerPackage;

public class MainApplication extends Application implements ReactApplication {

    @Override
    protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Add this line:
        packages.add(new YoutubeViewPagerPackage());
        return packages;
    }
}
```

#### For Kotlin (MainApplication.kt):

```kotlin
import com.youtubevp.YoutubeViewPagerPackage

class MainApplication : Application(), ReactApplication {

    override fun getPackages(): List<ReactPackage> {
        val packages = PackageList(this).packages
        // Add this line:
        packages.add(YoutubeViewPagerPackage())
        return packages
    }
}
```

### Step 6: Rebuild Your Project

```bash
# Build for Android
npx react-native run-android

# If you encounter issues, try:
npx react-native run-android --reset-cache
```

### Step 7: Verify Installation

Add this to your React Native component to test:

```javascript
import { YoutubeViewPager } from "react-native-custom-youtube-player";

// Use the component in your render method
<YoutubeViewPager videoIds={["dQw4w9WgXcQ"]} style={{ height: 200 }} />;
```

## Common Issues and Solutions

### Issue 1: "Could not find com.youtubevp:YoutubeViewPagerPackage"

**Solution**: Ensure the package name in `react-native.config.js` matches the actual class name.

### Issue 2: "Module does not exist in the module map"

**Solution**:

1. Clear Metro cache: `npx react-native start --reset-cache`
2. Restart your development server
3. Rebuild the app

### Issue 3: Gradle sync issues

**Solution**:

1. Update Android Gradle Plugin to 8.1.1+
2. Update Gradle Wrapper to 8.3+
3. Ensure Kotlin version is 1.9.10+

### Issue 4: "Duplicate class" errors

**Solution**:

1. Clean build: `cd android && ./gradlew clean`
2. Delete `node_modules` and reinstall
3. Clear all caches

## React Native 0.80 Specific Notes

- React Native 0.80 uses the New Architecture by default
- Ensure your library supports TurboModules if using New Architecture
- You may need to disable New Architecture temporarily:
  ```
  # In android/gradle.properties
  newArchEnabled=false
  ```

## Getting Help

If you continue to experience issues:

1. Check React Native version compatibility
2. Verify all dependencies are up to date
3. Try with a fresh React Native 0.80 project
4. Open an issue with complete error logs and environment details

## Environment Verification

Run these commands to verify your environment:

```bash
npx react-native info
npx react-native doctor
```

Make sure you have:

- React Native CLI 12.0.0+
- Android SDK 34+
- Java 11+
- Node.js 18+
