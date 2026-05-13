import express from "express"; //Express helps create backend APIs.
import cors from "cors"; //CORS allows frontend and backend to communicate.

import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express(); //Creates backend server object.

app.use(cors({
  origin:
  "ai-social-media-content-pipeline.vercel.app",
  credentials:true,
})); //Allows requests from frontend.

app.use(express.json()); //Allows backend to read JSON request body.

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;//Used in server.js.