const Book = require('../models/Book');
const User = require('../models/User')


exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find().lean();

exports.findOne = (bookId) => Book.findById(bookId).populate('wishListing');

exports.update = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);


exports.getMyWishBook = (userId) => Book.find({ wishListing: userId}).lean();


