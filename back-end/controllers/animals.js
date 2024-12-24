import { Animal } from "../models/animals.js";
import { Op } from "sequelize";

const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();

        if(animals.length > 0) {
            // res.status(200).send({ animals });
            res.status(200).json({ animals });
        } else {
            res.status(404).send({ message: "No animal found."});
        }
    } catch (err) {
        res.status(500).send({ message: "Server error: ", error: err.message });
    }
};

const addAnimal = async (req, res) => {
    try {
        const animal = req.body;
        const newAnimal = await Animal.create(animal);
        res.status(201).send({ message: "Animal added: ", animal: newAnimal.name });
    } catch (err) {
        res.status(500).send({ message: "Server error: ", error: err.message });
    }
};

export {
    getAnimals,
    addAnimal
}