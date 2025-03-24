import { AdoptRequest } from "../models/adoptRequest.js";
import { validate as isUUID } from "uuid";

const addContactRequest = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Missing required fields: name, email, and phone are mandatory.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const newRequest = await AdoptRequest.create({ name, email, phone, message });

        return res
            .status(201)
            .json({ message: "Contact request saved successfully.", request: newRequest });
    } catch (err) {
        console.error("Error saving contact request:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export { addContactRequest };