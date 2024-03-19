import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SimpleSelectField({
  MenuData,
  selected,
  handleONChange,
  name
}) {
  const { t } = useTranslation();
  return (
    <Select
      className="formInputFiled"
      //   value={selected || ""}
      onChange={handleONChange}
      name={name}
    >
      {MenuData.map((job) => (
        <MenuItem value={job.value}>{t(job.type)}</MenuItem>
      ))}
    </Select>
  );
}
