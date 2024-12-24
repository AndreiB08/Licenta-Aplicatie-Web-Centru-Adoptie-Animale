import express from "express";
import { router as animalRouter} from "./animals.js";

const router = express.Router();
router.use("/animals", animalRouter);

export { router };