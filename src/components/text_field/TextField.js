import { TextField as MUITextField } from "@mui/material";

function TextField({ type, label, value, setValue }) {
  return (
    <MUITextField
      InputProps={{ style: { fontSize: "1.1rem" } }}
      InputLabelProps={{ style: { fontSize: "1.2rem" } }}
      type={type}
      label={label}
      autoComplete="off"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}

export default TextField;
