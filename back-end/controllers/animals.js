import { Animal } from "../models/animals.js";
import { validate as isUUID } from "uuid";

const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();

        if(animals.length > 0) {
            res.status(200).json({ animals });
        } else {
            res.status(404).send({ message: "No animal found."});
        }
    } catch (err) {
        res.status(500).send({ message: "Server error: ", error: err.message });
    }
};

const getAnimalById = async (req, res) => {
    try {
        const animalId = req.params.id;
        if (!isUUID(animalId)) {
            return res.status(400).send({ message: "Invalid animal ID" });
        }

        const animal = await Animal.findByPk(animalId);
        if (!animal) {
            return res.status(404).send({ message: "Animal not found" });
        }
        res.status(200).json(animal);
    } catch (err) {
        res.status(500).send({ message: "Server error: ", error: err.message });
    }
};

const addAnimal = async (req, res) => {
    try {
        const animal = req.body;

        const requiredFields = ['name','species','breed','age', 'gender','size', 'health_status','image','arrival_date'];
        const missingFields = requiredFields.filter(field => !animal[field]);
        if (missingFields.length > 0) {
            return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}`});
        }

        if (animal.age < 0) {
            return res.status(400).send({ message: "Age must be a positive number" });
        }

        if (animal.arrival_date && isNaN(Date.parse(animal.arrival_date))) {
            return res.status(400).send({ message: "Invalid date format for arrival_date" });
        }        

        // const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}([\/\w.-]*)*\.(jpg|jpeg|png|webp)$/i;
        // if (!urlPattern.test(animal.image)) {
        //     return res.status(400).send({ message: "Invalid URL format for image" });
        // }

        const newAnimal = await Animal.create(animal);
        res.status(201).send({ message: "Animal added successfully: ", animal: newAnimal.name });
    } catch (err) {
        res.status(500).send({ message: "Server error: ", error: err.message });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);

        if (!animal) {
            return res.status(404).send({ message: "Animal not found" });
        }

        const allowedFields = ['name', 'species', 'breed', 'age', 'gender', 'size', 'color', 'health_status',
            'vaccinated', 'sterilized', 'adoption_status', 'arrival_date', 'notes', 'image', 'last_updated'];

        const updateData = {};
        for (const field of allowedFields) {
            if (field in req.body) {
                updateData[field] = req.body[field];
            }
        }    

        if (updateData.age && updateData.age < 0) {
            return res.status(400).send({ message: "Age must be a positive number" });
        }
        
        if (updateData.arrival_date && isNaN(Date.parse(updateData.arrival_date))) {
            return res.status(400).send({ message: "Invalid arrival_date format" });
        }
        

        const updatedAnimal = await animal.update(updateData);
        res.status(200).send({ message: "Animal updated successfully", animal: updatedAnimal });
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const animalId = parseInt(req.params.id, 10);
        if (isNaN(animalId) || animalId <= 0) {
            return res.status(400).send({ message: "Invalid animal ID" });
        }

        const animal = await Animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).send({ message: "Animal not found"});
        }
        await animal.destroy();
        res.status(200).send({ message: `Animal with ID ${animalId} deleted successfully` });
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err });
    }
};

export {
    getAnimals,
    getAnimalById,
    addAnimal,
    updateAnimal,
    deleteAnimal
}