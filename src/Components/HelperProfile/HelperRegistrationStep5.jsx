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
import HelperStepNavigation from "../Signup/HelperRegistrationSteps/HelperStepNavigation";
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

const HelperRegistrationStep5 = ({ saveStepDetails }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(4);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currency, setCurrency] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [formData, setFormData] = useState({});

  const handleRadioChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
        // familyMembers: familyMembers,
      },
    }));

    if (stepperActiveStep === steps.length - 1) {
      saveStepDetails({ ...formData }, "final");
    } else {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const StyledFormContainer = styled(Grid)({});

  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const formDataFromStep4 = location.state.formData;
    console.log("Data from Step 4:", formDataFromStep4);
  }, [location.state.formData]);

  const questions = [
    "Do you smoke?",
    "Have you been vaccinated against the COVID-19 disease?",
    "Do you have a tattoo?",
    "Can you get along with dogs, cats, or other pets?",
    "Are you comfortable working with co-helpers?",
    "Are you willing to take days off that are not on Sundays sometimes?",
    "Are you willing to accept monetary compensation to work on your holidays?",
    "Do you accept to work in the employer's house equipped with a camera recording system (for security purposes)?",
    "Are you willing to return home no later than the time set by your employer on your holiday?",
  ];

  const steps = [
    {
      label: "Q&A",
      content: (
        <>
          <FormGroup>
            {questions.map((question, index) => (
              <FormControl
                key={index}
                component="fieldset"
                sx={{ mb: 2 }}
                className="queRow"
              >
                <FormLabel className="formLabel">{question}</FormLabel>
                <RadioGroup
                  className="radioCheckBtn"
                  value={answers[index] || ""}
                  onChange={(e) => handleRadioChange(index, e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            ))}
          </FormGroup>
        </>
      ),
    },
  ];

  return (
    <>
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
          {stepperActiveStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
            </Paper>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default HelperRegistrationStep5;
