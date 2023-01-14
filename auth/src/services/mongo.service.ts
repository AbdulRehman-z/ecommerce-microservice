import mongoose from "mongoose";

/**
 * -------------- DATABASE ----------------
 */

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth");
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};
