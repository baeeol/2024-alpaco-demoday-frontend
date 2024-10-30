import { FormControl, InputLabel, MenuItem, Select as MUISelect } from "@mui/material";
import styles from "./Select.module.css";

function Select({ label, value, setValue, items }) {
  return (
    <FormControl>
      <InputLabel style={{ fontSize: "1.2rem" }}>{label}</InputLabel>
      <MUISelect
        inputProps={{}}
        value={value}
        label={label}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 400,
            },
          },
        }}
      >
        {items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.name}
            </MenuItem>
          );
        })}
      </MUISelect>
    </FormControl>
  );
}

export default Select;
