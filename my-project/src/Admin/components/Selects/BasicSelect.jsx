import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  itemsArray,
  inputStyle,
  selectedValue,
  defaultSelect,
  onChange,
  selectSize,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 240, ...inputStyle }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          size={selectSize}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          defaultValue={defaultSelect}
          // label="Age"
          onChange={handleChange}
        >
          {itemsArray &&
            itemsArray?.map((data, index) => {
              return (
                <MenuItem sx={{ color: "black" }} key={index} value={data}>
                  {data}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
