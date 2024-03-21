import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextFieldWithController from "../FormFields/TextFieldWithController";
import { useTranslation } from "react-i18next";
import {
  CURRENCY_LIST,
  DUTIES_OTHER_TASK,
  EDUCATION_LEVEL,
  EXPERIENCE_LIST,
  LANGUAGE_LEVEL,
  MAJOR_STUDY,
  MARITAL_STATUS,
  RELIGION,
  SKILLS,
  SPECIAL_HELP_REQUIREMENT,
  SPOKEN_LANGUAGE,
  STEP1_QUESTIONS,
  UPLOADE_DOCUMENT,
  YES_NO,
} from "../../HelperProfile/Constant";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CountryDropdown from "../FormFields/CountryDropdown";
import RadioGroupField from "../FormFields/RadioGroupField";
import RadioGroupWithController from "../FormFields/RadioGroupWithController";
import SelectWithController from "../FormFields/SelectWithController";
import { isPhoneValid } from "../../../Utils/MobileNumberValidation";
import { PhoneInput } from "react-international-phone";
import DatePickerWIthController from "../FormFields/DatePickerWIthController";
import NumberField from "../FormFields/NumberField";
import LocationAutocomplete from "../LocationAutocomplete";
import CheckBoxField from "../FormFields/CheckBoxField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleFileUploadToS3Bucket } from "../../../Utils/CommonAPIs";
import PageLoader from "../Loader/PageLoader";
import FileUploaderField from "../FormFields/FileUploaderField";
import CheckBoxFieldWithController from "../FormFields/CheckBoxFieldWithController";
import moment from "moment";

export default function ProfileDetailForm() {
  const [profilePic, setProfilePic] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState({
    error: false,
    msg: "",
    number: "",
  });
  const [currentLocation, setCurrentLocation] = useState("");
  const [showOtherLanguage, setOtherLanguage] = useState(false);
  const [PageLoader, setPageLoader] = useState(false);
  const [uploadFilesDetails, setUploadFilesDetails] = useState({
    drivingLicense: {
      haveTheDoc: false,
      docFile: "",
    },
  });

  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const handleProfileSubmit = async (data) => {
    console.log(data);

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
  };

  const handleProfilePicUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
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

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const handleDeleteOtherLanguage = () => {
    setOtherLanguage(false);
    setValue("otherLanguage", "");
    setValue("otherLanguageLevel", "");
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
    handleSubmit(handleProfileSubmit)();
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

  return (
    <Box
      className="profileCardBox"
      border={1}
      borderRadius={8}
      borderColor="#DDDDDD"
      py={6}
      px={10}
      mb={2}
      mt={2}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            style={{ display: "none" }}
            id="profile-pic-upload"
          />
          <label htmlFor="profile-pic-upload" className="profileUpload">
            <Box position="relative">
              <IconButton component="span">
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Profile"
                    style={{
                      borderRadius: "50%",
                      maxWidth: "130px",
                      maxHeight: "130px",
                    }}
                  />
                ) : (
                  <Avatar sx={{ width: 130, height: 130 }}>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
              <IconButton
                style={{ position: "absolute", bottom: 0, right: 0 }}
                onClick={() => {
                  const fileInput =
                    document.getElementById("profile-pic-upload");
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              >
                <CameraAltIcon />
              </IconButton>
            </Box>
          </label>
          <Box ml={2} className="TopDesc">
            <Typography variant="h5">
              <strong>John Smith</strong>
            </Typography>
            <Box display="flex" alignItems="center">
              <Box
                width={8}
                height={8}
                borderRadius="50%"
                bgcolor="success.main"
                mr={1}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginBottom: 0 }}
              >
                Available
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              <strong>Status:</strong> <span className="dangerText">Weak</span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Recently Updated on <span>19/01/2024</span>
            </Typography>
          </Box>
        </Box>
        <Button className="arrowButton" variant="contained" color="primary">
          View Profile
        </Button>
      </Box>
      <form onSubmit={handleBeforeSubmit}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          className="formDataInfo"
        >
          <Grid item xs={12} md={6}>
            {STEP1_QUESTIONS.map((ques, index) => (
              <div key={ques.id} className="queRow">
                <Typography variant="body1" className="queTitle">
                  {t(ques.question)}*
                </Typography>
                {ques.type === "radio" && (
                  <Controller
                    name={ques.id}
                    control={control}
                    defaultValue=""
                    rules={{ required: t("answer_required_msg") }}
                    render={({ field }) => (
                      <RadioGroupField
                        radioOptions={ques.radioOption}
                        field={field}
                      />
                    )}
                  />
                )}
                {ques.type === "text" && (
                  <Controller
                    name={ques.id}
                    control={control}
                    defaultValue=""
                    rules={{ required: t("answer_required_msg") }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        fullWidth
                        rows={4}
                        className="formInputFiled"
                        variant="outlined"
                        placeholder="Your answer..."
                      />
                    )}
                  />
                )}
                {ques.subQuestion && watch(ques.id) === "Yes" && (
                  <div>
                    <Typography variant="body1">
                      {t(ques.subQuestion)}*
                    </Typography>
                    {ques.subQuestionType === "country_dropdown" ? (
                      <>
                        <CountryDropdown
                          control={control}
                          name={`sub_que_${ques.id}`}
                          isRequired={true}
                          errors={errors}
                        />
                      </>
                    ) : (
                      <>
                        <Controller
                          name={`sub_que_${ques.id}`}
                          control={control}
                          defaultValue=""
                          rules={{ required: t("answer_required_msg") }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="formInputFiled"
                              multiline
                              fullWidth
                              rows={4}
                              variant="outlined"
                              label="Your answer..."
                            />
                          )}
                        />
                        {errors[`sub_que_${ques.id}`] && (
                          <ErrorMessage
                            msg={errors[`sub_que_${ques.id}`]?.message}
                          />
                        )}
                      </>
                    )}
                  </div>
                )}
                {errors[ques.id] && (
                  <ErrorMessage msg={errors[ques.id]?.message} />
                )}
              </div>
            ))}

            {/* ==========================step3 ===========================================*/}

            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* Marital Status */}
                  <SelectWithController
                    control={control}
                    name={"step_3_experience"}
                    options={EXPERIENCE_LIST}
                    label={"Experiences as Domestic Helper"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    className="queRow LocationAutocomplete"
                    fullWidth
                  >
                    <FormLabel
                      className="workingLocation formLabel"
                      id="city_and_country"
                    >
                      Working Location
                    </FormLabel>
                    <Controller
                      name="step_3_location"
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
                name={"step_3_employerNationality"}
                label={"Employer Nationality"}
                isRequired={true}
                errors={errors}
              />
              <NumberField
                control={control}
                name={"step_3_familySize"}
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
                          name={`step_3_familyMembers${index}_age`}
                          errors={errors}
                          placeholder={"40"}
                          label={"Age"}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <RadioGroupWithController
                          label={t("gender")}
                          name={`step_3_familyMembers${index}_gender`}
                          radioOptions={["Female", "Male"]}
                          control={control}
                        />
                      </Grid>
                    </Grid>
                    <CheckBoxFieldWithController
                      label={"Require Special Care"}
                      name={`step_3_familyMembers${index}_requireSpecialHelp`}
                      checkBoxesOptions={SPECIAL_HELP_REQUIREMENT}
                      control={control}
                    />
                  </Box>
                </div>
              ))}
              <NumberField
                control={control}
                name={"step_3_houseArea"}
                placeholder={"40"}
                label={"House area (Square Feet)"}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DatePickerWIthController
                    name={"step_3_startedDate"}
                    maxDate={new Date().toISOString()}
                    label={"Date started"}
                    control={control}
                    placeholder={"Select Start Date"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerWIthController
                    name={"step_3_releasedDate"}
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
                  name="step_3_isJobStillGoing"
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
                    name={"step_3_currency"}
                    options={CURRENCY_LIST}
                    label={"Currency"}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumberField
                    control={control}
                    name={"step_3_salary"}
                    errors={errors}
                    placeholder={"Eg. 10000"}
                    label={"Salary"}
                  />
                </Grid>
              </Grid>
              <NumberField
                control={control}
                name={"step_3_coHelperNumber"}
                errors={errors}
                placeholder={"Eg. 2"}
                label={"How many co helper"}
              />

              <SelectWithController
                control={control}
                name={"step_3_experience_letter"}
                options={YES_NO}
                label={
                  "Can you Provide Reference/Release/Recommendation Letter from Employer with this working Experience?"
                }
                isRequired={true}
                errors={errors}
              />
              <RadioGroupWithController
                name={"step_3_refrence_letter"}
                radioOptions={["Upload Letter", "Provide It Later"]}
                control={control}
              />
              {watch("refrence_letter") === "Upload Letter" && (
                <FormControl fullWidth className="UploadFileCustom queRow">
                  <div className="inputFile">
                    <FileUploaderField
                      name={"step_3_refrence_letter_file"}
                      control={control}
                      setFile={handleFileUpload}
                    />
                  </div>
                </FormControl>
              )}
              <RadioGroupWithController
                label={"Reference Check Availability"}
                isRequired={true}
                name={"step_3_referenceAvailability"}
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
                            name={`step_3_duties`}
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
                name={"step_3_reasonForLeaving"}
                options={YES_NO}
                label={"Reason for Leaving"}
              />
              <FormControl fullWidth className="queRow">
                <FormLabel id="experinceRemark" className="formLabel">
                  Remark of your experience
                </FormLabel>
                <TextField
                  className="formInputFiled"
                  name="step_3_experinceRemark"
                  {...register("experinceRemark")}
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue=""
                />
              </FormControl>
              <RadioGroupWithController
                label={"Do you have any more working experiences?"}
                name={"step_3_moreWorkingExperience"}
                radioOptions={["Yes", "No"]}
                control={control}
              />
            </>

            {/* ==========================step3 ===========================================*/}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldWithController
              isRequired={true}
              label={"Name"}
              name={"step2_fullName"}
              errors={errors}
              control={control}
              placeholder={t("enter_your_name")}
            />
            <RadioGroupWithController
              label={t("gender")}
              isRequired={true}
              name={"step2_gender"}
              radioOptions={["Female", "Male"]}
              control={control}
              errors={errors}
            />
            <TextFieldWithController
              isRequired={true}
              label={t("pasport_or_HKID")}
              name={"step2_passportOrHKID"}
              errors={errors}
              control={control}
              placeholder={"e.g. X123456(A)"}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* Marital Status */}
                <SelectWithController
                  control={control}
                  name={"step2_maritalStatus"}
                  options={MARITAL_STATUS}
                  label={"Marital Status"}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* Religion */}
                <SelectWithController
                  control={control}
                  name={"step2_religion"}
                  options={RELIGION}
                  label={"Religion"}
                  isRequired={true}
                  errors={errors}
                />
              </Grid>
            </Grid>
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
              {whatsappNumber.error && (
                <ErrorMessage msg={whatsappNumber.msg} />
              )}
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
            <DatePickerWIthController
              name={"step2_dob"}
              maxDate={new Date().toISOString()}
              label={"Date of Birth"}
              isRequired={true}
              control={control}
              errors={errors}
              placeholder={"Select Date of Birth"}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"step2_height"}
                  errors={errors}
                  placeholder={"170"}
                  label={"Height (CM)"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NumberField
                  control={control}
                  name={"step2_weight"}
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
              {errors.location && (
                <ErrorMessage msg={errors.location?.message} />
              )}
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
                              <FormLabel
                                className="formLabel"
                                component="legend"
                              >
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
                  {errors.skills && (
                    <ErrorMessage msg={errors.skills?.message} />
                  )}
                </FormControl>
              </FormGroup>
            </FormControl>
            <NumberField
              control={control}
              name={"step_2_family_age"}
              errors={errors}
              placeholder={"e.g 25"}
              label={"Spouse Age(If Any)"}
            />
            <TextFieldWithController
              label={"Spouse Occupation (If any)"}
              name={"step2_family_occupation"}
              control={control}
              placeholder={""}
            />
            <NumberField
              control={control}
              name={"step2_family_brothers"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Number of Brother(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_sisters"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Number of Sister(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_familyOrder"}
              errors={errors}
              placeholder={"e.g 2"}
              label={"Order in your family (1st 2nd 3rd"}
            />
            <NumberField
              control={control}
              name={"step2_family_ageOfSons"}
              placeholder={"e.g 12"}
              label={"Children age son(s)"}
            />
            <NumberField
              control={control}
              name={"step2_family_daughtersAge"}
              placeholder={"e.g 11"}
              label={"Children age daughter(s)"}
            />
            <SelectWithController
              control={control}
              name={"step2_education_level"}
              options={EDUCATION_LEVEL}
              label={"Education Level"}
              isRequired={true}
              errors={errors}
            />
            <SelectWithController
              control={control}
              name={"step2_education_major"}
              options={MAJOR_STUDY}
              label={"What is your study major"}
              isRequired={true}
              errors={errors}
            />
            <SelectWithController
              control={control}
              name={"step2_education_languages"}
              options={SPOKEN_LANGUAGE}
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
                  options={SPOKEN_LANGUAGE}
                  label={"Other Spoken Language"}
                  isRequired={true}
                  errors={errors}
                />
                <SelectWithController
                  control={control}
                  name={"otherLanguageLevel"}
                  options={LANGUAGE_LEVEL}
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

            {UPLOADE_DOCUMENT.map((doc) => (
              <Grid container className="queRow certificate UploadFileCustom">
                <Grid className="certificateCheck">
                  <div className="FileUploadtion">
                    <FormGroup className="radioCheckBtn">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={uploadFilesDetails[doc.name]?.haveTheDoc}
                            onChange={(e) => handleCheckboxChange(doc.name, e)}
                          />
                        }
                        label={doc.label}
                      />
                    </FormGroup>
                    <div className="inputFile">
                      <FileUploaderField
                        name={doc.name}
                        control={control}
                        setFile={handleFileUpload}
                        disable={!uploadFilesDetails[doc.name]?.haveTheDoc}
                      />
                    </div>
                  </div>
                  {uploadFilesDetails[doc.name]?.docFile && (
                    <p>{uploadFilesDetails[doc.name]?.docFile?.name}</p>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                className="arrowButton"
                variant="contained"
                type="submit"
                sx={{ mt: 2, mb: 2 }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
