import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePatientAsync } from "../../features";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patientToUpdate = useSelector(({ patients: { patients } }) =>
    patients.find((patient) => patient._id === id)
  );

  if (!patientToUpdate) {
    return <p>Patient not found!</p>;
  }

  const handleDelete = (id) => {
    dispatch(deletePatientAsync(id));
    navigate("/");
  };

  return (
    <div>
      <h2>Patient Detail</h2>
      <p>
        <strong>Name: </strong>
        {patientToUpdate.name}
      </p>
      <p>
        <strong>Age: </strong>
        {patientToUpdate.age}
      </p>
      <p>
        <strong>Gender: </strong>
        {patientToUpdate.gender}
      </p>
      <p>
        <strong>Medical History: </strong>
        {patientToUpdate.medicalHistory.join(", ")}
      </p>
      <p>
        <strong>Contact: </strong>
        {patientToUpdate.contact}
      </p>
      <p>
        <strong>Ward: </strong>
        {patientToUpdate.ward.wardNumber}
      </p>

      <NavLink to={`/patients/edit/${id}`} state={patientToUpdate}>
        <button>Edit Details</button>
      </NavLink>

      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default PatientDetail;
