import { Employee } from "../models/employees.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY in employees:", SECRET_KEY); // 🔥 Adaugă acest log pentru debug

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ where: { email } });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: employee.id, role: employee.role },
            SECRET_KEY,
            { expiresIn: "1h" });

            console.log("Generated token:", token); //Ne ducem dracu

        res.status(200).json({ message: "Login successful", token, employee });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.employee.id, {
            attributes: ["id", "first_name", "last_name", "email", "phone_number", "role"]
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching authenticated user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    login,
    getEmployee
}