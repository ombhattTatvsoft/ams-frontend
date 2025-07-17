import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText } from '@mui/material';
import dayjs from "dayjs";

const FormDatePicker = ({ value, onChange, label, id, name, error}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(date) =>
            onChange({
              target: { name, value: date ? date.toISOString() : null },
            })
          }
          slotProps={{
            textField: {
              id,
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
