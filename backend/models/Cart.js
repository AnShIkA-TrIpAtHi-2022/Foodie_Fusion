const mongoose=require('mongoose');
const { Schema } = mongoose;
const CartSchema=new Schema({

    id:{
        type:ObjectId,
        required:true
    },
    userId:{
        type:ObjectId,
        required:true
    },
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
                type:number,
                required:true
            },
            menuId:{
                type:number,
                required:true
            },

        }
    ],
    totalAmount:{
        type:number,
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

module.exports=mongoose.model('cart',CartSchema);