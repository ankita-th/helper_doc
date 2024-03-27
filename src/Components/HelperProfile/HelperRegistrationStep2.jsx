import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  Switch,
} from "@mui/material";
import { PhoneInput } from "react-international-phone";
import LocationAutocomplete from "../Common/LocationAutocomplete";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import "react-international-phone/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import CheckBoxField from "../Common/FormFields/CheckBoxField";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import { MAJOR_STUDY } from "./Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FileUploaderField from "../Common/FormFields/FileUploaderField";
import { isPhoneValid } from "../../Utils/MobileNumberValidation";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";
import RadioGroupWithController from "../Common/FormFields/RadioGroupWithController";
import TextFieldWithController from "../Common/FormFields/TextFieldWithController";
import SelectWithController from "../Common/FormFields/SelectWithController";
import DatePickerWIthController from "../Common/FormFields/DatePickerWIthController";
import NumberField from "../Common/FormFields/NumberField";
import { useSelector } from "react-redux";

const HelperRegistrationStep2 = ({
  saveStepDetails,
  setPageLoader,
  stepDetails,
}) => {
  const [showOtherLanguage, setOtherLanguage] = useState(false);

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [stepperActiveStep, setStepperActiveStep] = useState(0); // For the stepper
  const [whatsappNumber, setWhatsappNumber] = useState({
    error: false,
    msg: "",
    number: "",
  });
  const [currentLocation, setCurrentLocation] = useState("");

  const [uploadFilesDetails, setUploadFilesDetails] = useState({
    driving: {
      haveTheDoc: false,
      docFile: "",
    },
  });
  const {
    genders,
    maritalStatus,
    religion,
    skillsList,
    educationLevel,
    nativeLanguages,
    languageLevel,
    certificates,
  } = useSelector((state) => state.common);

  useEffect(() => {
    if (
      stepDetails?.aboutYou &&
      Object.keys(stepDetails?.aboutYou).length > 0
    ) {
      for (let key in stepDetails?.aboutYou) {
        if (key === "physicalAttributes") {
          setValue("height", stepDetails.aboutYou[key].height);
          setValue("weight", stepDetails.aboutYou[key].weight);
        } else if (key === "whatsapp") {
          setWhatsappNumber({
            ...whatsappNumber,
            number: stepDetails.aboutYou[key].number,
          });
          setValue(
            "isWhatsappNumberVisible",
            stepDetails.aboutYou[key].isVisible
          );
        } else {
          setValue(key, stepDetails.aboutYou[key]);
        }
      }
    }
    if (
      stepDetails?.aboutYourFamily &&
      Object.keys(stepDetails?.aboutYourFamily).length > 0
    ) {
      for (let key in stepDetails?.aboutYourFamily) {
        setValue(key, stepDetails.aboutYourFamily[key]);
      }
    }
    if (
      stepDetails?.education &&
      Object.keys(stepDetails?.education).length > 0
    ) {
      for (let key in stepDetails?.education) {
        if (key === "languages") {
          setValue("languages", stepDetails.education[key].native);
        } else if (key === "otherLanguages") {
          if (Object.keys(stepDetails.education[key]).length > 0) {
            setOtherLanguage(true);
            setValue("otherLanguage", stepDetails.education[key].language);
            setValue("otherLanguageLevel", stepDetails.education[key].level);
          }
        } else {
          setValue(key, stepDetails.education[key]);
        }
      }
    }
    // if (stepDetails && stepDetails.answers) {
    //   stepDetails.answers.forEach((ans) => {
    //     setValue(ans.questionId, ans.answer);
    //     setValue(`sub_que_${ans.questionId}`, ans.subAnswer);
    //   });
    // }
  }, [stepDetails]);

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleOnBlurWhatsappNumber = () => {
    if (whatsappNumber.number.length === 0) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("whatsapp_required"),
      });
    } else if (isPhoneValid(whatsappNumber.number)) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: false,
      });
    } else {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("valid_mobile_number_msg"),
      });
    }
  };

  const handleBeforeSubmit = (e) => {
    e.preventDefault();
    if (whatsappNumber.number.length === 0) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("valid_mobile_number_msg"),
      });
    } else if (!isPhoneValid(whatsappNumber.number)) {
      setWhatsappNumber({
        ...whatsappNumber,
        error: true,
        msg: t("valid_mobile_number_msg"),
      });
    }
    handleSubmit(handleNext)();
  };

  // Function to handle next button click
  const handleNext = async (data) => {
    if (stepperActiveStep < steps.length - 1) {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setPageLoader(true);
      let filePayload = {};
      for (let key in uploadFilesDetails) {
        if (
          uploadFilesDetails[key]?.haveTheDoc &&
          uploadFilesDetails[key]?.docFile?.name
        ) {
          const fileUpload = await handleFileUploadToS3Bucket(
            uploadFilesDetails[key].docFile
          );
          if (!fileUpload.error) {
            filePayload[key] = fileUpload.uploadedUrl;
          } else {
            setPageLoader(false);
            return;
          }
        }
      }
      const payload = {
        aboutYou: {
          fullName: data.fullName,
          gender: data.gender,
          passportOrHKID: data.passportOrHKID,
          maritalStatus: data.maritalStatus,
          religion: data.religion,
          whatsapp: {
            number: whatsappNumber.number,
            isVisible: data.isWhatsappNumberVisible,
          },
          dob: data.dob,
          physicalAttributes: {
            height: data.height,
            weight: data.weight,
          },
          location: currentLocation,
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
            language: data.otherLanguage,
            level: data.otherLanguageLevel,
          },
          licensesAndCertificates: filePayload,
        },
      };
      saveStepDetails(payload, "working_experience");
    }
  };

  const handleDeleteOtherLanguage = () => {
    setOtherLanguage(false);
    setValue("otherLanguage", "");
    setValue("otherLanguageLevel", "");
  };

  // Function to handle back button click
  const handleChangeTab = (step) => {
    if (step < stepperActiveStep) {
      setStepperActiveStep(step);
    }
  };

  // Event handlers for file uploads
  const handleCheckboxChange = (checkedFile, e) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [checkedFile]: {
        ...uploadFilesDetails[checkedFile],
        haveTheDoc: e.target.checked,
      },
    });
    // setState(e.target.checked);
  };

  const handleFileUpload = (uploadFile, file) => {
    setUploadFilesDetails({
      ...uploadFilesDetails,
      [uploadFile]: {
        ...uploadFilesDetails[uploadFile],
        docFile: file,
      },
    });
  };

  const getCertificateListing = () => {
    const tempCertificates = [...certificates];
    tempCertificates.forEach((item) => {
      const label = item.name.replace(/\s+/g, ""); // Remove spaces from name
      item.label = label.charAt(0).toLowerCase() + label.slice(1); // Make first letter lowercase
    });
    return tempCertificates;
  };
  const steps = [
    {
      label: "About You",
      content: (
        <>
          <TextFieldWithController
            isRequired={true}
            label={t("full_name")}
            name={"fullName"}
            errors={errors}
            control={control}
            placeholder={t("enter_your_name")}
          />
          <RadioGroupWithController
            label={t("gender")}
            isRequired={true}
            name={"gender"}
            radioOptions={genders}
            control={control}
            errors={errors}
          />
          {/* Passport Number / HKID */}
          <TextFieldWithController
            isRequired={true}
            label={t("pasport_or_HKID")}
            name={"passportOrHKID"}
            errors={errors}
            control={control}
            placeholder={"e.g. X123456(A)"}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <SelectWithController
                control={control}
                name={"maritalStatus"}
                options={maritalStatus}
                label={"Marital Status"}
                isRequired={true}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Religion */}
              <SelectWithController
                control={control}
                name={"religion"}
                options={religion}
                label={"Religion"}
                isRequired={true}
                errors={errors}
              />
            </Grid>
          </Grid>

          {/* Whatsapp Number */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="whatsappNumber">
              Whatsapp Number *
            </FormLabel>
            <PhoneInput
              className="phone-input"
              value={whatsappNumber.number}
              onChange={(phone) =>
                setWhatsappNumber({ ...whatsappNumber, number: phone })
              }
              onBlur={handleOnBlurWhatsappNumber}
              defaultCountry="hk"
              placeholder="Enter phone number"
              inputStyle={{ width: "100%" }}
            />
            {whatsappNumber.error && <ErrorMessage msg={whatsappNumber.msg} />}
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
          <DatePickerWIthController
            name={"dob"}
            maxDate={new Date().toISOString()}
            label={"Date of Birth"}
            isRequired={true}
            control={control}
            errors={errors}
            placeholder={"Select Date of Birth"}
          />
          {/* Height (CM) and Weight (KG) */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <NumberField
                control={control}
                name={"height"}
                errors={errors}
                placeholder={"170"}
                label={"Height (CM)"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <NumberField
                control={control}
                name={"weight"}
                errors={errors}
                placeholder={"170"}
                label={" Weight (KG)"}
              />
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
                        {skillsList.map((skill) => (
                          <>
                            <FormLabel className="formLabel" component="legend">
                              {skill.name}
                            </FormLabel>
                            <CheckBoxField
                              field={field}
                              checkBoxesValues={skill.skills}
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
          <NumberField
            control={control}
            name={"age"}
            placeholder={"e.g 25"}
            label={"Spouse Age(If Any)"}
          />
          <TextFieldWithController
            label={"Spouse Occupation (If any)"}
            name={"occupation"}
            control={control}
            placeholder={""}
          />
          <NumberField
            control={control}
            name={"brothers"}
            placeholder={"e.g 2"}
            label={"Number of Brother(s)"}
          />
          <NumberField
            control={control}
            name={"sisters"}
            placeholder={"e.g 2"}
            label={"Number of Sister(s)"}
          />
          <NumberField
            control={control}
            name={"familyOrder"}
            placeholder={"e.g 2"}
            label={"Order in your family (1st 2nd 3rd)"}
          />
          <NumberField
            control={control}
            name={"ageOfSons"}
            placeholder={"e.g 12"}
            label={"Children age son(s)"}
          />
          <NumberField
            control={control}
            name={"daughtersAge"}
            placeholder={"e.g 11"}
            label={"Children age daughter(s)"}
          />
        </>
      ),
    },
    {
      label: "Education",
      content: (
        <>
          <SelectWithController
            control={control}
            name={"level"}
            options={educationLevel}
            label={"Education Level"}
            isRequired={true}
            errors={errors}
          />
          <SelectWithController
            control={control}
            name={"major"}
            options={MAJOR_STUDY}
            label={"What is your study major"}
            isRequired={true}
            errors={errors}
          />
          <SelectWithController
            control={control}
            name={"languages"}
            options={nativeLanguages}
            label={"Native Language"}
            isRequired={true}
            errors={errors}
          />
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
              <SelectWithController
                control={control}
                name={"otherLanguage"}
                options={nativeLanguages}
                label={"Other Spoken Language"}
                isRequired={true}
                errors={errors}
              />
              <SelectWithController
                control={control}
                name={"otherLanguageLevel"}
                options={languageLevel}
                label={"Level"}
                isRequired={true}
                errors={errors}
              />
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

          {getCertificateListing().map((doc) => (
            <Grid container className="queRow certificate UploadFileCustom">
              <Grid className="certificateCheck">
                <div className="FileUploadtion">
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={uploadFilesDetails[doc.label]?.haveTheDoc}
                          onChange={(e) => handleCheckboxChange(doc.label, e)}
                        />
                      }
                      label={doc.name}
                    />
                  </FormGroup>
                  <div className="inputFile">
                    <FileUploaderField
                      name={doc.label}
                      control={control}
                      setFile={handleFileUpload}
                      disable={!uploadFilesDetails[doc.label]?.haveTheDoc}
                    />
                  </div>
                </div>
                {uploadFilesDetails[doc.label]?.docFile && (
                  <p>{uploadFilesDetails[doc.label]?.docFile?.name}</p>
                )}
              </Grid>
            </Grid>
          ))}
        </>
      ),
    },
  ];

  return (
    <Grid item xs={12} md={6} className="stepsForm">
      <Box sx={{ maxWidth: 800 }} className="StepFormCol formDataInfo">
        <form onSubmit={handleBeforeSubmit}>
          <Stepper activeStep={stepperActiveStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel onClick={() => handleChangeTab(index)}>
                  {step.label}
                </StepLabel>
                <StepContent>
                  {step.content}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        className="arrowButton"
                        variant="contained"
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Next
                      </Button>
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
