import express from "express";

import { generateContent, getContentHistory, deleteContent }
from "../controllers/contentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// PROTECTED ROUTE

router.post(
  "/generate",
  protect,
  generateContent
);

router.get(
  "/history",
  protect,
  getContentHistory
);

router.delete(
  "/:id",
  protect,
  deleteContent
);
console.log("CONTENT ROUTES LOADED");
export default router;