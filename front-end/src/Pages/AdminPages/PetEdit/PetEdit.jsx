import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './PetEdit.css';

const SERVER_URL = "http://localhost:8080/pets";

const PetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${SERVER_URL}/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error("Failed to fetch animal:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPet((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${SERVER_URL}/${id}`, pet);
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
        <button className="back-button" onClick={() => navigate(-1)}>{"< Înapoi"}</button>
      </div>

      <form className="pet-content" onSubmit={handleSubmit}>
        <div className="image-container">
          <img src={pet.image} alt={pet.name} className="pet-image" />
        </div>

        <div className="pet-info">
          <h1>Editează animalul</h1>

          <h3>Informații generale</h3>
          <input type="text" name="name" value={pet.name} onChange={handleChange} placeholder="Nume" required />
          <input type="text" name="species" value={pet.species} onChange={handleChange} placeholder="Specie" required />
          <input type="text" name="breed" value={pet.breed} onChange={handleChange} placeholder="Rasă" />
          <input type="number" name="age" value={pet.age} onChange={handleChange} placeholder="Vârstă" />
          <input type="text" name="size" value={pet.size} onChange={handleChange} placeholder="Dimensiune" />
          <input type="text" name="gender" value={pet.gender} onChange={handleChange} placeholder="Gen" />
          <input type="text" name="color" value={pet.color || ""} onChange={handleChange} placeholder="Culoare" />
          <input type="text" name="image" value={pet.image} onChange={handleChange} placeholder="URL imagine" />
          <input type="date" name="arrival_date" value={pet.arrival_date} onChange={handleChange} />
          <input type="text" name="microchip_number" value={pet.microchip_number || ""} onChange={handleChange} placeholder="Microcip" />

          <h3>Stare medicală</h3>
          <input type="text" name="health_status" value={pet.health_status} onChange={handleChange} placeholder="Stare de sănătate" />
          <label>
            <input type="checkbox" name="vaccinated" checked={pet.vaccinated} onChange={handleChange} />
            Vaccinat
          </label>
          <label>
            <input type="checkbox" name="sterilized" checked={pet.sterilized} onChange={handleChange} />
            Sterilizat
          </label>
          <select name="adoption_status" value={pet.adoption_status} onChange={handleChange}>
            <option value="available">Disponibil</option>
            <option value="reserved">Rezervat</option>
            <option value="adopted">Adoptat</option>
          </select>

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
