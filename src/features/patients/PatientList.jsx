import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const PatientList = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Patients View</h2>
      <button onClick={() => navigate("/patients/add")}>Add Patient</button>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Ward</th>
          </tr>
          {patients.map(({ _id, name, age, gender, ward: { wardNumber } }) => (
            <tr key={_id} className="nav-items">
              <td>
                <NavLink className="nav-items" to={`/patients/${_id}`}>
                  {name}
                </NavLink>
              </td>
              <td>
                <NavLink className="nav-items" to={`/patients/${_id}`}>
                  {age}
                </NavLink>
              </td>
              <td>
                <NavLink className="nav-items" to={`/patients/${_id}`}>
                  {gender}
                </NavLink>
              </td>
              <td>
                <NavLink className="nav-items" to={`/patients/${_id}`}>
                  {wardNumber ?? "-"}
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
