import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", isAuthenticated, getAllTimelines); //global route



export default router;