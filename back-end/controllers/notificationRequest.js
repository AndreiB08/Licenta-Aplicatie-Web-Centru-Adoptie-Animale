import { NotificationRequest } from "../models/notificationRequest.js";

const addNotificationRequest = async (req, res) => {
    try {
        const { email, animalId } = req.body;

        if (!email || !animalId) {
            return res.status(400).json({ message: "Missing email or animalId." });
        }

        const newNotify = await NotificationRequest.create({ email, animalId });
        return res.status(201).json({
            message: "Notification request saved successfully.",
            notify: newNotify,
        });
    } catch (err) {
        console.error("Error saving notification request:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export {
    addNotificationRequest
}