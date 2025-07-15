import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../../common/components/ui/FormButton";
import Loader from "../../../common/components/ui/Loader";
import { getDepartments } from "../departmentSlice";

const Department = () => {
  const { loading, departments } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      <div>
        <div className="content">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h3>Departments</h3>
              <FormButton className="sitebgcolor">+ Add Department</FormButton>
            </div>
            <div className="col-12">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
