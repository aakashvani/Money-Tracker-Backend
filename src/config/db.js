require('dotenv').config()


const mongoose=require('mongoose');

const connect = async()=>{
    try {
        // console.log(process.env.MONGODB_URI,"connect")
    return await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = connect;