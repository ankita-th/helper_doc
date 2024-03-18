// components/Signup/HelperRegistrationSteps/HelperRegistrationStep2.tsx
import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  Checkbox,
  Input,
  FormGroup,
  Switch,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import HelperStepNavigation from "../Signup/HelperRegistrationSteps/HelperStepNavigation";
// import { MultiSelect } from "react-multi-select-component";
import { PhoneInput } from "react-international-phone";
// import { FormControl as MuiFormControl } from "@mui/material";
import LocationAutocomplete from "../Common/LocationAutocomplete";
import DatePicker from "react-datepicker";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import OtherLanguagesOptions from "../Common/OtherLanguageOptions";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import LocationSvg from "../../../../public/locationstepper.svg";

import "react-international-phone/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import RadioGroupField from "../Common/FormFields/RadioGroupField";
import SingleSelectField from "../Common/FormFields/SingleSelectField";
import CheckBoxField from "../Common/FormFields/CheckBoxField";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import {
  EDUCATION_LEVEL,
  LANGUAGE_LEVEL,
  MAJOR_STUDY,
  MARITAL_STATUS,
  RELIGION,
  SKILLS,
  SPOKEN_LANGUAGE,
} from "./Constant";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DocumnetIcon from "../../Assets/SVGIcons/DocumnetIcon";
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

const HelperRegistrationStep2 = ({
  formData,
  setFormData,
  saveStepDetails,
}) => {
  const location = useLocation();

  const [showOtherLanguage, setOtherLanguage] = useState(false);

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [activeStep, setActiveStep] = useState(1);
  const [stepperActiveStep, setStepperActiveStep] = useState(0); // For the stepper
  const [gender, setGender] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isWhatsappNumberVisible, setIsWhatsappNumberVisible] = useState(false);
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState(null);
  const [hasFirstAidCertification, setHasFirstAidCertification] =
    useState(false);
  const [firstAidFile, setFirstAidFile] = useState(null);
  const [hasElderlyCaregiving, setHasElderlyCaregiving] = useState(false);
  const [elderlyCaregivingFile, setElderlyCaregivingFile] = useState(null);
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [hasNewBornCaregiving, setHasNewBornCaregiving] = useState(false);
  const [newBornCaregivingFile, setNewBornCaregivingFile] = useState(null);
  const [hasAppliedCountryLicense, setHasAppliedCountryLicense] =
    useState(false);
  const [appliedCountryLicenseFile, setAppliedCountryLicenseFile] =
    useState(null);
  // State for "About Your Family" form data
  const [familyData, setFamilyData] = useState({
    spouseAge: "",
    spouseOccupation: "",
    numberOfBrothers: "",
    numberOfSisters: "",
    familyOrder: "",
    ageOfSons: "",
    ageOfDaughters: "",
  });

  // State for "Education" form data
  const [educationData, setEducationData] = useState({
    educationLevel: "",
    studyMajor: "",
    nativeLanguage: "",
    otherKnownLanguages: [],
    otherLanguages: [],

    // Add other fields as needed
  });
  // useEffect for handling side effects
  useEffect(() => {
    // Retrieve data from the previous step
    const prevStepData = location.state.formData;

    // Log the data
    console.log("Data from previous step:", prevStepData);
  }, [location.state.formData]);

  const handleSkillsChange = (event) => {
    const skill = event.target.name;
    if (event.target.checked) {
      setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, skill]);
    } else {
      setSelectedSkills((prevSelectedSkills) =>
        prevSelectedSkills.filter((s) => s !== skill)
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  // Function to handle next button click
  const handleNext = (data) => {
    if (stepperActiveStep < steps.length - 1) {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      const payload = {
        aboutYou: {
          fullName: data.fullName,
          gender: data.gender,
          passportOrHKID: data.passportOrHKID,
          maritalStatus: data.maritalStatus,
          religion: data.religion,
          whatsapp: {
            number: data.whatsapp,
            isVisible: data.isWhatsappNumberVisible,
          },
          dob: data.dob,
          physicalAttributes: {
            height: data.height,
            weight: data.weight,
          },
          location: data.location,
          skills: data.skills,
        },
        aboutYourFamily: {
          age: data.age,
          occupation: data.occupation,
          brothers: data.brothers,
          sisters: data.sisters,
          familyOrder: data.familyOrder,
          sonsAge: data?.ageOfSons?.length > 0 ? data.ageOfSons.split(",") : [],
          daughtersAge:
            data?.ageOfDaughters?.length > 0
              ? data.ageOfDaughters.split(",")
              : [],
        },
        education: {
          level: data?.level,
          major: data.major,
          languages: {
            native: data.languages,
          },
          otherLanguages: {
            language: data.otherLanguages,
            level: data.otherLanguageLevel,
          },
          licensesAndCertificates: {
            drivingLicenseFile: drivingLicenseFile,
            firstAidCertificateFile: firstAidFile,
            elderlyCaregivingCertificateFile: elderlyCaregivingFile,
            babyCaregivingCertificateFile: newBornCaregivingFile,
            appliedCountryLicenseFile: appliedCountryLicenseFile,
          },
        },
      };
      saveStepDetails(payload, "working_experience");
    }

    // If the user is on the last step, navigate to Step 3 with the form data
    // if (stepperActiveStep === steps.length - 1) {
    // const formDataForStep3 = {
    //   fullName: formData.fullName,
    //   phoneNumber: formData.phoneNumber,
    //   whatsappNumber: whatsappNumber,
    //   email: formData.email,
    //   password: formData.password,
    //   passwordConfirmation: formData.passwordConfirmation,
    //   termsAndConditions: formData.termsAndConditions,
    //   role: formData.role,
    //   gender: gender,
    //   passportNumber: passportNumber,
    //   maritalStatus: maritalStatus,
    //   religion: religion,
    //   dob: dob,
    //   height: height,
    //   weight: weight,
    //   currentLocation: currentLocation,
    //   selectedSkills: selectedSkills,
    //   familyData: familyData,
    //   educationData: {
    //     ...educationData,
    //     // Include otherLanguages in educationData
    //     otherLanguages: educationData.otherLanguages.map((language) => ({
    //       name: language.name,
    //       proficiency: language.proficiency,
    //     })),
    //   },
    // };
    // Navigate to Step 3 and pass the data in the location state
    // navigate("/registration_steps/step3", {
    //   state: { formData: formDataForStep3, otherLanguages: otherLanguages },
    // });
    // } else {
    // If the user is not on the last step, proceed to the next step
    //   setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
  };

  const handleDeleteOtherLanguage = () => {
    setOtherLanguage(false);
    setValue("otherLanguage", "");
    setValue("otherLanguageLevel", "");
  };

  // Function to handle back button click
  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Event handlers for file uploads
  const handleCheckboxChange = (setState, e) => {
    setState(e.target.checked);
  };

  const handleFileUpload = (setState, files) => {
    if (files && files.length > 0) {
      setState(files[0]);
    }
  };

  const StyledFormContainer = styled(Grid)({});

  const steps = [
    {
      label: "About You",
      content: (
        <>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="fullName">
              {t("full_name")} *
            </FormLabel>
            <TextField
              className="formInputFiled"
              name="fullName"
              placeholder="John Smith"
              {...register("fullName", {
                required: t("name_required"),
              })}
            />
            {errors.fullName && <ErrorMessage msg={errors.fullName?.message} />}
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="gender">
              {t("gender")} *
            </FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{ required: t("gender_required") }}
              render={({ field }) => (
                <RadioGroupField
                  radioOptions={["Female", "Male"]}
                  field={field}
                />
              )}
            />
            {errors.gender && <ErrorMessage msg={errors.gender?.message} />}
          </FormControl>
          {/* Passport Number / HKID */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="passportNumber">
              Passport Number / HKID *
            </FormLabel>
            <TextField
              className="formInputFiled"
              fullWidth
              placeholder="e.g. X123456(A)"
              variant="outlined"
              {...register("passportOrHKID", {
                required: t("passport_hkid_required"),
              })}
            />
            {errors.passportOrHKID && (
              <ErrorMessage msg={errors.passportOrHKID?.message} />
            )}
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="marital_status">
                  Marital Status *
                </FormLabel>
                <Controller
                  name="maritalStatus"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Marital Status is required" }}
                  render={({ field }) => (
                    <SingleSelectField
                      field={field}
                      selectMenu={MARITAL_STATUS}
                    />
                  )}
                />
                {errors.maritalStatus && (
                  <ErrorMessage msg={errors.maritalStatus?.message} />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Religion */}
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="religion">
                  Religion *
                </FormLabel>
                <Controller
                  name="religion"
                  control={control}
                  defaultValue=""
                  rules={{ required: t("religion_required") }}
                  render={({ field }) => (
                    <SingleSelectField field={field} selectMenu={RELIGION} />
                  )}
                />
                {errors.religion && (
                  <ErrorMessage msg={errors.religion?.message} />
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Whatsapp Number */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="whatsappNumber">
              Whatsapp Number *
            </FormLabel>
            <Controller
              name="whatsapp"
              control={control}
              defaultValue=""
              rules={{ required: t("whatsapp_required") }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="hk"
                  inputStyle={{ width: "100%" }}
                />
              )}
            />
            {errors.whatsapp && <ErrorMessage msg={errors.whatsapp?.message} />}
          </FormControl>
          <FormGroup>
            <Controller
              name="isWhatsappNumberVisible"
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
          {/* Date of Birth */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="dob">
              Date of Birth{" "}
            </FormLabel>

            <Controller
              name="dob"
              defaultValue=""
              control={control}
              rules={{ required: t("dob_required") }}
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
            {errors.dob && <ErrorMessage msg={errors.dob?.message} />}
          </FormControl>

          {/* Height (CM) and Weight (KG) */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="height">
                  Height (CM){" "}
                </FormLabel>
                <Controller
                  name="height"
                  control={control}
                  defaultValue=""
                  // rules={{ required: "Height is required" }}
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
                      placeholder="170"
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="weight">
                  Weight (KG){" "}
                </FormLabel>
                <Controller
                  name="weight"
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
          </Grid>
          {/* Current Location */}
          <FormControl className="queRow LocationAutocomplete" fullWidth>
            <FormLabel className="formLabel" id="city_and_country">
              Your Current location: city and country *
            </FormLabel>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: t("location_required") }}
              render={({ field }) => (
                <LocationAutocomplete
                  onSelect={handleSelectLocation}
                  field={field}
                />
              )}
            />
            {errors.location && <ErrorMessage msg={errors.location?.message} />}
            {/* <img src={LocationSvg}/> */}
          </FormControl>
          {/* Skills */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel large" id="skills">
              Skills
            </FormLabel>
            <FormGroup>
              <FormControl component="fieldset">
                <FormGroup className="skillsCol">
                  <Controller
                    name="skills"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Select at least one skill" }}
                    render={({ field }) => (
                      <>
                        {SKILLS.map((skill) => (
                          <>
                            <FormLabel className="formLabel" component="legend">
                              {skill.skill_type}
                            </FormLabel>
                            <CheckBoxField
                              field={field}
                              checkBoxesValues={skill.skile_opt}
                            />
                          </>
                        ))}
                      </>
                    )}
                  />
                </FormGroup>
                {errors.skills && <ErrorMessage msg={errors.skills?.message} />}
              </FormControl>
            </FormGroup>
          </FormControl>
        </>
      ),
    },
    {
      label: "About Your Family",
      content: (
        <>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="spouseAge">
              Spouse Age(If Any)
            </FormLabel>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericValue);
                  }}
                  className="formInputFiled"
                  placeholder="e.g 25"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="spouseOccupation">
              Spouse Occupation (If any)
            </FormLabel>
            <Controller
              name="occupation"
              control={control}
              defaultValue=""
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="e.g 25"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="numberOfBrothers">
              Number of Brother(s)
            </FormLabel>
            <Controller
              name="brothers"
              control={control}
              defaultValue=""
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="e.g 2"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="numberOfSisters">
              Number of Sister(s)
            </FormLabel>
            <Controller
              name="sisters"
              control={control}
              defaultValue=""
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="e.g 2"
                  label=""
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="familyOrder">
              Order in your family (1st 2nd 3rd)
            </FormLabel>
            <Controller
              name="familyOrder"
              control={control}
              defaultValue=""
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="2"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="ageOfSons">
              Children age son(s)
            </FormLabel>
            <Controller
              name="ageOfSons"
              control={control}
              defaultValue={[]}
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="13"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9,]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="ageOfDaughters">
              Children age daughter(s)
            </FormLabel>
            <Controller
              name="daughtersAge"
              control={control}
              defaultValue={[]}
              // rules={{ required: t("age_required") }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="formInputFiled"
                  placeholder="11"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    // Allow only numeric input
                    const numericValue = e.target.value.replace(/[^0-9,]/g, "");
                    field.onChange(numericValue);
                  }}
                />
              )}
            />
          </FormControl>
        </>
      ),
    },
    {
      label: "Education",
      content: (
        <>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="educationLevel">
              Education Level *
            </FormLabel>
            <Controller
              name="level"
              control={control}
              defaultValue=""
              rules={{ required: "Education level is required" }}
              render={({ field }) => (
                <SingleSelectField field={field} selectMenu={EDUCATION_LEVEL} />
              )}
            />
            {errors.level && <ErrorMessage msg={errors.level?.message} />}
          </FormControl>

          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="studyMajor">
              What is your study major *
            </FormLabel>
            <Controller
              name="major"
              control={control}
              defaultValue=""
              rules={{ required: "Major study is required" }}
              render={({ field }) => (
                <SingleSelectField field={field} selectMenu={MAJOR_STUDY} />
              )}
            />
            {errors.major && <ErrorMessage msg={errors.major.message} />}
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="nativeLanguage">
              Native Language *
            </FormLabel>
            <Controller
              name="languages"
              control={control}
              defaultValue=""
              rules={{ required: "Native language is required" }}
              render={({ field }) => (
                <SingleSelectField field={field} selectMenu={SPOKEN_LANGUAGE} />
              )}
            />
            {errors.languages && (
              <ErrorMessage msg={errors.languages.message} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel className="formLabel" id="religion">
              Other Spoken Languages
            </FormLabel>
            <Button
              variant="contained"
              className="languageBtn"
              onClick={() => setOtherLanguage(true)}
            >
              Add Language
            </Button>
          </FormControl>
          {showOtherLanguage && (
            <>
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="nativeLanguage">
                  Other Spoken Language
                </FormLabel>
                <Controller
                  name="otherLanguage"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SingleSelectField
                      field={field}
                      selectMenu={SPOKEN_LANGUAGE}
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ minWidth: 120, mr: 2 }} className="queRow">
                <FormLabel className="formLabel">Level</FormLabel>
                <Controller
                  name="otherLanguageLevel"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SingleSelectField
                      field={field}
                      selectMenu={LANGUAGE_LEVEL}
                      errors={errors}
                    />
                  )}
                />
              </FormControl>
              <Button
                variant="contained"
                className="delBtn"
                onClick={handleDeleteOtherLanguage}
              >
                <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
                Delete
              </Button>
            </>
          )}

          <Grid container className="queRow certificate UploadFileCustom">
            <Grid className="certificateCheck">
              <div className="FileUploadtion">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasDrivingLicense}
                        onChange={(e) =>
                          handleCheckboxChange(setHasDrivingLicense, e)
                        }
                      />
                    }
                    label="Driving License"
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={"drivingLicenseFile"}
                    control={control}
                    setFile={setDrivingLicenseFile}
                  />
                  {/* <DocumnetIcon />
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(setDrivingLicenseFile, e.target.files)
                    }
                  /> */}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container className="queRow certificate UploadFileCustom">
            <Grid className="certificateCheck">
              <div className="FileUploadtion">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasFirstAidCertification}
                        onChange={(e) =>
                          handleCheckboxChange(setHasFirstAidCertification, e)
                        }
                      />
                    }
                    label="First Aid Certification"
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={"drivingLicenseFile"}
                    control={control}
                    setFile={setFirstAidFile}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container className="queRow certificate UploadFileCustom">
            <Grid className="certificateCheck">
              <div className="FileUploadtion">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasElderlyCaregiving}
                        onChange={(e) =>
                          handleCheckboxChange(setHasElderlyCaregiving, e)
                        }
                      />
                    }
                    label="Elderly Caregiving"
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={"drivingLicenseFile"}
                    control={control}
                    setFile={setElderlyCaregivingFile}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container className="queRow certificate UploadFileCustom">
            <Grid className="certificateCheck">
              <div className="FileUploadtion">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasNewBornCaregiving}
                        onChange={(e) =>
                          handleCheckboxChange(setHasNewBornCaregiving, e)
                        }
                      />
                    }
                    label="New Born Caregiving"
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={"drivingLicenseFile"}
                    control={control}
                    setFile={setNewBornCaregivingFile}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            className="queRow certificate lastChild UploadFileCustom"
          >
            <Grid className="certificateCheck">
              <div className="FileUploadtion d-block">
                <FormGroup className="radioCheckBtn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasAppliedCountryLicense}
                        onChange={(e) =>
                          handleCheckboxChange(setHasAppliedCountryLicense, e)
                        }
                      />
                    }
                    label="Valid Driving License in the country you want to work"
                  />
                </FormGroup>
                <div className="inputFile">
                  <FileUploaderField
                    name={"drivingLicenseFile"}
                    control={control}
                    setFile={setAppliedCountryLicenseFile}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      ),
    },
  ];

  const handleNextStep = (data) => {
    console.log(data, "dataa");
  };

  return (
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
                      {/*<Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              
                            </Button>*/}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </form>
      </Box>
    </Grid>
  );
};

export default HelperRegistrationStep2;
