import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, TextField, Button, Box, Alert
} from "@mui/material";

const SERVER_URL = "http://localhost:8080";

const Account = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${SERVER_URL}/employees/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data;
      setForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        password: ""
      });
    } catch (err) {
      console.error("Eroare la încărcare:", err);
      setErrorMessage("A apărut o eroare la încărcarea contului.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const body = { ...form };

      if (!body.password || body.password.trim() === "") {
        delete body.password;
      }

      const res = await axios.put(`${SERVER_URL}/employees/me`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setSuccessMessage("Modificările au fost salvate cu succes!");
    }  catch (err) {
      console.error("Eroare la salvare:", err);
    
      // 👇 adaugă asta ca să vezi mesajul de eroare de la backend
      if (err.response && err.response.data) {
        console.log("Mesaj de la server:", err.response.data);
        setErrorMessage(err.response.data.message || "Eroare necunoscută.");
      } else {
        setErrorMessage("Eroare de rețea sau server.");
      }
    
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Contul meu
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Prenume"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Nume"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Telefon"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
        />
        <TextField
          label="Parolă nouă (opțional)"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Salvare..." : "Salvează modificările"}
        </Button>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Container>
  );
};

export default Account;
