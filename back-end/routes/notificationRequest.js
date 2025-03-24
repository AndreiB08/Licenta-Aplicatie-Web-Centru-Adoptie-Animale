import express from "express";
import { addNotificationRequest } from "../controllers/notificationRequest.js";

const router = express.Router();

router.post("/", addNotificationRequest);

export { router };
