"use strict";

var db = require('./index.js');
var overallScoreDao = require('./overallScoreDao');
var insertIndividualScoreQuery = "INSERT INTO appraisal_score.section_score(employeeID,sectionID,sectionScore) values ?";
var updateIndividualScoreQuery = "UPDATE appraisal_score.section_score SET sectionScore = ? WHERE sectionID = ? AND employeeID = ?";
var selectQuery = "select * from appraisal_score.section_score where employeeID = ?";
var getAllIndividualScoreForAllEmployeesQuery = "SELECT s.employeeID, e.name, s.sectionID, c.measureName, s.sectionScore" + " ";
getAllIndividualScoreForAllEmployeesQuery += "FROM appraisal_score.section_score AS s" + " ";
getAllIndividualScoreForAllEmployeesQuery += "INNER JOIN appraisal_score.employee as e on s.employeeID = e.id" + " ";
getAllIndividualScoreForAllEmployeesQuery += "INNER JOIN appraisal_score.criteria AS c on s.sectionID = c.id";
var getAllIndividualScoreByEmployeeIdQuery = getAllIndividualScoreForAllEmployeesQuery + " " + "WHERE s.employeeID = ?";
var getIndividualScoreByIdForEmployeeId = getAllIndividualScoreByEmployeeIdQuery + " " + "AND s.sectionID = ?";
var RECORD_ZERO = 0;
var individualSectionScoreDao = {
    insertScore: function(scoreRecords, callback) {
        var connection = db.createDatabaseConnection();

        function getRefinedInsertRecords() {
            var refinedInsertRecords = [];
            for (var i = 0, len = scoreRecords.individualScore.length; i < len; i++) {
                refinedInsertRecords.push([scoreRecords.employeeID, scoreRecords.individualScore[i].score_id,
                    scoreRecords.individualScore[i].score_value
                ]);
            }
            return [refinedInsertRecords];
        }

        function getRefinedUpdateRecords(index) {
            var refinedUpdateRecords = [];
            refinedUpdateRecords.push(scoreRecords.individualScore[index].score_value,
                scoreRecords.individualScore[index].score_id, scoreRecords.employeeID);
            return refinedUpdateRecords;
        }


        function updateRecords(index) {

            if (index < scoreRecords.individualScore.length) {
                //updates section records recursively
                connection
                    .then(function(conn) {
                        return conn.query(updateIndividualScoreQuery, getRefinedUpdateRecords(index++))
                            .then(function(response) {
                                updateRecords(index);
                            }).catch(function(error) {
                                console.log(error);
                                callback(error);
                            });
                    });
            } else {
                //updates overall score
                connection
                    .then(function(conn) {
                        return overallScoreDao.updateOverallScore(conn, [scoreRecords.overallScore, scoreRecords.employeeID])
                            .then(function(response) {
                                var result = response.affectedRows ? "Updated Successfully" : "Error while Updating";
                                db.terminateDatabaseConnection(conn);
                                callback(result);
                            })
                            .catch(function(error) {
                                console.log(error);
                                callback(error);
                            });
                    });
            }
        }

        connection
            .then(function(conn) {
                return conn.query(selectQuery, [scoreRecords.employeeID])
                    .then(function(rows) {
                        if (rows.length) {
                            updateRecords(RECORD_ZERO);
                        } else {
                            return conn;
                        }

                    });
            })
            .then(function(conn) {
                return conn.query(insertIndividualScoreQuery, getRefinedInsertRecords())
                    .then(function(response) {
                        return conn;
                    });
            })
            .then(function(conn) {
                return overallScoreDao.insertOverallScore(conn, [scoreRecords.employeeID, scoreRecords.overallScore])
                    .then(function(response) {
                        var result = response.affectedRows ? "Inserted Successfully" : "Error while inserting";
                        db.terminateDatabaseConnection(conn);
                        callback(result);
                    });
            })
            .catch(function(error) {
                console.log(error);
                callback(error);
            });
    },
    getAllIndividualScoreForAllEmployees: function(callback) {
        var connection = db.createDatabaseConnection();
        connection
            .then(function(conn) {
                return conn.query(getAllIndividualScoreForAllEmployeesQuery)
                    .then(function(rows) {
                        db.terminateDatabaseConnection(conn);
                        callback(db.groupByRecord(rows, 'employeeID', 'scores'));
                    });
            })
            .catch(function(error) {
                console.log(error);
                callback(error);
            });
    },
    getAllIndividualScoreByEmployeeId: function(employeeId, callback) {
        var connection = db.createDatabaseConnection();
        connection
            .then(function(conn) {
                return conn.query(getAllIndividualScoreByEmployeeIdQuery, [employeeId])
                    .then(function(rows) {
                        db.terminateDatabaseConnection(conn);
                        callback(db.groupByRecord(rows, 'employeeID', 'scores'));
                    });
            })
            .catch(function(error) {
                console.log(error);
                callback(error);
            });
    },
    getIndividualScoreByIdForEmployeeId: function(employeeId, sectionId, callback) {
        var connection = db.createDatabaseConnection();
        connection
            .then(function(conn) {
                return conn.query(getIndividualScoreByIdForEmployeeId, [employeeId, sectionId])
                    .then(function(rows) {
                        db.terminateDatabaseConnection(conn);
                        callback(db.groupByRecord(rows, 'employeeID', 'scores'));
                    });
            })
            .catch(function(error) {
                console.log(error);
                callback(error);
            });
    }
};

module.exports = individualSectionScoreDao;
