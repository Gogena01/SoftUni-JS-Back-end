const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    }
    
})

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;
            return next()
        })

});


userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password)
});


const User = mongoose.model('User', userSchema);

module.exports = User;