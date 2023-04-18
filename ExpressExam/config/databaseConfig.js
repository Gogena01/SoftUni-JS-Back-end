const mongoose = require('mongoose');
const {DB_Connection_String} = require('../constants')

function dataBaseInit() {
    return mongoose.connect(DB_Connection_String)
}


module.exports = dataBaseInit