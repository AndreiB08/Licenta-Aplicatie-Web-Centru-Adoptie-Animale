import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './Dashboard.css';

const SERVER_URL = "http://localhost:8080";
const COLORS = ["#FF0000", "#008000", "#D8C142"];

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, adopted: 0, available: 0, reserved: 0 });

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
  }, []);

  const data = [
    { name: "Animale adoptate", value: stats.adopted },
    { name: "Animale disponibile", value: stats.available },
    { name: "Animale rezervate", value: stats.reserved },
  ];

  return (
    <div className="dashboard">
      {/* Cardurile cu cifrele aliniate corect */}
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

      {/* <div className="dashboard-">
        <Link to="/add-animal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Adaugă Animal</button>
        </Link>
        <Link to="/manage-adoptions">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Gestionează Adopțiile</button>
        </Link>
      </div> */}
    </div>
  );
};

export default Dashboard;
