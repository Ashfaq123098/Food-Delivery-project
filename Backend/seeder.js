import mongoose from "mongoose";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import Food from "./models/foodModel.js";

// Connect to MongoDB
connectDB();

const foods = [
  { name: "Pizza", price: 250, category: "Pizza", image: "bbqpizza.jpeg" },
  { name: "Cake", price: 150, category: "Cake", image: "balck forest cake.jpeg" },
  { name: "polao", price: 100, category: "polao", image: "biriyani.jpg" },
  { name: "noodles", price: 130, category: "noodles", image: "beef noodles.jpg" },
  {name: "Salad", price: 130, category: "Salad", image: "Chicken Salad.jpeg" }

];

const importData = async () => {
  try {
    await Food.deleteMany(); // পুরানো data remove
    await Food.insertMany(foods); // নতুন data insert
    console.log("Food items inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error inserting food items:", error);
    process.exit(1);
  }
};

importData();
