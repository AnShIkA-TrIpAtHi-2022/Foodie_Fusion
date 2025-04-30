const { generateToken } = require("../db/jwtProvider");
const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        console.log("Registering user:", req.body); // Debugging
        const user = await userService.createUser(req.body);
        const jwt = generateToken(user._id);
        console.log("Generated token for user:", jwt); // Debugging
        return res.status(201).send({ jwt, message: "Register success", user });
    } catch (error) {
        console.error("Error during registration:", error.message); // Debugging
        return res.status(500).send({ error: error.message });
    }
};

const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        console.log("Login attempt for email:", email); // Debugging
        if (!email || !password) {
            console.error("Email or password missing"); // Debugging
            return res.status(400).send({ error: "Email and password are required" });
        }
        const user = await userService.getUserByEmail(email);
        console.log("User found:", user); // Debugging
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Invalid password"); // Debugging
            return res.status(401).send({ message: "Invalid Password" });
        }

        const jwt = generateToken(user._id);
        console.log("Generated token for login:", jwt); // Debugging
        return res.status(200).send({ jwt, message: "Login success" });
    } catch (error) {
        console.error("Error during login:", error.message); // Debugging
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    register,
    login,
};