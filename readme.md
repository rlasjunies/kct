adb devices

# compile
`ionic serve`

# cannot find module "pages"
1. update the @ionic/app-config/config/webpack.conf.js
2. in dev_conf, prod_conf
`
...  
>>	resolve: {  
		extensions: ['.ts', '.js', '.json'],  
		modules: [path.resolve('node_modules')]  
		, alias: {  
			pages: path.resolve(__dirname, "../../../../src/pages")  
			, providers: path.resolve(__dirname, "../../../../src/providers")  
			, components: path.resolve(__dirname, "../../../../src/components")  
			, app: path.resolve(__dirname, "../../../../src/app")  
			, models: path.resolve(__dirname, "../../../../src/models")  
			, misc: path.resolve(__dirname, "../../../../src/misc")  
		}  
	},  
  
	module: {  
		loaders: [  
`  
# lesson learned
if we want to use tabs

* create another folder tabs
	* create folder for each tab
	* modify the tabs resolve in webpack.conf.js as shown above to not have relative import access
* the tab1/tab1.module must imported in the app.module
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