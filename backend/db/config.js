const  mongoose = require('mongoose');
const dotenv = require('dotenv');
const {DB_NAME, mongoDBID} = require('./constants.js');

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = mongoDBID;
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in the .env file");
        }

        console.log(
            "\nMongoDB connected!"
        );
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
