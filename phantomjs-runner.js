var system = require('system');
var url = system.args[1] || '';

if(url.length > 0) {
  var page = require('webpage').create();  
  page.viewportSize = {
    width: 1280,
    height: 800
  };

  page.open(url, function (status) {
    var attempts = 0;
    var load_state = false;

    if (status == 'success') {
      // console.log(document.getElementsByTagName('html')[0].outerHTML);      
      var delay, checker = (function() {
        attempts ++;
        var html = page.evaluate(function () {
          var body = document.getElementsByTagName('body')[0];
          //var content = document.querySelector("body > .layout-row");
          // if(body.getAttribute('data-status') == 'ready') {
          //   return document.getElementsByTagName('html')[0].outerHTML;
          // }
          ///if (document.readyState == 'loaded') { //content.childElementCount > 0){
          body.onLoadFinished = function() {
            clearTimeout(delay);
            console.log(document.getElementsByTagName('html')[0].outerHTML);
            phantom.exit();

          }            
          // if ( document.readyState === "complete" ) {            
          //   return document.getElementsByTagName('html')[0].outerHTML;
          // }
        });
        if(html) {
          clearTimeout(delay);
          console.log(html);
          phantom.exit();
        } else if(attempts > 1000) {
          clearTimeout(delay);          
          phantom.exit();
        }
      });
      delay = setInterval(checker, 10);
    }
  });
}