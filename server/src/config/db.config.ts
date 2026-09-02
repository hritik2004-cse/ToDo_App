import mongoose from "mongoose";
import env from "./env.config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.mongoDbUri);
    console.log(
      `mongoDB connected successfully: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`mongoDb connection error: ${error}`);
  }
};

export default connectDB;
