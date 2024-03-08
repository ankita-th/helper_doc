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
import HelperStepNavigation from "./HelperStepNavigation";
// import { MultiSelect } from "react-multi-select-component";
import { PhoneInput } from "react-international-phone";
// import { FormControl as MuiFormControl } from "@mui/material";
import LocationAutocomplete from "../../Common/LocationAutocomplete";
import DatePicker from "react-datepicker";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import OtherLanguagesOptions from "../../Common/OtherLanguageOptions";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import LocationSvg from "../../../../public/locationstepper.svg";

import "react-international-phone/style.css";
import "react-datepicker/dist/react-datepicker.css";
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
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [stepperActiveStep, setStepperActiveStep] = useState(0); // For the stepper
  const [gender, setGender] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isWhatsappNumberVisible, setIsWhatsappNumberVisible] =
    useState(false);
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState(
    null
  );
  const [hasFirstAidCertification, setHasFirstAidCertification] =
    useState(false);
  const [firstAidFile, setFirstAidFile] = useState(null);
  const [hasElderlyCaregiving, setHasElderlyCaregiving] =
    useState(false);
  const [elderlyCaregivingFile, setElderlyCaregivingFile] =
    useState(null);
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [hasNewBornCaregiving, setHasNewBornCaregiving] =
    useState(false);
  const [newBornCaregivingFile, setNewBornCaregivingFile] =
    useState(null);
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
  const handleNext = () => {
    // If the user is on the last step, navigate to Step 3 with the form data
    if (stepperActiveStep === steps.length - 1) {
      const formDataForStep3 = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: whatsappNumber,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
        termsAndConditions: formData.termsAndConditions,
        role: formData.role,
        gender: gender,
        passportNumber: passportNumber,
        maritalStatus: maritalStatus,
        religion: religion,
        dob: dob,
        height: height,
        weight: weight,
        currentLocation: currentLocation,
        selectedSkills: selectedSkills,
        familyData: familyData,
        educationData: {
          ...educationData,
          // Include otherLanguages in educationData
          otherLanguages: educationData.otherLanguages.map((language) => ({
            name: language.name,
            proficiency: language.proficiency,
          })),
        },
      };

      // Navigate to Step 3 and pass the data in the location state
      navigate("/registration_steps/step3", {
        state: { formData: formDataForStep3, otherLanguages: otherLanguages },
      });
    } else {
      // If the user is not on the last step, proceed to the next step
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Function to handle back button click
  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Event handlers for file uploads
  const handleCheckboxChange = (
    setState,
    e
  ) => {
    setState(e.target.checked);
  };

  const handleFileUpload = (
    setState,
    files
  ) => {
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
            <FormLabel className="formLabel" id="fullName">Full Name *</FormLabel>
            <TextField className="formInputFiled" 
              name="fullName"
              placeholder="John Smith"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="gender">Gender *</FormLabel>
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="gender"
              name="row-radio-buttons-group"
              value={gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio checkedIcon={<CheckCircleRoundedIcon />}/>}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio checkedIcon={<CheckCircleRoundedIcon />}/>} label="Male" />
            </RadioGroup>
          </FormControl>
          {/* Passport Number / HKID */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="passportNumber">Passport Number / HKID *</FormLabel>
            <TextField className="formInputFiled" 
              fullWidth
              placeholder="e.g. X123456(A)"
              variant="outlined"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* Marital Status */}
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="marital_status">Marital Status *</FormLabel>
                <Select className="formInputFiled"
                placeholder="Please Select"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Religion */}
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="religion">Religion *</FormLabel>
                <Select className="formInputFiled" 
                placeholder="Please Select"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <MenuItem value="Christian">Christian</MenuItem>
                  <MenuItem value="Islam">Islam</MenuItem>
                  <MenuItem value="Buddhist">Buddhist</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Whatsapp Number */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="whatsappNumber">Whatsapp Number *</FormLabel>
            <PhoneInput
              defaultCountry="hk"
              value={whatsappNumber}
              onChange={(value) => setWhatsappNumber(value)}
              inputStyle={{ width: "100%" }}
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel className="switcher"
              control={
                <Switch
                  checked={isWhatsappNumberVisible}
                  onChange={(e) => setIsWhatsappNumberVisible(e.target.checked)}
                />
              }
              label="Visible to subscribed employers interested to have interview with you?"
            />
          </FormGroup>
          {/* Date of Birth */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="dob">Date of Birth </FormLabel>
            <DatePicker 
              showIcon
              selected={dob ? new Date(dob) : null}
              onChange={(date) =>
                setDob(date ? date.toISOString().split("T")[0] : "")
              }
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              isClearable
              placeholderText="Select Date of Birth"
              className="formInputFiled full-width-datepicker"
            />
          </FormControl>

          {/* Height (CM) and Weight (KG) */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="height">Height (CM) </FormLabel>
                <TextField className="formInputFiled" 
                placeholder="170"
                  fullWidth
                  variant="outlined"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow" fullWidth>
                <FormLabel className="formLabel" id="weight">Weight (KG) </FormLabel>
                <TextField className="formInputFiled" 
                placeholder="65"
                  fullWidth
                  variant="outlined"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Current Location */}
          <FormControl className="queRow LocationAutocomplete" fullWidth>
            <FormLabel className="formLabel" id="city_and_country">Your Current location: city and country *</FormLabel>
            <LocationAutocomplete  onSelect={handleSelectLocation} />
            {/* <img src={LocationSvg}/> */}
          </FormControl>
          {/* Skills */}
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel large" id="skills">Skills</FormLabel>
            <FormGroup>
              <FormControl component="fieldset">
                <FormGroup className="skillsCol">
                  <FormLabel className="formLabel" component="legend">Care</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("New Born")}
                          onChange={handleSkillsChange}
                          name="New Born"
                        />
                      }
                      label="New Born"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("Baby Sitting")}
                          onChange={handleSkillsChange}
                          name="Baby Sitting"
                        />
                      }
                      label="Baby Sitting"
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup className="skillsCol">
                  <FormLabel className="formLabel" component="legend">Cooking</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("Indian Cooking")}
                          onChange={handleSkillsChange}
                          name="Indian Cooking"
                        />
                      }
                      label="Indian Cooking"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("Chinese Cooking")}
                          onChange={handleSkillsChange}
                          name="Chinese Cooking"
                        />
                      }
                      label="Chinese Cooking"
                    />
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <FormLabel className="formLabel" component="legend">Household</FormLabel>
                  <FormGroup className="radioCheckBtn">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("Gardening")}
                          onChange={handleSkillsChange}
                          name="Gardening"
                        />
                      }
                      label="Gardening"
                    />
                    <FormControlLabel className="radioCheckBtn"
                      control={
                        <Checkbox
                          checked={selectedSkills.includes("Driving")}
                          onChange={handleSkillsChange}
                          name="Driving"
                        />
                      }
                      label="Driving"
                    />
                  </FormGroup>
                </FormGroup>
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
            <FormLabel className="formLabel" id="spouseAge">Spouse Age(If Any)</FormLabel>
            <TextField className="formInputFiled"
            placeholder="e.g 25" 
              variant="outlined"
              fullWidth
              value={familyData.spouseAge}
              onChange={(e) =>
                setFamilyData({ ...familyData, spouseAge: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="spouseOccupation">Spouse Occupation (If any)</FormLabel>
            <TextField className="formInputFiled" 
            placeholder="e.g 25"
              variant="outlined"
              fullWidth
              value={familyData.spouseOccupation}
              onChange={(e) =>
                setFamilyData({
                  ...familyData,
                  spouseOccupation: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="numberOfBrothers">Number of Brother(s)</FormLabel>
            <TextField className="formInputFiled" 
            placeholder="e.g 2"
              variant="outlined"
              fullWidth
              value={familyData.numberOfBrothers}
              onChange={(e) =>
                setFamilyData({
                  ...familyData,
                  numberOfBrothers: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="numberOfSisters">Number of Sister(s)</FormLabel>
            <TextField className="formInputFiled" 
              placeholder="e.g 2"
              label=""
              variant="outlined"
              fullWidth
              value={familyData.numberOfSisters}
              onChange={(e) =>
                setFamilyData({
                  ...familyData,
                  numberOfSisters: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="familyOrder">Order in your family (1st 2nd 3rd)</FormLabel>
            <TextField className="formInputFiled" 
              placeholder="2"
              variant="outlined"
              fullWidth
              value={familyData.familyOrder}
              onChange={(e) =>
                setFamilyData({ ...familyData, familyOrder: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="ageOfSons">Children age son(s)</FormLabel>
            <TextField className="formInputFiled" 
              placeholder="13"
              variant="outlined"
              fullWidth
              value={familyData.ageOfSons}
              onChange={(e) =>
                setFamilyData({ ...familyData, ageOfSons: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="ageOfDaughters">Children age daughter(s)</FormLabel>
            <TextField className="formInputFiled"  
              placeholder="11"
              variant="outlined"
              fullWidth
              value={familyData.ageOfDaughters}
              onChange={(e) =>
                setFamilyData({ ...familyData, ageOfDaughters: e.target.value })
              }
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
            <FormLabel className="formLabel" id="educationLevel">Education Level *</FormLabel>
            <Select className="formInputFiled" 
              value={educationData.educationLevel}
              onChange={(e) =>
                setEducationData({
                  ...educationData,
                  educationLevel: e.target.value,
                })
              }
            >
              <MenuItem value="o-level">O-level</MenuItem>
              <MenuItem value="a-level">A-level</MenuItem>
              <MenuItem value="1-university-year">1 university year</MenuItem>
              <MenuItem value="2-university-years">2 university years</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="studyMajor">What is your study major *</FormLabel>
            <Select className="formInputFiled" 
              value={educationData.studyMajor}
              onChange={(e) =>
                setEducationData({
                  ...educationData,
                  studyMajor: e.target.value,
                })
              }
            >
              <MenuItem value="elementary">Elementary</MenuItem>
              <MenuItem value="junior_high_school">Junior High School</MenuItem>
              <MenuItem value="senior_high_school">Senior High School</MenuItem>
              <MenuItem value="college">College</MenuItem>
              <MenuItem value="undergraduate">Undergraduate</MenuItem>
              <MenuItem value="graduate">Graduate</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="queRow" fullWidth>
            <FormLabel className="formLabel" id="nativeLanguage">Native Language *</FormLabel>
            <Select className="formInputFiled" 
              value={educationData.nativeLanguage}
              onChange={(e) =>
                setEducationData({
                  ...educationData,
                  nativeLanguage: e.target.value,
                })
              }
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          {/* Other Spoken Languages */}
          <div className="anotherLanguage">
            <OtherLanguagesOptions />
          </div>

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
                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_493_8356)">
                      <path d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                      <rect width="24" height="17" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <Input
                      type="file"
                      onChange={(e) =>
                        handleFileUpload(
                          setDrivingLicenseFile,
                          e.target.files
                        )
                      }
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
                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_493_8356)">
                      <path d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                      <rect width="24" height="17" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <Input
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(
                        setFirstAidFile,
                        e.target.files
                      )
                    }
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
                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_493_8356)">
                      <path d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                      <rect width="24" height="17" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <Input
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(
                        setElderlyCaregivingFile,
                        e.target.files
                      )
                      }
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
                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_493_8356)">
                      <path d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                      <rect width="24" height="17" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <Input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(
                      setNewBornCaregivingFile,
                      e.target.files
                    )
                  }
                />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container className="queRow certificate lastChild UploadFileCustom">
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
                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_493_8356)">
                      <path d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                      <rect width="24" height="17" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                  <Input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(
                      setAppliedCountryLicenseFile,
                      e.target.files
                    )
                  }
                />
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      ),
    },
  ];

  return (
    <>
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">Domestic Helper Form</Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="xl" className="stepsContainer">
        <Grid container spacing={3} className="stepsRow">
          <HelperStepNavigation
            activeStep={activeStep}
            steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"]}
            titles={[
              "Disclaimer",
              "Applicant Information",
              "Working Experience",
              "Job you are Looking for",
              "Q&A question list",
              "Finalizing your CV",
            ]}
            stepIcons={[
              "/images/registration-steps/step1.svg",
              "/images/registration-steps/step2.svg",
              "/images/registration-steps/step3.svg",
              "/images/registration-steps/step4.svg",
              "/images/registration-steps/step5.svg",
              "/images/registration-steps/step6.svg",
            ]}
          />

          <StyledFormContainer container spacing={3} className="shadow-box stepsFormRow">
            <Grid item xs={12} md={6} className="stepsForm">
              <Box sx={{ maxWidth: 800 }}  className="StepFormCol formDataInfo">
                <Stepper activeStep={stepperActiveStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        {step.content}
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button  className="arrowButton"
                              variant="contained"
                              onClick={handleNext}
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
                {stepperActiveStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                    {/* Add reset button */}
                  </Paper>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6} component={StyledImageContainer} className="stepsSidebarImg">
              <StyledImage src="/registration-step.svg" alt="Helper Image" />
            </Grid>
          </StyledFormContainer>

        </Grid>
      </Container>
    </>
  );
};

export default HelperRegistrationStep2;
