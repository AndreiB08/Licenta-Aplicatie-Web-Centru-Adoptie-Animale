import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './Dashboard.css';

const SERVER_URL = "http://localhost:8080";
const COLORS = ["#FF0000", "#008000", "#D8C142"];

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, adopted: 0, available: 0, reserved: 0 });
  const [requests, setRequests] = useState([]);

  const fetchUnapprovedRequests = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/adopt-request`);
      const unapproved = res.data
        .filter(req => req.approved === false)
        .sort((a, b) => new Date(a.pickupDateTime) - new Date(b.pickupDateTime));
      setRequests(unapproved);
    } catch (err) {
      console.error("Eroare la preluarea cererilor:", err);
    }
  };

  useEffect(() => {
    axios.get(`${SERVER_URL}/pets`)
      .then((res) => {
        const data = res.data.animals;
        const adopted = data.filter(animal => animal.adoption_status === "adopted").length;
        const available = data.filter(animal => animal.adoption_status === "available").length;
        const reserved = data.filter(animal => animal.adoption_status === "reserved").length;
        setStats({ total: data.length, adopted, available, reserved });
      })
      .catch((err) => console.error("Eroare la preluarea datelor:", err));

    fetchUnapprovedRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const request = requests.find(req => req.id === requestId);
      if (!request) return;

      await axios.put(`${SERVER_URL}/pets/${request.animalId}`, {
        adoption_status: "adopted"
      });

      await axios.put(`${SERVER_URL}/adopt-request/${requestId}`, {
        approved: true
      });

      const updatedPets = await axios.get(`${SERVER_URL}/pets`);
      const data = updatedPets.data.animals;
      const adopted = data.filter(animal => animal.adoption_status === "adopted").length;
      const available = data.filter(animal => animal.adoption_status === "available").length;
      const reserved = data.filter(animal => animal.adoption_status === "reserved").length;
      setStats({ total: data.length, adopted, available, reserved });

      setRequests(prev => prev.filter(r => r.id !== requestId));

      console.log(`Cererea ${requestId} aprobată și animalul marcat ca adoptat.`);
    } catch (error) {
      console.error("Eroare la acceptarea cererii:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/adopt-request/${id}`);

      const request = requests.find(req => req.id === id);
      if (request && request.animalId) {
        await axios.put(`${SERVER_URL}/pets/${request.animalId}`, {
          adoption_status: "available"
        });
      }

      setRequests(prev => prev.filter(req => req.id !== id));

      console.log(`Cererea ${id} respinsă și ștearsă cu succes.`);
    } catch (error) {
      console.error("Eroare la respingerea cererii:", error);
    }
  };

  const data = [
    { name: "Animale adoptate", value: stats.adopted },
    { name: "Animale disponibile", value: stats.available },
    { name: "Animale rezervate", value: stats.reserved },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-info">
        <h2>Total animale</h2>
        <p>{stats.total}</p>
      </div>
      <div className="dashboard-info">
        <h2>Adopții finalizate</h2>
        <p>{stats.adopted}</p>
      </div>
      <div className="dashboard-info">
        <h2>Animale rezervate</h2>
        <p>{stats.reserved}</p>
      </div>

      <div className="piechart">
        <h2>Statistici Adopții</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="adoption-requests">
        <h2>Cereri de Adopție</h2>
        {requests.length === 0 ? (
          <p>Nu există cereri momentan.</p>
        ) : (
          requests.map(req => (
            <div key={req.id} className="request-card">
              <p><strong>Nume:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Telefon:</strong> {req.phone}</p>
              <p><strong>Mesaj:</strong> {req.message || "–"}</p>
              <p><strong>Animal:</strong> {req.animal ? req.animal.name : "N/A"}</p>
              <p><strong>Specie:</strong> {req.animal ? req.animal.species : "N/A"}</p>
              <p><strong>Ridicare:</strong> {new Date(req.pickupDateTime).toLocaleString()}</p>
              <div className="request-buttons">
                <button className="accept" onClick={() => handleAccept(req.id)}>Acceptă</button>
                <button className="reject" onClick={() => handleReject(req.id)}>Respinge</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
