import express from "express"; //Express helps create backend APIs.
import cors from "cors"; //CORS allows frontend and backend to communicate.

import authRoutes from "./routes/authRoutes.js";

const app = express(); //Creates backend server object.

app.use(cors()); //Allows requests from frontend.

app.use(express.json()); //Allows backend to read JSON request body.

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;//Used in server.js.