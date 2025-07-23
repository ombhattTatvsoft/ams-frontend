import * as Yup from "yup";
import { GENERAL } from "../../constants/general";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, GENERAL.EMAIL_SIZE)
    .matches(
      /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      GENERAL.EMAIL_VALID
    )
    .required(GENERAL.EMAIL_REQ),
  password: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .required(GENERAL.PASSWORD_REQ),
  rememberme: Yup.boolean(),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, GENERAL.EMAIL_SIZE)
    .matches(
      /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      GENERAL.EMAIL_VALID
    )
    .required(GENERAL.EMAIL_REQ),
});

export const resetPasswordSchema = Yup.object().shape({
  resetCode: Yup.string(),
  newPassword: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/,
      GENERAL.STRONG_PASSWORD
    )
    .required(GENERAL.PASSWORD_REQ),
  confirmPassword: Yup.string()
    .max(50, GENERAL.PASSWORD_SIZE)
    .oneOf([Yup.ref("newPassword"), null], GENERAL.CONFIRM_PASSWORD_MATCH)
    .required(GENERAL.PASSWORD_REQ),
});
