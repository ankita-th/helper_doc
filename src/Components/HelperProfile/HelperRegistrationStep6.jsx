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
import ThankYou from "../Common/ThankYou";
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

const HelperRegistrationStep6 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(5);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currency, setCurrency] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [introVideoLink, setIntroVideoLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      workExperience: {
        ...prevFormData.workExperience,
      },
    }));

    if (stepperActiveStep === steps.length - 1) {
      setSubmitted(true);
      //   submitFormData();
      // navigate("/thankyou", { state: location.state });
    } else {
      setStepperActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const submitFormData = () => {
    // Code to send formData to the backend
    // Example: use fetch or axios to send a POST request to your backend API
    fetch("backend-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form data submitted successfully", data);
        setSubmitted(true); // Update state to show the ThankYou message
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  const handleBack = () => {
    setStepperActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const formDataFromStep5 = location.state.formData;
    console.log("Data from Step 5:", formDataFromStep5);
  }, [location.state.formData]);

  const handleProfilePhotoChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setProfilePhoto(files[0]);
    }
  };

  const StyledFormContainer = styled(Grid)({});

  const handleIntroVideoLinkChange = (event) => {
    setIntroVideoLink(event.target.value);
  };

  const steps = [
    {
      label: "Your Photo",
      content: (
        <>
          <FormControl component="fieldset" className="queRow">
            <FormLabel component="legend" className="formLabel">
              Upload a photo of yourself which shows your face clearly with a
              smile, wearing clean white shirt and with clean background. No
              heavy make-up, no sunglasses, no children
            </FormLabel>
            <Box className="uploadPhoto">
              <div className="imgWrap">
                <StyledImage src="/default.png" alt="Default Image" />
              </div>
              <div className="UploadFileCustom queRow">
                <div className="inputFile">
                  <svg
                    width="24"
                    height="17"
                    viewBox="0 0 24 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_493_8356)">
                      <path
                        d="M16.8441 5.80734C16.2084 6.11947 15.6389 6.5229 15.0905 6.96732L14.1469 5.89446C14.8411 5.25437 15.6506 4.75358 16.5206 4.38555C14.76 1.28575 10.5019 0.475162 7.69407 2.64232C6.67454 3.42682 5.90063 4.60078 5.60298 6.1558L5.50923 6.64169L5.02173 6.72741C4.54407 6.81033 4.11751 6.92493 3.74344 7.07028C1.40907 7.96798 0.753757 10.5502 2.18204 12.511C2.79329 13.3454 3.57235 14.196 4.5947 14.3376H6.02391C6.01407 14.4774 6.00891 14.6181 6.00891 14.7602C6.00891 15.1021 6.03798 15.437 6.09423 15.7631H4.57173L4.48173 15.7552C3.05063 15.5745 1.87454 14.5156 1.0247 13.3458C-0.956711 10.6345 0.0187576 6.9799 3.2311 5.74166C3.56626 5.61168 3.92485 5.50314 4.30266 5.41603C4.73157 3.72311 5.64563 2.41964 6.82079 1.51495C10.4391 -1.27133 15.8709 -0.0838646 17.9433 4.01007C18.255 3.96116 18.5672 3.93647 18.877 3.9402C23.513 3.9742 25.3463 9.86588 22.9406 13.0398C21.9764 14.3111 20.4975 15.3928 18.9745 15.744L18.8147 15.7631H17.8861C17.9667 15.2925 17.9903 14.8139 17.9564 14.3376H18.735C19.867 14.067 21.0745 13.1413 21.7927 12.1872C23.5017 9.92504 22.2886 5.38342 18.8672 5.36199C18.1988 5.3564 17.5027 5.51712 16.8441 5.80734ZM11.003 17H12.998C13.4644 17 13.8469 16.6199 13.8469 16.1563V13.4245H15.3019C15.6084 13.4115 15.8259 13.3109 15.952 13.1208C16.2928 12.6126 15.8274 12.1108 15.5044 11.7573C14.588 10.7575 13.0097 9.2775 12.5574 8.74829C12.2142 8.37188 11.7267 8.37188 11.3836 8.74829C10.9163 9.29055 9.28173 10.8805 8.41032 11.8528C8.10798 12.1914 7.73438 12.6526 8.04844 13.1208C8.17782 13.3109 8.39298 13.4115 8.69954 13.4245H10.1545V16.1563C10.1545 16.6147 10.5366 17 11.003 17Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_493_8356">
                        <rect width="24" height="17" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                  />
                  <Typography className="later">
                    or upload photo later
                  </Typography>
                </div>
              </div>
            </Box>
          </FormControl>
        </>
      ),
    },
    {
      label: "Your Self Intro Video",
      content: (
        <>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">
              Please input your YouTube video link for your own self-intro
              video. If you are uncertain the step, please contact our support
              for your self-intro video link
            </FormLabel>
            <TextField
              className="formInputFiled"
              name="introVideoLink"
              placeholder="https://youtu.be/introvideohere"
              value={introVideoLink}
              onChange={handleIntroVideoLinkChange}
              variant="outlined"
            />
            <Typography className="later">
              or upload video link later
            </Typography>
          </FormControl>
        </>
      ),
    },
  ];
  return (
    <>
      {submitted ? (
        <ThankYou />
      ) : (
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
      )}
    </>
  );
};

export default HelperRegistrationStep6;
