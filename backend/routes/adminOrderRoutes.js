const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController.js")
const authenticate = require("../middleware/authenticate.js");


router.delete('/:orderId', authenticate, orderController.deleteOrder);
router.get('/restaurant/:restaurantId',authenticate, orderController.getAllRestaurantOrders);
router.put('/:orderId/:orderStatus',authenticate, orderController.updateOrder);

module.exports = router;
