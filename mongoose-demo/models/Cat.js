const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is needed!'],
        minLength: 4
    },
    age: {
        type: Number,
        min: 3,

    },
    breed: String
});


//method
catSchema.methods.greet = function () {
    console.log(`Hello, my name is ${this.name} and meow!`);
}

//Virtual property
catSchema.virtual('info').get(function () {
    return `${this.name} - ${this.age} age, ${this.breed}`
});

//Validation methods
catSchema.path('name').validate(function () {
    return this.name.startsWith('N')
}, 'Name should start with N');

const Cat = mongoose.model('Cat', catSchema)


module.exports = Cat;