# Installation Guide

## Automatic Installation (Recommended)

For React Native 0.60+ with autolinking:

```bash
npm install react-native-custom-youtube-player
# or
yarn add react-native-custom-youtube-player
```

### For React Native 0.71+

If you encounter autolinking issues, follow these steps:

1. **Clean and rebuild your project:**

   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native start --reset-cache
   npx react-native run-android
   ```

2. **If you still get linking errors, check your project's `android/settings.gradle`:**

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
       }
   }

   rootProject.name = 'YourAppName'
   apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
   include ':app'
   includeBuild('../node_modules/@react-native/gradle-plugin')
   ```

3. **Ensure your project's `android/build.gradle` has compatible versions:**
   ```gradle
   buildscript {
       ext {
           buildToolsVersion = "34.0.0"
           minSdkVersion = 21
           compileSdkVersion = 34
           targetSdkVersion = 34
           kotlinVersion = "1.8.10"
       }
       dependencies {
           classpath("com.android.tools.build:gradle:8.0.2")
           classpath("com.facebook.react:react-native-gradle-plugin")
           classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
       }
   }
   ```

## Manual Installation (Fallback)

If autolinking fails completely, you can manually link the library:

### Android

1. **Add to `android/settings.gradle`:**

   ```gradle
   include ':react-native-custom-youtube-player'
   project(':react-native-custom-youtube-player').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-custom-youtube-player/android')
   ```

2. **Add to `android/app/build.gradle`:**

   ```gradle
   dependencies {
       implementation project(':react-native-custom-youtube-player')
       // ... other dependencies
   }
   ```

3. **Add to `MainApplication.java` or `MainApplication.kt`:**

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

## Verification

After installation, you can verify the library is properly linked by importing it in your React Native code:

```javascript
import { YoutubeViewPager } from "react-native-custom-youtube-player";

// The component should be available without errors
```

## Troubleshooting

If you encounter issues, see [AUTOLINKING_TROUBLESHOOTING.md](./AUTOLINKING_TROUBLESHOOTING.md) for detailed solutions.

## Requirements

- React Native 0.60+
- Android API level 21+
- Kotlin support enabled in your project
