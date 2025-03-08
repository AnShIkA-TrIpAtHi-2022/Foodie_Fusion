const express = require('express');
const router = express.Router();
const adminRestaurantController = require('../controllers/restaurantController.js');
const authenticate = require("../middleware/authenticate.js");

router.post('/', authenticate, adminRestaurantController.createResturant);
router.delete('/:id', authenticate, adminRestaurantController.deleteRestaurantById);
router.put('/:id/status', authenticate, adminRestaurantController.updateRestaurantStatus);
router.get('/user', authenticate, adminRestaurantController.getAllRestaurants)

module.exports = router;