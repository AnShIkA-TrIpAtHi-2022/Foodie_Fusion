import express from 'express';
import authMiddleware from '../middleware/authUser.js';
import { listOrders, userOrders, placeOrder, placeOrderCod } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.get("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.post("/placecod",authMiddleware, placeOrderCod);

export default orderRouter;
