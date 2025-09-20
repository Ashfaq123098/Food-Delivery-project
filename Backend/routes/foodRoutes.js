// routes/foodRoutes.js
import express from "express";
import Food from "../models/foodModel.js";

const router = express.Router();

// GET /api/food/list
router.get("/list", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json({ success: true, data: foods });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
