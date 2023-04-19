const router = require('express').Router();
const postServices = require('../services/postServices')

router.get('/create', (req, res) => {
    res.render('create')
})


router.post('/create', async (req, res) => {
    try {
        await postServices.create({ ...req.body, author: req.user._id })
    } catch (error) {
        res.locals.error = error;
        res.render('create')
    }
})


router.get('/all', async (req, res) => {
    const posts = await postServices.getAll();
    res.render('all-posts', { posts })
})


router.get('/details/:postId', async (req, res) => {
    let post = await postServices.getOne(req.params.postId);
    let postData = post.toObject();
    
    let owner = await postServices.findAuthor(postData.author);
    let ownerData = owner.toObject();
    let everyVoted = await postServices.voters(req.params.postId);
    console.log(everyVoted)
    
    let voters = post.getVoters();
    let isVotted;
    
    let isOwner;

    if(req.user) {
        isOwner = postData.author == req.user._id;
        isVotted = voters.some(x => x._id == req.user._id);
    }

    res.render('details', { ...postData, isOwner, firstName: ownerData.firstName, lastName: ownerData.lastName, isVotted, everyVoted})
})


router.get('/edit/:postId', async (req, res) => {
    try {
        let post = await postServices.getOne(req.params.postId);
        let postData = post.toObject();
    
        res.render('edit', { ...postData })
    } catch (error) {
        res.locals.error = error
        res.render('edit')
    }
  
});


router.post('/edit/:postId', async (req, res) => {
    try {
        await postServices.update(req.params.postId, req.body);
        res.redirect('/details/' + req.params.postId)
    } catch (error) {
        console.log(error)
    }
});


router.get('/my-posts', async (req, res) => {
    let myPosts = await postServices.myPosts(req.user._id);

    res.render('my-posts', { myPosts })
});


router.get('/upVote/:postId', async (req, res) => {
    let post = await postServices.getOne(req.params.postId);
    post.votes.push(req.user._id);
    post.rating += 1
    post.save();
    res.redirect('/details/' + req.params.postId)
})

router.get('/downVote/:postId', async (req, res) => {
    let post = await postServices.getOne(req.params.postId);
    post.votes.push(req.user._id);
    post.rating -= 1
    post.save();
    res.redirect('/details/' + req.params.postId)
})

module.exports = router