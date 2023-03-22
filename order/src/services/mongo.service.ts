import mongoose from "mongoose";

/**
 * -------------- DATABASE ----------------
 */

export const connectDB = async () => {
  try {
    if (process.env.MONGO_URI === undefined) {
      throw new Error("MONGO_URI is undefined");
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.on("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    throw error;
  }
};
