class HomePage{

 get robotSelectBtn(){return $('//a[.="See our Vast Robot Selection"]')}
 get buyButton(){return $("//a[.='Buy']")}
 get productButton(){return $(".shop-callout a")}
}
module.exports = new HomePage();
