const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const Restaurant = require('../db/models/Restaurants');
const Customer = require('../db/models/Users');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

dotenv.config({ path: './env' });

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRETKEY, { expiresIn: '1d' });
};
 
// Signup Controller
exports.signup = async (req, res, next) => {
  const { name, email, contact, password, userType } = req.body;
  console.log(req.body);

  try {
    const Model = userType === 'restaurant' ? Restaurant : Customer;
    console.log(Model);

    const existingUser = await Model.findOne({ contact });
    console.log("Existing = " + existingUser);
    if (existingUser) {
      throw new ApiError(400, `${userType} already registered with this phone number!`);
    }

    // Create user
    const newUser = new Model({ name, email, contact, password, userType });
    await newUser.save();

    return res.status(201).json(
      new ApiResponse(200, newUser, `${userType} registered successfully!`)
    );
  } catch (err) {
    next(new ApiError(500, "Server Error"));
  }
};

// Login Controller
exports.login = async (req, res, next) => {
  const { email, password, userType } = req.body;

  try {
    const Model = userType === 'restaurant' ? Restaurant : Customer;

    // Find user
    const user = await Model.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate token
    const token = generateToken(user._id, userType);

    return res.json(
      new ApiResponse(200, { token }, `${userType} logged in successfully!`)
    );
  } catch (err) {
    next(new ApiError(401, "Server Error"));
  }
};
