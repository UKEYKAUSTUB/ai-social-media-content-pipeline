import mongoose from "mongoose"; //Mongoose helps Node.js communicate with MongoDB.
//Database connection takes time so we use async await
const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect('mongodb+srv://adityapatil151617_db_user:TC5VBYS4TOdUDRON@cluster0.yb2r6di.mongodb.net/');//connect to monodb

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.log("MongoDB Connection Error");

    console.log(error.message);

    process.exit(1);
  }
};

export default connectDB;//export function