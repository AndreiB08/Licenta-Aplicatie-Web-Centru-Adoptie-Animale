// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import "./Login.css";

// const SERVER_URL = "http://localhost:8080";

// const Login = () => {
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const [credentials, setCredentials] = useState({ email: "", password: "" });
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await axios.post(`${SERVER_URL}/employees/login`, credentials);
//             const { token, user } = response.data;

//             localStorage.setItem("token", token);
//             localStorage.setItem("userRole", user.role);

//             navigate("/dashboard"); // Redirecționare după login
//         } catch (err) {
//             setError(t("invalid_credentials"));
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="page-title">{t("login_title")}</h2>
//             <form onSubmit={handleSubmit} className="login-form">
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder={t("email")}
//                     value={credentials.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder={t("password")}
//                     value={credentials.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 {error && <p className="error">{error}</p>}
//                 <button type="submit">{t("login_button")}</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
