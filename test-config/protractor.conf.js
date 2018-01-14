// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let logAtTheEnd = false;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // '../e2e/**/*.e2e-spec.ts'
    // '../e2e/app.e2e-spec.ts',
    // '../e2e/timers.e2e-spec.ts',
    '../e2e/timer-config.e2e-spec.ts',
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
  SELENIUM_PROMISE_MANAGER: false,
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e'
    });

    // this could be used if there is no 'npm run serve' running 
    // require('connect')().use(require('serve-static')('www')).listen(8100);
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter());
    // browser.driver.manage().window().setSize(1600, 1024);
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