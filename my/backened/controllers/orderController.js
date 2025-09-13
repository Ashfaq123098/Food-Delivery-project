// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";

const placeOrder = async (req, res) => {
  try {
    // ✅ Get authenticated user ID from JWT, if exists
    const userId = req.user?.id; // undefined/null for guests

    // ✅ Validate request body
    const { items, amount, address, paymentMethod } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items must be a non-empty array" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number" });
    }

    if (!address || typeof address !== "object") {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    // ✅ Validate payment method
    const validPaymentMethods = ["Cash on Delivery", "Bkash", "Nagad"];
    const orderPaymentMethod = validPaymentMethods.includes(paymentMethod)
      ? paymentMethod
      : "Cash on Delivery";

    // ✅ Create the new order
    const newOrder = new orderModel({
      userId: userId || null,  // null for guest
      items,
      amount,
      address,
      paymentMethod: orderPaymentMethod,
      status: "Pending",
      paymentConfirmed: orderPaymentMethod === "Cash on Delivery" ? false : true
    });

    await newOrder.save();

    // ✅ Clear user cart only if logged in
    if (userId) {
      const user = await userModel.findById(userId);
      if (user && user.cartData) {
        user.cartData = {};
        await user.save();
      }
    }

    // ✅ Send success response
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export { placeOrder };
