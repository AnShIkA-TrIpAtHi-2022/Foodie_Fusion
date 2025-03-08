const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

router.put('/update', authenticate, cartController.updateCartItemQuantity);
// router.get('/total', authenticate, cartController.calculateCartTotals);
router.delete('/:id/remove', authenticate, cartController.removeItemFromCart);

module.exports = router;