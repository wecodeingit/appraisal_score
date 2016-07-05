var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

function callback(res,dbInstance){
  db.terminateDatabaseConnection(dbInstance.connection);
  res.send({
        result: dbInstance.result
  });
}
function queryConnection(res,callback)
{
  var connection = db.createDatabaseConnection();
  connection.query("show databases", function(err, rows, fields) {
    if (err) {
      callback(res,{"connection":connection,"result":err});
      return;
    }
     callback(res,{"connection":connection,"result":rows});
  });
}
router.get('/getSectionData', function (req, res, next) {
  queryConnection(res,callback);
});
