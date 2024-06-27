const mongoose = require('mongoose');

const message = new mongoose.Schema({
    conversationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversion',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text : {
        type: String ,
        required: true
    },
} , {timestamps:true});


const messages = mongoose.model('message' , message);

module.exports = messages;