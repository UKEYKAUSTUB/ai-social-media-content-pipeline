import express from "express";

import {
  createProject,
  getProjects,
  deleteProject,
  getProjectContent
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE PROJECT

router.post(
  "/",
  protect,
  createProject
);


// GET PROJECTS

router.get(
  "/",
  protect,
  getProjects
);

// GET PROJECT
router.get(
  "/project/:projectId",
  protect,
  getProjectContent
);

// DELETE PROJECT

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;