var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home.ejs', { title: 'Home' });
});

module.exports = router;