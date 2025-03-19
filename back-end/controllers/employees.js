// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { Employee } from "../models/employee.js";

// const SECRET_KEY = "my_secret_key";

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const employee = await Employee.findOne({ where: { email } });

//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         const isMatch = await bcrypt.compare(password, employee.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: employee.id, role: employee.role }, SECRET_KEY, { expiresIn: "1h" });

//         res.status(200).json({ message: "Login successful", token, user: employee });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const register = async (req, res) => {
//     try {
//         const { first_name, last_name, email, password, role } = req.body;

//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admin can register employees." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newEmployee = await Employee.create({
//             first_name,
//             last_name,
//             email,
//             password: hashedPassword,
//             role
//         });

//         res.status(201).json({ message: "Employee registered successfully", employee: newEmployee });
//     } catch (error) {
//         res.status(500).json({ message: "Error registering employee", error: error.message });
//     }
// };

// const getLoggedInUser = async (req, res) => {
//     try {
//         const employee = await Employee.findByPk(req.user.id, {
//             attributes: ["id", "first_name", "last_name", "email", "role"]
//         });

//         if (!employee) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(employee);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const getAllEmployees = async (req, res) => {
//     try {
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admins can view employees." });
//         }

//         const employees = await Employee.findAll({ attributes: ["id", "first_name", "last_name", "email", "role"] });
//         res.json({ employees });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching employees", error: error.message });
//     }
// };

// const deleteEmployee = async (req, res) => {
//     try {
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admins can delete employees." });
//         }

//         const employee = await Employee.findByPk(req.params.id);
//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         await employee.destroy();
//         res.json({ message: "Employee deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting employee", error: error.message });
//     }
// };

// export {
//     login,
//     register,
//     getLoggedInUser,
//     getAllEmployees,
//     deleteEmployee
// }