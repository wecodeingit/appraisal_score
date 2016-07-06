(function(){
    'use strict';
    function getData(options){
        var request = new XMLHttpRequest();
        request.open('POST', options.url, true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            options.callback(JSON.parse(request.responseText));
          } else {
            console.log("Error Code : "+ request.status);
          }
        };
        var payload = {"section":
                [{
                    "sectionName": "Goal Score",
                    "sectionWeightage": "20"
                },
                {
                    "sectionName": "Attendance Score",
                    "sectionWeightage": "20"
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
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(payload));
    }
    function showSectionDataInUI(response){
        document.getElementById('container').innerHTML = JSON.stringify(response.result);
    }
    function getSectionData(){
        var options = {url:'/saveSectionConfiguration',callback:showSectionDataInUI};
        getData(options);
    }
    document.getElementById('getData').addEventListener('click',getSectionData);
})();