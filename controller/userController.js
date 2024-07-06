const User = require('../models/user');
const {CustomError} = require('../middleware/error')



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








module.exports =   getUserController;
module.exports = updateUserController;
module.exports = FollowUser;
