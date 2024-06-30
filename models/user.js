const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
    
    },
    password: {
        type: String,
      
    },
    fullName: {
        type: String,
       
    },
    bio: {
        type: String,
       
    },
    profile: {
        type: String,
        default: ''
    },
    coverPhoto: {
        type: String,
        default: ''
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    blockList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
},{timestamps:true})


const UserModel = mongoose.model('User-Data', userSchema);

module.exports = UserModel;








