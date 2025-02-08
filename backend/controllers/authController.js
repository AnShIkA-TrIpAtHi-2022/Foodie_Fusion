const { generateToken } = require("../db/jwtProvider");
const userService = require("../service/userServices");
const bcrypt = require("bcryptjs");

const register = async(req, res)=>{
    try{

        const user = await userService.createUser(req.body);
        const jwt = generateToken(user._id);
        return res.status(201).send({jwt, message:"register success",user})
    }catch(error){
        return res.status(500).send({error:error.message});
    }
}

const login = async (req, res)=>{
    const {password, email} = req.body;
    try{
        if (!email || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }
        const user = await userService.getUserByEmail(email);
        const isPasswordValid = bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).send({message:"Invalid Password"});
        }

        const jwt = generateToken(user._id);
        return res.status(200).send({jwt, message:"login success"})
    }catch(error){
        return res.send(500).send({error:error.message})
    }
}

module.exports={
    register,
    login,
}