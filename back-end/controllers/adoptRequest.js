import { AdoptRequest } from "../models/adoptRequest.js";
import { Animal } from "../models/animals.js";

const addContactRequest = async (req, res) => {
    try {
        const { name, email, phone, message, pickupDateTime, animalId } = req.body;

        if (!name || !email || !phone || !animalId) {
            return res.status(400).json({
                message: "Missing required fields: name, email, phone, and animalId are mandatory.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const newRequest = await AdoptRequest.create({
            name,
            email,
            phone,
            message,
            pickupDateTime,
            animalId,
        });

        return res.status(201).json({
            message: "Contact request saved successfully.",
            request: newRequest,
        });

    } catch (err) {
        console.error("Error saving contact request:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await AdoptRequest.findAll({
            include: {
                model: Animal,
                attributes: ["name", "species"]
            }
        });

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error getting adoption requests:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const [updatedCount] = await AdoptRequest.update(
            { approved: true },
            { where: { id } }
        );

        if (updatedCount === 0) {
            return res.status(404).json({ message: "Cererea nu a fost găsită." });
        }

        return res.status(200).json({ message: "Cererea a fost aprobată cu succes." });
    } catch (err) {
        console.error("Eroare la aprobarea cererii:", err);
        res.status(500).json({ message: "Eroare server", error: err.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await AdoptRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({ message: "Cererea nu a fost găsită." });
        }

        await request.getAnimal().then(animal => {
            if (animal) {
                animal.adoption_status = "available";
                return animal.save();
            }
        });

        await request.destroy();

        res.status(200).json({ message: "Cererea a fost ștearsă și animalul marcat ca disponibil." });
    } catch (err) {
        console.error("Eroare la ștergerea cererii:", err);
        res.status(500).json({ message: "Eroare server", error: err.message });
    }
};


export {
    addContactRequest,
    getAllRequests,
    approveRequest,
    deleteRequest
};