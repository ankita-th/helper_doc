import {
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import * as isoCountries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDropdown = ({ label, name, control, isRequired, errors }) => {
  const { t } = useTranslation();
  return (
    <>
      <FormControl fullWidth className="queRow">
        {label && (
          <FormLabel className="formLabel">
            {label}
            {isRequired && "*"}
          </FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          type="text"
          rules={{
            required: isRequired ? t("answer_required_msg") : isRequired,
          }}
          defaultValue={""}
          render={({ field }) => (
            <FormControl fullWidth className="formInputFiled">
              <InputLabel>{t("select_country")}</InputLabel>
              <Select
                {...field}
                defaultValue={[]}
                renderValue={(selected) =>
                  selected && isoCountries.getName(selected, "en")
                }
              >
                {Object.keys(isoCountries.getNames("en")).map((countryCode) => (
                  <MenuItem key={countryCode} value={countryCode}>
                    {isoCountries.getName(countryCode, "en")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors && errors[name] && <ErrorMessage msg={errors[name].message} />}
      </FormControl>
    </>
  );
};

export default CountryDropdown;
