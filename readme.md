
<!-- TOC -->

- [1. compile](#1-compile)
    - [test on android emulator / device](#test-on-android-emulator--device)
- [3. lesson learned](#3-lesson-learned)
    - [3.1. cannot find module "pages"](#31-cannot-find-module-pages)
    - [3.2. ionic tabs](#32-ionic-tabs)
    - [3.3. Unit testing](#33-unit-testing)
        - [3.3.1. installation](#331-installation)
        - [3.3.2. run](#332-run)
- [4. switch to yarn](#4-switch-to-yarn)
    - [icons for notification](#icons-for-notification)
    - [notification documentation](#notification-documentation)
        - [sound](#sound)

<!-- /TOC -->

# 1. compile

- `ionic serve -d`
- `ionic cordova run android` // if a device is connected to the PC the apk generated will be deployed, if no device is connected the simulator should be run (if well installed ;-) 

> `adb devices` list the connected devices

## test on android emulator / device

It's a pain. Here is a potential process to make it working

1 download android studio
1 download sdk for the targetted machine
1 goes in src/asset/others. extract the folder tools/template and put in 
    user/appdata/android/android-sdk/tools
    user/appdata/android/tools
1 have simple project in android studio, 
    tools/android/sync projects with gradle files
    compile it and make it running in emulator

# 3. lesson learned

## 3.1. cannot find module "pages"

1. update the @ionic/app-config/config/webpack.conf.js
1. in dev_conf, prod_conf

```javascript
...
resolve: {
extensions: ['.ts', '.js', '.json'],
  modules: [path.resolve('node_modules')],
  alias: {
    pages: path.resolve(__dirname, "../../../../src/pages"),
    providers: path.resolve(__dirname, "../../../../src/providers"),
     components: path.resolve(__dirname, "../../../../src/components"),
      app: path.resolve(__dirname, "../../../../src/app"),
       models: path.resolve(__dirname, "../../../../src/models"),
        misc: path.resolve(__dirname, "../../../../src/misc")  
        }
    },
  module: {
    loaders: [
```

## 3.2. ionic tabs

if we want to use tabs

- create another folder tabs
  - create folder for each tab
  - modify the tabs resolve in webpack.conf.js as shown above to not have relative import access
- the tab1/tab1.module must imported in the app.module

```javascript
...
import * as tabs from "tabs";
...
imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    tabs.Tab1Module,
    tabs.Tab2Module
  ],
  bootstrap: [IonicApp],
...
```

## 3.3. Unit testing

<https://www.joshmorony.com/introduction-to-testing-ionic-2-applications-with-testbed/>
<http://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/>  
<https://developers.livechatinc.com/blog/testing-angular-2-apps-dependency-injection-and-components/>

### 3.3.1. installation

> https://github.com/ionic-team/ionic-unit-testing-example/tree/ionic-v2-branch


### 3.3.2. run

- `npm test`

# 4. switch to yarn

|npm| Yarn |
|-|-|
| npm install| yarn install |
| (N/A)	| yarn install --flat |
| (N/A)	| yarn install --har
| (N/A)	| yarn install --no-lockfile
| (N/A)	| yarn install --pure-lockfile
| npm install [package]| (N/A)
| npm install --save [package]| yarn add [package]
| npm install --save-dev [package]| yarn add [package] --dev
| (N/A)	| yarn add [package] --peer
| npm install --save-optional [package]| yarn add [package] --optional
| npm install --save-exact [package]| yarn add [package] --exact
| (N/A)	| yarn add [package] --tilde
| npm install --global [package]| yarn global add [package]
| npm rebuild| yarn install --force
| npm uninstall [package]| (N/A)
| npm uninstall --save [package]| yarn remove [package]
| npm uninstall --save-dev [package]| yarn remove [package]
| npm uninstall --save-optional [package]| yarn remove [package]
| npm cache clean| yarn cache clean
| rm -rf node_modules && npm install| yarn upgrade


## icons for notification

http://fa2png.io/r/ionicons/ios-game-controller-b/

http://fa2png.io

## notification documentation

from: http://phonegap-plugins.com/plugins/katzer/cordova-plugin-local-notifications

### sound

Notification sound on Android
The sound must be a absolute or relative Uri pointing to the sound file. The default sound is RingtoneManager.TYPE_NOTIFICATION.

Note: Local sound files must be placed into the res-folder and not into the assets-folder.

/**
 * Plays the `beep.mp3` which has to be located in the res folder
 */
window.plugin.notification.local.add({ sound: 'android.resource://' + package_name + '/raw/beep' });

/**
 * Plays a remote sound
 */
window.plugin.notification.local.add({ sound: 'http://remotedomain/beep.mp3' });

/**
 * Plays a sound file which has to be located in the android_assets folder
 */
window.plugin.notification.local.add({ sound: '/www/audio/beep.mp3' });

/**
 * Plays the `RingtoneManager.TYPE_ALARM` sound
 */
window.plugin.notification.local.add({ sound: 'TYPE_ALARM' });