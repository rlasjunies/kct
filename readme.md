
<!-- TOC -->

- [1. compile](#1-compile)
    - [1.1. test on android emulator / device](#11-test-on-android-emulator--device)
- [2. lesson learned](#2-lesson-learned)
    - [2.1. cannot find module "pages"](#21-cannot-find-module-pages)
    - [2.2. ionic tabs](#22-ionic-tabs)
    - [2.3. Unit testing](#23-unit-testing)
        - [2.3.1. Tuto on unit testing](#231-tuto-on-unit-testing)
        - [2.3.2. installation](#232-installation)
        - [2.3.3. run](#233-run)
- [3. switch to yarn](#3-switch-to-yarn)
    - [3.1. icons for notification](#31-icons-for-notification)
    - [3.2. notification documentation](#32-notification-documentation)
        - [3.2.1. sound](#321-sound)

<!-- /TOC -->

# 1. compile

- `ionic serve -d`
- `ionic cordova run android` // if a device is connected to the PC the apk generated will be deployed, if no device is connected the simulator should be run (if well installed ;-) 

> `adb devices` list the connected devices

## 1.1. test on android emulator / device

It's a pain. Here is a potential process to make it working

1 download android studio
1 download sdk for the targetted machine
1 goes in src/asset/others. extract the folder tools/template and put in 
    user/appdata/android/android-sdk/tools
    user/appdata/android/tools
1 have simple project in android studio, 
    tools/android/sync projects with gradle files
    compile it and make it running in emulator

# 2. lesson learned

## 2.1. cannot find module "pages"

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

## 2.2. ionic tabs

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

## 2.3. Unit testing

### 2.3.1. Tuto on unit testing
<https://www.joshmorony.com/introduction-to-testing-ionic-2-applications-with-testbed/>

<http://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/>

<https://developers.livechatinc.com/blog/testing-angular-2-apps-dependency-injection-and-components/>

<https://leifwells.github.io/2017/08/27/testing-in-ionic-configure-existing-projects-for-testing/>

<https://leifwells.github.io/2017/09/05/testing-in-ionic-code-coverage/>


<https://github.com/ionic-team/ionic-unit-testing-example/tree/ionic-v2-branch>

<https://semaphoreci.com/community/tutorials/testing-services-in-angular-2>

<https://auth0.com/blog/angular-2-testing-in-depth-services/>

### 2.3.2. installation

> https://github.com/ionic-team/ionic-unit-testing-example/tree/ionic-v2-branch


### 2.3.3. run

- `npm test`
- `npm run test-coverage`
> test coverage produce a report in the folder: `./coverage`

# 3. switch to yarn

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


## 3.1. icons for notification

http://fa2png.io/r/ionicons/ios-game-controller-b/

http://fa2png.io

## 3.2. notification documentation

from: http://phonegap-plugins.com/plugins/katzer/cordova-plugin-local-notifications

### 3.2.1. sound

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