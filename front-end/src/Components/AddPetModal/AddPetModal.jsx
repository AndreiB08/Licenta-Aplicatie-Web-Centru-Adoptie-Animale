import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText
} from "@mui/material";
import axios from "axios";

const SERVER_URL = "http://localhost:8080";

const initialForm = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  size: "",
  color: "",
  health_status: "",
  vaccinated: false,
  sterilized: false,
  adoption_status: "",
  arrival_date: new Date().toISOString().split("T")[0],
  notes: "",
  image: "",
  microchip_number: ""
};

const AddPetModal = ({ open, handleClose, onAdded }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    if (name === "age") {
      const number = parseInt(finalValue);
      setForm((prev) => ({
        ...prev,
        [name]: isNaN(number) || number <= 0 ? "" : number
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: finalValue
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    const isEmpty = (value) => !value || value.trim() === "";

    if (isEmpty(form.name)) newErrors.name = "Numele este obligatoriu.";
    if (isEmpty(form.species)) newErrors.species = "Specia este obligatorie.";
    if (isEmpty(form.breed)) newErrors.breed = "Rasa este obligatorie.";
    if (!form.age) newErrors.age = "Vârsta este obligatorie.";
    if (isEmpty(form.gender)) newErrors.gender = "Genul este obligatoriu.";
    if (isEmpty(form.size)) newErrors.size = "Dimensiunea este obligatorie.";
    if (isEmpty(form.color)) newErrors.color = "Culoarea este obligatorie.";
    if (isEmpty(form.health_status)) newErrors.health_status = "Starea medicală este obligatorie.";
    if (isEmpty(form.adoption_status)) newErrors.adoption_status = "Statusul de adopție este obligatoriu.";
    if (isEmpty(form.arrival_date)) newErrors.arrival_date = "Data sosirii este obligatorie.";
    if (isEmpty(form.image)) newErrors.image = "URL-ul imaginii este obligatoriu.";

    if (
      form.microchip_number &&
      !/^\d{15}$/.test(form.microchip_number.trim())
    ) {
      newErrors.microchip_number = "Numărul de microcip trebuie să aibă exact 15 cifre.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
      };

      const capitalizeWords = (str = "") =>
        str
          .trim()
          .toLowerCase()
          .split(" ")
          .filter(Boolean)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      const capitalizeFirstWordOnly = (str = "") => {
        const trimmed = str.trimStart();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      };

      const formattedData = {
        ...form,
        name: capitalizeWords(form.name),
        species: capitalizeWords(form.species),
        breed: capitalizeWords(form.breed),
        notes: capitalizeFirstWordOnly(form.notes),
        color: capitalizeFirstWordOnly(form.color),
        arrival_date: formatDate(form.arrival_date),
        microchip_number: form.microchip_number.trim() === "" ? null : form.microchip_number
      };

      console.log("Trimitem către backend:", formattedData);

      await axios.post(`${SERVER_URL}/pets`, formattedData);

      onAdded();
      handleClose();
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      if (err.response) {
        console.error("Răspuns de la server:", err.response.data);
      }
      console.error("Eroare la adăugarea animalului:", err);
      alert("Eroare la salvare.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Adaugă animal nou</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="Nume" name="name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} fullWidth />
        <TextField label="Specie" name="species" value={form.species} onChange={handleChange} error={!!errors.species} helperText={errors.species} fullWidth />
        <TextField label="Rasă" name="breed" value={form.breed} onChange={handleChange} error={!!errors.breed} helperText={errors.breed} fullWidth />
        <TextField label="Vârstă" name="age" type="number" value={form.age} onChange={handleChange} error={!!errors.age} helperText={errors.age} fullWidth />

        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel>Gen</InputLabel>
          <Select name="gender" value={form.gender} onChange={handleChange} label="Gen">
            <MenuItem value="Male">Mascul</MenuItem>
            <MenuItem value="Female">Femelă</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.size}>
          <InputLabel>Dimensiune</InputLabel>
          <Select name="size" value={form.size} onChange={handleChange} label="Dimensiune">
            <MenuItem value="Small">Mic</MenuItem>
            <MenuItem value="Medium">Mediu</MenuItem>
            <MenuItem value="Large">Mare</MenuItem>
          </Select>
          {errors.size && <FormHelperText>{errors.size}</FormHelperText>}
        </FormControl>

        <TextField
  label="Culoare"
  name="color"
  value={form.color}
  onChange={handleChange}
  error={!!errors.color}
  helperText={errors.color}
  fullWidth
/>

        
        <FormControl fullWidth error={!!errors.health_status}>
          <InputLabel>Stare medicală</InputLabel>
          <Select name="health_status" value={form.health_status} onChange={handleChange} label="Stare medicală">
            <MenuItem value="Healthy">Sănătos</MenuItem>
            <MenuItem value="Sick">Bolnav</MenuItem>
            <MenuItem value="Under treatment">În tratament</MenuItem>
          </Select>
          {errors.health_status && <FormHelperText>{errors.health_status}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.adoption_status}>
          <InputLabel>Status adopție</InputLabel>
          <Select name="adoption_status" value={form.adoption_status} onChange={handleChange} label="Status adopție">
            <MenuItem value="available">Disponibil</MenuItem>
            <MenuItem value="reserved">Rezervat</MenuItem>
            <MenuItem value="adopted">Adoptat</MenuItem>
          </Select>
          {errors.adoption_status && <FormHelperText>{errors.adoption_status}</FormHelperText>}
        </FormControl>

        <TextField
          label="Data sosirii"
          name="arrival_date"
          type="date"
          value={form.arrival_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.arrival_date}
          helperText={errors.arrival_date}
          fullWidth
        />

        <TextField label="Notițe" name="notes" value={form.notes} onChange={handleChange} fullWidth multiline rows={3} />
        <TextField label="URL poză" name="image" value={form.image} onChange={handleChange} error={!!errors.image} helperText={errors.image} fullWidth />

        <TextField
          label="Număr microcip"
          name="microchip_number"
          value={form.microchip_number}
          onChange={handleChange}
          error={!!errors.microchip_number}
          helperText={errors.microchip_number}
          fullWidth
        />

        <label>
          <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handleChange} />
          &nbsp; Vaccinat
        </label>
        <label>
          <input type="checkbox" name="sterilized" checked={form.sterilized} onChange={handleChange} />
          &nbsp; Sterilizat
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anulează</Button>
        <Button variant="contained" onClick={handleSubmit}>Salvează</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPetModal;
