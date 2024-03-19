import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Radio,
  Checkbox,
  RadioGroup,
  FormGroup,
  Switch,
  Input,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HelperStepNavigation from "../Signup/HelperRegistrationSteps/HelperStepNavigation";
import LocationAutocomplete from "../Common/LocationAutocomplete";
import { Container, styled } from "@mui/system";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CURRENCY_LIST,
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

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TitleWrapper = styled("div")({
  textAlign: "center",
  marginTop: " 0, 20px,", // Remove margin from the top
  color: "white", // Change color to white
});

const HeaderBar = styled("div")({
  backgroundColor: "#0a6259", // Background color
  padding: "10px 0", // Padding top and bottom
  marginBottom: "20px", // Margin bottom
});

const HelperRegistrationStep3 = ({saveStepDetails}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");
  const [startedDate, setstartedDate] = useState("");
  const [releasedDate, setreleasedDate] = useState("");
  const [isJobStillGoing, setIsJobStillGoing] = useState(false);
  const [currency, setCurrency] = useState("");
  const [isAnyLetter, setIsAnyLetter] = useState(false);
  const [provideLater, setProvideLater] = useState("");
  const [uploadLetter, setIsuploadLetter] = useState("");
  const [letterFile, setLetterFile] = useState(null);
  const [selectedDuties, setDuties] = useState([]);
  const [gender, setGender] = useState("");
  const [referenceAvailability, setReferenceAvailability] = useState("");
  const [isMoreWorkExperince, setIsMoreWorkExperince] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [helperWorkingExperience, setHelperWorkingExperience] = useState({
    workingExperience: "",
    workingLocation: "",
    employerNationality: "",
    numberOfFamilyMembers: 0,
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [formData, setFormData] = useState({});

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
        [name]: value,
      },
    }));
  };

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  useEffect(() => {
    const formDataFromStep2 = location.state.formData;
    console.log("Data from Step 2:", formDataFromStep2);
  }, [location.state.formData]);

  const handleFamilyMemberChange = (e, index) => {
    const { name, value, checked } = e.target;

    // Extract the property name and index
    const [property] = name.split(".").slice(1); // Extracts the index and property

    const updatedFamilyMembers = [...familyMembers];
    const existingMember = updatedFamilyMembers[index] || {
      age: 0,
      gender: "",
      requireSpecialHelp: [],
    }; // Initialize with default if not exists

    let updatedSpecialHelp = [...existingMember.requireSpecialHelp];
    if (property === "age") {
      updatedFamilyMembers[index] = {
        ...existingMember,
        age: parseInt(value),
      };
    } else if (property === "requireSpecialHelp") {
      if (checked) {
        updatedSpecialHelp.push(value);
      } else {
        updatedSpecialHelp = updatedSpecialHelp.filter(
          (item) => item !== value
        );
      }
      updatedFamilyMembers[index] = {
        ...existingMember,
        requireSpecialHelp: updatedSpecialHelp,
      };
    } else {
      updatedFamilyMembers[index] = {
        ...existingMember,
        [property]: value,
      };
    }

    setFamilyMembers(updatedFamilyMembers);
  };
  const handleNext = (data) => {
    saveStepDetails({}, "job_details");
    console.log({}, "///");
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   workExperience: {
    //     ...prevFormData.workExperience,
    //   },
    // }));

    // if (stepperActiveStep === steps.length - 1) {
    //   navigate("/registration_steps/step4", { state: { formData } });
    //   // navigate("/registration_steps/step4", { state: location.state });
    // } else {
    //   setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
  };

  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleUploadLetter = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
        uploadLetter: isChecked,
      },
    }));
  };

  const handleProvideLater = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
        provideLater: isChecked,
      },
    }));
  };

  const handleFileUpload = (setState, files) => {
    if (files && files.length > 0) {
      setState(files[0]);
    }
  };

  const handleReferenceAvailabilityChange = (event) => {
    setReferenceAvailability(event.target.value);
  };

  const handleMoreWorkExperinceChange = (event) => {
    setIsMoreWorkExperince(event.target.value);
  };
  const handleDuties = (event) => {
    const duties = event.target.name;
    if (event.target.checked) {
      setDuties((prevSelectedDuties) => [...prevSelectedDuties, duties]);
    } else {
      setDuties((prevSelectedDuties) =>
        prevSelectedDuties.filter((s) => s !== duties)
      );
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const steps = [
    {
      label: "Working Experiences",
      content: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="marital_status">
                  Experiences as Domestic Helper
                </FormLabel>
                <Controller
                  name="workingExperience"
                  control={control}
                  defaultValue=""
                  // rules={{ required: "Marital Status is required" }}
                  render={({ field }) => (
                    <SingleSelectField
                      field={field}
                      selectMenu={EXPERIENCE_LIST}
                    />
                  )}
                />
              </FormControl>
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
                  render={({ field }) => <LocationAutocomplete field={field} />}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl className="queRow LocationAutocomplete" fullWidth>
            <FormLabel id="employerNationality" className="formLabel">
              Employer Nationality *
            </FormLabel>
            <Controller
              name={"employerNationality"}
              control={control}
              type="text"
              // rules={{ required: t("answer_required_msg") }}
              defaultValue={""}
              render={({ field }) => <CountryDropdown field={field} />}
            />
            {/* <LocationAutocomplete onSelect={handleSelectLocation} /> */}
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="numberOfFamilyMembers" className="formLabel">
              Number of Family Members
            </FormLabel>
            <Controller
              name="numberOfFamilyMembers"
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
                  placeholder="1"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          {Array.from(
            { length: watch("numberOfFamilyMembers") },
            (_, index) => (
              <div key={index}>
                <Box className="customAgeBox">
                  {/* <Typography variant="h6">
                    Family Member {index + 1} Details
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <FormLabel className="age formLabel">Age</FormLabel>
                        <Controller
                          name={`familyMembers${index}_age`}
                          control={control}
                          defaultValue=""
                          // rules={{ required: "Whatsapp Number is required" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              onChange={(e) => {
                                // Allow only numeric input
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(numericValue);
                              }}
                              className="formInputFiled"
                              placeholder="65"
                              fullWidth
                              variant="outlined"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormControl className="queRow" fullWidth>
                        <FormLabel className="formLabel">Gender</FormLabel>
                        <Controller
                          name={`familyMembers${index}_gender`}
                          control={control}
                          defaultValue=""
                          // rules={{ required: t("gender_required") }}
                          render={({ field }) => (
                            <RadioGroupField
                              radioOptions={["Female", "Male"]}
                              field={field}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormGroup>
                    <FormLabel className="formLabel" component="legend">
                      Require Special Care
                    </FormLabel>
                    <RadioGroup className="radioCheckBtn">
                      <FormControlLabel
                        control={
                          <Controller
                            name={`familyMembers${index}_requireSpecialHelp`}
                            control={control}
                            defaultValue={[]}
                            // rules={{ required: "Select at least one skill" }}
                            render={({ field }) => (
                              <CheckBoxField
                                field={field}
                                checkBoxesValues={SPECIAL_HELP_REQUIREMENT}
                              />
                            )}
                          />
                        }
                      />
                    </RadioGroup>
                  </FormGroup>
                </Box>
                {/* Add more form controls for gender and special help */}
              </div>
            )
          )}
          <FormControl fullWidth className="queRow">
            <FormLabel id="houseArea" className="formLabel">
              House area (Square Feet)
            </FormLabel>
            <Controller
              name="houseArea"
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
                  placeholder="65"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="startedDate" className="formLabel">
                  Date started{" "}
                </FormLabel>
                <Controller
                  name="startedDate"
                  defaultValue=""
                  control={control}
                  // rules={{ required: t("dob_required") }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DatePicker
                        onChange={(date) =>
                          onChange(moment(date).format("YYYY-MM-DD"))
                        }
                        selected={value}
                        showIcon
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        // isClearable
                        placeholderText="Select Date of Birth"
                        className="formInputFiled full-width-datepicker"
                      />
                    );
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="releasedDate" className="formLabel">
                  Date released{" "}
                </FormLabel>
                <Controller
                  name="releasedDate"
                  defaultValue=""
                  control={control}
                  // rules={{ required: t("dob_required") }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <DatePicker
                        onChange={(date) =>
                          onChange(moment(date).format("YYYY-MM-DD"))
                        }
                        selected={value}
                        showIcon
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        // isClearable
                        placeholderText="Select Date of Birth"
                        className="formInputFiled full-width-datepicker"
                      />
                    );
                  }}
                />
              </FormControl>
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
              <FormControl fullWidth className="queRow">
                <FormLabel id="currency" className="formLabel">
                  Currency
                </FormLabel>
                <Controller
                  name="currency"
                  control={control}
                  defaultValue=""
                  // rules={{ required: "Marital Status is required" }}
                  render={({ field }) => (
                    <SingleSelectField
                      field={field}
                      selectMenu={CURRENCY_LIST}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="salary" className="formLabel">
                  Salary
                </FormLabel>
                <NumberField
                  control={control}
                  name={"salary"}
                  errors={errors}
                  placeholder={"Eg. 10000"}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth className="queRow">
            <FormLabel id="coHelperNumber" className="formLabel">
              How many co helper
            </FormLabel>
            <NumberField
              control={control}
              name={"coHelperNumber"}
              errors={errors}
              placeholder={"Eg. 2"}
            />
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="isAnyLetter" className="formLabel">
              Can you Provide Reference/Release/Recommendation Letter from
              Employer with this working Experience?
            </FormLabel>
            <Controller
              name="currency"
              control={control}
              defaultValue=""
              // rules={{ required: "Marital Status is required" }}
              render={({ field }) => (
                <SingleSelectField field={field} selectMenu={YES_NO} />
              )}
            />
          </FormControl>
          <FormGroup className="queRow">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Controller
                  name={`refrence_letter`}
                  control={control}
                  defaultValue=""
                  // rules={{ required: t("gender_required") }}
                  render={({ field }) => (
                    <RadioGroupField
                      radioOptions={["Upload Letter", "Provide It Later"]}
                      field={field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl fullWidth className="UploadFileCustom queRow">
            <div className="inputFile">
              <FileUploaderField
                name={"refrence_letter_file"}
                control={control}
                setFile={setLetterFile}
              />
            </div>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="referenceAvailability" className="formLabel">
              Reference Check Availability? *
            </FormLabel>
            <Controller
              name={`referenceAvailability`}
              control={control}
              defaultValue=""
              // rules={{ required: t("gender_required") }}
              render={({ field }) => (
                <RadioGroupField radioOptions={["Yes", "No"]} field={field} />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel id="duties" className="formLabel">
              Duties / other task
            </FormLabel>
            <FormGroup>
              <FormControl component="fieldset">
                <FormGroup className="radioCheckBtn otherTasks">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("New Born")}
                        onChange={handleDuties}
                        name="New Born"
                      />
                    }
                    label="New Born"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("Baby Sitting")}
                        onChange={handleDuties}
                        name="Baby Sitting"
                      />
                    }
                    label="Baby Sitting"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("Indian Cooking")}
                        onChange={handleDuties}
                        name="Indian Cooking"
                      />
                    }
                    label="Indian Cooking"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("Chinese Cooking")}
                        onChange={handleDuties}
                        name="Chinese Cooking"
                      />
                    }
                    label="Chinese Cooking"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("Gardening")}
                        onChange={handleDuties}
                        name="Gardening"
                      />
                    }
                    label="Gardening"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDuties.includes("Driving")}
                        onChange={handleDuties}
                        name="Driving"
                      />
                    }
                    label="Driving"
                  />
                </FormGroup>
              </FormControl>
            </FormGroup>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="reasonForLeaving" className="formLabel">
              Reason for Leaving
            </FormLabel>
            <Controller
              name={`reasonForLeaving`}
              control={control}
              defaultValue=""
              // rules={{ required: t("gender_required") }}
              render={({ field }) => (
                <SingleSelectField field={field} selectMenu={YES_NO} />
              )}
            />
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="experinceRemark" className="formLabel">
              Remark of your experience
            </FormLabel>
            <TextField
              className="formInputFiled"
              name="experinceRemark"
              {...register("experinceRemark")}
              // value={formData?.workExperience?.experinceRemark}
              // onChange={handleInputChange}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="moreWorkExperince" className="formLabel">
              Do you have any more working experiences?
            </FormLabel>
            <Controller
              name={`moreWorkExperince`}
              control={control}
              defaultValue=""
              // rules={{ required: t("gender_required") }}
              render={({ field }) => (
                <RadioGroupField radioOptions={["Yes", "No"]} field={field} />
              )}
            />
          </FormControl>
        </>
      ),
    },
    // Add more steps as needed
  ];

  const StyledFormContainer = styled(Grid)({});

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
                          onClick={handleNext}
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
