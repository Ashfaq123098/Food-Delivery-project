import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ashfaqbhai4560:AmiAjkBachteChai1234@cluster0.trrch1h.mongodb.net/Food_Delivery').then(()=>console.log("DB is Connected Successfully"));

}