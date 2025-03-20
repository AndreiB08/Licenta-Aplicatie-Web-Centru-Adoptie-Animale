import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Pets from  "../Pages/Pets/Pets";
import PetDetails from  "../Pages/PetDetails/PetDetails";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import NotFound from "../Pages/NotFound/NotFound";
import Navbar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import "./App.css";

import AddAnimal from "../Pages/AddPet";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = ["/login"].includes(location.pathname); // Ascunde Navbar și Footer pe pagina de login

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className="main-content">{children}</div>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
