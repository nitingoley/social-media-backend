const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const updateUserController = require('../controller/userController');
const FollowUser = require('../controller/userController');
const unfollow = require('../controller/userController');
const blockUser = require('../controller/userController');
const unblock = require('../controller/userController');
const blocklist = require('../controller/userController');

router.get("/:userId",UserController);
router.put("/update/:userId" ,updateUserController);
router.post("/follow/:userId" , FollowUser);
router.post('/unfollow/:userId' , unfollow);
router.post('/block/:userId', blockUser);
router.post('/unblock/:userId', unblock);
router.get("/blocked/:userId", blocklist);



 module.exports  = router;