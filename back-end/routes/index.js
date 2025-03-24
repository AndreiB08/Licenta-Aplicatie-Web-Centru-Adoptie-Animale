import express from "express";
import { router as animalRouter } from "./animals.js";
import { router as employeeRouter } from "./employees.js";
import { router as adoptRouter} from "./adoptRequest.js";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({ message: "API is running" });
    next();
});

router.use("/pets", animalRouter);
router.use("/employees", employeeRouter);
router.use("/adopt-request", adoptRouter);

router.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({ message: "Internal server error" });
});

export { router };
