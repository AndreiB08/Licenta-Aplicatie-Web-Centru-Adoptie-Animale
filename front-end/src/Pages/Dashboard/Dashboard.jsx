// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";

// const SERVER_URL = "http://localhost:8080";

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             navigate("/login");
//             return;
//         }

//         axios.get(`${SERVER_URL}/employees/me`, {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then((res) => setUser(res.data))
//         .catch(() => {
//             setError("Session expired. Please log in again.");
//             localStorage.removeItem("token");
//             navigate("/login");
//         });
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     if (error) return <p className="error">{error}</p>;
//     if (!user) return <p className="loading">Loading...</p>;

//     return (
//         <div className="dashboard-container">
//             <h2>Welcome, {user.first_name}!</h2>
//             <p><strong>Role:</strong> {user.role}</p>
//             <button onClick={handleLogout} className="logout-button">Logout</button>
//         </div>
//     );
// };

// export default Dashboard;
