import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Pets from  "../Pages/Pets/Pets";
import PetDetails from  "../Pages/PetDetails/PetDetails";
import Login from "../Pages/AdminPages/Login/Login";
import Dashboard from "../Pages/AdminPages/Dashboard/Dashboard";
import AdminPets from "../Pages/AdminPages/AdminPets/AdminPets";
import PetEdit from "../Pages/AdminPages/PetEdit/PetEdit";
import Staff from "../Pages/AdminPages/Staff/Staff";
import NotFound from "../Pages/NotFound/NotFound";
import Navbar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import "./App.css";

import AddAnimal from "../Pages/AddPet";

const Layout = ({ children }) => {
  const location = useLocation();

  const hideLayout = ["/login"].includes(location.pathname);
  const hideFooterForAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className="main-content">{children}</div>
      {!hideLayout && !hideFooterForAdmin && <Footer />}
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
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          <Route path="/admin/edit-pet/:id" element={<PetEdit />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
