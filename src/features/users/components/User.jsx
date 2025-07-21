import React, { useEffect, useMemo, useState } from "react";
import FormButton from "../../../common/components/ui/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../userSlice";
import Loader from "../../../common/components/ui/Loader";
import DataTable from "../../../common/components/ui/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import PopUpModal from "../../../common/components/ui/PopUpModal";
import UserUpsertForm from "./UserUpsertForm";
import { ROLES } from "./../../../constants/roles";
import DeleteModal from "../../../common/components/modals/DeleteModal";

const User = () => {
  const { loading, users } = useSelector((state) => state.user);
  const [showUpsertModal, setShowUpsertModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const entity = "User";

  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, users.length]);

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
        renderCell: (params) =>
          params.row.roleName !== ROLES.ADMIN && (
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

  const form = useMemo(() => (
    <UserUpsertForm
      editData={editData}
      goBack={() => setShowUpsertModal(false)}
    />
  ),[editData]);

  return (
    <>
      {loading && <Loader />}
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
              defaultSort="name"
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
      {/* delete modal */}
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        entity={entity}
        onClick={() =>
          dispatch(deleteUser(editData.userId)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
              setShowDeleteModal(false);
              dispatch(getUsers());
            }
          })
        }
      >
      </DeleteModal>
    </>
  );
};

export default User;
