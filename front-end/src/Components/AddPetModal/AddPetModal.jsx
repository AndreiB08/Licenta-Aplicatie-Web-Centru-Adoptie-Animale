import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Select, MenuItem, InputLabel, FormControl
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
  arrival_date: "",
  notes: "",
  image: "",
  microchip_number: ""
};

const AddPetModal = ({ open, handleClose, onAdded }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${SERVER_URL}/pets`, form);
      onAdded();  // notifică pagina părinte
      handleClose();
      setForm(initialForm);
    } catch (err) {
      console.error("Eroare la adăugarea animalului:", err);
      alert("Eroare la salvare.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Adaugă animal nou</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="Nume" name="name" value={form.name} onChange={handleChange} fullWidth />
        <TextField label="Specie" name="species" value={form.species} onChange={handleChange} fullWidth />
        <TextField label="Rasă" name="breed" value={form.breed} onChange={handleChange} fullWidth />
        <TextField label="Vârstă" name="age" type="number" value={form.age} onChange={handleChange} fullWidth />
        <TextField label="Gen" name="gender" value={form.gender} onChange={handleChange} fullWidth />
        <TextField label="Dimensiune" name="size" value={form.size} onChange={handleChange} fullWidth />
        <TextField label="Culoare" name="color" value={form.color} onChange={handleChange} fullWidth />
        <TextField label="Stare medicală" name="health_status" value={form.health_status} onChange={handleChange} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Status adopție</InputLabel>
          <Select name="adoption_status" value={form.adoption_status} onChange={handleChange} label="Status adopție">
            <MenuItem value="available">Disponibil</MenuItem>
            <MenuItem value="reserved">Rezervat</MenuItem>
            <MenuItem value="adopted">Adoptat</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Data sosirii"
          name="arrival_date"
          type="date"
          value={form.arrival_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField label="Notițe" name="notes" value={form.notes} onChange={handleChange} fullWidth multiline rows={3} />
        <TextField label="URL poză" name="image" value={form.image} onChange={handleChange} fullWidth />
        <TextField label="Număr microcip" name="microchip_number" value={form.microchip_number} onChange={handleChange} fullWidth />

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
