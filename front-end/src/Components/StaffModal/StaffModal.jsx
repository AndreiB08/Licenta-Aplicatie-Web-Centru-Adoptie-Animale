
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import axios from "axios";

const SERVER_URL = "http://localhost:8080";

const EditStaffModal = ({ open, handleClose, employee, onUpdated }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
    password: ""
  });

  useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        email: employee.email || "",
        phone_number: employee.phone_number || "",
        role: employee.role || "",
        password: ""
      });
    } else {
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "",
        password: ""
      });
    }
  }, [open, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAndReset = () => {
    handleClose();
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role: "",
      password: ""
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const dataToSend = { ...form };

      if (!dataToSend.password || dataToSend.password.trim() === "") {
        delete dataToSend.password;
      }

      if (employee) {
        await axios.put(`${SERVER_URL}/employees/${employee.id}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      } else {
        await axios.post(`${SERVER_URL}/employees`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      }

      onUpdated();
      handleCloseAndReset();
    } catch (err) {
      console.error("Eroare la salvare:", err);
      alert("Eroare la salvare angajat.");
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseAndReset}>
      <DialogTitle>{employee ? "Editează angajat" : "Adaugă angajat"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          minWidth: 400,
          height: 500,
        }}
      >
        <TextField
          label="Prenume"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Nume"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Telefon"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Rol</InputLabel>
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
            label="Rol"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={employee ? "Parolă nouă (opțional)" : "Parolă"}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndReset}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffModal;
