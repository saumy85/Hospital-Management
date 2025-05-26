import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";
import { isAdminAuthentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages", isAdminAuthentication, getAllMessages);

export default router;
