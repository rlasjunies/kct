// how to found here:
// https://github.com/Robinyo/big-top/blob/master/config/webpack.config.js

// const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

if (env === 'prod' || env === 'dev') {
  useDefaultConfig[env].resolve.alias = {
    pages: path.resolve("./src/pages"),
    providers: path.resolve("./src/providers"),
    components: path.resolve("./src/components"),
    app: path.resolve("./src/app"),
    models: path.resolve("./src/models"),
    misc: path.resolve("./src/misc")
  };
} else {
  //   // Default to dev config
  //   useDefaultConfig[env] = useDefaultConfig.dev;
  //   useDefaultConfig[env].resolve.alias = {
  //     "@app": path.resolve('./src/app/'),
  //     "@assets": path.resolve('./src/assets/'),
  //     "@env": path.resolve(environmentPath()),
  //     "@pages": path.resolve('./src/pages/'),
  //     "@services": path.resolve('./src/services/'),
  //     "@tests": path.resolve('./src/'),
  //     "@theme": path.resolve('./src/theme/')
  //   };
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! no support of other env type !!!!!!!!!!!!!!!!!!!!!!")
}

module.exports = function () {
  return useDefaultConfig;
};


// function environmentPath() {
//   let filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
//   if (!fs.existsSync(filePath)) {
//     console.log(chalk.red('\n' + filePath + ' does not exist!'));
//   } else {
//     return filePath;
//   }
// }

