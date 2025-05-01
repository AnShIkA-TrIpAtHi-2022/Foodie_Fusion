import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import adminModel from "../models/adminModel.js";

const createToken = (id) => {
    return jwt.sign({id, role: 'admin'}, process.env.JWT_SECRET);
}

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await adminModel.findOne({email})

        if(!admin) {
            return res.json({success: false, message: "Admin not found"})
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(!isMatch) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        const token = createToken(admin._id)
        res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in admin login"})
    }
}

const registerAdmin = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Check if admin already exists
        const exists = await adminModel.findOne({email})
        if(exists) {
            return res.json({success: false, message: "Admin already exists"})
        }

        // Validate email and password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new admin
        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword
        })

        const admin = await newAdmin.save()
        const token = createToken(admin._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in admin registration"})
    }
}

export { loginAdmin, registerAdmin }