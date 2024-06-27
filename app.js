const express = require('express');
const dotenv = require('dotenv');
const app  = express();
const mongoose = require('mongoose');
const PostModel = require('./models/post.js');
const story = require('./models/message.js');
const message = require('./models/conversion.js');
const comments = require('./models/comment.js');
dotenv.config();
const connectDB = require('./config/db.js');
const userModel = require('./models/user.js');
app.get('/' , (req ,res)=>{
    res.json('Working json file');
})


const posts =  [
    {id: 1 , title: 'Developer' , content: 'Hello namste dosto'},
    {id: 2 , title : 'Database Developer' , content: 'Gangester'}
]







app.get('/post/:id' , (req ,res)=>{
 const postId = parseInt.apply(req.params.id);
 const post = posts.find((p)=>p.id===postId);

  if(!post) {
    return res.status(400).json({error : 'Post not found'})
  }
 
    res.json(post)
});


// want specific person  
 app.get('/post', (req ,res)=>{
    res.json(posts);
 })


// middleware setup 






// db connection 
 connectDB();


app.listen(process.env.PORT , ()=>{
    console.log(`The server running on the ${process.env.PORT}`);
})