var fs = require('fs'),
  path = require('path'),
  mysql = require("mysql"),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};
  /* mysql connection string */
   var connection = mysql.createConnection({
      host     : config.database.host,
      port     : config.database.port,
      user     : config.database.user,
      password : config.database.password,
      database : config.database.name
    });
    
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('Connection has been established successfully with ID ' + connection.threadId);
    });
    /* sequelize connection string */
/*  var sequelize = new Sequelize('mysql://'+
      config.database.user+
      ':'+config.database.password+
      '@'+config.database.host+
      ':'+config.database.port+
      '/'+config.database.name);

  sequelize.authenticate().then(function(err) {
      if (err) {
        console.log('Unable to connect to the database:', err);
      } else {
        console.log('Connection has been established successfully.');
      }
  });

db.sequelize = sequelize;
*/

module.exports = db;
