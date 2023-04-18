const router = require('express').Router();
const homeControllers = require('./controllers/homeController');
const authControllers = require('./controllers/authController');
const bookControllers = require('./controllers/bookControllers')

router.use(homeControllers);
router.use(bookControllers)
router.use(authControllers);


module.exports = router