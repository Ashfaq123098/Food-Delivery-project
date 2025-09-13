import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import orderRouter from "./routes/orderRoute.js"
import foodRoute from "./routes/foodRoute.js"; // matches default export

import 'dotenv/config'


//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();



//api endpoints
app.use("/api/user",userRouter)
app.use("/api/food",foodRoute)
app.use("/api/order",orderRouter);
app.use("/images",express.static("uploads")); 

app.get("/",(req,res)=>{
    res.send("API is Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})