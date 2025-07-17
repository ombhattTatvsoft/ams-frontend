import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../../common/components/ui/FormButton";
import Loader from "../../../common/components/ui/Loader";
import { deleteDepartment, getDepartments } from "../departmentSlice";
import DataTable from "../../../common/components/ui/DataTable";
import DepartmentUpsertForm from "./DepartmentUpsertForm";
import DeleteModal from "./../../../common/components/modals/DeleteModal";
import PopUpModal from "../../../common/components/ui/PopUpModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const Department = () => {
  const { loading, departments } = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const entity = "Department";

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const columns = useMemo(() => {
    return [
      { field: "departmentName", headerName: "Name", flex: 1 },
      {
        field: "userCount",
        headerName: "Users",
        type: "number",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "id",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <div className="d-flex">
            <a
              onClick={() => {
                setEditData(params.row);
                setShowUpsertModal(true);
              }}
            >
              <IconButton color="inherit" size="">
                <EditIcon></EditIcon>
              </IconButton>
            </a>
            <a
              onClick={() => {
                setEditData(params.row);
                setShowDeleteModal(true);
              }}
            >
              <IconButton color="inherit" size="">
                <DeleteIcon fontSize="small"></DeleteIcon>
              </IconButton>
            </a>
          </div>
        ),
      },
    ];
  }, []);

  const form = (
    <DepartmentUpsertForm
      editData={editData}
      setEditData={setEditData}
      setShowUpsertModal={setShowUpsertModal}
    />
  );

  if (loading) return <Loader />;

  return (
    <>
      <div className="content">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h3>Departments</h3>
            <FormButton
              className="sitebgcolor"
              onClick={() => {
                setEditData(null);
                setShowUpsertModal(true);
              }}
            >
              + Add Department
            </FormButton>
          </div>
          <div className="col-12 mt-3">
            <DataTable columns={columns} rows={departments} rowId={(departments)=>departments.departmentId}></DataTable>
          </div>
        </div>
      </div>
      {/* upsert modal */}
      <PopUpModal
        showModal={showUpsertModal}
        setShowModal={setShowUpsertModal}
        title={entity}
        body={form}
      ></PopUpModal>

      {/* delete modal */}
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        entity={entity}
        onClick={() =>
          dispatch(deleteDepartment(editData.id)).then((action) => {
            if (action.meta.requestStatus == "fulfilled") {
              setShowDeleteModal(false);
              setEditData(null);
              dispatch(getDepartments());
            }
          })
        }
      ></DeleteModal>
    </>
  );
};

export default Department;
