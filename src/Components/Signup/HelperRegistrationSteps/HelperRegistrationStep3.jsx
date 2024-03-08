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
import HelperStepNavigation from "./HelperStepNavigation";
import LocationAutocomplete from "../../Common/LocationAutocomplete";
import { Container, styled } from "@mui/system";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

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

const HelperRegistrationStep3 = ({
  formData,
  setFormData,
}) => {
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
  const [referenceAvailability, setReferenceAvailability] =
    useState("");
  const [isMoreWorkExperince, setIsMoreWorkExperince] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [helperWorkingExperience, setHelperWorkingExperience] = useState({
    workingExperience: "",
    workingLocation: "",
    employerNationality: "",
    numberOfFamilyMembers: 0,
  });

  const [familyMembers, setFamilyMembers] = useState([]);

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

  const handleFamilyMemberChange = (
    e,
    index
  ) => {
    const { name, value, checked } = e.target;

    // Extract the property name and index
    const [property] = name.split(".").slice(1); // Extracts the index and property

    const updatedFamilyMembers= [...familyMembers];
    const existingMember = updatedFamilyMembers[index] || {
      age: 0,
      gender: "",
      requireSpecialHelp: [],
    }; // Initialize with default if not exists

    let updatedSpecialHelp= [...existingMember.requireSpecialHelp];
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
  const handleNext = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
      },
    }));

    if (stepperActiveStep === steps.length - 1) {
      navigate("/registration_steps/step4", { state: { formData } });
      // navigate("/registration_steps/step4", { state: location.state });
    } else {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
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

  const handleFileUpload = (
    setState,
    files
  ) => {
    if (files && files.length > 0) {
      setState(files[0]);
    }
  };

  const handleReferenceAvailabilityChange = (
    event
  ) => {
    setReferenceAvailability(event.target.value);
  };

  const handleMoreWorkExperinceChange = (
    event
  ) => {
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
                <FormLabel className="formLabel" id="marital_status">Experiences as Domestic Helper</FormLabel>
                <Select className="formInputFiled"
                      value={helperWorkingExperience.workingExperience}
                      onChange={(e) =>
                        setHelperWorkingExperience({
                          ...helperWorkingExperience,
                          workingExperience: e.target.value,
                        })
                      }
                    >
                  <MenuItem value="noExperince">No prior experience</MenuItem>
                  <MenuItem value="lessThenOne"> &lt; 1 year of experience </MenuItem>
                  <MenuItem value="oneYear">1 year of experience</MenuItem>
                  <MenuItem value="twoYears">2 years of experience</MenuItem>
                  <MenuItem value="threeYears">3 years of experience</MenuItem>
                  <MenuItem value="fourYears">4 years of experience</MenuItem>
                  {/* Add more menu items as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className="queRow LocationAutocomplete" fullWidth>
                <FormLabel className="workingLocation formLabel" id="city_and_country">Working Location</FormLabel>
                <LocationAutocomplete  onSelect={handleSelectLocation} />
                {/* <img src={LocationSvg}/> */}
              </FormControl>
            </Grid>
          </Grid>
          <FormControl className="queRow LocationAutocomplete" fullWidth>
            <FormLabel id="employerNationality" className="formLabel">
              Employer Nationality *
            </FormLabel>
            <LocationAutocomplete onSelect={handleSelectLocation} />
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="numberOfFamilyMembers" className="formLabel">
              Number of Family Members
            </FormLabel>
            <TextField className="formInputFiled"
              name="numberOfFamilyMembers"
              value={formData.workExperience.numberOfFamilyMembers}
              onChange={handleInputChange}
              type="number"
              placeholder="1"
              required
            />
          </FormControl>
          {Array.from(
            { length: formData.workExperience.numberOfFamilyMembers },
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
                        <TextField className="formInputFiled"
                          name={`familyMembers[${index}].age`}
                          type="number"
                          required
                          value={familyMembers[index]?.age}
                          onChange={(e) =>
                            handleFamilyMemberChange(e, index)
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormControl className="queRow" fullWidth>
                        <FormLabel className="formLabel">Gender</FormLabel>
                        <RadioGroup className="radioCheckBtn"
                          name={`familyMembers[${index}].gender`}
                          value={familyMembers[index]?.gender}
                          onChange={(e) => handleFamilyMemberChange(e, index)}
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormGroup>
                    <FormLabel className="formLabel" component="legend">Require Special Care</FormLabel>
                    <RadioGroup className="radioCheckBtn">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`familyMembers[${index}].requireSpecialHelp`}
                            checked={familyMembers[
                              index
                            ]?.requireSpecialHelp.includes("Changing Diaper")}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                            value="Changing Diaper"
                          />
                        }
                        label="Changing Diaper"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`familyMembers[${index}].requireSpecialHelp`}
                            checked={familyMembers[
                              index
                            ]?.requireSpecialHelp.includes("Bedridden")}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                            value="Bedridden"
                          />
                        }
                        label="Bedridden"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`familyMembers[${index}].requireSpecialHelp`}
                            checked={familyMembers[
                              index
                            ]?.requireSpecialHelp.includes("Wheelchair")}
                            onChange={(e) => handleFamilyMemberChange(e, index)}
                            value="Wheelchair"
                          />
                        }
                        label="Wheelchair"
                      />
                    </RadioGroup>
                  </FormGroup>
                </Box>
                {/* Add more form controls for gender and special help */}
              </div>
            )
          )}
          <FormControl fullWidth className="queRow">
            <FormLabel id="houseArea" className="formLabel">House area (Square Feet)</FormLabel>
            <TextField className="formInputFiled"
              name="houseArea"
              value={formData.workExperience.houseArea}
              onChange={handleInputChange}
              type="number"
              required
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="startedDate" className="formLabel">Date started </FormLabel>
                <DatePicker
                  showIcon
                  selected={startedDate ? new Date(startedDate) : null}
                  onChange={(date) =>
                    setstartedDate(date ? date.toISOString().split("T")[0] : "")
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable
                  placeholderText="Select Date started"
                  className="formInputFiled full-width-datepicker"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="releasedDate" className="formLabel">Date released </FormLabel>
                <DatePicker
                  showIcon
                  selected={releasedDate ? new Date(releasedDate) : null}
                  onChange={(date) =>
                    setreleasedDate(
                      date ? date.toISOString().split("T")[0] : ""
                    )
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  isClearable
                  placeholderText="Select Date released"
                  className="formInputFiled full-width-datepicker"
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isJobStillGoing}
                  onChange={(e) => setIsJobStillGoing(e.target.checked)}
                />
              }
              label="This is my still on-going job"
            />
          </FormGroup>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="currency" className="formLabel">Currency</FormLabel>
                <Select className="formInputFiled"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="usd">USD</MenuItem>
                  <MenuItem value="hk">HK</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="queRow">
                <FormLabel id="salary" className="formLabel">Salary</FormLabel>
                <TextField className="formInputFiled"
                  name="salary"
                  value={formData.workExperience.salary}
                  onChange={handleInputChange}
                  type="number"
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth className="queRow">
            <FormLabel id="coHelperNumber" className="formLabel">How many co helper</FormLabel>
            <TextField className="formInputFiled"
              name="coHelperNumber"
              value={formData.workExperience.coHelperNumber}
              onChange={handleInputChange}
              type="number"
              required
            />
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="isAnyLetter" className="formLabel">
              Can you Provide Reference/Release/Recommendation Letter from
              Employer with this working Experience?
            </FormLabel>
            <Select className="formInputFiled"
              value={isAnyLetter}
              onChange={(e) => setIsAnyLetter(e.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormGroup className="queRow">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              <RadioGroup className="radioCheckBtn">
                  <FormControlLabel className=""
                    control={
                      <Checkbox
                        checked={uploadLetter.includes("Upload Letter")}
                        onChange={handleUploadLetter}
                        name="Upload Letter"
                      />
                    }
                    label="Upload Letter"
                  />
                  <FormControlLabel className=""
                    control={
                      <Checkbox
                        checked={provideLater.includes("Provide It Later")}
                        onChange={handleProvideLater}
                        name="Provide It Later"
                      />
                    }
                    label="Provide It Later"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormGroup>
          <FormControl fullWidth className="UploadFileCustom queRow">
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
                      setLetterFile,
                      e.target.files
                    )
                  }
                />
            </div>
            
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="referenceAvailability" className="formLabel">
              Reference Check Availability? *
            </FormLabel>
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="referenceAvailability"
              name="row-radio-buttons-group"
              value={referenceAvailability}
              onChange={handleReferenceAvailabilityChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel id="duties" className="formLabel">Duties / other task</FormLabel>
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
            <FormLabel id="reasonForLeaving" className="formLabel">Reason for Leaving</FormLabel>
            <Select className="formInputFiled"
              value={reasonForLeaving}
              onChange={(e) => setReasonForLeaving(e.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="experinceRemark" className="formLabel">
              Remark of your experience
            </FormLabel>
            <TextField className="formInputFiled"
              name="experinceRemark"
              value={formData.workExperience.experinceRemark}
              onChange={handleInputChange}
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
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="moreWorkExperince"
              name="row-radio-buttons-group"
              value={isMoreWorkExperince}
              onChange={handleMoreWorkExperinceChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </>
      ),
    },
    // Add more steps as needed
  ];
  
  const StyledFormContainer = styled(Grid)({});

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
            <Grid item xs={12} md={6} className="workingExperienceTab">
              <Box sx={{ maxWidth: 800 }}  className="StepFormCol formDataInfo">
                <Stepper activeStep={stepperActiveStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent>
                        {step.content}
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button className="arrowButton"
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
                {stepperActiveStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} component={StyledImageContainer}>
              <StyledImage src="/registration-step.svg" alt="Helper Image" />
            </Grid>
          </StyledFormContainer>
        
        </Grid>
      </Container>
    </>
  );
};

export default HelperRegistrationStep3;
