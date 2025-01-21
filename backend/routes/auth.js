const express = require('express');
const {body} = require('express-validator');
const authController = require('../controllers/auth');
const router = express.Router();

router.put('/signup-Restaurant',[
    body('phoneNumber')
        .trim()
        .isLength({min:10, max:10})
        .isNumeric(),
    body('password')
        .trim()
        .isLength({min:6}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.signupRestaurant);

router.put('/signup-Customer',[
    body('phoneNumber')
        .trim()
        .isLength({min:10, max: 10}),
    body('password')
        .trim()
        .not()
        .isEmpty()
], authController.signupCustomer);

router.post('/login-Restaurant', authController.loginRestaurant);
router.post('/login-Customer', authController.loginCustomer);
module.exports=router;