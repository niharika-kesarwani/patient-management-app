import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  fetchWards,
  updateHospitalStats,
  setTopWard
} from "../features";

const HospitalView = () => {
  const dispatch = useDispatch();
  const {
    hospital,
    patients: { patients },
    wards: { wards }
  } = useSelector(({ hospital, patients, wards }) => ({
    hospital,
    patients,
    wards
  }));

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, []);

  useEffect(() => {
    const totalPatients = patients.length;
    const totalCapacity = wards.reduce(
      (sum, { capacity }) => sum + capacity,
      0
    );
    let currentOccupancyRate;
    if (totalCapacity) {
      currentOccupancyRate = (patients.length / totalCapacity) * 100;
    } else {
      currentOccupancyRate = 0;
    }
    const wardCount = patients.reduce(
      (acc, { ward: { wardNumber } }) => ({
        ...acc,
        [wardNumber]: (acc[wardNumber] ?? 0) + 1
      }),
      {}
    );
    let topWard;
    if (Object.entries(wardCount).length !== 0) {
      topWard = Object.entries(wardCount).reduce(
        (final, [key, value]) => (value >= final[1] ? [key, value] : final),
        Object.entries(wardCount)[0]
      )[0];
    } else {
      topWard = "-";
    }
    dispatch(
      updateHospitalStats({ totalPatients, currentOccupancyRate, topWard })
    );
    dispatch(setTopWard(topWard));
  }, [patients, dispatch]);

  return (
    <div>
      <h2>Hospital View</h2>
      <p>
        <strong>Total Patients: </strong>
        {hospital.totalPatients}
      </p>
      <p>
        <strong>Current Occupancy Rate: </strong>
        {hospital.currentOccupancyRate.toFixed(2)}%
      </p>
      <p>
        <strong>Top Ward: </strong>
        {hospital.topWard ? hospital.topWard : "-"}
      </p>
    </div>
  );
};

export default HospitalView;
