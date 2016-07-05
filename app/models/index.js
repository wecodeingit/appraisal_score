var mysql = require("mysql");
var config = require('../../config/config');
var db = {};
  /* mysql connection string */
   var createDatabaseConnection = function(){
   return mysql.createConnection({
      host     : config.database.host,
      port     : config.database.port,
      user     : config.database.user,
      password : config.database.password,
      database : config.database.name
    });
   }
  
  var terminateDatabaseConnection = function(connection){
    connection.end(function(err) {
     if (err) {
       console.log(err);
       return;
     }
     console.log("The connection is terminated now");
    });
  }

    
    db.createDatabaseConnection = createDatabaseConnection;
    db.terminateDatabaseConnection = terminateDatabaseConnection;
    
  

module.exports = db;
