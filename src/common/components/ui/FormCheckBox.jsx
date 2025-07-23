import { Checkbox, FormControlLabel } from "@mui/material";

function FormCheckBox({ checked = false, onChange, label, name }) {
  return (
    <FormControlLabel 
      control={
        <Checkbox
          sx={{paddingY:"0"}}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
}

export default FormCheckBox;