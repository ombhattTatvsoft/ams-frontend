import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormButton from "../../../common/components/ui/FormButton";
import Loader from "../../../common/components/ui/Loader";
import { deleteDepartment, getDepartments } from "../departmentSlice";
import DataTable from "../../../common/components/ui/DataTable";
import UpsertModal from "../../../common/components/modals/UpsertModal";
import UpsertForm from "./UpsertForm";
import DeleteModal from "./../../../common/components/modals/DeleteModal";

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
          <div className="d-flex gap-3">
            <a
              onClick={() => {
                setEditData(params.row);
                setShowUpsertModal(true);
              }}
            >
              <i className="fa-solid fa-pen"></i>
            </a>
            <a
              onClick={() => {
                setEditData(params.row);
                setShowDeleteModal(true);
              }}
            >
              <i className="fa-regular fa-trash-can"></i>
            </a>
          </div>
        ),
      },
    ];
  }, []);

  const rows = departments.map((d) => ({
    id: d.departmentId,
    departmentName: d.departmentName,
    userCount: d.userCount,
  }));

  const form = (
    <UpsertForm
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
            <DataTable columns={columns} rows={rows}></DataTable>
          </div>
        </div>
      </div>
      <UpsertModal
        showModal={showUpsertModal}
        setShowModal={setShowUpsertModal}
        title={entity}
        body={form}
      ></UpsertModal>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        entity={entity}
        onDelete={() =>
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
