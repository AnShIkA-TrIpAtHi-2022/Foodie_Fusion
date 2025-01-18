const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bycrypt = require('bycryptjs');
const Restaurant = require('../model/restaurant');
const Customer = require('../model/customer');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

//Restaurant Signup
exports.signupRestaurant = async(req,res)=>{
    const{ phoneNumber, password, name, address } = req.body;

    try{
        const existingRestaurant = await Restaurant.findOne({phoneNumber});
        if(existingRestaurant){
            throw new ApiError(400, "Restaurant already registered with this phone number!")
        }
        const hashedPw = await bycrypt.hash(password,12);
        const createRestaurant = new Restaurant({ phoneNumber, password:hashedPw, name, address});
        await createRestaurant.save();

        return res.status(201).json(
            new ApiResponse(200, createRestaurant, "User Registered Successfully")
        )
    }
    catch(err){
        throw new ApiError(500, "Server Error");
    }
};

//Customer signup

exports.signupCustomer = async(req, res)=>{
    const {phoneNumber, password, name, address} = req.body;

    try{
        const existingCustomer = await Customer.findOne({phoneNumber});
        if(existingCustomer){
            throw new ApiError(400, "User already registered with this phone number!")
        }
        const hashedPw = await bycrypt.hash(password,12);
        const createCustomer = new Customer({phoneNumber, password:hashedPw, name, address});
        await createCustomer.save();

        return res.status(201).json(
            new ApiResponse(200, createRestaurant, "User Registered Successfully")
        )
    }
    catch(err){
        throw new ApiError(500, "Server Error");
    }
}

//Restaurant login

exports.loginRestaurant = async(req, res)=>{
    const { phoneNumber, password } = req.body;
    try{
        const restaurant = await Restaurant.findOne({phoneNumber});
        if(!farmer || !(await bycrypt.compare(password, farmer.password))){
            throw new ApiError(401,"Invalid Credentials")
        }
        const token = jwt.sign({id: restaurant._id, role: 'restaurant'}, process.env.JWT_SECRETKEY, {expiresIn:'1d'});
        res.json({token});
    }
    catch(err){
        throw new ApiError(500,"Server Error");
    }
}

//Customer login
exports.loginCustomer = async(req, res)=>{
    const { phoneNumber, password} = req.body;
    try{
        const customer = await Customer.findOne({phoneNumber});
        if(!customer || !(await bycrypt.compare(password, customer.password))){
            throw new ApiError(401,"Invalid Credentials");
        }
        const token = jwt.sign({id: customer._id, role:'customer'}, process.env.JWT_SECRETKEY, {expiresIn : '1d'});
        res.json({token});
    }
    catch(err){
        throw new ApiError(401,"Server Error");
    }
}