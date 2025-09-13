import express from "express";
import { addfood, foodlist, removefood } from "../controllers/foodController.js";
import multer from "multer";

const foodRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
foodRoute.post("/add", upload.single("image"), addfood);
foodRoute.get("/list", foodlist);
foodRoute.delete("/remove/:id", removefood);

export default foodRoute;  // ✅ must be default export
