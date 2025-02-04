const  mongoose = require('mongoose');

const mongodbURI = "mongodb+srv://foodiefusion:zf3ewi3pAdkW6B1V@cluster0.nw6ea.mongodb.net/"

async function connectDB(){
    return mongoose.connect(mongodbURI)
}

module.exports = connectDB
