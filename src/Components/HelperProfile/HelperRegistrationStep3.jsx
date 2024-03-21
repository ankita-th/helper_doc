import React, { useState } from "react";
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  RadioGroup,
  FormGroup,
  Switch,
} from "@mui/material";
import LocationAutocomplete from "../Common/LocationAutocomplete";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CURRENCY_LIST,
  DUTIES_OTHER_TASK,
  EXPERIENCE_LIST,
  SPECIAL_HELP_REQUIREMENT,
  YES_NO,
} from "./Constant";
import SingleSelectField from "../Common/FormFields/SingleSelectField";
import CountryDropdown from "../Common/FormFields/CountryDropdown";
import RadioGroupField from "../Common/FormFields/RadioGroupField";
import CheckBoxField from "../Common/FormFields/CheckBoxField";
import moment from "moment";
import NumberField from "../Common/FormFields/NumberField";
import FileUploaderField from "../Common/FormFields/FileUploaderField";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";
import SelectWithController from "../Common/FormFields/SelectWithController";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import CheckBoxFieldWithController from "../Common/FormFields/CheckBoxFieldWithController";
import DatePickerWIthController from "../Common/FormFields/DatePickerWIthController";

const HelperRegistrationStep3 = ({ saveStepDetails, setPageLoader }) => {
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");

  const [letterFile, setLetterFile] = useState(null);

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleNext = async (data) => {
    setPageLoader(true);
    console.log(data, "///data");
    const payload = { ...data };
    payload.location = currentLocation;
    let familMemberDetail = [];
    if (payload.familySize > 0) {
      for (let i = 0; i < payload.familySize; i++) {
        const familyDetail = {
          age: payload[`familyMembers${i}_age`],
          gender: payload[`familyMembers${i}_gender`],
          specialNeeds: payload[`familyMembers${i}_requireSpecialHelp`],
        };
        delete payload[`familyMembers${i}_age`];
        delete payload[`familyMembers${i}_gender`];
        delete payload[`familyMembers${i}_requireSpecialHelp`];
        familMemberDetail.push(familyDetail);
      }
      payload["familyMembers"] = familMemberDetail;
    }
    payload.period = {
      start: payload.startedDate,
      end: payload.releasedDate,
    };
    delete payload.startedDate;
    delete payload.releasedDate;
    payload.compensation = {
      currency: payload.currency,
      salary: payload.salary,
    };
    delete payload.currency;
    delete payload.salary;
    let fileUrl = "";
    if (letterFile?.name) {
      const fileUpload = await handleFileUploadToS3Bucket(letterFile);
      if (!fileUpload.error) {
        fileUrl = fileUpload.uploadedUrl;
      } else {
        setPageLoader(false);
        return;
      }
    }
    payload.references = {
      letter: payload.refrence_letter === "Upload Letter",
      available: payload.referenceAvailability,
      fileUrl: fileUrl,
    };
    delete payload.refrence_letter;
    delete payload.referenceAvailability;
    console.log(payload, "payload");
    saveStepDetails(payload, "job_details");
  };

  const handleFileUpload = (uploadFile, file) => {
    setLetterFile(file);
  };

  const steps = [
    {
      label: "Working Experiences",
      content: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <SelectWithController
                control={control}
                name={"experience"}
                options={EXPERIENCE_LIST}
                label={"Experiences as Domestic Helper"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow LocationAutocomplete" fullWidth>
                <FormLabel
                  className="workingLocation formLabel"
                  id="city_and_country"
                >
                  Working Location
                </FormLabel>
                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  // rules={{ required: t("location_required") }}
                  render={({ field }) => (
                    <LocationAutocomplete
                      onSelect={handleSelectLocation}
                      field={field}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <CountryDropdown
            control={control}
            name={"employerNationality"}
            label={"Employer Nationality"}
            isRequired={true}
            errors={errors}
          />
          <NumberField
            control={control}
            name={"familySize"}
            errors={errors}
            placeholder={"1"}
            label={"Number of Family Members"}
          />
          {Array.from({ length: watch("familySize") }, (_, index) => (
            <div key={index}>
              <Box className="customAgeBox">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <NumberField
                      control={control}
                      name={`familyMembers${index}_age`}
                      errors={errors}
                      placeholder={"40"}
                      label={"Age"}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RadioGroupWithController
                      label={t("gender")}
                      name={`familyMembers${index}_gender`}
                      radioOptions={["Female", "Male"]}
                      control={control}
                    />
                  </Grid>
                </Grid>
                <CheckBoxFieldWithController
                  label={"Require Special Care"}
                  name={`familyMembers${index}_requireSpecialHelp`}
                  checkBoxesOptions={SPECIAL_HELP_REQUIREMENT}
                  control={control}
                />
              </Box>
              {/* Add more form controls for gender and special help */}
            </div>
          ))}
          <NumberField
            control={control}
            name={"houseArea"}
            placeholder={"40"}
            label={"House area (Square Feet)"}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePickerWIthController
                name={"startedDate"}
                maxDate={new Date().toISOString()}
                label={"Date started"}
                control={control}
                placeholder={"Select Start Date"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePickerWIthController
                name={"releasedDate"}
                maxDate={
                  watch("startedDate")
                    ? moment(watch("startedDate")).toISOString()
                    : moment().toISOString()
                }
                label={"Date released"}
                control={control}
                placeholder={"Select Released Date"}
              />
            </Grid>
          </Grid>
          <FormGroup>
            <Controller
              name="isJobStillGoing"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  className="switcher"
                  control={<Switch {...field} />}
                  label="Visible to subscribed employers interested to have interview with you?"
                />
              )}
            />
          </FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SelectWithController
                control={control}
                name={"currency"}
                options={CURRENCY_LIST}
                label={"Currency"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <NumberField
                control={control}
                name={"salary"}
                errors={errors}
                placeholder={"Eg. 10000"}
                label={"Salary"}
              />
            </Grid>
          </Grid>
          <NumberField
            control={control}
            name={"coHelperNumber"}
            errors={errors}
            placeholder={"Eg. 2"}
            label={"How many co helper"}
          />

          <SelectWithController
            control={control}
            name={"experience_letter"}
            options={YES_NO}
            label={
              "Can you Provide Reference/Release/Recommendation Letter from Employer with this working Experience?"
            }
            isRequired={true}
            errors={errors}
          />
          <RadioGroupWithController
            name={"refrence_letter"}
            radioOptions={["Upload Letter", "Provide It Later"]}
            control={control}
          />
          {watch("refrence_letter") === "Upload Letter" && (
            <FormControl fullWidth className="UploadFileCustom queRow">
              <div className="inputFile">
                <FileUploaderField
                  name={"refrence_letter_file"}
                  control={control}
                  setFile={handleFileUpload}
                />
              </div>
            </FormControl>
          )}
          <RadioGroupWithController
            label={"Reference Check Availability"}
            isRequired={true}
            name={"referenceAvailability"}
            radioOptions={["Yes", "No"]}
            control={control}
          />
          <FormControl fullWidth>
            <FormLabel id="duties" className="formLabel">
              Duties / other task
            </FormLabel>
            <FormGroup>
              <FormControl component="fieldset">
                <RadioGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Controller
                        name={`duties`}
                        control={control}
                        defaultValue={[]}
                        // rules={{ required: "Select at least one skill" }}
                        render={({ field }) => (
                          <CheckBoxField
                            field={field}
                            checkBoxesValues={DUTIES_OTHER_TASK}
                          />
                        )}
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
          </FormControl>
          <SelectWithController
            control={control}
            name={"reasonForLeaving"}
            options={YES_NO}
            label={"Reason for Leaving"}
          />
          <FormControl fullWidth className="queRow">
            <FormLabel id="experinceRemark" className="formLabel">
              Remark of your experience
            </FormLabel>
            <TextField
              className="formInputFiled"
              name="experinceRemark"
              {...register("experinceRemark")}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
            />
          </FormControl>
          <RadioGroupWithController
            label={"Do you have any more working experiences?"}
            name={"moreWorkingExperience"}
            radioOptions={["Yes", "No"]}
            control={control}
          />
        </>
      ),
    },
    // Add more steps as needed
  ];

  return (
    <>
      <Grid item xs={12} md={6} className="stepsForm">
        <Box sx={{ maxWidth: 800 }} className="StepFormCol formDataInfo">
          <form onSubmit={handleSubmit(handleNext)}>
            <Stepper activeStep={stepperActiveStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    {step.content}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          className="arrowButton"
                          variant="contained"
                          type="submit"
                          // onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Next" : "Next"}
                        </Button>
                        {/* <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button> */}
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </form>
        </Box>
      </Grid>
    </>
  );
};

export default HelperRegistrationStep3;
