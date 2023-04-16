const express = require('express');
const bodyParser = require('body-parser')
const { create: handlebars } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {auth} = require('../middleware/authMiddleware')
 
module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs',
    }).engine);

    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use('/img', express.static('img'));
    app.use(cookieParser());
    app.use(auth)

}