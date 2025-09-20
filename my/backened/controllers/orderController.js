// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.STORE_ID || "foodd68ccfdab652b5";
const store_passwd = process.env.STORE_PASSWD || "foodd68ccfdab652b5@ssl";
const is_live = false; // true = production, false = sandbox

// ---------------------------
// Place a new order
// ---------------------------
const placeOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { items, amount, address } = req.body;

    // Validation
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items must be a non-empty array" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Amount must be a positive number" });
    }
    if (!address || typeof address !== "object") {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    const requiredFields = [
      "firstName", "lastName", "email", "street", "city", "state", "postcode", "country", "phone"
    ];
    const missing = requiredFields.filter(f => !address[f]);
    if (missing.length > 0) {
      return res.status(400).json({ success: false, message: `Missing fields: ${missing.join(", ")}` });
    }

    // Save order in DB (Pending by default)
    const newOrder = new orderModel({
      userId: userId || null,
      items,
      amount,
      address,
      paymentMethod: "SSLCommerz",
      status: "Pending",
      paymentConfirmed: false,
    });
    await newOrder.save();

    // Clear cart if logged in
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }

    // SSLCommerz payload
    const fullName = `${address.firstName} ${address.lastName}`;
    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: newOrder._id.toString(),
      success_url: "http://localhost:4000/api/order/verify",  // ✅ SSLCommerz will POST here
      fail_url: "http://localhost:4000/api/order/verify",
      cancel_url: "http://localhost:4000/api/order/verify",
      ipn_url: "http://localhost:4000/api/order/verify",      // instant payment notification
      product_name: "Food Order",
      product_category: "Food",
      product_profile: "general",
      cus_name: fullName,
      cus_email: address.email,
      cus_add1: address.street,
      cus_city: address.city,
      cus_state: address.state,
      cus_postcode: address.postcode,
      cus_country: address.country,
      cus_phone: address.phone,
      shipping_method: "NO",
    };

    // Create payment session
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    if (apiResponse?.GatewayPageURL) {
      return res.status(200).json({
        success: true,
        message: "Order placed successfully. Redirect to payment.",
        url: apiResponse.GatewayPageURL,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment session creation failed",
        response: apiResponse,
      });
    }

  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ---------------------------
// Verify SSLCommerz callback
// ---------------------------
const verifyOrder = async (req, res) => {
  try {
    const { status, tran_id } = req.body;

    if (!tran_id) {
      return res.status(400).json({ success: false, message: "Missing transaction ID" });
    }

    if (status === "VALID" || status === "SUCCESS") {
      await orderModel.findByIdAndUpdate(tran_id, {
        paymentConfirmed: true,
        status: "Paid",
      });
      return res.redirect("http://localhost:3000/success"); // redirect frontend
    } else if (status === "FAILED" || status === "CANCELLED") {
      await orderModel.findByIdAndUpdate(tran_id, { status: "Failed" });
      return res.redirect("http://localhost:3000/fail");
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment status", data: req.body });
    }
  } catch (error) {
    console.error("Order verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// ---------------------------
// User's orders
// ---------------------------
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// ---------------------------
// Admin: list all orders
// ---------------------------
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// ---------------------------
// Admin: update order status
// ---------------------------
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
