import { Routes, Route, NavLink } from "react-router-dom";

import { HospitalView, PatientView, WardView } from "./components";
import { PatientDetail, PatientForm, WardDetail, WardForm } from "./features";

import "./styles.css";

export default function App() {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "#a855f7" : ""
  });

  return (
    <div className="App">
      <div className="navbar">
        <h1>Patient Management System</h1>
        <nav>
          <ul className="horizontal">
            <li>
              <NavLink to="/" style={isActiveStyle} className="nav-items">
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/wards" style={isActiveStyle} className="nav-items">
                Wards
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hospital"
                style={isActiveStyle}
                className="nav-items"
              >
                Hospital
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<PatientView />} />
        <Route path="/wards" element={<WardView />} />
        <Route path="/hospital" element={<HospitalView />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/edit/:id" element={<PatientForm />} />
        <Route path="/wards/:id" element={<WardDetail />} />
        <Route path="/wards/add" element={<WardForm />} />
        <Route path="/wards/edit/:id" element={<WardForm />} />
      </Routes>
    </div>
  );
}
