import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WardList, fetchWards } from "../features";

const WardView = () => {
  const { wards, status, error } = useSelector(({ wards }) => wards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>{error}</p>}
      <WardList wards={wards} />
    </div>
  );
};

export default WardView;
