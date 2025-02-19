import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./PetCard.css";

const PetCard = ({ name, species, breed, age, adoption_status, image }) => {
  return (
    <Card sx={{ width: 300, margin: 2, boxShadow: 3 }}>
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
        <Typography 
          variant="body2" 
          sx={{ fontWeight: 'bold', color: adoption_status === 'available' ? 'green' : 'red' }}
        >
          Status: {adoption_status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
        size="small"
        variant="contained"
        sx={{ backgroundColor: "#048A81", "&:hover": { backgroundColor: "#036F68" } }}>
          Adoptă
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
