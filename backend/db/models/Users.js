const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    id:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
                menuId:{
                    type:ObjectId,
                    required:true
                },
                restaurantId:{
                    type:ObjectId,
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                }

            }
        ],
        totalAmount:{
            type:Number,
            required:true
        },
        updatedAt:{
            type:Date,
            default:Date.now
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

  });

<<<<<<< HEAD
  module.exports = mongoose.model('user',UserSchema);
=======
  module.exports = mongoose.model('user',UserSchema);
>>>>>>> 31178bbe985dc8d9694d53d0c46448c5a783c281
