import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:8080/employees/me"; // Modifică dacă ai un endpoint diferit

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(SERVER_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Unauthorized") {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setUser(data);
            }
        })
        .catch(err => setError("Failed to load user data"))
        .finally(() => setLoading(false));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome, {user?.first_name} {user?.last_name}!</h2>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="dashboard-content">
                <h3>Your Profile</h3>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone_number}</p>
                <p><strong>Role:</strong> {user?.role}</p>
            </div>
        </div>
    );
};

export default Dashboard;
