import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/user", userRouter); 
app.use("/api/products", productRouter);


app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

