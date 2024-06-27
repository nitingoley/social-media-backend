const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captions: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
     type: mongoose.Schema.Types.ObjectId,
          ref: "User"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
          ref: 'Comm'
    }
},{timestamps:true})

const PostModel = mongoose.model('PostVibe', postSchema);

module.exports = PostModel;