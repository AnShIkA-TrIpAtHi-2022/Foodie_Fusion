const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    id:{
        type:ObjectId,
        required:true
    },
    userId:{
        type:ObjectId,
        required:true
    },
    restaurantId:{
        type:ObjectId,
        required:true
    },
    items:[{
        menuId:{
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
        },

    }],

    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    paymentId:{
        type:ObjectId,
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    deliveryDate:{
        type:Date,
        default:Date.now
    }

    
})

module.exports = mongoose.model('order', OrderSchema);