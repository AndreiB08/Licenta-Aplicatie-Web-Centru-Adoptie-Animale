import { Employee } from "../models/employees.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
console.log("SECRET_KEY in employees:", SECRET_KEY);

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
      { expiresIn: "1h" }
    );

    console.log("Generated token:", token);

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
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEmployee = async (req, res) => {
  try {
    // 🔐 Verificare dacă userul este admin
    if (req.employee.role !== "admin") {
      return res.status(403).json({ message: "Doar administratorii pot adăuga angajați." });
    }

    const {
      first_name,
      last_name,
      email,
      phone_number,
      role,
      password
    } = req.body;

    // 🧪 Validare câmpuri obligatorii
    if (!email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({ message: "Toate câmpurile obligatorii trebuie completate." });
    }

    // Verificare email duplicat
    const existing = await Employee.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Emailul este deja folosit." });
    }

    // 🔒 Hash parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creare angajat
    const newEmployee = await Employee.create({
      first_name,
      last_name,
      email,
      phone_number,
      role,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Angajat creat cu succes.",
      employee: {
        id: newEmployee.id,
        first_name,
        last_name,
        email,
        phone_number,
        role
      }
    });
  } catch (error) {
    console.error("Eroare la creare angajat:", error);
    res.status(500).json({ message: "Eroare internă la crearea angajatului." });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id || req.employee?.id;

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

    const newEmail = email?.trim();
    const newPhone = phone_number?.trim();
    const newRole = role?.trim();

    // Verificare duplicat email
    if (newEmail && newEmail !== employee.email) {
      const duplicate = await Employee.findOne({ where: { email: newEmail } });
    
      if (duplicate && duplicate.id !== employee.id) {
        return res.status(400).json({ message: "Emailul este deja folosit de un alt cont." });
      }
    
      if (!duplicate || duplicate.id === employee.id) {
        employee.email = newEmail; // setează doar dacă e sigur
      }
    }
    

// Verificare duplicat telefon
if (newPhone && newPhone !== employee.phone_number) {
  const duplicatePhone = await Employee.findOne({ where: { phone_number: newPhone } });

  if (duplicatePhone && duplicatePhone.id !== employee.id) {
    return res.status(400).json({ message: "Numărul de telefon este deja folosit de un alt cont." });
  }

  if (!duplicatePhone || duplicatePhone.id === employee.id) {
    employee.phone_number = newPhone;
  }
}



    if (first_name !== undefined) employee.first_name = first_name.trim();
    if (last_name !== undefined) employee.last_name = last_name.trim();

    if (req.params.id && newRole && newRole !== employee.role) {
      employee.role = newRole;
    }

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      employee.password = hashed;
    }

    await employee.save();

    res.json({ message: "Angajat actualizat cu succes.", employee });
  } catch (err) {
    console.error("❌ Eroare internă:", err);
    res.status(500).json({
      message: "Eroare internă la actualizarea angajatului",
      error: err.message
    });
  }
};

const deleteEmployee = async (req, res) => {
  const targetId = req.params.id;
  const currentUserId = req.employee?.id;

  try {
    if (String(targetId) === String(currentUserId)) {
      return res.status(403).json({ message: "Nu poți șterge propriul cont." });
    }

    const employee = await Employee.findByPk(targetId);
    if (!employee) {
      return res.status(404).json({ message: "Angajatul nu a fost găsit." });
    }

    await employee.destroy();
    res.json({ message: "Angajat șters cu succes." });
  } catch (err) {
    console.error("❌ Eroare la ștergere:", err);
    res.status(500).json({ message: "Eroare internă la ștergere." });
  }
};



export {
  login,
  getEmployee,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
