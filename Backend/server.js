import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoutes.js"; // <-- new

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/user", userRouter); 
app.use("/api/products", productRouter);
app.use("/api/food", foodRouter); // <-- new food route

// Serve static uploads
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

