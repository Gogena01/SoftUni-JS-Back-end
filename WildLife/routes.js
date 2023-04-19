const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController')

router.use(homeController);
router.use(authController);
router.use(postController)

module.exports = router;