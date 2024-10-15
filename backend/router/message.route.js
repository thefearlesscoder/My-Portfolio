import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getallmessage", getAllMessages);


export default router;