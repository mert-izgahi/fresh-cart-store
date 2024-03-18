import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        isConnected = true;
        console.log("MongoDB connected", process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
};
