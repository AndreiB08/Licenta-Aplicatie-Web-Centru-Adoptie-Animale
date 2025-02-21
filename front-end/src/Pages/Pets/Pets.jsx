import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "../../Components/PetCard/PetCard";
import { Grid } from "@mui/material";
import './Pets.css';
import { useTranslation } from "react-i18next";

const SERVER_URL = "http://localhost:8080";

const Pets = () => {
    const { t } = useTranslation();  
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_URL}/pets`)
            .then((res) => setPets(res.data.animals))
            .catch((err) => console.error("Error fetching pets: ", err));
    }, []);

    return (
        <div className="container">
            <h3 className="page-title">{t('adoption_status.available')}</h3>
            <Grid container spacing={3} justifyContent="center" className="grid-pets">
                {pets.length > 0 ? (
                    pets
                        .filter((pet) => pet.adoption_status !== 'adopted')
                        .map((pet) => (
                        <Grid item key={pet.id}>
                            <PetCard
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
        </div>
    );
};

export default Pets;
