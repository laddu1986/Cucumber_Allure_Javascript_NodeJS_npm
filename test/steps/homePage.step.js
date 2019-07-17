const { Given, When, Then } = require('cucumber')
//const { expect } = require('chai')
var home = require('../pages/home.page.js');
var product = require('../pages/product.page.js');
var common = require('../pages/common.page.js');

//Comenting on homePage.Step
Given('I navigate to the site', function() {
  browser.url('./');
  console.log("Navigating to the site..!");
})

When(/^I click on the \"(.*)\" button$/, (item) => {
  console.log(`Clicking on the ${item} button..!`);
  if(item=="product"){
     //browser.click('.shop-callout a');
     home.productButton.click();
   }else if(item=="buy"){
      home.buyButton.click();
   }
});
Then(/^I should be seeing the \"(.*)\" page$/,url => {
   console.log(`Then I should be seeing ${url} page`);
});
Then('I should be seeing the review label', function() {
  console.log("seeing the review label....!");
  var ifExisting = common.isExisting(product.reviewLblSelector);
   console.log("IfExisting : "+ifExisting);
  // var ifVisible = browser.isVisible('#comment-form > h3');
   var ifVisible = common.isVisible(product.reviewLblSelector);
   console.log("ifVisible : "+ifVisible);
  //assert.equal(ifVisible,true);
  expect(ifVisible).to.equal(false, 'Visible is true..!');

})
