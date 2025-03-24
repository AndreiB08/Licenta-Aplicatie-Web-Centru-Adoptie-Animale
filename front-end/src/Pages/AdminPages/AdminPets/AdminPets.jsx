import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "../../../Components/AdminPetCard/AdminPetCard";
import { Grid, TextField, MenuItem, Pagination, Button } from "@mui/material";
import AddPetModal from "../../../Components/AddPetModal/AddPetModal";
import './AdminPets.css';
import { useTranslation } from "react-i18next";
import { animalSpecies } from "../../../constants/animalSpecies";

const SERVER_URL = "http://localhost:8080";
const ITEMS_PER_PAGE = 10;

const AdminPets = () => {
  const { t } = useTranslation();
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchPets = () => {
    axios.get(`${SERVER_URL}/pets`)
      .then((res) => {
        setPets(res.data.animals);
        setFilteredPets(res.data.animals);
      })
      .catch((err) => console.error("Error fetching pets: ", err));
  };

  useEffect(() => {
    fetchPets();
  }, []);


  const handleSpeciesChange = (event) => {
    const species = event.target.value;
    setSelectedSpecies(species);
    setPage(1);
    filterPets(species, selectedStatus, searchName);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    setPage(1);
    filterPets(selectedSpecies, status, searchName);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setSearchName(name);
    setPage(1);
    filterPets(selectedSpecies, selectedStatus, name);
  };

  const handleResetFilters = () => {
    setSelectedSpecies("");
    setSelectedStatus("");
    setSearchName("");
    setPage(1);
    setFilteredPets(pets);
  };

  const filterPets = (species, status, name) => {
    let filtered = pets;

    if (species) {
      filtered = filtered.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
    }

    if (status) {
      filtered = filtered.filter((pet) => pet.adoption_status === status);
    }
    if (name) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  };

  const handlePageChange = (_, value) => setPage(value);

  const paginatedPets = filteredPets.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPets.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <h3 className="page-title">Animale</h3>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 20, color: "#048a81" }}>
        <Button
          variant="contained"
          onClick={() => setOpenAddModal(true)}
          sx={{
            backgroundColor: "#048a81",
            '&:hover': {
              backgroundColor: "#036c66"
            }
          }}
        >
          Adaugă animal
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "30px"
        }}
      >
        <TextField
          label="Caută după nume"
          value={searchName}
          onChange={handleNameChange}
          variant="outlined"
          sx={{ width: 250 }}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "8px"
            }
          }}
        />

        <TextField
          select
          label="Caută după specie"
          value={selectedSpecies}
          onChange={handleSpeciesChange}
          variant="outlined"
          sx={{ width: 250 }}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "8px"
            }
          }}
        >
          <MenuItem value="">Toate speciile</MenuItem>
          {animalSpecies.map((specie) => (
            <MenuItem key={specie} value={specie}>{specie}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status adopție"
          value={selectedStatus}
          onChange={handleStatusChange}
          variant="outlined"
          sx={{ width: 250 }}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "8px"
            }
          }}
        >
          <MenuItem value="">Toate statusurile</MenuItem>
          <MenuItem value="available">Disponibil</MenuItem>
          <MenuItem value="reserved">Rezervat</MenuItem>
          <MenuItem value="adopted">Adoptat</MenuItem>
        </TextField>

        <Button
          onClick={handleResetFilters}
          variant="outlined"
          sx={{
            width: 250,
            height: "56px",
            fontWeight: "bold",
            borderRadius: "8px",
            color: "#444",
            borderColor: "#bbb",
            backgroundColor: "#eee",
            "&:hover": {
              backgroundColor: "#ddd"
            }
          }}
        >
          Resetează filtrele
        </Button>
      </div>


      <Grid container spacing={3} justifyContent="center" className="grid-pets">
        {paginatedPets.length > 0 ? (
          paginatedPets.map((pet) => (
            <Grid item key={pet.id}>
              <PetCard
                id={pet.id}
                name={pet.name}
                species={t(`species.${pet.species}`)}
                breed={pet.breed}
                age={pet.age}
                adoption_status={pet.adoption_status}
                image={pet.image}
              />
            </Grid>
          ))
        ) : (
          <p className="p-not-available">{t('no_pets_available')}</p>
        )}
      </Grid>

      {totalPages > 1 && (
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </div>
      )}
      <AddPetModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        onAdded={fetchPets}
      />

    </div>
  );
};

export default AdminPets;
