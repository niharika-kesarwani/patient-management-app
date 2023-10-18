import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientList, fetchPatients } from "../features";

const PatientView = () => {
  const { patients, status, error } = useSelector(({ patients }) => patients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}
      <PatientList patients={patients} />
    </div>
  );
};

export default PatientView;
