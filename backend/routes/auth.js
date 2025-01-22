const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authenticationController'); 
const router = express.Router();

// Signup route
router.post('/register', [
    body('name')
        .trim()
        .not()
        .isEmpty(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('contact')
        .trim()
        .isLength({ min: 10})
        .withMessage('Please provide a valid contact'),
    body('password')
        .trim()
        .isLength({ min: 6 }),
    body('userType')
        .trim()
        .isIn(['restaurant', 'customer']),
], authController.signup);

// Login route
router.post('/login', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .trim()
        .not()
        .isEmpty(),
], authController.login);

module.exports = router;
