(function(){
    'use strict';
    function getData(options){
        var request = new XMLHttpRequest();
        request.open('GET', options.url, true);
        
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            options.callback(JSON.parse(request.responseText));
          } else {
            console.log("Error Code : "+ request.status);
          }
        };
        request.send();
    }
    function showSectionDataInUI(response){
        document.getElementById('container').innerHTML = JSON.stringify(response.result);
    }
    function getSectionData(){
        var options = {url:'/getSectionData',callback:showSectionDataInUI};
        getData(options);
    }
    document.getElementById('getData').addEventListener('click',getSectionData);
})();