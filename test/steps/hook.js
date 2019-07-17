const {After, Status} =  require('cucumber');
const {BeforeAll} = require('cucumber');

BeforeAll(async function(){
  //await driver.manage().window().maximize();
  console.log('%%%%%%%%%%%%%%%%%%%%% Inside Before all %%%%%%%%%%%%%%%%%%%%')
})

After((scenarioResult)=>{
  // Here it is added to a failed step, but each time you call `browser.saveScreenshot()` it will automatically bee added to the report
  if (scenarioResult.result.status === 'failed') {
    // It will add the screenshot to the JSON
    browser.saveScreenshot()
  }
  return scenarioResult.status;
});
