const router = require('express').Router();
const housingServices = require('../services/housingServices')


router.get('/housing', async (req, res) => {
    const housings = await housingServices.getAll();

    res.render('aprt-for-recent', { housings })
})


router.get('/create', (req, res) => {
    res.render('create');
});


router.post('/create', async (req, res) => {
    try {
        await housingServices.create({ ...req.body, owner: req.user._id });
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


router.get('/details/:housingId', async (req, res) => {
    const housing = await housingServices.getOne(req.params.housingId);
    const housingData = housing.toObject();
    let userId = req.user._id
    let isOwner = false;
    if(userId !== undefined) {
        isOwner = housingData.owner == req.user._id;
    }
    const peopleRenting = housing.getRenters();
    const people = peopleRenting.length > 0;

    let result = await housingServices.rentersInfo(req.params.housingId);
    
    
    const isRented = peopleRenting.some(x => x._id == req.user._id);

    res.render('details', { ...housingData, isOwner, people,result, isRented })
});



router.get('/edit/:housingId', async (req, res) => {
    const housing = await housingServices.getOne(req.params.housingId);
    const housingData = housing.toObject();


    res.render('edit', { ...housingData })
})

router.post('/edit/:housingId', async (req, res) => {
    try {
        await housingServices.update(req.params.housingId, req.body);
        res.redirect('/details/' + req.params.housingId)
    } catch (error) {
        console.log(error)
    }
})


router.get('/rent/:housingId', async (req, res) => {
    const housing = await housingServices.getOne(req.params.housingId);
    const peopleRenting = housing.getRenters();
    
    housing.rentedHome.push(req.user._id);
    housing.availablePieces -= 1;
    housing.save();
    
    
    res.redirect('/details/' + req.params.housingId)
})




module.exports = router