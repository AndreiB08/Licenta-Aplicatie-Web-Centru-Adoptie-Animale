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
        console.error("Error fetching authenticated employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json({ employees });
    } catch {
        console.error("Error fetching employees: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    role,
    password
  } = req.body;

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.first_name = first_name;
    employee.last_name = last_name;
    employee.email = email;
    employee.phone_number = phone_number;
    employee.role = role;

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      employee.password = hashed;
    }

    await employee.save();

    res.json({ message: "Employee updated succesfully!.", employee });
  } catch (err) {
    console.error("Error fetching employee: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {
    login,
    getEmployee,
    getAllEmployees,
    updateEmployee
}