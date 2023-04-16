const router = require('express').Router();
const homeController = require('./controllers/homeControllers');
const authController = require('./controllers/authControllers');
const housingController = require('./controllers/housingControllers');

router.use(housingController)
router.use(homeController);
router.use(authController)


module.exports = router