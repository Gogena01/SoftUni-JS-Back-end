const router = require('express').Router();
const bookServices = require('../services/bookServices')

router.get('/', (req, res) => {
   res.render('home')
})

router.get('/profile', async (req, res) => {
   const userId = req.user._id;
   let wished = await bookServices.getMyWishBook(userId);
   console.log(wished)
   res.render('profile', {...req.user, wished})
})


module.exports = router