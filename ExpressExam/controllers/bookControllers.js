const router = require('express').Router();
const bookServices = require('../services/bookServices')

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    try {
        await bookServices.create({ ...req.body, owner: req.user._id });
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})


router.get('/catalog', async (req, res) => {
    const books = await bookServices.getAll();
    res.render('catalog', { books })
})

router.get('/details/:bookId', async (req, res) => {
    const id = req.params.bookId;
    const book = await bookServices.findOne(id);
    const bookData = await book.toObject();
    const isOwner = bookData.owner == req.user._id;

    const wishlist = book.getWishlisted();
    console.log(wishlist)
    console.log(req.user._id)

    const wishListed = req.user && wishlist.some(c => c._id == req.user._id);

    res.render('details', { ...bookData, isOwner, wishListed })
})


router.get('/edit/:cryptoId', async (req, res) => {
    const id = req.params.cryptoId;
    const book = await bookServices.findOne(id);
    const bookData = await book.toObject();

    res.render('edit', { ...bookData })
});


router.post('/edit/:cryptoId', async (req, res) => {
    const id = req.params.cryptoId;
    try {
        await bookServices.update(id, req.body);
        res.redirect('/details/' + id)
    } catch (error) {
        console.log(error)
    }
});



router.get('/wish/:bookId', async (req, res) => {
    console.log('Wishing')
    const id = req.params.bookId;
    const book = await bookServices.findOne(id);
    book.wishListing.push(req.user._id);
    await book.save();
    console.log(book)

    res.redirect('/details/' + id)

})

/*async function isOwner() {
   const book 
}*/

module.exports = router