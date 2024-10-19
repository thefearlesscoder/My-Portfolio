import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addProject,
  deleteProject,
  getAllProject,
  updateProject,
  getProjectById,
} from "../controllers/project.controllers.js";

router.post("/add", isAuthenticated, addProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getAllProject); //global route
router.get("/get/:id", getProjectById); //global route

export default router;
