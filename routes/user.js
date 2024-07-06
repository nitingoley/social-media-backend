const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const updateUserController = require('../controller/userController')
const FollowUser = require('../controller/userController')

router.get("/:userId",UserController)
router.put("/update/:userId" ,updateUserController);

router.post("/follow/:userId" , FollowUser)
 module.exports  = router;