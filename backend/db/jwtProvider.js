
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret"; 

if (!SECRET_KEY) {
    throw new Error("JWT Secret Key is missing! Set JWT_SECRET in your .env file.");
}

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" }); 
};

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        throw new Error("Invalid or expired token"); 
    }
};

module.exports = {
    generateToken,
    getUserIdFromToken
};
