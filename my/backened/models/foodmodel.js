import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
   // Change to required: false
  category: { type: String, required: true },
  image: { type: String, required: false },
});

const foodmodel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default foodmodel;