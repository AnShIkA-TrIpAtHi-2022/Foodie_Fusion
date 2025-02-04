const mongoose = require('mongoose')

const { Schema, Types } = mongoose;

const RestaurantSchema = new Schema({
    id:{
        type:Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    menu:{
        type:Types.ObjectId,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    },
    contact:{
        phone:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    

    
})

module.exports = mongoose.model('restaurants', RestaurantSchema);