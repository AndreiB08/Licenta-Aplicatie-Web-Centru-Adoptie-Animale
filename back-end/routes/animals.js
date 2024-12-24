import express from "express";
import * as animalController from "../controllers/animals.js";

const router = express.Router();

router.get("/", animalController.getAnimals);

router.post("/", animalController.addAnimal);

export { router };