const orderService = require("../services/order.service.js");
const userService = require("../services/user.service.js");

module.exports = {
    // Customer order controllers
    createOrder: async (req, res) => {
        try {
            const order = req.body;
            const user = req.user;
            
            const paymentResponse = await orderService.createOrder(order, user);
            res.status(200).json(paymentResponse);
        } catch (error) {
            res.status(error instanceof Error ? 400 : 500).json({
                message: error instanceof Error ? error.message : "Internal Server Error",
            });
        }
    },

    getAllUserOrders: async (req, res) => {
        try {
            const user = req.user;
            const userOrders = await orderService.getUserOrders(user._id);
            res.status(200).json(userOrders);
        } catch (error) {
            res.status(error instanceof Error ? 400 : 500).json({
                message: error instanceof Error ? error.message : "Internal Server Error",
            });
        }
    },

    // Admin order controllers
    deleteOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            await orderService.cancelOrder(orderId);
            res.status(200).json({ message: `Order deleted with ID ${orderId}` });
        } catch (error) {
            res.status(error instanceof Error ? 400 : 500).json({
                message: error instanceof Error ? error.message : "Internal Server Error",
            });
        }
    },

    getAllRestaurantOrders: async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const { order_status } = req.query;
            const orders = await orderService.getOrdersOfRestaurant(restaurantId, order_status);
            res.status(200).json(orders);
        } catch (error) {
            res.status(error instanceof Error ? 400 : 500).json({
                message: error instanceof Error ? error.message : "Internal Server Error",
            });
        }
    },

    updateOrder: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { orderStatus } = req.body;

            const order = await orderService.updateOrder(orderId, orderStatus);
            res.status(200).json(order);
        } catch (error) {
            res.status(error instanceof Error ? 400 : 500).json({
                message: error instanceof Error ? error.message : "Internal Server Error",
            });
        }
    },
};
