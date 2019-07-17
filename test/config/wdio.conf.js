console.log('<<<<< Reading wdio.conf.js >>>>');
const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;
var d = new Date();
datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
               + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
var reportSufix = process.env.BUILD_NUMBER || datetime;
//var baseURL='http://127.0.0.1:8303';
var baseURL='http://www.kevinlamping.com/webdriverio-course-content/';
let browsersSetup = require('./wdio.browsers.setup');
// if(process.env.SERVER==='PROD'){
//   baseURL ='http://www.kevinlamping.com/webdriverio-course-content/';
// }
exports.config = {
    seleniumArgs: browsersSetup,
    seleniumInstallArgs: browsersSetup,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
         './test/faq*'
    ],
    framework: 'cucumber',
    reporters: ['spec', 'junit','allure', 'json'],

    reporterOptions: {
        junit:  {outputDir: './test/reports/junit-results/'},
        json:   {outputDir: './test/reports/json-results/'},
        allure: {
            outputDir:   './test/reports/allure-results/',
            disableWebdriverStepsReporting: false,
            useCucumberStepReporter: false,
        },
    },

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 2,
        //
        // browserName: 'internet explorer',
        // ignoreProtectedModeSettings: true
        browserName: process.env.BROWSER || 'chrome',
      }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true, //true
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Warns when a deprecated command is used
    deprecationWarnings: true,
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: baseURL,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 1000000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone'],
    // port: '4444',
    // path: './node_modules/iedriver/bin/',
 // ...
  //  services: ['iedriver'],
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'Cucumber',
    cucumberOpts:{
      require : require('glob').sync('./test/steps/*.js'),
    //tagExpression: '@home',
        // <boolean> add cucumber tags to feature or scenario name
      //  tagsInTitle: false,
        // <number> timeout for step definitions
      //  timeout: 20000,
      // format: 'json:.json/results.json',
      //   strict: true
        backtrace: true,    // <boolean> show full backtrace for errors
        compiler: ['js:babel-core/register'], // <string[]> filetype:compiler used for processing required features
        failAmbiguousDefinitions: true,       // <boolean< Treat ambiguous definitions as errors
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        ignoreUndefinedDefinitions: false,    // <boolean> Enable this config to treat undefined definitions as warnings
        name: [],           // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,    // <boolean> hide step definition snippets for pending steps
        source: false,      // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: true,       // <boolean> fail if there are any undefined or pending steps
        tagExpression: 'not @Pending',      // <string> (expression) only execute the features or scenarios with tags matching the expression, see https://docs.cucumber.io/tag-expressions/
        timeout: defaultTimeoutInterval,    // <number> timeout for step definitions
        tagsInTitle: false,                 // <boolean> add cucumber tags to feature or scenario name
        snippetSyntax: undefined,           // <string> specify a custom snippet syntax
    },
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    reporters: ['spec','multiple-cucumber-html','allure'],//,'junit','allure','json'],
    reporterOptions : {
      allure : {
         outputDir : 'allure-results',//./allure-results/'+reportSufix+'/',
         disableWebdriverScreenshotsReporting: false,
         useCucumberStepReporter: true
       },
        htmlReporter:{
        jsonFolder : './json/json_'+reportSufix+'/', 
        reportFolder:'./HTMLReports/Report_'+reportSufix+'/'

       }
           // junit : {
       //    outputDir : './JUnit'
       //  },

       // ,json : {
       //    outputDir : 'json',
       //     combined: true,
       //     filename : 'cucumber'
      //  }

    },
    // afterTest: function (test) {
    //     console.log('=======>>> After Test <<<==========');
    //     if (test.error !== undefined) {
    //         browser.takeScreenshot();
    //      }
    // },
    afterScenario: function(scenario){
    //   console.log("-------------AFTER SCENARIO----------------------")
    //   if(scenario.results.status == "passed"){
    //      console.log("===============Step passed===============")
    //   }else if(scenario.results.status =="failed"){
    //     console.log("===============Step Failed===============")
    // //    browser.takeScreenshot();
    //     console.log("Feature : "+stepResult.feature);
    //     console.log("Scenario : "+stepResult.scenario);
    //     console.log("Step Text : "+stepResult.text);
    //     var d = new Date();
    //     var datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
    //                     + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
    //     var fileName = encodeURIComponent(stepResult.scenario.replace(/\s+/g, '-'))+"_"+datetime;
    //     var filePath = this.screenshotPath + fileName +'.png';
    //     browser.saveScreenshot(filePath);
    //     console.log('\n\t Screenshot location:',filePath,'\n');
    //     console.log("---------------------Step Failed Ended------------------")

    // }else{
    //   console.log("---------------------DOESN'T RECOGNISE------------------")
    // }
  },
    afterStep: function afterStep(stepResult) {
      //   console.log("-----------------------------------")
      //   if(stepResult.status == "passed"){
      //      console.log("===============Step passed===============")
      //   }else{
      //     console.log("===============Step Failed===============")
      // //    browser.takeScreenshot();
      //     console.log("Feature : "+stepResult.feature);
      //     console.log("Scenario : "+stepResult.scenario);
      //     console.log("Step Text : "+stepResult.text);
      //     var d = new Date();
      //     var datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
      //                     + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
      //     var fileName = encodeURIComponent(stepResult.scenario.replace(/\s+/g, '-'))+"_"+datetime;
      //     var filePath = this.screenshotPath + fileName +'.png';
      //     browser.saveScreenshot(filePath);
      //     console.log('\n\t Screenshot location:',filePath,'\n');
      //     console.log("---------------------Step Failed Ended------------------")
    //   }
    },
     /**
         * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
         * @param {Object} test test details
         */
        // afterTest: function (test) {
        //     console.log("=======>>> After Test <<<==========")
        //     //console.log('=======>>> After Test <<<==========');
        //     // if(test.passed){
        //     //   return;
        //     // }
        //     // var d = new Date();
        //     // var datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
        //     //                + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
        //     // var fileName = encodeURIComponent(test.title.replace(/\s+/g, '-'))+"_"+datetime;
        //     // var filePath = this.screenshotPath + fileName +'.png';
        //     // browser.saveScreenshot(filePath);
        //     // console.log('\n\t Screenshot location:',filePath,'\n');
        //
        // },

        /**
         * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
         * @param {Object} test test details
         */
        // afterTest: function (test) {
        //     console.log('=======>>> After Test <<<==========');
        //     // if (test.error !== undefined) {
        //     //     browser.takeScreenshot();
        //     //  }
        //     // if(test.passed){
        //     //   return;
        //     // }
        //     // var d = new Date();
        //     // var datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
        //     //                + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
        //     // var fileName = encodeURIComponent(test.title.replace(/\s+/g, '-'))+"_"+datetime;
        //     // var filePath = this.screenshotPath + fileName +'.png';
        //     // browser.saveScreenshot(filePath);
        //     // console.log('\n\t Screenshot location:',filePath,'\n');

        // },

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    // mochaOpts: {
    //     ui: 'bdd'
    // },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        console.log('<<<<<Inside On Prepare>>>>');
        var d = new Date();
        datetime = d.getDate() + "_"+ (d.getMonth()+1)  + "_" + d.getFullYear()
                       + "_"+ d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
        // var fileName = encodeURIComponent(test.title.replace(/\s+/g, '-'))+"_"+datetime;
        //var fileName = encodeURIComponent(test.title.replace(/\s+/g, '-'))+"_"+datetime;

     },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
      console.log('******Inside Before Session*****');
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     before: function (capabilities, specs) {
         console.log('££££ Before Test Execution begins ££££££££');
         expect = require('chai').expect;
     },
       // var home = require('./pages/home.page.js');
       // var product = require('./pages/product.page.js');
       // var main = require('./pages/main.page.js');
       //baseURL='http://www.kevinlamping.com/webdriverio-course-content/';

    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    //      console.log('-------Before Command -------');
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
        console.log('============Before Suite =============');
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    beforeTest: function (test) {
          console.log('=======>>> Before Test <<<==========');
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    beforeHook: function () {
      console.log('=======*** Before Hook ***==========');
    },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    afterHook: function () {
          console.log('=======*** After Hook ***==========');
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {
        console.log('============Before Suite =============');
    },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    //      console.log('-------Before Command -------');
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
         console.log('££££ AFTER ££££££££');
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    afterSession: function (config, capabilities, specs) {
        console.log('******AFTER Session*****');
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onComplete: function(exitCode, config, capabilities) {
        console.log('<<<<<On Comoplete>>>>');
    }
}
