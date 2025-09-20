// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  // tran_id removed ✅
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" }, // Pending by default
  paymentConfirmed: { type: Boolean, default: false },
  paymentInfo: {
    val_id: String,
    amount: Number,
    currency: String,
    paidAt: Date,
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
