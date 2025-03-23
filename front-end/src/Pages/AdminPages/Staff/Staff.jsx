import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditStaffModal from "../../../Components/StaffModal/StaffModal";
import './Staff.css';

const SERVER_URL = "http://localhost:8080";
const ITEMS_PER_PAGE = 10;

const Staff = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("*");
      return;
    }

    fetchEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [nameFilter, emailFilter, roleFilter, employees]);

  const fetchEmployees = () => {
    axios.get(`${SERVER_URL}/employees`)
      .then((res) => {
        const sorted = (res.data.employees || []).sort((a, b) => {
          const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setEmployees(sorted);
        setFiltered(sorted);
      })
      .catch((err) => console.error("Eroare la preluarea angajaților:", err));
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (id.toString() === currentUserId?.toString()) {
        alert("Nu poți șterge propriul cont.");
        return;
      }

      const confirm = window.confirm("Sigur vrei să ștergi acest angajat?");
      if (!confirm) return;

      await axios.delete(`${SERVER_URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchEmployees();
    } catch (err) {
      console.error("Eroare la ștergere:", err);
      alert("Eroare la ștergere.");
    }
  };

  const applyFilters = () => {
    let result = employees;

    if (nameFilter) {
      result = result.filter(emp =>
        `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (emailFilter) {
      result = result.filter(emp =>
        emp.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter(emp => emp.role === roleFilter);
    }

    setPage(1);
    setFiltered(result);
  };

  const handleResetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setRoleFilter("");
    setFiltered(employees);
    setPage(1);
  };

  const openEditModal = (emp) => {
    setSelectedEmployee(emp);
    setOpenModal(true);
  };

  const closeEditModal = () => {
    setSelectedEmployee(null);
    setOpenModal(false);
  };

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="staff-container">
      <h2>Gestionare angajați</h2>

      <div className="add-btn-wrapper">
        <button
          className="add-btn"
          onClick={() => {
            setSelectedEmployee(null);
            setOpenModal(true);
          }}
        >
          + Adaugă angajat
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Filtru nume"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtru email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">Toate rolurile</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button className="reset-btn" onClick={handleResetFilters}>Resetează</button>
      </div>

      {filtered.length === 0 ? (
        <p>Nu există angajați care să corespundă criteriilor.</p>
      ) : (
        <>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Nume</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Rol</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.first_name} {emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone_number}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button onClick={() => openEditModal(emp)} className="edit-btn">Editează</button>
                    {emp.id.toString() !== currentUserId?.toString() && (
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="delete-btn"
                    >
                      Șterge
                    </button>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={page === i + 1 ? "page-btn active" : "page-btn"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <EditStaffModal
        open={openModal}
        handleClose={closeEditModal}
        employee={selectedEmployee}
        onUpdated={fetchEmployees}
      />
    </div>
  );
};

export default Staff;
