import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addSkill,
  deleteSkill,
  getAllSkill,
  updateSkill
} from "../controllers/skills.controllers.js";

router.post("/add", isAuthenticated, addSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.get("/getall", getAllSkill); //global route

export default router;
