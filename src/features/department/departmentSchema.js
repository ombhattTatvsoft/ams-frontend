import * as Yup from "yup";
import { GENERAL } from "../../constants/general";

export const departmentSchema = Yup.object().shape({
    departmentId: Yup.number(),
    departmentName: Yup.string()
      .max(100, GENERAL.DEPARTMENT_NAME_SIZE)
      .matches(
        /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
        GENERAL.VALID_NAME
      )
      .required(GENERAL.NAME_REQ),
  });