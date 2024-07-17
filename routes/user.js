const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const updateUserController = require('../controller/userController');
const FollowUser = require('../controller/userController');
const unfollow = require('../controller/userController');
const blockUser = require('../controller/userController');
const unblock = require('../controller/userController');
const blocklist = require('../controller/userController');
const deleteUserController = require('../controller/userController')
const serachController = require('../controller/userController');
const uploadProfilePictureController = require('../controller/userController');
const upload = require('../middleware/upload')
const coverPicture = require('../controller/userController')


// routes define 

router.get("/:userId",UserController);
router.put("/update/:userId" ,updateUserController);
router.post("/follow/:userId" , FollowUser);
router.post('/unfollow/:userId' , unfollow);
router.post('/block/:userId', blockUser);
router.post('/unblock/:userId', unblock);
router.get("/blocked/:userId", blocklist);
router.delete('/delete/:userId',deleteUserController);
router.get('/search' , serachController);
router.put("/update-profile/:userId",upload.single("profile"),uploadProfilePictureController);
router.put("/cover-profile/:userId",upload.single("coverPhoto"), coverPicture);


module.exports  = router;