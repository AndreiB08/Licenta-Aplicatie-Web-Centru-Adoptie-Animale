
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import { capitalizeWords } from "../../utils/formatHelpers";
import axios from "axios";

const SERVER_URL = "http://localhost:8080";
const roles = ["admin", "staff"];

const EditStaffModal = ({ open, handleClose, onSaved, employee }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

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
    setErrors({});
  }, [employee, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};

    const formattedData = {
      ...form,
      first_name: capitalizeWords(form.first_name),
      last_name: capitalizeWords(form.last_name)
    };

    if (!form.first_name.trim()) newErrors.first_name = "Prenumele este obligatoriu.";
    if (!form.last_name.trim()) newErrors.last_name = "Numele este obligatoriu.";

    if (!form.email.trim()) {
      newErrors.email = "Emailul este obligatoriu.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email invalid.";
    }

    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Telefonul este obligatoriu.";
    } else if (!/^07\d{8}$/.test(form.phone_number.trim())) {
      newErrors.phone_number = "Numărul trebuie să înceapă cu 07 și să conțină exact 10 cifre.";
    }

    if (!form.role) newErrors.role = "Rolul este obligatoriu.";

    if (!employee && (!form.password || form.password.length < 6)) {
      newErrors.password = "Parola trebuie să aibă cel puțin 6 caractere.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const token = localStorage.getItem("token");

      if (employee) {
        await axios.put(`${SERVER_URL}/employees/${employee.id}`, formattedData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`${SERVER_URL}/employees`, formattedData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      onSaved();
      handleClose();
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg?.includes("Email")) {
        setErrors((prev) => ({ ...prev, email: "Acest email este deja folosit." }));
        return;
      }

      if (msg?.includes("telefon")) {
        setErrors((prev) => ({ ...prev, phone_number: "Acest număr de telefon este deja folosit." }));
        return;
      }

      console.error("Eroare la salvare angajat:", err);
      alert("Eroare la salvare.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{employee ? "Editează angajat" : "Adaugă angajat"}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Prenume"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
          fullWidth
        />
        <TextField
          label="Nume"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Telefon"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          error={!!errors.phone_number}
          helperText={errors.phone_number}
          fullWidth
        />
        <FormControl fullWidth error={!!errors.role}>
          <InputLabel>Rol</InputLabel>
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
            label="Rol"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>

        {!employee && (
          <TextField
            label="Parolă"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {employee ? "Salvează modificările" : "Adaugă"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffModal;
