const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants');
const authServices = require('../services/authServices');
const { checker } = require('../middleware/authMiddleware')

router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/signIn', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        let token = await authServices.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        console.log(token);

        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/auth/register', async (req, res) => {
    console.log(req.body)
    const { name, username, password, rePass } = req.body;

    if (password !== rePass) {
        throw new Error('Passwords don\'t match');
    }

    try {

        await authServices.register({
            username,
            name,
            password
        })

        let token = await authServices.login({
            username,
            password
        });

        res.cookie(AUTH_COOKIE_NAME, token)

        res.redirect('/')

    } catch (error) {
        res.locals.error = error;
        res.render('/auth/register')
    }
})


router.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/')
})


module.exports = router