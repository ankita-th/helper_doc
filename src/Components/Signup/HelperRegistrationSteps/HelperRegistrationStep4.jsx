import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControlLabel,
  RadioGroup,
  FormGroup,
  FormLabel,
  Radio,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import HelperStepNavigation from "./HelperStepNavigation";
import { useLocation, useNavigate } from "react-router-dom";

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

const HelperRegistrationStep4 = ({
  formData,
  setFormData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(3);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currency, setCurrency] = useState("");
  const [jobType, setJobType] = useState("");
  const [preferredDayOff, setPreferredDayOff] = useState("");
  const [sleepingArrangement, setSleepingArrangement] = useState("");
  const [shareWork, setShareWork] = useState("");
  const [livingArrangement, setLivingArrangement] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");

  const handleNext = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
        // familyMembers: familyMembers,
        currency,
        jobType,
        preferredDayOff,
        sleepingArrangement,
        shareWork,
        livingArrangement,
        preferredLocation,
      },
    }));

    if (stepperActiveStep === steps.length - 1) {
      navigate("/registration_steps/step5", { state: location.state });
    } else {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleJobType = (event) => {
    setJobType(event.target.value);
  };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const formDataFromStep3 = location.state.formData;
    console.log("Data from Step 3:", formDataFromStep3);
  }, [location.state.formData]);

  
  const StyledFormContainer = styled(Grid)({});

  const steps = [
    {
      label: "Contract",
      content: (
        <>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel" id="jobType">Choose the type of employment *</FormLabel>
            <RadioGroup className="radioCheckBtn"
              row
              aria-labelledby="jobType"
              name="row-radio-buttons-group"
              value={jobType}
              onChange={handleJobType}
            >
              <FormControlLabel
                value="full_time"
                control={<Radio />}
                label="Full Time"
              />
              <FormControlLabel
                value="part_time"
                control={<Radio />}
                label="Part Time"
              />
            </RadioGroup>
          </FormControl>
        </>
      ),
    },
    {
      label: "Job Offer",
      content: (
        <>
          <FormGroup>
            <Grid container spacing={2}>
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
            </Grid>
          </FormGroup>
          <FormControl fullWidth className="queRow">
            <FormLabel id="dayOff" className="formLabel">Preferred Day Off *</FormLabel>
            <Select className="formInputFiled"
              value={preferredDayOff}
              onChange={(e) => setPreferredDayOff(e.target.value)}
            >
              <MenuItem value="flexibleDay">Flexible</MenuItem>
              <MenuItem value="sunday">Sunday</MenuItem>
              <MenuItem value="monday">Monday</MenuItem>
              <MenuItem value="tuesday">Tuesday</MenuItem>
              <MenuItem value="wednesday">Wednesday</MenuItem>
              <MenuItem value="thursday">Thrusday</MenuItem>
              <MenuItem value="friday">Friday</MenuItem>
              <MenuItem value="saturday">Saturday</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="dayOff" className="formLabel">Sleeping Arrangement *</FormLabel>
            <Select className="formInputFiled"
              value={sleepingArrangement}
              onChange={(e) => setSleepingArrangement(e.target.value)}
            >
              <MenuItem value="flexibleSleeping">Flexible</MenuItem>
              <MenuItem value="alone">Alone</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="shareWork" className="formLabel">Share work with co-worker *</FormLabel>
            <Select className="formInputFiled"
              value={shareWork}
              onChange={(e) => setShareWork(e.target.value)}
            >
              <MenuItem value="flexibleWork">Flexible</MenuItem>
              <MenuItem value="alone">Alone</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="livingArrangement" className="formLabel">Living arrangement *</FormLabel>
            <Select className="formInputFiled"
              value={livingArrangement}
              onChange={(e) => setLivingArrangement(e.target.value)}
            >
              <MenuItem value="flexibleLive">Flexible</MenuItem>
              <MenuItem value="livein">Live In</MenuItem>
              <MenuItem value="liveout">Live Out</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="queRow">
            <FormLabel id="preferredLocation" className="formLabel">
              Preferred working Location *
            </FormLabel>
            <Select className="formInputFiled"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
            >
              <MenuItem value="hong-kong">Hong Kong</MenuItem>
              <MenuItem value="singapur">Singapur</MenuItem>
              <MenuItem value="kuwait">Kuwait</MenuItem>
              <MenuItem value="saudi-arabia">Saudi Arabia</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
    },
    // Add more steps as needed
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
            <Grid item xs={12} md={6} className="workingExperienceTab">
              <Box sx={{ maxWidth: 800 }} className="StepFormCol formDataInfo">
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

export default HelperRegistrationStep4;
