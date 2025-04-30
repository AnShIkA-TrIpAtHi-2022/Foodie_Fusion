const userService = require("../services/user.service");
const { getUserIdFromToken } = require("../db/jwtProvider");

const authenticate = async (req, res, next) => {
    console.log("Authenticate middleware triggered"); // Debugging
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token received:", token); // Debugging
        if (!token) {
            console.error("No token provided"); // Debugging
            return res.status(401).json({ message: "No token provided" });
        }
        const userId = getUserIdFromToken(token);
        console.log("Token decoded, userId:", userId); // Debugging
        const user = await userService.findUserById(userId);
        if (!user) {
            console.error("User not found for userId:", userId); // Debugging
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        console.log("User attached to request:", user); // Debugging
    } catch (error) {
        console.error("Error in authenticate middleware:", error.message); // Debugging
        return res.status(401).json({ error: error.message });
    }
    next();
};

module.exports = authenticate;