const mongoose=require('mongoose');
const { Schema } = mongoose;
const MenuSchema=new Schema({

    id:{
        type:ObjectId,
        required:true
    },
    restaurantId:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Menu',MenuSchema);