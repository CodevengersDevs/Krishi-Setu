import mongoose from "mongoose";
import { MONGO_URI } from "../address.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // simple, no deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failure:", error.message);
  }
};

export default connectDB;
