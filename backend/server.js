import dotenv from "dotenv";
import app from "./app.js";
import connectDB  from "./config/db.js";

dotenv.config(); //load environment variables
connectDB();//server connects to MongoDB before starting
const PORT = process.env.PORT || 5000;//get port number

//starts the backend server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});