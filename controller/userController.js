const User = require('../models/user');
const {CustomError} = require('../middleware/error')
const Post = require('../models/post');
const comment = require('../models/comment');
const story = require('../models/story');


const getUserController = async(req  , res, next)=>{
    const {userId} = req.params

    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new CustomError('User not found');
        }

        const{password, ...data}= user
        res.status(200).json(data._doc);
    } catch (error) {
        
        next(error);
    }
}

const updateUserController = async(req , res , next)=>{
    const {userId}=req.params
    const updateData=req.body
    try{

        const userToUpdate=await User.findById(userId)
        if(!userToUpdate){
            throw new CustomError("User not found!",404)
        }

        Object.assign(userToUpdate,updateData)

        await userToUpdate.save()

        res.status(200).json({message:"User updated successfully!",user:userToUpdate})

    }
    catch(error){
        next(error)
    }
}


// Follow User 

const FollowUser =  async(req , res , next)=>{
    const {userId}=req.params
    const {_id}=req.body

    try{
        if(userId===_id){
            throw new CustomError("You can not follow yourself",500)
        }

        const userToFollow=await User.findById(userId)
        const loggedInUser=await User.findById(_id)


        if(!userToFollow || !loggedInUser){
            throw new CustomError("User not found!",404)
        }

        if(loggedInUser.following.includes(userId)){
            throw new CustomError("Already following this user!",400)
        }

        loggedInUser.following.push(userId)
        userToFollow.followers.push(_id)

        await loggedInUser.save()
        await userToFollow.save()

        res.status(200).json({message:"Successfully followed user!"})

} catch (error) {
  next(error);   
}

} 


// for unfollow user

const unfollow = async(req , res , next)=>{
    const{userId} = req.params
    const {_id} = req.body

    try {
        if(userId == _id){
            throw new CustomError("You can not follow this user")
        }
        const userToUnFollow = await User.findById(userId)
       const loggedInUser = await User.findById(_id);

       if(!userToUnFollow || !loggedInUser){
        throw new CustomError("User not found");
       }

       if(!loggedInUser.following.includes(userId)){
        throw new CustomError('Not reached out' , 404)
       }

        loggedInUser.following = loggedInUser.following.filter(id=>id.toString()!==userId);
        userToUnFollow.followers = userToUnFollow.followers.filter(id=> id.toString()!==_id)
  
         await loggedInUser.save();
         await userToUnFollow.save();
         res.status(200).json({message: "Sucessfully unfollowed user !"})
    } catch (error) {
       next();        
    }
}



// block user 

const blockUser  = async(req , res, next)=>{
 const {userId} = req.params
 const {_id} = req.body

 try {
    if(userId === _id){
        throw new CustomError("You cam not block user" , 500);
    }

    const userToBlock = await User.findById(userId)
    const loggedInUser = await User.findById(_id);

    if(!userToBlock || !loggedInUser){
        throw new CustomError('Not found user' ,400)
    }

    if(loggedInUser.blockList.includes(userId)) {
        throw new CustomError('This user is already blocked', 400)
    }
    loggedInUser.blockList.push(userId);

    loggedInUser.following = loggedInUser.following.filter(id=> id.toString()!==userId)
    userToBlock.followers = userToBlock.followers.filter(id => id.toString()!==_id);

    await loggedInUser.save();
    await userToBlock.save();

    res.status(200).json({message: 'Sucessfully blocked user'});
 } catch (error) {
    next(error);
    
 }
}


// unblock user 

const unblockUser = async(req , res , next)=>{
    const {userId} = req.params
    const {_id} = req.body;        
        try{
            if(userId===_id){
                throw new CustomError("You can not unblock yourself",500)
            }
    
            const userToUnblock=await User.findById(userId)
            const loggedInUser=await User.findById(_id)
    
            if(!userToUnblock || !loggedInUser){
                throw new CustomError("User not found!",404)
            }
    
            if(!loggedInUser.blockList.includes(userId)){
                throw new CustomError("Not blocking is user!",400)
            }
    
            loggedInUser.blockList=loggedInUser.blockList.filter(id=>id.toString()!=userId)
    
            await loggedInUser.save()
            
            res.status(200).json({message:"Successfully unblocked user!"})
    
        
    } catch (error) {
        next(error);
    }
}



// get block user list 


const blockList = async(req , res , next)=>{
    const {userId} = req.params

    try {
       const user  = await User.findById(userId).populate("blockList" , "username fullName profilePicture");
       if(!user){
        throw new CustomError('User not found' , 404);
       }

       const {blockList,...data}= user;
           res.status(200).json(blockList);
    } catch (error) {
        next(error);
    }
}


// delete user sucessfully 

const deleteUserController = async(req  , res , next)=>{

    const {userId} = req.params;

    try {
        const userToDelete = await User.findById(userId);

        if(!userToDelete){
          throw new CustomError('User not found');
        }

        await Post.deleteMany({user:userId})
        await Post.deleteMany({"comments.user": userId});
        await Post.deleteMany({'comments.replies.user': userId});
        await comment.deleteMany({user:userId});
        await story.deleteMany({user:userId});
        await Post.updateMany({likes: userId}, {$pull:{likes:userId}})
        await User.updateMany(
            {_id:{$in:userToDelete.following}},
            {$pull:{followers:userId}})
        await comment.updateMany({},{$pull:{likes:userId}})    
        await comment.updateMany({'replies.likes': userId},{$pull:{"replies.likes":userId}});
        await Post.updateMany({}, {$pull: {likes:userId}})

        const replyComment = await comment.find({'replies.user': userId})

        await Promise.all(
            replyComment.map(async(comment)=>{
                comment.replies = comment.replies.filter((reply)=>reply.user.toString()!=userId)
                await  comment.save();s
            })
        )

        await userToDelete.deleteOne()
        res.status(200).json({message: 'Everything fine user associated with system'})

    } catch (error) {
        next(error);
    }
}



const serachController = async (req, res , next)=>{
    const {query} = req.params
  try {
    const users = await User.find({
        $or:[
            {username: {$regx:new RegExp(query, 'n')}},
            {fullName: {$regx:new RegExp(query , 'n')}}
        ]
    })
    res.status(200).json({users});
  } catch (error) {
    next(error); 
  }
}


// generate profile photo link download

const generateFile = (filename)=>{
    return process.env.URL+ `/uploads/${filename}`
}



// upload profile picture 

const uploadProfilePictureController=async(req,res,next)=>{
    const {userId}=req.params
    const filename=req.file
    try{
        const user=await User.findByIdAndUpdate(userId,{profile:generateFile(filename)},{new:true})
        if(!user){
            throw new CustomError("User not found!",404)
        }

        res.status(200).json({message:"Profile picture updated successfully!",user})

    }
    catch(error){
        next(error)
    }
}


// cover photo  upload 

const coverPicture = async(req, res , next)=>{
  const {userId} = req.params
  const {filename} = req.file
  try {
    const user = await User.findByIdAndUpdate(userId , {coverPhoto: generateFile(filename)}, {new:true});

    if(!user){
        throw new CustomError('User not found' , 404)
    }
    res.status(200).json({message: 'Cover photo sucessfully uploaded', user});
  } catch (error) {
    next(error);
  }
}




module.exports =   getUserController;
module.exports = updateUserController;
module.exports = FollowUser;
module.exports = unfollow;
module.exports = blockUser;
module.exports = unblockUser;
module.exports = blockList;
module.exports = deleteUserController;
module.exports = serachController;
module.exports = uploadProfilePictureController;
module.exports = coverPicture;