import * as Yup from "yup";
import { GENERAL } from "../../constants/general";

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .required(GENERAL.PASSWORD_REQ),
  newPassword: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .required(GENERAL.PASSWORD_REQ)
    .notOneOf([Yup.ref("currentPassword")], GENERAL.PASSWORD_NOT_SAME)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/,
      GENERAL.STRONG_PASSWORD
    ),
  confirmNewPassword: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .required(GENERAL.PASSWORD_REQ)
    .oneOf([Yup.ref("newPassword")], GENERAL.CONFIRM_PASSWORD_MATCH),
});

export const profileSchema = Yup.object().shape({
  userId: Yup.number(),
  name: Yup.string()
    .max(50, GENERAL.NAME_SIZE)
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, GENERAL.VALID_NAME)
    .required(GENERAL.NAME_REQ)
    .trim(),
  email: Yup.string()
    .max(50, GENERAL.EMAIL_SIZE)
    .email(GENERAL.EMAIL_VALID)
    .matches(
      /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      GENERAL.EMAIL_VALID
    )
    .required(GENERAL.EMAIL_REQ)
    .trim()
    .lowercase(),
});