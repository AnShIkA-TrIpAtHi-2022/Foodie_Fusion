const express = require('express');
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('', authenticate, orderController.createOrder);
router.get('/user', authenticate, orderController.getAllUserOrders);

module.exports = router;