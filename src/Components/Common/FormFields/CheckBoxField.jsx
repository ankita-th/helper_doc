import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const CheckBoxField = ({ checkBoxesValues, field }) => {
  return (
    <FormGroup className="radioCheckBtn">
      {checkBoxesValues.map((check) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              name={check}
            />
          }
          label={check}
        />
      ))}
    </FormGroup>
  );
};

export default CheckBoxField;
