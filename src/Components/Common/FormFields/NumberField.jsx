import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function NumberField({
  name,
  rule,
  errors,
  control,
  placeholder,
}) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        // rules={{ required: "Whatsapp Number is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            onChange={(e) => {
              // Allow only numeric input
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              field.onChange(numericValue);
            }}
            className="formInputFiled"
            placeholder={placeholder}
            fullWidth
            variant="outlined"
          />
        )}
      />
      {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
    </>
  );
}
