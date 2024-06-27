const mongoose = require('mongoose');



const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
          console.log('DB is connected');
    } catch (error) {
        
        console.log('DB is not connected' , error);
    }
}

module.exports = connectDB;