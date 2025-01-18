const mongoose = require('mongoose')

const { Schema } = mongoose;

const PaymentSchema = new Schema({
    id:{
        type:ObjectId,
        required:true
    },
    orderid:{
        type:ObjectId,
        required:true
    },
    userid:{
        type:ObjectId,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now

    }
    
})

module.exports = mongoose.model('payments', PaymentSchema);