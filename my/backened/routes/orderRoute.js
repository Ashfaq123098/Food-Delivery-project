import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js"; // now optional

const orderRouter = express.Router();

// Works for both logged-in users and guests
orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
