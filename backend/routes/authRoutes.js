const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController.js'); 
const router = express.Router();

router.post("/signup", authController.register)
router.post("/signin", authController.login)

module.exports = router;
