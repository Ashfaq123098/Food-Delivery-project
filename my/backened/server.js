// server.js
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import foodRoute from "./routes/foodRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// -----------------------
// Middleware
// -----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for SSLCommerz callbacks

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));

// -----------------------
// DB connection
// -----------------------
connectDB();

// -----------------------
// API routes
// -----------------------
app.use("/api/user", userRoute);
app.use("/api/food", foodRoute);
app.use("/api/order", orderRoute);


// -----------------------
// Static files
// -----------------------
app.use("/images", express.static("uploads"));

// -----------------------
// Root route
// -----------------------
app.get("/", (req, res) => {
  res.send("API is Working");
});

// -----------------------
// 404 handler
// -----------------------
app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// -----------------------
// Start server
// -----------------------
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
