var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bootstrap.ejs', { title: 'Keenan Linck' });
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme.ejs', { title: 'About Me - Keenan Linck' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects.ejs', { title: 'Projects - Keenan Linck' });
});

router.get('/contactme', function(req, res, next) {
  res.render('contactme.ejs', { title: 'Contact Me - Keenan Linck' });
});

module.exports = router;
