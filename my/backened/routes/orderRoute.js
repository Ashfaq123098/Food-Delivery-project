
// routes/orderRoute.js
import express from "express";
import { 
  placeOrder, 
  verifyOrder, 
  userOrders, 
  listOrders, 
  updateStatus 
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js"; 

const orderRoute = express.Router();

// Place order (requires login)
orderRoute.post("/place", authMiddleware, placeOrder);

// SSLCommerz payment callback (success, fail, cancel, ipn)
orderRoute.post("/verify", verifyOrder);

// Get logged-in user’s orders
orderRoute.post("/user-orders", authMiddleware, userOrders);

// Admin: get all orders
orderRoute.get("/list", listOrders);

// Admin: update status
orderRoute.post("/status", updateStatus);

export default orderRoute;
