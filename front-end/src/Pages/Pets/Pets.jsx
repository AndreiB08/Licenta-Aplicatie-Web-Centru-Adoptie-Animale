import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "../../Components/PetCard/PetCard";
import { Grid } from "@mui/material";
import './Pets.css';

const SERVER_URL = "http://localhost:8080";

const Pets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_URL}/pets`)
            .then((res) => setPets(res.data.animals))
            .catch((err) => console.error("Error fetching pets: ", err));
    }, []);

    return (
        <div className="container">
            <h3 className="page-title">Lista de animale disponibile pentru adopție</h3>
            <Grid container spacing={3} justifyContent="center" className="grid-pets">
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <Grid item key={pet.id}>
                            <PetCard
                                name={pet.name}
                                species={pet.species}
                                breed={pet.breed}
                                age={pet.age}
                                adoption_status={pet.adoption_status}
                                image={pet.image}
                            />
                        </Grid>
                    ))
                ) : (
                    <p>Momentan nu există animale disponibile.</p>
                )}
            </Grid>
        </div>
    );
};

export default Pets;
