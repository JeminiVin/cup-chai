"use server"; // ✅ ensures this file is only used on the server in Next.js App Router

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // Already connected
    }

    const conn = await mongoose.connect('mongodb://localhost:27017/cupchai'); // ✅ FIXED

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
