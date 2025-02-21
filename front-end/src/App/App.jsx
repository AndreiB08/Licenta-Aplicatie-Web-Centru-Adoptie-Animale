import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Pets from  "../Pages/Pets/Pets"
import PetDetails from  "../Pages/PetDetails/PetDetails"
import NotFound from "../Pages/NotFound/NotFound";
import Navbar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import "./App.css";

import AddAnimal from "../Pages/AddPet";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/add-animal" element={<AddAnimal />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
