import foodmodel from "../models/foodmodel.js";
import fs from "fs";

// Add a new food item
const addfood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Handle image (from multer or fallback)
    let imagePath = "default-image.jpg";
    if (req.file) {
      imagePath = req.file.path; // multer gives path of uploaded file
    }

    const food = new foodmodel({
      name,
      description,
      price: Number(price),
      category,
      image: imagePath,
    });

    await food.save();

    res.status(201).json({ 
      success: true, 
      message: "Food item added successfully",
      data: food 
    });

  } catch (error) {
    console.log("Error adding food item:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error adding food item", 
      error: error.message 
    });
  }
};

// List all food items
const foodlist = async (req, res) => {
  try {
    const foods = await foodmodel.find({});
    res.status(200).json({
      success: true,
      data: foods
    });
  } catch (error) {
    console.log("Error fetching food list:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching food list",
      error: error.message
    });
  }
};

// Remove a food item by ID
const removefood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodmodel.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image file if it exists and is not default
    if (food.image && food.image !== "default-image.jpg") {
      fs.unlink(food.image, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item removed successfully"
    });

  } catch (error) {
    console.log("Error removing food item:", error);
    res.status(500).json({
      success: false,
      message: "Error removing food item",
      error: error.message
    });
  }
};

export { addfood, foodlist, removefood };
