import express from "express";
import { requireSignIn } from "../middleware/auth.middleware.js";
import { getOrderController, placeOrderController, updateOrderController } from "../controllers/order.controller.js";

// router object 
const router = express.Router();

// Order routes

// getOrder 
router.get('/getOrders' , getOrderController)
// place order
router.post('/placeOrder', requireSignIn, placeOrderController);

// Update order
router.post('/updateOrder', requireSignIn , updateOrderController);

export default router