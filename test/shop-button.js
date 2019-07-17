//var expect = require('chai').expect;
 var home = require('./pages/home.page.js');
 var product = require('./pages/product.page.js');
 var common = require('./pages/common.page.js');
describe('SHOP-BUTTON TESTS',function(){

  // beforeEach(function(){
  //   browser.url('./');
  // });
  // afterEach(function(){
  //   browser.url(baseURL+'/');
  // });
  it('To check the title and urls of the pages',function(){
      var homeTitle= browser.getTitle();
      browser.pause(2000);
      console.log('Hope Page Title :'+homeTitle);
      browser.click('.shop-callout a');
      var shopTitle=browser.getTitle();
      console.log('Shop Page Title :'+shopTitle);
      var urlName=browser.getUrl();
      console.log('URL :'+urlName)
  });

  it('Check the reviews are being written',function(){
    // var robotSelectionBttn = $('//a[.="See our Vast Robot Selection"]');
     console.log("Button :"+ home.robotSelectBtn.getText());
     home.robotSelectBtn.click();
    // browser.pause(2000);
     // browser.waitUntil(function(){
     //   return browser.getText('#comment-form > h3')=='Add a Review';
     // },2000,'Cannot see the Add Review');
     // var ifExisting =browser.isExisting('#comment-form > h3');
     var ifExisting = common.isExisting(product.reviewLblSelector);
      console.log("IfExisting : "+ifExisting);
     // var ifVisible = browser.isVisible('#comment-form > h3');
      var ifVisible = common.isVisible(product.reviewLblSelector);
      console.log("ifVisible : "+ifVisible);
     //assert.equal(ifVisible,true);
     expect(ifVisible).to.equal(true, 'Visible is true..!');

  });
});
