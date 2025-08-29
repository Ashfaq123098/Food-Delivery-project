import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://AshfaqUser:AmraAjkGhurteJabo@cluster0.3kqwiha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Food-Delivery-project-main').then (()=> console.log("DB connected"));
}