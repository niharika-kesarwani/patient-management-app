import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWardAsync } from "../../features";

const WardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wardToUpdate = useSelector(({ wards: { wards } }) =>
    wards.find((ward) => ward._id === id)
  );

  if (!wardToUpdate) {
    return <p>Ward not found!</p>;
  }

  const handleDelete = (id) => {
    dispatch(deleteWardAsync(id));
    navigate("/wards");
  };

  return (
    <div>
      <h2>Ward Detail</h2>
      <p>
        <strong>Ward Number: </strong>
        {wardToUpdate.wardNumber}
      </p>
      <p>
        <strong>Capacity: </strong>
        {wardToUpdate.capacity}
      </p>
      <p>
        <strong>Specialization: </strong>
        {wardToUpdate.specialization}
      </p>

      <NavLink to={`/wards/edit/${id}`} state={wardToUpdate}>
        <button>Edit Details</button>
      </NavLink>

      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default WardDetail;
