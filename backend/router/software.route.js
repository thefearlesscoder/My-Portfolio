import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addNewApp,
  deleteApp,
  getAllApp,
} from "../controllers/software.controllers.js";

router.post("/add", isAuthenticated, addNewApp);
router.delete("/delete/:id", isAuthenticated, deleteApp);
router.get("/getall", getAllApp); //global route

export default router;
