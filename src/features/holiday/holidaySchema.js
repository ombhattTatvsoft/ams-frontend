import * as Yup from "yup";
import { GENERAL } from "../../constants/general";

export const holidaySchema = Yup.object().shape({
  holidayId: Yup.number(),
  holidayName: Yup.string()
    .max(100, GENERAL.HOLIDAY_NAME_SIZE)
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, GENERAL.VALID_NAME)
    .required(GENERAL.NAME_REQ),
});
