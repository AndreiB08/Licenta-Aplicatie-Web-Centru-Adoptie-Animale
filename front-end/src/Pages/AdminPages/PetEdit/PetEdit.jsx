import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PetEdit.css";

const SERVER_URL = "http://localhost:8080/pets";

const PetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Failed to fetch animal:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    if (name === "age") {
      const number = parseInt(finalValue);
      setPet((prev) => ({
        ...prev,
        [name]: isNaN(number) || number <= 0 ? "" : number,
      }));
    } else {
      setPet((prev) => ({
        ...prev,
        [name]: finalValue,
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const isEmpty = (value) => !value || value.trim() === "";

    if (isEmpty(pet.name)) newErrors.name = "Numele este obligatoriu.";
    if (isEmpty(pet.species)) newErrors.species = "Specia este obligatorie.";
    if (isEmpty(pet.breed)) newErrors.breed = "Rasa este obligatorie.";
    if (!pet.age) newErrors.age = "Vârsta este obligatorie.";
    if (isEmpty(pet.gender)) newErrors.gender = "Genul este obligatoriu.";
    if (isEmpty(pet.size)) newErrors.size = "Dimensiunea este obligatorie.";
    if (isEmpty(pet.color)) newErrors.color = "Culoarea este obligatorie.";
    if (isEmpty(pet.health_status)) newErrors.health_status = "Starea medicală este obligatorie.";
    if (isEmpty(pet.adoption_status)) newErrors.adoption_status = "Statusul de adopție este obligatoriu.";
    if (isEmpty(pet.arrival_date)) newErrors.arrival_date = "Data sosirii este obligatorie.";
    if (isEmpty(pet.image)) newErrors.image = "URL-ul imaginii este obligatoriu.";

    if (
      pet.microchip_number &&
      !/^\d{15}$/.test(pet.microchip_number.trim())
    ) {
      newErrors.microchip_number = "Numărul de microcip trebuie să aibă exact 15 cifre.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formattedPet = {
        ...pet,
        name: capitalizeWords(pet.name),
        species: capitalizeWords(pet.species),
        breed: capitalizeWords(pet.breed),
        color: capitalizeFirstWordOnly(pet.color),
        notes: capitalizeFirstWordOnly(pet.notes),
        microchip_number: pet.microchip_number?.trim() === "" ? null : pet.microchip_number,
      };

      await axios.put(`${SERVER_URL}/${id}`, formattedPet);
      alert("Animalul a fost actualizat cu succes.");
      navigate("/admin/pets");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Eroare la salvare.");
    }
  };

  if (loading) return <p className="loading">Se încarcă...</p>;
  if (!pet) return <p className="error">Animalul nu a fost găsit</p>;

  return (
    <div className="pet-details-container">
      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>&lt; Înapoi</button>
      </div>

      <form className="pet-content" onSubmit={handleSubmit}>
        <div className="image-container">
          <img src={pet.image} alt={pet.name} className="pet-image" />
        </div>

        <div className="pet-info">
          <h1>Editează animalul</h1>

          <h3>Informații generale</h3>
          <input type="text" name="name" value={pet.name} onChange={handleChange} placeholder="Nume" />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input type="text" name="species" value={pet.species} onChange={handleChange} placeholder="Specie" />
          {errors.species && <p className="error-text">{errors.species}</p>}

          <input type="text" name="breed" value={pet.breed} onChange={handleChange} placeholder="Rasă" />
          {errors.breed && <p className="error-text">{errors.breed}</p>}

          <input type="number" name="age" value={pet.age} onChange={handleChange} placeholder="Vârstă" />
          {errors.age && <p className="error-text">{errors.age}</p>}

          <select name="gender" value={pet.gender} onChange={handleChange}>
            <option value="">-- Selectează genul --</option>
            <option value="Male">Mascul</option>
            <option value="Female">Femelă</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}

          <select name="size" value={pet.size} onChange={handleChange}>
            <option value="">-- Selectează dimensiunea --</option>
            <option value="Small">Mic</option>
            <option value="Medium">Mediu</option>
            <option value="Large">Mare</option>
          </select>
          {errors.size && <p className="error-text">{errors.size}</p>}

          <input type="text" name="color" value={pet.color || ""} onChange={handleChange} placeholder="Culoare" />
          {errors.color && <p className="error-text">{errors.color}</p>}

          <input type="text" name="image" value={pet.image} onChange={handleChange} placeholder="URL imagine" />
          {errors.image && <p className="error-text">{errors.image}</p>}

          <input type="date" name="arrival_date" value={pet.arrival_date} onChange={handleChange} />
          {errors.arrival_date && <p className="error-text">{errors.arrival_date}</p>}

          <input type="text" name="microchip_number" value={pet.microchip_number || ""} onChange={handleChange} placeholder="Microcip" />
          {errors.microchip_number && <p className="error-text">{errors.microchip_number}</p>}

          <h3>Stare medicală</h3>
          <select name="health_status" value={pet.health_status} onChange={handleChange}>
            <option value="">-- Selectează starea --</option>
            <option value="Healthy">Sănătos</option>
            <option value="Sick">Bolnav</option>
            <option value="Under treatment">În tratament</option>
          </select>
          {errors.health_status && <p className="error-text">{errors.health_status}</p>}

          <label>
            <input type="checkbox" name="vaccinated" checked={pet.vaccinated} onChange={handleChange} />
            Vaccinat
          </label>
          <label>
            <input type="checkbox" name="sterilized" checked={pet.sterilized} onChange={handleChange} />
            Sterilizat
          </label>

          <select name="adoption_status" value={pet.adoption_status} onChange={handleChange}>
            <option value="">-- Selectează statusul adopției --</option>
            <option value="available">Disponibil</option>
            <option value="reserved">Rezervat</option>
            <option value="adopted">Adoptat</option>
          </select>
          {errors.adoption_status && <p className="error-text">{errors.adoption_status}</p>}

          <h3>Note</h3>
          <textarea name="notes" value={pet.notes || ""} onChange={handleChange} placeholder="Note adiționale" rows="3" />

          <div className="buttons">
            <button className="contact-button" type="submit">Salvează</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PetEdit;
