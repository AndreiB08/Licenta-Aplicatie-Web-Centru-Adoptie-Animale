import express from "express";
import { addNotificationRequest, notifyAvailability } from "../controllers/notificationRequest.js";

const router = express.Router();

router.post("/", addNotificationRequest);
router.post("/notify-availability", notifyAvailability);

export { router };
