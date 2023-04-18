const express = require('express');
const bodyParser = require('body-parser')
const { create: handlebars } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { auth } = require('../middleware/authMiddleware')

module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs',
    }).engine);

    app.set('view engine', '.hbs');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/css', express.static('css'));
    app.use('/image', express.static('image'))
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(auth)
    //app.use(auth);

    app.use(express.urlencoded({ extended: true }))
}