import mongoose from "mongoose"
import dotenv from "dotenv"
import app from "./app.js"
import constants from "./constants.js"
const {DB_NAME} = constants;
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})
//start server here
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000),()=>{
        console.log(`Server is running at port : ${process.env.PORT}`

    )};
})
.catch((err)=>{
    console.log("MongoDB connection failed !!",err);
})
