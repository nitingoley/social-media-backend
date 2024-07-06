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
 const authRouth =  require('./routes/auth.js');
const cookieParser = require("cookie-parser");

 const userCon = require('./routes/user.js');
const verifyToken = require('./middleware/verifytoken.js')




app.use(express.json());
// app.use(express.urlencoded())ap

app.use(cookieParser());

app.use("/api/auth" , authRouth);


app.use('/api/user', userCon);

 

// middleware setup 






// db connection 
 connectDB();


app.listen(process.env.PORT , ()=>{
    console.log(`The server running on the ${process.env.PORT}`);
})