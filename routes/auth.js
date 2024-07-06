const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const {registerControl , loginControl, logoutController, refetchUserController}= require('../controller/authController');

 


router.post("/register" , registerControl);
router.post("/login" , loginControl);
router.get('/logout' , logoutController);
router.get("/fetch" , refetchUserController);

module.exports = router;

 