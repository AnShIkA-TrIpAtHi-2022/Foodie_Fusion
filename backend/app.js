const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./db/models/Users')


const app = express();
app.use(express.json())
app.use(cors());


app.post("/login", (req, res)=>{
    const { email, password } = req.body;
    UserModel.findOne({email : email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }else {
                res.json("the password is incorrect")
            }
        }else{
            res.json("No record registered")
        }
    })
})

app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
module.exports = app;