var express = require('express');
var  router = express.Router();
var  sectionDao = require('../models/sectionDao');

module.exports = function (app) {
  app.use('/', router);
};

router.post('/saveSectionConfiguration', function (req, res, next) {
  sectionDao.insertSection(req.body.section,function(result){
    res.send({
        result: result
    });
  });
});
