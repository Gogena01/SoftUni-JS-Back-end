const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bookReview: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stars: {
        type: String,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    wishListing: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

bookSchema.method('getWishlisted', function () {
    return this.wishListing.map(x => x._id);
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
