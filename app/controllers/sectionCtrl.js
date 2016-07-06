var express = require('express');
var  router = express.Router();
var  sectiondao = require('../models/sectiondao');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/getSectionData', function (req, res, next) {
  sectiondao.getSection(function(result){
    res.send({
        result: result
    });
  });
});
