var db = require('./index.js');
var sectionDao = {
    getSection:function(callback){
       var selectQuery = "select * from criteria";
        var connection = db.createDatabaseConnection();
        connection.then(function(conn){
            conn.query(selectQuery).then(function(rows) {
                db.terminateDatabaseConnection(conn);
                callback(rows);
            },function(err){
                db.terminateDatabaseConnection(conn);
                callback(err);
            });
        },function(err){
            console.log(err);
            callback({"result":"Failed to connect to DB"});
            return;
        });
    }
}

module.exports = sectionDao;
