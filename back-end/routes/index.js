import express from "express";
import { router as animalRouter} from "./animals.js";
// import { router as employeeRouter} from "./employees.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send({ message: "API is running" });
});

router.use("/pets", animalRouter);
// router.use("/employees", employeeRouter);

router.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({ message: "Internal server error" });
});

export { router };