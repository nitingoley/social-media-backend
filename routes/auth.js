const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const {registerControl , loginControl}= require('../controller/authController');

 


router.post("/register" , registerControl);
router.post("/login" , loginControl);



module.exports = router;

 