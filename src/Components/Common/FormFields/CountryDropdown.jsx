import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import * as isoCountries from "i18n-iso-countries";
import { useTranslation } from "react-i18next";

isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryDropdown = ({ field }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth className="formInputFiled">
      <InputLabel>{t("select_country")}</InputLabel>
      <Select
        {...field}
        multiple
        defaultValue={[]}
        // IconComponent={() => (
        //   <IconButton size="small">
        //     <ArrowDropDownIcon />
        //   </IconButton>
        // )}
        renderValue={(selected) =>
          selected &&
          selected.map((code) => isoCountries.getName(code, "en")).join(", ")
        }
      >
        {Object.keys(isoCountries.getNames("en")).map((countryCode) => (
          <MenuItem key={countryCode} value={countryCode}>
            {isoCountries.getName(countryCode, "en")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;
