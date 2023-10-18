import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addPatientAsync,
  updatePatientAsync,
  fetchWards,
  getAWardAsync
} from "../../features";

const PatientForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { wards } = useSelector(({ wards }) => wards);
  const patient = state ? state : null;

  const allGenders = ["Male", "Female", "Non-binary"];
  const [patientInput, setPatientInput] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : 0,
    gender: patient ? patient.gender : "Male",
    medicalHistory: patient ? patient.medicalHistory.join(", ") : "",
    contact: patient ? patient.contact : 0,
    ward: patient ? patient.ward._id : ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patient) {
      dispatch(
        updatePatientAsync({
          id: patient._id,
          updatedPatient: patientInput
        })
      );
      navigate(`/patients/${patient._id}`);
    } else {
      dispatch(addPatientAsync(patientInput));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchWards());
  }, []);

  return (
    <div className="page">
      <h2>{patient ? "Edit" : "Add"} patient</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Name: </strong>
              </td>
              <td>
                <input
                  placeholder="Enter Name"
                  type="text"
                  value={patientInput.name}
                  onChange={(e) =>
                    setPatientInput({ ...patientInput, name: e.target.value })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Age: </strong>
              </td>
              <td>
                <input
                  placeholder="Age"
                  type="number"
                  min={0}
                  value={patientInput.age}
                  onChange={(e) =>
                    setPatientInput({ ...patientInput, age: e.target.value })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
              </td>
              <td>
                {allGenders.map((gender) => (
                  <span key={gender}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={
                        patientInput.gender &&
                        patientInput.gender.toLowerCase() ===
                          gender.toLowerCase()
                      }
                      onChange={() =>
                        setPatientInput({ ...patientInput, gender })
                      }
                    />
                    {gender}
                  </span>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Medical History: </strong>
              </td>
              <td>
                <input
                  placeholder="Enter Medical History separated by commas"
                  type="text"
                  value={patientInput.medicalHistory}
                  onChange={(e) =>
                    setPatientInput({
                      ...patientInput,
                      medicalHistory: e.target.value
                        .replace(/ /g, "")
                        .split(",")
                    })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Contact: </strong>
              </td>
              <td>
                <input
                  placeholder="Contact"
                  type="number"
                  min={0}
                  value={patientInput.contact}
                  onChange={(e) =>
                    setPatientInput({
                      ...patientInput,
                      contact: e.target.value
                    })
                  }
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Ward: </strong>
              </td>
              <td>
                <select
                  onChange={(e) =>
                    setPatientInput({
                      ...patientInput,
                      ward: e.target.value
                    })
                  }
                  value={patientInput.ward}
                >
                  {wards.map(({ _id, wardNumber, specialization }) => (
                    <option value={_id} key={_id}>
                      {wardNumber} - {specialization}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">{patient ? "Update" : "Add"} Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
