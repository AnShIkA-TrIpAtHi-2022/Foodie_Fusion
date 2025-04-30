const  mongoose = require('mongoose');

// const mongodbURI = "mongodb+srv://Team_FoodieFusion:tbppp@cluster0.zm1zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongodbURI = "mongodb://localhost:27017/Foodie_FusionDB"
async function connectDB(){
    return mongoose.connect(mongodbURI)
}

module.exports = connectDB
