import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "../../Components/PetCard/PetCard";
import { Grid, TextField, MenuItem, Pagination, Button } from "@mui/material";
import './Pets.css';
import { useTranslation } from "react-i18next";
import { animalSpecies } from "../../constants/animalSpecies";

const SERVER_URL = "http://localhost:8080";
const ITEMS_PER_PAGE = 10;

const Pets = () => {
    const { t } = useTranslation();
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState(1);

    const fetchPets = () => {
        axios.get(`${SERVER_URL}/pets`)
            .then((res) => {
                const availablePets = res.data.animals.filter((pet) => pet.adoption_status !== 'adopted');
                setPets(availablePets);
                setFilteredPets(availablePets);
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
        filterPets(species, searchName);
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        setSearchName(name);
        setPage(1);
        filterPets(selectedSpecies, name);
    };

    const handleResetFilters = () => {
        setSelectedSpecies("");
        setSearchName("");
        setPage(1);
        setFilteredPets(pets);
    };

    const filterPets = (species, name) => {
        let filtered = pets;

        if (species) {
            filtered = filtered.filter((pet) => pet.species.toLowerCase() === species.toLowerCase());
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
            <h3 className="page-title">{t('adoption_status.available')}</h3>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "center",
                    marginTop: "20px",
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
        </div>
    );
};

export default Pets;
