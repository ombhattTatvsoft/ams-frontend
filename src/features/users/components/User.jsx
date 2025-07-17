import React, { useEffect, useMemo, useState } from "react";
import FormButton from "../../../common/components/ui/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../userSlice";
import Loader from "../../../common/components/ui/Loader";
import DataTable from "../../../common/components/ui/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import PopUpModal from "../../../common/components/ui/PopUpModal";
import UserUpsertForm from './UserUpsertForm';

const User = () => {
  const { loading, users } = useSelector((state) => state.user);
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const entity = "User";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = useMemo(() => {
    return [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "roleName", headerName: "Role", flex: 1 },
      { field: "managerName", headerName: "Reports to", flex: 1 },
      { field: "departmentName", headerName: "Department", flex: 1 },
      {
        field: "id",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        renderCell: () => (
          <div className="d-flex">
            <a
              onClick={() => {
                // setEditData(params.row);
                // setShowUpsertModal(true);
              }}
            >
              <IconButton color="inherit" size="">
                <EditIcon></EditIcon>
              </IconButton>
            </a>
            <a
              onClick={() => {
                // setEditData(params.row);
                // setShowDeleteModal(true);
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
    <UserUpsertForm
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
            <h3>Users</h3>
            <FormButton
              className="sitebgcolor"
              onClick={() => {
                setEditData(null);
                setShowUpsertModal(true);
              }}
            >
              + Add User
            </FormButton>
          </div>
          <div className="col-12 mt-3">
            <DataTable
              columns={columns}
              rows={users}
              rowId={(users) => users.userId}
            ></DataTable>
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
    </>
  );
};

export default User;
