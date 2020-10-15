# MovieSearch Mobile App

## Introduction

The MovieSearch mobile app provides :

1. Search movies

2. List movies

3. Sorted list

4. Movies details

5. Persist search

6. Info page

## Development

The MovieSearch mobile app is built using React Native. The steps below will get your dev environment up and running.

### Software requirements

The following software is required for local development. It's recommended that all team members stick to the listed
versions as closely as possible to avoid issues.

- Node 12.14.0
- NPM 6.13.4
- Cocoapods 1.8.4
- Xcode 11.2.1
- Java 8 or later
- Android SDK 21+

It's good to be testing against the latest Android SDK, but it's also useful to test older versions to help ensure
compatibility with a wide range of devices.

Read the [React Native CLI Quickstart](https://facebook.github.io/react-native/docs/getting-started) for your
development OS and target device. Ensure you have the appropriate software set up as per the guide (e.g. Xcode,
Android Studio, NPM, Python).

If you can get a "Hello, World" React Native app to run, you should be good to go.

### Initial setup

1. Ensure you have an SSH key configured in GitLab. If you haven't, follow this
   [guide](https://docs.gitlab.com/ee/gitlab-basics/create-your-ssh-keys.html).
2. Clone this repository (using SSH, not HTTPS) to your local machine.
3. Open the repository as a project in your preferred IDE.
4. Run `npm install` to download the project dependencies.
5. For iOS development, run `cd ios && pod install`.

**Note:** SSH authentication is required because the app has NPM dependencies on private MovieSearch libraries.

### Making changes

Prior to starting work on a given task:

1. Run `git checkout master` if you're on a feature branch.
2. Run `git pull` to retrieve the latest code changes.
3. Run `npm install` to install/update any changed dependencies.
4. For iOS development, run `cd ios && pod install` to install/update any changed iOS dependencies.

When developing, you can run the app on your physical device, or on a simulator. A physical device offers better
performance, but simulators allow you to test a wider range of devices.

1. Run `react-native run-ios` or `react-native run-android` to run the app against your device, emulator or simulator.
2. Once the app is running, shake your device (Press `Ctrl+M` (Windows) or `Cmd+M` (MacOS) to trigger a shake gesture on
   an Android emulator).
3. Tap the `Enable Live Reload` option in the menu that appears.
4. Make changes to the JS code and the running app will automatically update.

## Debugging

To debug on an Android device/emulator:

1. Run the app using the steps above.
2. Shake your device (Press `Ctrl+M` (Windows) or `Cmd+M` (MacOS) to trigger a shake gesture on an Android emulator).
3. Tap the `Debug JS Remotely` option in the menu that appears.
4. A Chrome/Firefox window will open, titled `React Native Debugger`.
5. In the browser window, open the dev tools and navigate to the `Sources` tab.
6. Search for a source file (e.g. `App.tsx`) to debug using `Ctrl+O` (Windows) or `Cmd+O` (MacOS).
7. You can now select breakpoints and debug JS as you usually would.
