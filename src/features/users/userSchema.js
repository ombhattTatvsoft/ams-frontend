import * as Yup from "yup";
import { GENERAL } from "../../constants/general";

export const userSchema = Yup.object().shape({
  userId: Yup.number(),
  name: Yup.string()
    .max(50, GENERAL.NAME_SIZE)
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, GENERAL.VALID_NAME)
    .required(GENERAL.NAME_REQ),
  email: Yup.string()
    .max(50, GENERAL.EMAIL_SIZE)
    .email(GENERAL.EMAIL_VALID)
    .matches(
      /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      GENERAL.EMAIL_VALID
    )
    .required(GENERAL.EMAIL_REQ),
  roleId: Yup.number().min(2, GENERAL.ROLE_REQ),
  departmentId: Yup.number().min(1, GENERAL.DEPT_REQ),
  managerId: Yup.number().when("roleId", {
    is: (val) => val !== 2,
    then: (schema) => schema.min(1, GENERAL.MANAGER_REQ),
    otherwise: (schema) => schema.notRequired(),
  }),
});
