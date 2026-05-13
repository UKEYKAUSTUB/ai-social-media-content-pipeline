import express from "express";
import { generateSocialMediaImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/generate", generateSocialMediaImage);

export default router;