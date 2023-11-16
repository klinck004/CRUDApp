let express = require('express');
let router = express.Router();
let indexController = require("../controllers/index.js")

router.get('/', indexController.displayHP);

module.exports = router;
