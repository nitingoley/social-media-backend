const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// for new user register 

const registerControl = async(req , res , next) =>{
    try {
        const {password,username,email}=req.body
        const existingUser = await User.findOne({ $or: [{username},{email}]});
        if(existingUser){
            throw new CustomError("Username or email already exists!",400)
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)
        const newUser=new User({...req.body,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        next(error);
    }
}


// Login if user already register 
 




const loginControl = async (req, res, next) => {
  try {
    let user;

    // Check if email or username is provided in request body
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else if (req.body.username) {
      user = await User.findOne({ username: req.body.username });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // Successful login
    res.status(200).json({ message: 'User logged in successfully', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports =  {registerControl , loginControl};