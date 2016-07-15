(function() {
    'use strict';

    function serviceProvider(options) {
        var request = new XMLHttpRequest();
        request.open(options.method, options.url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                options.callback(JSON.parse(request.responseText));
            } else {
                console.log("Error Code : " + request.status);
            }
        };
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(options.payload));
    }

    function showSectionData(response) {
        document.getElementById('sectionContainer')
            .innerHTML = JSON.stringify(response.section);
    }

    function showEmployeeData(response) {
        document.getElementById('employeeContainer')
            .innerHTML = JSON.stringify(response.employee);
    }

    function showScoreData(response) {
        document.getElementById('scoreContainer')
            .innerHTML = JSON.stringify(response.score);
    }

    function getSectionData() {
        var options = {
            url: '/getSectionConfiguration',
            method: 'GET',
            callback: showSectionData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function postSectionData() {
        var options = {
            url: '/saveSectionConfiguration',
            method: 'POST',
            callback: showSectionData
        };
        options.payload = {
            "section": [{
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
                }]
        };
        serviceProvider(options);
    }

    function getAllEmployees() {
        var options = {
            url: '/getAllEmployees',
            method: 'GET',
            callback: showEmployeeData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function getEmployeeById() {
        var employeeId = 2;
        var options = {
            url: '/getEmployeeById/' + employeeId,
            method: 'GET',
            callback: showEmployeeData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function insertScore() {
        var options = {
            url: '/saveIndividualScore',
            method: 'POST',
            callback: showScoreData
        };
        options.payload = {

            "scores": {
                "employeeID": 1,
                "overallScore": 80,
                "individualScore": [
                    {
                        "score_id": 1,
                        "score_value": 10
                    },
                    {
                        "score_id": 2,
                        "score_value": 10
                    },
                    {
                        "score_id": 3,
                        "score_value": 20
                    },
                    {
                        "score_id": 4,
                        "score_value": 20
                    },
                    {
                        "score_id": 5,
                        "score_value": 20
                    }
                ]
            }

        };
        serviceProvider(options);
    }

    function getOverallScoreForAllEmployees() {
        var options = {
            url: '/getOverallScoreForAllEmployees',
            method: 'GET',
            callback: showScoreData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function getOverallScoreByEmployeeId() {
        var employeeId = 1;
        var options = {
            url: '/getOverallScoreByEmployeeId/' + employeeId,
            method: 'GET',
            callback: showScoreData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function getAllIndividualScoreForAllEmployees() {
        var options = {
            url: '/getAllIndividualScoreForAllEmployees/',
            method: 'GET',
            callback: showScoreData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function getAllIndividualScoreByEmployeeId() {
        var employeeId = 1;
        var options = {
            url: '/getAllIndividualScoreByEmployeeId/' + employeeId,
            method: 'GET',
            callback: showScoreData
        };
        options.payload = [];
        serviceProvider(options);
    }

    function getIndividualScoreByIdForEmployeeId() {
        var employeeId = 1;
        var sectionId = 1;
        var options = {
            url: '/getIndividualScoreByIdForEmployeeId/' + employeeId + '/' + sectionId,
            method: 'GET',
            callback: showScoreData
        };
        options.payload = [];
        serviceProvider(options);
    }

    document.getElementById('getSectionData')
        .addEventListener('click', getSectionData);
    document.getElementById('postSectionData')
        .addEventListener('click', postSectionData);
    document.getElementById('getAllEmployeeData')
        .addEventListener('click', getAllEmployees);
    document.getElementById('getEmployeeDataById')
        .addEventListener('click', getEmployeeById);
    document.getElementById('insertScore')
        .addEventListener('click', insertScore);
    document.getElementById('getOverallScoreForAllEmployees')
        .addEventListener('click', getOverallScoreForAllEmployees);
    document.getElementById('getOverallScoreByEmployeeId')
        .addEventListener('click', getOverallScoreByEmployeeId);
    document.getElementById('getAllIndividualScoreForAllEmployees')
        .addEventListener('click', getAllIndividualScoreForAllEmployees);
    document.getElementById('getAllIndividualScoreByEmployeeId')
        .addEventListener('click', getAllIndividualScoreByEmployeeId);
    document.getElementById('getIndividualScoreByIdForEmployeeId')
        .addEventListener('click', getIndividualScoreByIdForEmployeeId);

})();