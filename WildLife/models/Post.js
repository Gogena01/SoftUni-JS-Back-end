const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    keyword : {
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    rating: {
        type:Number,
        default:0
    }
});


postSchema.method('getVoters', function () {
    return this.votes.map(x => x._id);
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;