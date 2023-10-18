import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const WardList = ({ wards }) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Wards View</h2>
      <button onClick={() => navigate("/wards/add")}>Add Ward</button>
      <table>
        <tbody>
          <tr>
            <th>Ward Number</th>
            <th>Capacity</th>
            <th>Specialization</th>
          </tr>
          {wards.map(({ _id, wardNumber, capacity, specialization }) => (
            <tr key={_id} className="nav-items">
              <td>
                <NavLink className="nav-items" to={`/wards/${_id}`}>
                  {wardNumber}
                </NavLink>
              </td>
              <td>
                <NavLink className="nav-items" to={`/wards/${_id}`}>
                  {capacity}
                </NavLink>
              </td>
              <td>
                <NavLink className="nav-items" to={`/wards/${_id}`}>
                  {specialization}
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WardList;
