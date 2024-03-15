import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/system";
import { Grid, Paper, Typography } from "@mui/material";
import HelperProfileStepSection from "../../Components/HelperProfile/HelperProfileStepSection";
import HelperRegistrationStep1 from "../../Components/HelperProfile/HelperRegistrationStep1";
import { useTranslation } from "react-i18next";
import ProfileDiscrimination from "../../Components/HelperProfile/ProfileDiscrimination";
import "./helper.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  addStepperData,
  getStepperData,
} from "../../Services/ProfileServices/StepperServices";
import HelperRegistrationStep2 from "../../Components/HelperProfile/HelperRegistrationStep2";

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

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledImageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HelperProfileDetailsSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [stepDetails, setStepDetails] = useState({});
  const { t } = useTranslation();
  const { step } = useParams();
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();

  useEffect(() => {
    let currentStep = 1;
    switch (step) {
      case "disclaimer":
        currentStep = 1;
        break;
      case "applicant_info":
        currentStep = 2;
        break;
      case "working_experience":
        currentStep = 3;
        break;
      case "job_details":
        currentStep = 4;
        break;
      case "q_&_a":
        currentStep = 5;
        break;
      case "final":
        currentStep = 6;
        break;
      default:
        currentStep = 1;
    }

    setActiveStep(currentStep);
  }, [step]);

  useState(() => {
    getStepperData(activeStep, userId)
      .then((res) => {
        console.log(res);
        setStepDetails(res.data)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [activeStep]);

  const saveStepDetails = (answerArray) => {
    // const answerArray = [];

    // Iterate over originalObject
    // for (const key in questAnswer) {
    //   if (key.startsWith("answer_")) {
    //     const questionId = key.split("_")[1]; // Extract questionId
    //     const subKey = `sub_que_${questionId}`;
    //     // const subAnswer = Array.isArray(questAnswer[subKey])
    //     //   ? questAnswer[subKey].join(", ")
    //     //   : questAnswer[subKey] || "";
    //     const subAnswer = questAnswer[subKey] || "";

    //     answerArray.push({
    //       questionId,
    //       answer: questAnswer[key],
    //       subAnswer: subAnswer || "",
    //     });
    //   }
    // }

    const payload = {
      userId: userId,
      answer: answerArray,
    };

    addStepperData(activeStep, payload,userId)
      .then((res) => {
        navigate("/register/helper/profile-steps/applicant_info", {
          state: { prevRoute: "/register/helper" },
        });
        console.log(res, "ressss");
      })
      .catch((err) => {
        navigate("/register/helper/profile-steps/applicant_info", {
          state: { prevRoute: "/register/helper" },
        });
        console.log(err);
      });
  };
  return (
    <>
      <HeaderBar className="heroBanner">
        <TitleWrapper>
          <Typography variant="h4" className="pageTitle">
            {t("domestic_helper_form")}
          </Typography>
        </TitleWrapper>
      </HeaderBar>
      <Container maxWidth="xl" className="stepsContainer">
        <Grid container spacing={3} className="stepsRow">
          <HelperProfileStepSection activeStep={activeStep} />
          <ProfileDiscrimination />
          <Grid container spacing={3} className="shadow-box stepsFormRow">
            {activeStep === 1 && (
              <HelperRegistrationStep1 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            {activeStep === 2 && (
              <HelperRegistrationStep2 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            {activeStep === 3 && (
              <HelperRegistrationStep1 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            {activeStep === 4 && (
              <HelperRegistrationStep1 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            {activeStep === 5 && (
              <HelperRegistrationStep1 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            {activeStep === 6 && (
              <HelperRegistrationStep1 saveStepDetails={saveStepDetails} stepDetails={stepDetails} />
            )}
            <Grid
              item
              xs={12}
              md={6}
              component={StyledImageContainer}
              className="stepsSidebarImg"
            >
              <StyledImage src="/registration-step.svg" alt="Helper Image" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelperProfileDetailsSteps;
