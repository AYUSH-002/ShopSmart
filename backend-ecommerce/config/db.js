import mongoose from "mongoose";

export const connectDB= async () => {
    await mongoose.connect('mongodb+srv://022003ayush:ayush02@cluster0.wrdcoau.mongodb.net/ShopSmart').then(()=>console.log('DB Connected'));
}