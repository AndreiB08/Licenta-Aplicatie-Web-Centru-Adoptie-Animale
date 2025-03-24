import React, { useState } from "react";
import axios from "axios";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText
} from "@mui/material";
import { formatAnimalData, validateAnimalData } from "../../utils/formatHelpers";
import { animalSpecies } from "../../constants/animalSpecies";

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

    setForm((prev) => ({
      ...prev,
      [name]: name === "age"
        ? (() => {
          const number = parseInt(finalValue);
          return isNaN(number) || number <= 0 ? "" : number;
        })()
        : finalValue,
    }));
  };

  const handleSubmit = async () => {

    const newErrors = validateAnimalData(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      const formattedData = formatAnimalData(form);

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

        <FormControl fullWidth error={!!errors.species}>
          <InputLabel>Specie</InputLabel>
          <Select name="species" value={form.species} onChange={handleChange} label="Specie">
            {animalSpecies.map((specie) => (
              <MenuItem key={specie} value={specie}>{specie}</MenuItem>
            ))}
          </Select>
          {errors.species && <FormHelperText>{errors.species}</FormHelperText>}
        </FormControl>

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
