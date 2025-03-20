import { Animal } from "../models/animals.js";
import { validate as isUUID } from "uuid";

const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();
        if (animals.length > 0) {
            return res.status(200).json({ animals });
        }
        res.status(404).json({ message: "No animals found." });
    } catch (err) {
        console.error("Error fetching animals:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getAnimalById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "Invalid animal ID" });
        }

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: "Animal not found" });
        }
        res.status(200).json(animal);
    } catch (err) {
        console.error("Error fetching animal by ID:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const addAnimal = async (req, res) => {
    try {
        const animal = req.body;
        const requiredFields = [
            "name", "species", "breed", "age", "gender",
            "size", "health_status", "image", "arrival_date"
        ];

        const missingFields = requiredFields.filter(field => !animal[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`
            });
        }

        if (animal.age < 0) {
            return res.status(400).json({ message: "Age must be a positive number" });
        }

        if (animal.arrival_date && isNaN(Date.parse(animal.arrival_date))) {
            return res.status(400).json({ message: "Invalid date format for arrival_date" });
        }

        const newAnimal = await Animal.create(animal);
        res.status(201).json({ message: "Animal added successfully", animal: newAnimal });

    } catch (err) {
        console.error("Error adding animal:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "Invalid animal ID" });
        }

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: "Animal not found" });
        }

        const allowedFields = [
            "name", "species", "breed", "age", "gender", "size", "color",
            "health_status", "vaccinated", "sterilized", "adoption_status",
            "arrival_date", "notes", "image", "last_updated"
        ];

        const updateData = {};
        for (const field of allowedFields) {
            if (field in req.body) {
                updateData[field] = req.body[field];
            }
        }

        if (updateData.age && updateData.age < 0) {
            return res.status(400).json({ message: "Age must be a positive number" });
        }

        if (updateData.arrival_date && isNaN(Date.parse(updateData.arrival_date))) {
            return res.status(400).json({ message: "Invalid arrival_date format" });
        }

        const updatedAnimal = await animal.update(updateData);
        res.status(200).json({ message: "Animal updated successfully", animal: updatedAnimal });

    } catch (err) {
        console.error("Error updating animal:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "Invalid animal ID" });
        }

        const animal = await Animal.findByPk(id);
        if (!animal) {
            return res.status(404).json({ message: "Animal not found" });
        }

        await animal.destroy();
        res.status(200).json({ message: `Animal with ID ${id} deleted successfully` });

    } catch (err) {
        console.error("Error deleting animal:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export {
    getAnimals,
    getAnimalById,
    addAnimal,
    updateAnimal,
    deleteAnimal
};
