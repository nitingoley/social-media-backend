const jwt = require('jsonwebtoken');

const {CustomError} = require('./error');


const verify = (req , res , next)=>{
    const token = req.cookies.token

    if(!token){
        throw new CustomError("You are not authenicated")
    }
    jwt.verify(token ,process.env.JWT_SECRET , async(err , data)=>{
        if(err){
            throw new CustomError("Token is not vaild " , 403);
        }
        req.userId = data._id
        next();
    })
};


module.exports = verify;