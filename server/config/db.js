const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("db is connected");
}

module.exports = connectDB;