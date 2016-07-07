"use strict";

var mysql = require("promise-mysql");
var config = require('../../config/config');
var db = {};
/* mysql connection string */
var createDatabaseConnection = function() {
  var connection = mysql.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
  });

  return connection;

};

var terminateDatabaseConnection = function(connection) {
  connection.end()
    .then(function() {
      console.log("The connection is terminated now");
    });
};

db.createDatabaseConnection = createDatabaseConnection;
db.terminateDatabaseConnection = terminateDatabaseConnection;

module.exports = db;