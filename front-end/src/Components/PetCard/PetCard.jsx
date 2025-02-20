import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./PetCard.css";
import { useTranslation } from "react-i18next";

const getStatusClass = (status) => {
  switch (status) {
    case 'available':
      return 'status-available';
    case 'adopted':
      return 'status-adopted';
    case 'reserved':
      return 'status-reserved';
    default:
      return "";
  }
};

const getCardClass = (status) => {
  return status === 'reserved' ? 'pet-card reserved-card' : 'pet-card';
}

const PetCard = ({ name, species, breed, age, adoption_status, image }) => {
  const { t } =useTranslation();

  return (
    <Card sx={{ width: 300, margin: 2, boxShadow: 3 }} className={getCardClass(adoption_status)}>
      <CardMedia
        sx={{
          height: 220,
          width: "100%", 
          objectFit: "cover",
          objectPosition: "top"
        }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {species} - {breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vârstă: {age} ani
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold'}} className={`status ${getStatusClass(adoption_status)}`}>
        Status: {t(`adoption_status.${adoption_status}`)}
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: "#f8f9fa"}}>
        <Button
        size="small"
        variant="contained"
        sx={{ backgroundColor: "#048A81", "&:hover": { backgroundColor: "#036F68" } }}>
          {t("adopt")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
