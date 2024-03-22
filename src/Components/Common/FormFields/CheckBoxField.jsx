import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const CheckBoxField = ({ checkBoxesValues, field }) => {
  return (
    <FormGroup className="radioCheckBtn">
      {checkBoxesValues.map((opt) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value.includes(opt.type)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                field.onChange(
                  isChecked
                    ? [...field.value, opt.type]
                    : field.value.filter((value) => value !== opt.type)
                );
              }}
              name={opt.type}
              value={opt.type}
            />
          }
          label={opt.type}
        />
      ))}
    </FormGroup>
  );
};

export default CheckBoxField;
