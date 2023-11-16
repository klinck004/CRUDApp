let express = require('express');
let router = express.Router();
let assignController = require("../controllers/assignment.js")

/*Read*/
router.get('/', assignController.displayList); /* Display assignment list*

/*Create*/
router.get('/add/', assignController.displayCreate); /* Display assignment add page*/
router.post('/add', assignController.runCreate); /* Post form data and reflect changes */

/*Update*/
router.get('/edit/:id', assignController.displayUpdate); /* Display assignment update page*/
router.post('/edit/:id', assignController.runUpdate); /* Post form data and reflect changes */

/*Delete*/
router.get('/delete/:id', assignController.runDelete); /* Delete item */

/*Show*/
router.get('/show/:id', assignController.displayShow); /* Show requested item in full detail */
router.post('/edit/:id', assignController.runShow); /* Post form data and reflect changes */

module.exports = router;
