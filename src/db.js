import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alfa555:alfa555@cluster0.abcrvnl.mongodb.net');
        console.log(">>> DB is connected")
    } catch (error) {
       console.log(error) 
    }
}