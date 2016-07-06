(function(){
    'use strict';
    function serviceProvider(options){
        var request = new XMLHttpRequest();
        request.open(options.method, options.url, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            options.callback(JSON.parse(request.responseText));
          } else {
            console.log("Error Code : "+ request.status);
          }
        };
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(options.payload));
    }
    function getData(options){
        var request = new XMLHttpRequest();
        request.open(options.method, options.url, true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            options.callback(JSON.parse(request.responseText));
          } else {
            console.log("Error Code : "+ request.status);
          }
        };

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(payload));
    }
    function showSectionData(response){
        document.getElementById('container').innerHTML = JSON.stringify(response.result);
    }

    function getSectionData(){
        var options = {url:'/getSectionConfiguration',method:'GET',callback:showSectionData};
        options.payload = [];
        serviceProvider(options);
    }

    function postSectionData(){
        var options = {url:'/saveSectionConfiguration',method:'POST',callback:showSectionData};
        options.payload = {"section":
                [{
                    "sectionName": "Goal Score",
                    "sectionWeightage": "40"
                },
                {
                    "sectionName": "Attendance Score",
                    "sectionWeightage": "0"
                },
                {
                    "sectionName": "Competency Score",
                    "sectionWeightage": "20"
                },
                {
                    "sectionName": "Skill Rating Score",
                    "sectionWeightage": "20"
                },
                {
                    "sectionName": "Performance Objective Score",
                    "sectionWeightage": "20"
                }]};
        serviceProvider(options);
    }

    document.getElementById('getData').addEventListener('click',getSectionData);
    document.getElementById('postData').addEventListener('click',postSectionData);

})();