import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";

export default function NumberField({
  name,
  errors,
  control,
  placeholder,
  label,
  isRequired,
}) {
  const { t } = useTranslation();
  return (
    <>
      <FormControl fullWidth className="queRow">
        <FormLabel id="salary" className="formLabel">
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
      </FormControl>
    </>
  );
}
