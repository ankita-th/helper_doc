// components/Signup/HelperRegistrationSteps/HelperRegistrationStep1.tsx
import React, { FC, useState, useEffect } from "react";
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
} from "@mui/material";
import { Box, Container, styled } from "@mui/system";
import * as isoCountries from "i18n-iso-countries";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelperStepNavigation from "./HelperStepNavigation";
// import "../HelperSignup.css";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

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

const questions = [
  {
    id: 1,
    text: "Q1: Have you ever changed your name before *",
    type: "yes-no",
  },
  {
    id: 2,
    text: "Q2: Have you been refused entry into, deported from, removed from or required to leave Any Country *",
    type: "yes-no",
    subQuestion: "If YES, which country *",
  },
  {
    id: 3,
    text: "Q3: Have you been refused a visa for entry into any following Place *",
    type: "yes-no",
    subQuestion: "If YES, which country *",
  },
  {
    id: 4,
    text: "Q4: Have you been involved in any court case in any country? *",
    type: "yes-no",
    subQuestion: "Please explain the details and result",
  },
  {
    id: 5,
    text: "Q5: What is the reason you want to work aboard. Are you committed to go through the process if you are confirmed hired? *",
    type: "text",
  },
  // Add more questions as needed
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

const StyledTextContent = styled("div")({
  textAlign: "center",
  margin: "20px auto",
  maxWidth: 900,
});

const StyledFormContainer = styled(Grid)({});

const HelperRegistrationStep1 = ({
  setFormData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [subAnswers, setSubAnswers] = useState({});
  const [activeStep, setActiveStep] = useState(0); // Add activeStep to state

  useEffect(() => {
    // Access formData from location.state
    const formDataFromPreviousStep = location.state?.formData;
    if (formDataFromPreviousStep) {
      console.log("Data received from HelperSignup:", formDataFromPreviousStep);
      setFormData(formDataFromPreviousStep);
      // You can perform additional actions with formDataFromPreviousStep if needed
    }
  }, [location.state, setFormData]);

  const handleRadioChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));

    // Clear sub-question answer when changing the main question answer
    setSubAnswers((prevSubAnswers) => ({
      ...prevSubAnswers,
      [questionId]: "",
    }));
  };

  const handleTextChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubTextChange = (
    questionId,
    answer
  ) => {
    setSubAnswers((prevSubAnswers) => ({
      ...prevSubAnswers,
      [questionId]: answer,
    }));
  };

  const handleNextStep = () => {
    // Set the answers and sub-answers in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers,
      subAnswers,
    }));

    // Example: Navigate to the next step
    console.log("passing data to next step", {
      ...location.state,
      formData: { ...location.state.formData, answers, subAnswers },
    });
    navigate("/registration_steps/step2", {
      state: {
        ...location.state,
        formData: { ...location.state.formData, answers, subAnswers },
      },
    });
  };

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
          <Grid item xs={12}>
            <StyledTextContent>
              <Typography >
                Thank you for applying to <a href="">Helper Doc</a>. The whole registration
                process takes around 10 - 20 minutes to finish.
              </Typography>
              <Typography>
                Please fill in all working experiences you have. You will have a
                higher chance of being contacted and hired.
              </Typography>
              <Typography>
                Before you start, PLEASE CONFIRM THE FOLLOWING DECLARATIONS:
              </Typography>
              <Typography>
                PLEASE DO NOT LIE AND HIDE YOUR RECORD AS WE WILL FIND OUT
                EVENTUALLY.
              </Typography>
            </StyledTextContent>
          </Grid>
          <StyledFormContainer container spacing={3} className="shadow-box stepsFormRow">
            
            <Grid item xs={12} md={6}  className="stepsForm formDataInfo ">
              <StyledPaper className="StepFormCol">
                {/*<Typography variant="h5">
                  Helper Registration - Step 1
                </Typography>*/}
                {questions.map((question) => (
                  <div key={question.id} className="queRow">
                    <Typography variant="body1" className="queTitle">{question.text}</Typography>
                    {question.type === "yes-no" && (
                      <RadioGroup className="radioCheckBtn"
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleRadioChange(question.id, e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio checkedIcon={<CheckCircleRoundedIcon />}/>}
                          label="Yes"

                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio checkedIcon={<CheckCircleRoundedIcon />} />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                    {question.type === "text" && (
                      <TextField
                        multiline
                        fullWidth
                        rows={4}
                        className="formInputFiled"
                        variant="outlined"
                        placeholder="Your answer..."
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleTextChange(question.id, e.target.value)
                        }
                      />
                    )}
                    {question.subQuestion && answers[question.id] === "Yes" && (
                      <div>
                        <Typography variant="body1">
                          {question.subQuestion}
                        </Typography>
                        {question.id === 2 || question.id === 3 ? (
                          <FormControl fullWidth className="formInputFiled">
                            <InputLabel>Select Country</InputLabel>
                            <Select
                              multiple
                              value={subAnswers[question.id] || []}
                              onChange={(e) =>
                                handleSubTextChange(
                                  question.id,
                                  e.target.value
                                )
                              }
                              renderValue={(selected) =>
                                selected &&
                                (selected)
                                  .map((code) =>
                                    isoCountries.getName(code, "en")
                                  )
                                  .join(", ")
                              }
                              IconComponent={() => (
                                <IconButton size="small">
                                  <ArrowDropDownIcon />
                                </IconButton>
                              )}
                            >
                              {Object.keys(isoCountries.getNames("en")).map(
                                (countryCode) => (
                                  <MenuItem
                                    key={countryCode}
                                    value={countryCode}
                                  >
                                    {isoCountries.getName(countryCode, "en")}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                           className="formInputFiled"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Your answer..."
                            value={subAnswers[question.id] || ""}
                            onChange={(e) =>
                              handleSubTextChange(question.id, e.target.value)
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <Button className="arrowButton" onClick={handleNextStep}>Next Step</Button>
              </StyledPaper>
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

export default HelperRegistrationStep1;
