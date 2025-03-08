const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/restaurant/:restaurantId', eventController.createEvents);
router.get("/restaurant/:restaurandId", eventController.findRestaurantEvents);
router.delete("/admin/events/:id", eventController.deleteEvents);

module.exports = router;
