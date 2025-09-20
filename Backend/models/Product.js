import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  category: String,
  description: String,
  image: String,
  status: { type: String, default: "active" } 
});

export default mongoose.model("Product", productSchema);



