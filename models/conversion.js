const mongoose = require('mongoose');

const conversation = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
}, {timestamps:true});

let connections = mongoose.model('converstion', conversation);

module.exports = connections;