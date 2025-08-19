# React Native YouTube ViewPager - Project Structure

This document outlines the complete structure of the React Native wrapper for the `YoutubeViewPagerDelegate.kt` file.

## File Structure

```
react-native-youtube-viewpager/
├── android/
│   ├── build.gradle                          # Android build configuration
│   └── src/main/java/com/youtubevp/
│       ├── YoutubeViewPagerPackage.kt        # React Native package registration
│       ├── YoutubeViewPagerViewManager.kt    # View manager for the component
│       ├── YoutubeViewPagerView.kt           # Main wrapper view component
│       └── YoutubeViewPagerModule.kt         # Native module for utility functions
├── src/
│   ├── index.ts                              # Main export file
│   ├── types.ts                              # TypeScript type definitions
│   ├── YoutubeViewPager.tsx                 # React Native component
│   └── YoutubeViewPagerModule.ts             # Module utilities wrapper
├── example/
│   └── App.tsx                               # Example usage implementation
├── package.json                              # NPM package configuration
├── tsconfig.json                             # TypeScript configuration
├── tsconfig.build.json                       # Build-specific TypeScript config
├── README.md                                 # Documentation
└── STRUCTURE.md                              # This file
```

## Key Components

### 1. Android Native Layer

#### YoutubeViewPagerPackage.kt
- Registers the native module and view manager with React Native
- Entry point for the native Android functionality

#### YoutubeViewPagerViewManager.kt
- Manages the React Native view component
- Handles props, events, and commands from JavaScript
- Converts React Native data to native Android objects

#### YoutubeViewPagerView.kt
- Main wrapper that integrates the original `YoutubeViewPagerDelegate`
- Handles lifecycle management and event forwarding
- Bridges native Android events to React Native events

#### YoutubeViewPagerModule.kt
- Provides utility functions for YouTube URL processing
- Handles video ID extraction and thumbnail generation
- Exposes constants and helper methods to JavaScript

### 2. React Native JavaScript Layer

#### types.ts
- Complete TypeScript definitions for all interfaces
- Defines props, events, and data structures
- Ensures type safety across the bridge

#### YoutubeViewPager.tsx
- Main React Native component
- Provides imperative API through refs
- Handles event forwarding and command dispatching

#### YoutubeViewPagerModule.ts
- JavaScript wrapper for native module functions
- Provides promise-based API for utility functions

#### index.ts
- Main export file for the package
- Exports all public APIs and types

### 3. Configuration Files

#### package.json
- NPM package configuration
- Dependencies and build scripts
- Metadata and publishing information

#### tsconfig.json & tsconfig.build.json
- TypeScript compilation settings
- Build output configuration

#### android/build.gradle
- Android build configuration
- Dependencies and compilation settings

## Integration Points

### Original Code Integration
The wrapper integrates with your original `YoutubeViewPagerDelegate.kt` by:

1. **Direct Usage**: The `YoutubeViewPagerView.kt` creates and uses the original delegate
2. **Event Forwarding**: All events from the original delegate are forwarded to React Native
3. **Lifecycle Management**: Proper lifecycle handling for the YouTube player
4. **Data Conversion**: Converts between React Native and Android data formats

### React Native Bridge
The bridge between JavaScript and native code handles:

1. **Props**: Configuration data passed from React Native to native
2. **Events**: User interactions and video events sent to React Native
3. **Commands**: Imperative API calls from React Native to native
4. **Module Functions**: Utility functions for video processing

## Usage Flow

1. **Initialization**: React Native creates the native view through the ViewManager
2. **Configuration**: Props are passed and converted to native objects
3. **Event Handling**: User interactions trigger native events that are forwarded to React Native
4. **Control**: JavaScript can control the player through imperative commands
5. **Cleanup**: Proper cleanup when the component is unmounted

## Dependencies

### Required Android Dependencies
- React Native framework
- YouTube Player library
- AndroidX libraries
- Kotlin standard library
- Original project dependencies (AdapterDelegates, Firebase, etc.)

### Required React Native Dependencies
- React Native >= 0.60
- TypeScript support
- React hooks support

## Customization Points

### Extending Functionality
To add new features:

1. **Add to ViewManager**: New props or commands
2. **Update View**: Handle new functionality in the wrapper view
3. **Update Types**: Add TypeScript definitions
4. **Update Component**: Add React Native API surface

### Styling
- Native styling through Android resources
- React Native styling through style props
- Custom themes and configurations

## Build Process

1. **TypeScript Compilation**: Source files compiled to JavaScript
2. **Android Build**: Native code compiled to AAR
3. **Package Assembly**: All files packaged for distribution
4. **Type Generation**: TypeScript definitions generated

## Testing Strategy

### Unit Tests
- Test individual components and functions
- Mock native dependencies
- Validate type definitions

### Integration Tests
- Test React Native to native communication
- Validate event handling
- Test lifecycle management

### End-to-End Tests
- Test complete user flows
- Validate video playback
- Test error scenarios

This structure provides a complete React Native wrapper that maintains all the functionality of the original `YoutubeViewPagerDelegate.kt` while providing a clean, type-safe JavaScript API.
