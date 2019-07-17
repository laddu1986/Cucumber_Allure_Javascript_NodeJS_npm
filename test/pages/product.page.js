class ProductPage {
  //var reviewLblSelector ='#comment-form > h3';
  get reviewLblSelector(){return '#comment-form > h3';};
  get errorEmailTextSelector(){return 'p.form-error';}
  get errorReviewTextSelector(){return "//p[contains(.,'A review')]";}

  get addAReviewLabel(){return $('#comment-form > h3');};
  get reviewEmailTxtBox(){return $('#review-email');};
  get reviewTextTxtBox(){return $('label > textarea');};
  get submitBtn(){return $("//button[.='Submit Review']");};
  get errorEmailText(){return $('p.form-error');};
  get errorReviewText(){return $("//p[contains(.,'A review')]");};




}
module.exports= new ProductPage();
