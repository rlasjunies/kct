
<!-- TOC -->

- [1. compile](#1-compile)
- [2. android](#2-android)
- [3. lesson learned](#3-lesson-learned)
	- [3.1. cannot find module "pages"](#31-cannot-find-module-pages)
	- [3.2. ionic tabs](#32-ionic-tabs)
	- [3.3. Unit testing](#33-unit-testing)
		- [3.3.1. installation](#331-installation)
		- [3.3.2. run](#332-run)
- [4. switch to yarn](#4-switch-to-yarn)

<!-- /TOC -->

# 1. compile

- open a terminal
- ionic serve -d
- ionic run android

# 2. android

adb devices


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

<http://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/>  
<https://developers.livechatinc.com/blog/testing-angular-2-apps-dependency-injection-and-components/>

### 3.3.1. installation

- `npm install karma --save-dev`
- `npm install -g karma-cli`
- `karma init karma.conf.js`
- `npm install jasmine-core --save-dev`
- `npm install karma-browserify --save-dev`
- `npm install browserify --save-dev`
- `npm install browserify-istanbul tsify isparta --save-dev`

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