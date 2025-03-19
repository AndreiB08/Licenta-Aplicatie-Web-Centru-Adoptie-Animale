// import express from "express";
// import * as employeeController from "../controllers/employees.js";
// import { authenticate } from "../middleware/authMiddleware.js";

// const router = express.Router();



// router.get("/", authenticate, employeeController.getAllEmployees);

// router.get("/:id", authenticate, employeeController.getEmployeeById);
// router.get("/me", authenticate, getLoggedInUser);


// router.post("/", authenticate, isAdmin, employeeController.createEmployee);
// router.post("/login", employeeController.login);
// router.post("/register", authenticate, employeeController.register);


// router.put("/:id", authenticate, isAdmin, employeeController.updateEmployee);

// router.delete("/:id", authenticate, employeeController.deleteEmployee);

// export { router };