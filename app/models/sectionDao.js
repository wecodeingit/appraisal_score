var db = require('./index.js');

var selectQuery = "select * from appraisal_score.criteria";
var truncateQuery = "truncate table appraisal_score.criteria";
var insertQuery = "INSERT INTO appraisal_score.criteria(measureName,weightage) values ?";

var sectionDao = {
    postSection:function(sectionRecords,callback){
       var connection = db.createDatabaseConnection();
       var refinedSectionRecords = sectionRecords.map(function(item){
                return [item.sectionName,item.sectionWeightage];
       });
       connection
            .then(function(conn){
                return conn.query(selectQuery).then(function(rows) {
                    return rows.length ?
                         conn.query(truncateQuery).then(function(){return conn;}) : conn;
                });
            })
            .then(function(conn){
                return conn.query(insertQuery,[refinedSectionRecords]).then(function(response) {
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
    getSection:function(callback){
        var connection = db.createDatabaseConnection();
        connection
            .then(function(conn){
                return conn.query(selectQuery).then(function(rows) {
                  db.terminateDatabaseConnection(conn);
                  callback(rows);
                });
            });
    }
}

module.exports = sectionDao;

