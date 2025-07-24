import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";

const FormDatePicker = ({
  value,
  onChange,
  label,
  name,
  error,
  className,
  minDate,
  maxDate,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          className={className}
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(date) =>
            onChange({
              target: { name, value: date ? dayjs(date).format("YYYY-MM-DD") : null },
            })
          }
          slotProps={{
            textField: {
              name,
              fullWidth: true,
              margin: "dense",
              error: !!error,
            },
          }}
          sx={{ marginBottom: "1rem" }}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </LocalizationProvider>
    </>
  );
};

export default FormDatePicker;
