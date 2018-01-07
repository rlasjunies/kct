// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let logAtTheEnd = false;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '../e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:8100/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
  },
  // rootElement: '.app-root',
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e'
    });

    // require('connect')().use(require('serve-static')('www')).listen(8100);
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter());
  },

  onComplete: function () {

    if (logAtTheEnd) {
      browser.manage().logs().get('browser').then(function (browserLogs) {
        // browserLogs is an array of objects with level and message fields
        console.warn(">>>>>>>>Logs from the webbrowser<<<<<<<<");
        browserLogs.forEach(function (log) {
          
          if (log.level.value > 900) { // it's an error log
            console.error(log.message);
          } else {
            console.log(log.message);
          }
        });
        console.warn(">>>>>>>>Logs from the webbrowser<<<<<<<<");
      });
    }
  }
};

// for use with Protractor/Webdriver
var fs = require('fs');
var path = require('path');

var saveScreenshot = function(pathname) {
  browser.takeScreenshot().then(function(png) {
    var file = path.resolve(pathname);
    fs.writeFileSync(file, png, { encoding: 'base64' }, console.log);
  });
};