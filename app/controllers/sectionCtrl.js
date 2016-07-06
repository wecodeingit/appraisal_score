var express = require('express');
var  router = express.Router();
var  sectionDao = require('../models/sectionDao');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/getSectionData', function (req, res, next) {
  sectionDao.getSection(function(result){
    res.send({
        result: result
    });
  });
});
