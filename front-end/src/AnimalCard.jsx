import './AnimalCard.css';

function AnimalCard({ animal }) {
  return (
    <div className="animal-card">
      <h2>{animal.name}</h2>
      <p><strong>Species:</strong> {animal.species}</p>
      <p><strong>Age:</strong> {animal.age}</p>
      <p><strong>Status:</strong> {animal.adoption_status}</p>
    </div>
  );
}

export default AnimalCard;
