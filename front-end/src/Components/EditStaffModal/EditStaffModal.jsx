import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Select, MenuItem, InputLabel, FormControl
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
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${SERVER_URL}/employees/${employee.id}`, form);
      onUpdated();
      handleClose();
    } catch (err) {
      console.error("Eroare la salvare:", err);
      alert("Eroare la actualizarea angajatului.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editează angajat</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 400, height: 500 }}>
        <TextField
          label="Prenume"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          sx={{ mt: 2 }}
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
          label="Parolă nouă"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>Salvează</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffModal;
