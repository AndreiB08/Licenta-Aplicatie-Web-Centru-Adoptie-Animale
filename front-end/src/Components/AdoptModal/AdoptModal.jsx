// AdoptModal.jsx
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
import { useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:8080";

/**
 * @param {boolean} notifyOnly - dacă e true, afișează doar câmpul email și logica se schimbă
 */
const AdoptionContactModal = ({ open, setOpen, animalId, notifyOnly = false }) => {

  const initialForm = notifyOnly
    ? { email: "" }
    : { name: "", email: "", phone: "", message: "", pickupDateTime: "" };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validare diferită dacă e notifyOnly
  const validate = () => {
    const newErrors = {};

    // email e obligatoriu mereu
    if (!formData.email.trim()) {
      newErrors.email = "Emailul este obligatoriu.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email invalid.";
    }

    if (!notifyOnly) {
      // Doar dacă NU e notifyOnly, validăm restul câmpurilor
      if (!formData.name?.trim()) {
        newErrors.name = "Numele este obligatoriu.";
      }
      if (!formData.phone?.trim()) {
        newErrors.phone = "Telefonul este obligatoriu.";
      } else if (!/^07\d{8}$/.test(formData.phone.trim())) {
        newErrors.phone = "Numărul trebuie să înceapă cu 07 și să conțină exact 10 cifre.";
      }
      if (!formData.pickupDateTime) {
        newErrors.pickupDateTime = "Te rugăm să selectezi ziua și ora de ridicare.";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validare
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // 2. Dacă e "notifyOnly", trimitem DOAR email la un endpoint separat sau logic diferită
      if (notifyOnly) {
        // Exemplu simplu: trimitem un request la un endpoint "notify" (schimbi tu backend-ul după nevoie)
        await axios.post(`${SERVER_URL}/notify-me`, {
          email: formData.email,
          animalId, // opțional, ca să știi despre ce animal e vorba
        });
        alert("Te vom anunța când animalul devine disponibil!");
      } else {
        // Logica actuală de adopție
        if (!animalId) {
          console.error("animalId este undefined sau null! Nu putem trimite cererea de adopție.");
          alert("A apărut o problemă. Încearcă să reîncarci pagina.");
          return;
        }

        // 2.a Salvăm cererea
        await axios.post(`${SERVER_URL}/adopt-request`, {
          ...formData,
          animalId,
        });

        // 2.b Marcăm animalul ca 'reserved'
        await axios.put(`${SERVER_URL}/pets/${animalId}`, {
          adoption_status: "reserved"
        });
        alert("Cererea ta a fost trimisă cu succes! Animalul este rezervat.");
      }

      // 3. Reset form, închide modalul
      setFormData(initialForm);
      setErrors({});
      setOpen(false);
      navigate("/pets");

    } catch (error) {
      console.error("Eroare:", error);
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        {notifyOnly ? "Notifică-mă când e disponibil" : "Completează pentru a fi contactat"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {/* Email e mereu afișat */}
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

        {/* Afișăm restul câmpurilor doar dacă NU e notifyOnly */}
        {!notifyOnly && (
          <>
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
            <TextField
              label="Data și ora ridicării"
              name="pickupDateTime"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.pickupDateTime}
              onChange={handleChange}
              error={!!errors.pickupDateTime}
              helperText={errors.pickupDateTime}
              required
              fullWidth
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {notifyOnly ? "Trimite Email" : "Trimite Cerere"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdoptionContactModal;
