import React, { useState, useEffect } from "react";
import axios from "axios";
import './PetDetails.css';
import { useNavigate, useParams } from "react-router-dom";

const SERVER_URL = "http://localhost:8080/pets";

const PetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(`${SERVER_URL}/${id}`)
            .then((res) => {
                if (res.data) {
                    if (res.data.adoption_status === 'reserved' || res.data.adoption_status === 'adopted') {
                        navigate("*");
                    } else {
                        setPet(res.data);
                    }
                    setSelectedImage(res.data.image);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.error("Error fetching pet details: ", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error loading pet details</p>;

    return (
        <div className="pet-details-container">
            <div className="button-container">
                <button className="back-button" onClick={() => navigate(-1)}>{"< Back"}</button>
            </div>

            {pet ? (
                <div className="pet-content">
                    <div className="image-container">
                        <img src={selectedImage} alt={pet.name} className="pet-image" />
                    </div>
                    <div className="pet-info">
                        <h1>{pet.name} - {pet.species}</h1>
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        <p><strong>Age:</strong> {pet.age} years</p>
                        <p><strong>Size:</strong> {pet.size}</p>
                        <p><strong>Gender:</strong> {pet.gender}</p>
                        <p><strong>Color:</strong> {pet.color ? pet.color : "Not specified"}</p>
                        <p><strong>Health Status:</strong> {pet.health_status}</p>
                        <p><strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}</p>
                        <p><strong>Sterilized:</strong> {pet.sterilized ? "Yes" : "No"}</p>
                        <p><strong>Adoption Status:</strong> {pet.adoption_status}</p>
                        <p><strong>Arrival Date:</strong> {pet.arrival_date}</p>
                        <p><strong>Microchip Number:</strong> {pet.microchip_number ? pet.microchip_number : "Not available"}</p>
                        <p><strong>Last Updated:</strong> {new Date(pet.last_updated).toLocaleDateString()}</p>
                        <p><strong>Notes:</strong> {pet.notes ? pet.notes : "No additional information available"}</p>
                        <p>{pet.description}</p>

                        <div className="buttons">
                            <button className="contact-button">Contact</button>
                            <button className="other-pets-button" onClick={() => navigate("/pets")}>See other pets</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="error">Pet details not available</p>
            )}
        </div>
    );
};

export default PetDetails;
