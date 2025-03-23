import express from "express";
import { validate as isUUID } from "uuid";
import * as employeeController from "../controllers/employees.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.param("id", (req, res, next, id) => {
    if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    next();
});

router.post("/login", employeeController.login);
router.get("/", employeeController.getAllEmployees);
router.get("/me", authenticate, employeeController.getEmployee);
router.post("/", authenticate, employeeController.createEmployee);
router.put("/me", authenticate, employeeController.updateEmployee);
router.put("/:id", authenticate, employeeController.updateEmployee);
router.delete("/:id", authenticate, employeeController.deleteEmployee);


export { router };
