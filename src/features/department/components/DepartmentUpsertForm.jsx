import React from "react";
import { departmentSchema } from "../departmentSchema";
import { getDepartments, saveDepartment } from "../departmentSlice";
import UpsertForm from "../../../common/components/ui/UpsertFrom";
import { useDispatch } from "react-redux";

const DepartmentUpsertForm = ({
  editData,
  goBack,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <UpsertForm
        goBack={goBack}
        initialValues={{
          departmentId: editData?.departmentId || 0,
          departmentName: editData?.departmentName || "",
        }}
        validationSchema={departmentSchema}
        saveAction={saveDepartment}
        onSuccess={() => {
          goBack();
          dispatch(getDepartments());
        }}
        fields={[
          { name: "departmentName", label: "Name", type: "text" },  
        ]}
        confirmButtonText={!editData ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
  // return (
  //   <>
  //     <Formik
  //       enableReinitialize
  //       initialValues={{
  //         departmentId: editData?.id || 0,
  //         departmentName: editData?.departmentName || "",
  //       }}
  //       validationSchema={departmentSchema}
  //       onSubmit={(values) => {
  //         dispatch(saveDepartment(values)).then((action)=>{
  //           if(action.meta.requestStatus=="fulfilled"){
  //             setShowUpsertModal(false);
  //             setEditData(null);
  //             dispatch(getDepartments());
  //           }
  //         })
  //       }}
  //     >
  //       {({ values, errors, handleSubmit, handleChange, touched }) => (
  //         <form onSubmit={handleSubmit}>
  //           <FormInput
  //             value={values.departmentName}
  //             onChange={handleChange}
  //             label="Name"
  //             name="departmentName"
  //             error={touched.departmentName && errors.departmentName}
  //           />
  //           <div className="d-flex justify-content-end gap-2 mt-3">
  //             <FormButton className="sitebgcolor mb-1" type="submit">
  //               {values.departmentId === 0 ? "Add" : "Update"}
  //             </FormButton>
  //             <FormButton
  //               className="siteoutlinebtn mb-1"
  //               onClick={() => {
  //                 setShowUpsertModal(false);
  //                 setEditData(null);
  //               }}
  //             >
  //               Cancel
  //             </FormButton>
  //           </div>
  //         </form>
  //       )}
  //     </Formik>
  //   </>
  // );
};

export default DepartmentUpsertForm;
