import { MenuItem, Select } from "@mui/material";
import React from "react";

const SingleSelectField = ({ field, selectMenu }) => {
  return (
    <Select {...field} className="formInputFiled" placeholder="Please Select">
      {selectMenu.map((menu) => (
        <MenuItem value={menu}>{menu}</MenuItem>
      ))}
    </Select>
  );
};

export default SingleSelectField;
