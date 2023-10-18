import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addWardAsync, updateWardAsync } from "../../features";

const WardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const ward = state ? state : null;

  const allSpecializations = [
    "General Ward",
    "Emergency Ward",
    "Intensive Care Unit",
    "Intensive Coronary Care Unit",
    "Nursery",
    "Special Septic Nursery",
    "Burns Ward",
    "Postoperative Ward",
    "Postnatal Ward"
  ];
  const [wardInput, setWardInput] = useState({
    wardNumber: ward ? ward.wardNumber : 0,
    capacity: ward ? ward.capacity : 0,
    specialization: ward ? ward.specialization : allSpecializations[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ward) {
      dispatch(
        updateWardAsync({
          id: ward._id,
          updatedWard: wardInput
        })
      );
      navigate(`/wards/${ward._id}`);
    } else {
      dispatch(addWardAsync(wardInput));
      navigate("/wards");
    }
  };

  return (
    <div className="page">
      <h2>{ward ? "Edit" : "Add"} ward</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Ward Number: </strong>
              </td>
              <td>
                <input
                  placeholder="Ward Number"
                  type="number"
                  min={0}
                  value={wardInput.wardNumber}
                  onChange={(e) =>
                    setWardInput({ ...wardInput, wardNumber: e.target.value })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Capacity: </strong>
              </td>
              <td>
                <input
                  placeholder="Capacity"
                  type="number"
                  min={0}
                  value={wardInput.capacity}
                  onChange={(e) =>
                    setWardInput({ ...wardInput, capacity: e.target.value })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Specialization: </strong>
              </td>
              <td>
                <select
                  onChange={(e) =>
                    setWardInput({
                      ...wardInput,
                      specialization: e.target.value
                    })
                  }
                  value={wardInput.ward}
                >
                  {allSpecializations.map((specialization) => (
                    <option value={specialization} key={specialization}>
                      {specialization}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">{ward ? "Update" : "Add"} Ward</button>
      </form>
    </div>
  );
};

export default WardForm;
