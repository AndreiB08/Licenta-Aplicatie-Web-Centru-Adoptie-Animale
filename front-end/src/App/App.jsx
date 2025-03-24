import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Pets from "../Pages/Pets/Pets";
import PetDetails from "../Pages/PetDetails/PetDetails";
import Login from "../Pages/AdminPages/Login/Login";
import Dashboard from "../Pages/AdminPages/Dashboard/Dashboard";
import AdminPets from "../Pages/AdminPages/AdminPets/AdminPets";
import PetEdit from "../Pages/AdminPages/PetEdit/PetEdit";
import Staff from "../Pages/AdminPages/Staff/Staff";
import Account from "../Pages/AdminPages/Account/Account";
import NotFound from "../Pages/NotFound/NotFound";
import Navbar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pets"
            element={
              <ProtectedRoute>
                <AdminPets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-pet/:id"
            element={
              <ProtectedRoute>
                <PetEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute>
                <Staff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
