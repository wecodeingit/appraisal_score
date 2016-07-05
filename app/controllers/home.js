var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/getSectionData', function (req, res, next) {
    res.send({
      message: 'Success'
    });
});
