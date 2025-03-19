import express from "express";
import { validate as isUUID } from "uuid";
import * as animalController from "../controllers/animals.js";

const router = express.Router();

router.get("/", animalController.getAnimals);
router.get("/:id", animalController.getAnimalById);

router.post("/", animalController.addAnimal);

router.put("/:id", animalController.updateAnimal);

router.delete("/:id", animalController.deleteAnimal);

router.param("id", async (req, res, next, id) => {
    if (!isUUID(id)) {
        return res.status(400).send({ message: "Invalid ID format" });
    }
    next();
});

export { router };