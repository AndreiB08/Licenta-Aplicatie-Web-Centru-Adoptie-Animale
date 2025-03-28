import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

const SERVER_URL = "http://localhost:8080";

const AdoptionContactModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Numele este obligatoriu.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Emailul este obligatoriu.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email invalid.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefonul este obligatoriu.";
    } else if (!/^07\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Numărul trebuie să înceapă cu 07 și să conțină exact 10 cifre.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(`${SERVER_URL}/adopt-requests`, formData);
      console.log("Cerere salvată:", res.data);
      alert("Cererea ta a fost trimisă cu succes!");

      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      setOpen(false);
    } catch (error) {
      console.error("Eroare:", error);
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Completează pentru a fi contactat</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Nume complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          fullWidth
        />
        <TextField
          label="Număr de telefon"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          fullWidth
        />
        <TextField
          label="Mesaj (opțional)"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>Trimite</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdoptionContactModal;
