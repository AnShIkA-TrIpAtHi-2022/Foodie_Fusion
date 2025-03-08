const foodService = require("../services/food.service.js");
const restaurantService = require("../services/restaurant.service.js");
const userService = require("../services/user.service.js");

module.exports = {
    // Customer Controller
    searchFood: async (req, res) => {
        try {
            const { name } = req.query;
            const menuItems = await foodService.searchFood(name);
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getMenuItemByRestaurantId: async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { vegetarian, seasonal, nonveg, food_category } = req.query;
            const menuItems = await foodService.getRestaurantsFood(
                restaurantId, vegetarian, seasonal, nonveg, food_category
            );
            res.status(200).json(menuItems);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    // Admin Controller
    createItem: async (req, res) => {
        try {
            const item = req.body;
            const restaurant = await restaurantService.findRestaurantById(
                item.restaurantId
            );
            const menuItem = await foodService.createFood(item, restaurant);
            res.status(200).json(menuItem);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            await foodService.deleteFood(id);
            res.status(200).json({ message: "Menu item deleted" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    updateAvailabilityStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const menuItem = await foodService.updateAvailabilityStatus(id);
            res.status(200).json(menuItem);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },
};
