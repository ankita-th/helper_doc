import React from "react";
import { Controller } from "react-hook-form";
import SingleSelectField from "./SingleSelectField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";

export default function SelectWithController({
  name,
  control,
  options,
  errors,
  isRequired,
  label,
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl fullWidth className="queRow">
        <FormLabel id="currency" className="formLabel">
          {label && (
            <FormLabel className="formLabel">
              {label}
              {isRequired && "*"}
            </FormLabel>
          )}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{
            required: isRequired ? t("answer_required_msg") : isRequired,
          }}
          render={({ field }) => (
            <Select
              {...field}
              className="formInputFiled"
              placeholder="Please Select"
            >
              {options.map((menu) => (
                <MenuItem value={menu.value_key}>{menu.value_key}</MenuItem>
              ))}
            </Select>
          )}
        />
        {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
      </FormControl>
    </>
  );
}
