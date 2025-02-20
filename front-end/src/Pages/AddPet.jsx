import React, { useState } from "react";
import axios from "axios";

const AddAnimal = () => {
  const [animal, setAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "male",  // Default value for gender
    size: "medium",  // Default value for size
    color: "",
    health_status: "healthy",  // Default value for health status
    vaccinated: false,
    sterilized: false,
    adoption_status: "available",  // Default value for adoption status
    image: "",
    arrival_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAnimal({ ...animal, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", animal); // <<--- Verificare dacă funcția este apelată

    try {
      console.log("se trimite")
      const response = await axios.post("http://localhost:8080/pets", animal);
      console.log("s-a trimis")
      alert("Animalul a fost adăugat cu succes!");
      console.log(response.data);
    } catch (error) {
      alert("Eroare la adăugarea animalului.");
      console.error(error);
    }
};


  return (
    <div className="admin-container">
      <h2>Adaugă un animal nou</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numle Animalului</label>
          <input type="text" name="name" value={animal.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Specie</label>
          <input type="text" name="species" value={animal.species} onChange={handleChange} required />
        </div>
        <div>
          <label>Rasă</label>
          <input type="text" name="breed" value={animal.breed} onChange={handleChange} required />
        </div>
        <div>
          <label>Vârstă</label>
          <input type="number" name="age" value={animal.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gen</label>
          <select name="gender" value={animal.gender} onChange={handleChange}>
            <option value="male">Mascul</option>
            <option value="female">Femelă</option>
          </select>
        </div>
        <div>
          <label>Dimensiune</label>
          <select name="size" value={animal.size} onChange={handleChange}>
            <option value="small">Mic</option>
            <option value="medium">Mediu</option>
            <option value="large">Mare</option>
          </select>
        </div>
        <div>
          <label>Culoare</label>
          <input type="text" name="color" value={animal.color} onChange={handleChange} />
        </div>
        <div>
          <label>Stare sănătate</label>
          <select name="health_status" value={animal.health_status} onChange={handleChange}>
            <option value="healthy">Sănătos</option>
            <option value="sick">Bolnav</option>
            <option value="under treatment">În tratament</option>
          </select>
        </div>
        <div>
          <label>Vaccinat</label>
          <input type="checkbox" name="vaccinated" checked={animal.vaccinated} onChange={handleCheckboxChange} />
        </div>
        <div>
          <label>Sterilizat</label>
          <input type="checkbox" name="sterilized" checked={animal.sterilized} onChange={handleCheckboxChange} />
        </div>
        <div>
          <label>Status adopție</label>
          <select name="adoption_status" value={animal.adoption_status} onChange={handleChange}>
            <option value="available">Disponibil pentru adopție</option>
            <option value="adopted">Adoptat</option>
            <option value="reserved">Rezervat</option>
          </select>
        </div>
        <div>
          <label>Imagine URL</label>
          <input type="text" name="image" value={animal.image} onChange={handleChange} />
        </div>
        <div>
          <label>Data sosirii</label>
          <input type="date" name="arrival_date" value={animal.arrival_date} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Adaugă Animalul</button>
        </div>
      </form>
    </div>
  );
};

export default AddAnimal;
