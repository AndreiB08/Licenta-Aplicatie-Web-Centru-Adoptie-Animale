import { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:8080/animals');
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setAnimals(data.animals || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <div>
      <h1>Animal List</h1>
      {error && <p className="error">{error}</p>}
      <div className="animal-list">
        {animals.length > 0 ? (
          animals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
        ) : (
          <p>No animals available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
