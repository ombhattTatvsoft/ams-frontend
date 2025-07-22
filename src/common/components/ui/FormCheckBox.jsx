import { Checkbox, FormControlLabel } from "@mui/material";

function FormCheckBox({ checked = false, onChange, label, id, name }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{paddingY:"0"}}
          id={id}
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