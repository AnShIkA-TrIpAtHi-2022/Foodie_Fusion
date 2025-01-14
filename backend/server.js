const dotenv = require('dotenv');
const app = require('./app.js');
const connectDB = require('./db/config.js');
const express = require('express');
const path = require('path');
const {DB_NAME, mongoDBID, PORT} = require('./db/constants.js');
// const app = express();


dotenv.config({
    path: './env'
})
connectDB()
.then(()=>{
    app.listen((PORT || 4000),()=>{
        console.log(`Server is running at port : ${PORT}`)
        app.use(express.static(path.join(__dirname, '../frontend/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
        });


    });
})
.catch((err)=>{
    console.log("MongoDB connection failed !!",err);
})
