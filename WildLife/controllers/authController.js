const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants');
const authServices = require('../services/authServices');
const { isGuest, isAuth } = require('../middleware/authMiddleware')

router.get('/login',isGuest, (req, res) => {
    res.render('login');
});

router.post('/login',isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {
        let token = await authServices.login({ email, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        console.log(token);

        res.redirect('/')
    } catch (err) {
        res.locals.error = err
        res.render('login')
    }
})


router.get('/register',isGuest, (req, res) => {
    res.render('register');
});


router.post('/register',isGuest, async (req, res) => {
    const { firstName, lastName, email, password, rePass } = req.body;

    if (rePass !== password) {
        res.locals.error = 'Passwords or Email do not match'
        return res.render('register')
    }
    try {
        await authServices.register({
            email,
            password,
            firstName,
            lastName
        });

        let token = authServices.login({
            email,
            password
        });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('register', { error: error.message });
    }
});


router.get('/logout',isAuth, (req, res) => {
    res.clearCookie('auth_jwt');
    res.redirect('/');
})

module.exports = router