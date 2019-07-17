//var assert = require('assert');
var home = require('./pages/home.page.js');
var product = require('./pages/product.page.js');
var common = require('./pages/common.page.js');

describe('Review Tests',function(){
  // beforeEach(function(){
  //   browser.url('./')
  // });
  // afterEach(function(){
  //   browser.url(baseURL+'/');
  // });

  it('Check the Email Address...!',function(){
  //  var robotSelectionBttn = $('//a[.="See our Vast Robot Selection"]');
    console.log("Button :"+ home.robotSelectBtn.getText());
    home.robotSelectBtn.click();
    product.reviewEmailTxtBox.setValue("test.com");
    product.reviewTextTxtBox.click();
    var errorText=$('p.form-error').getText();
    browser.pause(3000);
   // browser.pause(3000);
    console.log("ErrorText :"+errorText);
    expect(errorText).to.equal('Please enter a valid email address.','Error Text is not Defined..!');
  });

  it('Check the Empty Review Text Error',function(){
  //  var robotSelectionBttn = $('//a[.="See our Vast Robot Selection"]');
  //  console.log("Button :"+ robotSelectionBttn.getText());
    home.robotSelectBtn.click();
    product.reviewEmailTxtBox.setValue("test@test.com");
    product.submitBtn.click();
    //browser.waitForVisible("//p[contains(.,'A review')]",2000);
    //browser.pause(5000);
    var isVisible = common.waitForVisible(product.errorReviewTextSelector);
    console.log("Error Review Text Selector Visible : "+isVisible);
    //  browser.pause(4000);
    errorText=product.errorReviewText.getText();

    console.log("ErrorText For Review Text :"+errorText);
    //assert.equal(errorText,'A review without text isn\'t much of a review.');
    expect(errorText).to.equal('A review without text isn\'t much of a review.');
  });

  it('Check the Review is Present..!',function(){
    var robotSelectionBttn = $('//a[.="See our Vast Robot Selection"]');
  //  console.log("Button :"+ robotSelectionBttn.getText());
    robotSelectionBttn.click();
    $('#review-email').setValue("test@test.com");
    $('//label//textarea').setValue("This is my first review")
    $('.button[type="submit"]').click(); wdio.conf.js
    browser.pause(3000);
    let emailText = $("//h5[@class='email']").getText();
    let reviewText = $("//p[@class='comment']").getText();
    console.log("Email Text :"+emailText);
    console.log("Review Text :"+reviewText);
    // assert.equal(emailText,"test@test.com");
    // assert.equal(reviewText,"This is my first review");

  });

});
