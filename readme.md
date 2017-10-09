adb devices

# compile
`ionic serve`

# cannot find module "pages"
1. update the @ionic/config/webpack.conf.js
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
