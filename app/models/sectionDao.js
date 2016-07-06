var db = require('./index.js');
var sectionDao = {
    getSection:function(callback){
       var selectQuery = "select * from appraisal_score.criteria";
       var truncateQuery = "truncate table appraisal_score.criteria";
       var connection = db.createDatabaseConnection();
       connection
            .then(function(conn){
                return conn.query(selectQuery).then(function(rows) {
                    return rows.length ?
                         conn.query(truncateQuery).then(function(){return conn;}) : conn;
                });
            })
            .then(function(conn){
                return conn.query(selectQuery).then(function(rows) {
                    db.terminateDatabaseConnection(conn);
                    callback(rows);
                });
            })
            .catch(function(error) {
                console.log(error);
                callback(error);
            });
    }
}

module.exports = sectionDao;

