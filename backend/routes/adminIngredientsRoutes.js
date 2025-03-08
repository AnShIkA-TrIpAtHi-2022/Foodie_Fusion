const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredientController');
const authenticate = require('../middleware/authenticate');

router.post('/category', authenticate, ingredientsController.createIngredientCategory);
router.post('', authenticate, ingredientsController.createIngredient);
router.put('/:id/stock', authenticate, ingredientsController.updateStock);
router.get('/restaurant/:id', ingredientsController.restaurantsIngredient);
router.get('/restaurant/:id/category', ingredientsController.restaurantsIngredientCategory);

module.exports = router;