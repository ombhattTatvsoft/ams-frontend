import React from "react";
import { useDispatch } from "react-redux";
import {
  createDatePicker,
  createInputField,
} from "../../../common/utils/formFieldGenerator";
import UpsertForm from "../../../common/components/ui/UpsertForm";
import { holidaySchema } from "./../holidaySchema";
import dayjs from "dayjs";
import { getHolidays, saveHoliday } from "../holidaySlice";

const HolidayUpsertForm = ({ editData, goBack }) => {
  const dispatch = useDispatch();
  return (
    <>
      <UpsertForm
        goBack={goBack}
        initialValues={{
          holidayId: editData.holidayId,
          holidayName: editData.holidayName,
          holidayDate: editData.holidayDate,
        }}
        validationSchema={holidaySchema}
        saveAction={saveHoliday}
        onSuccess={() => {
          goBack();
          dispatch(getHolidays());
        }}
        fields={[
          createInputField({ name: "holidayName", label: "Name" }),
          createDatePicker({ name: "holidayDate", label: "Date", minDate: dayjs().startOf("day").add(1,"day") }),
        ]}
        confirmButtonText={!editData.holidayId ? "Add" : "Update"}
      ></UpsertForm>
    </>
  );
};

export default HolidayUpsertForm;
