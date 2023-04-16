const router = require('express').Router();
const housingServies = require('../services/housingServices')

router.get('/', (req, res) => {
    res.render('home')
});


router.get('/search', (req, res) => {
    res.render('search')
});


router.post('/search', async (req, res) => {
    const query = req.body.text;
    if(!query) {
        throw new Error('Input is not valid');
    }

    const result = await housingServies.search(query);

    res.render('search', {result})
})


module.exports = router;