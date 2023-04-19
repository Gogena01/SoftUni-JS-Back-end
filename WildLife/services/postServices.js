const Post = require('../models/Post');
const User = require('../models/User')


exports.create = (postData) => Post.create(postData);


exports.getAll = () => Post.find().lean()

exports.getOne = (postId) => Post.findById(postId);

exports.findAuthor = (ownerId) => User.findById(ownerId);


exports.update = (postId, postData) => Post.findByIdAndUpdate(postId,postData);

exports.myPosts = (userId) => Post.find({author:userId}).lean();

exports.voters = async (postId) => {
    let post = await Post.findById(postId);

    let users = await User.find({ _id: { $in: post.votes } }).lean();

    return users;
}