import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({
  onChange,
  label,
  radioArray,
  defaultValue,
}) {
  const handleChange = (e) => {
    // alert(e.target.value);
    onChange(e.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {radioArray?.map((data, index) => {
          return (
            <FormControlLabel
              key={index}
              value={data}
              control={<Radio />}
              label={data}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
