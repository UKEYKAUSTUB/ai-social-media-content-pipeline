import mongoose from "mongoose"; //Mongoose helps Node.js communicate with MongoDB.
import dns from "node:dns/promises";   
dns.setServers(["1.1.1.1", "1.0.0.1"]);
//Database connection takes time so we use async await
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGO_URL);//connect to monodb

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.log("MongoDB Connection Error");

    console.log(error.message);

    process.exit(1);
  }
};

export default connectDB;//export function