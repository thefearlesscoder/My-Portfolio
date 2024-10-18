import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { postTimeline, deleteTimeline, getAllTimeline } from "../controllers/timeline.controller.js";

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimeline); //global route



export default router;