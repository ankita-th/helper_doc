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
import { useTranslation } from "react-i18next";
import FileUploaderField from "../Common/FormFields/FileUploaderField";
import { toastMessage } from "../../Utils/toastMessages";
import { useForm } from "react-hook-form";
import { YOUTUBE_LINK_REGEX } from "../../Utils/Regex";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import { handleFileUploadToS3Bucket } from "../../Utils/CommonAPIs";

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

const HelperRegistrationStep6 = ({ saveStepDetails, setPageLoader }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(5);
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [currency, setCurrency] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [introVideoLink, setIntroVideoLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const handleNext = async (data) => {
    console.log(data);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   workExperience: {
    //     ...prevFormData.workExperience,
    //   },
    // }));

    if (stepperActiveStep === steps.length - 1) {
      const payload = {
        profilePicURL: imageUrl,
        introVideoLink: data.introVideoLink,
      };
      saveStepDetails(payload, "thankyou");
      //   setSubmitted(true);
      //   //   submitFormData();
      //   // navigate("/thankyou", { state: location.state });
    } else {
      if (profilePhoto?.name) {
        setPageLoader((prev) => !prev);
        const fileUpload = await handleFileUploadToS3Bucket(profilePhoto);
        if (!fileUpload.error) {
          const fileUrl = fileUpload.uploadedUrl;
          setImageUrl(fileUrl);
          setPageLoader((prev) => !prev);
        } else {
          setPageLoader((prev) => !prev);
          return;
        }
      }
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

  const handleProfilePhotoChange = (name, file) => {
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      toastMessage(t("img_upload_error_msg"));
    } else {
      setProfilePhoto(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const StyledFormContainer = styled(Grid)({});

  const handleIntroVideoLinkChange = (event) => {
    setIntroVideoLink(event.target.value);
  };

  const steps = [
    {
      label: t("your_photo"),
      content: (
        <>
          <FormControl component="fieldset" className="queRow">
            <FormLabel component="legend" className="formLabel">
              {t("upload_photo_label")}
            </FormLabel>
            <Box className="uploadPhoto">
              <div className="imgWrap">
                <img
                  src={imagePreview ? imagePreview : "/default.png"}
                  alt="Profile"
                  style={{
                    borderRadius: "50%",
                    maxWidth: "130px",
                    maxHeight: "130px",
                  }}
                />
                {/* <StyledImage src="/default.png" alt="Default Image" /> */}
              </div>
              <div className="UploadFileCustom queRow">
                <div className="inputFile">
                  <FileUploaderField
                    name="profile_photo"
                    setFile={handleProfilePhotoChange}
                  />
                  <Typography className="later">
                    {t("or_upload_letter")}
                  </Typography>
                </div>
              </div>
            </Box>
          </FormControl>
        </>
      ),
    },
    {
      label: t("your_self_intro"),
      content: (
        <>
          <FormControl fullWidth className="queRow">
            <FormLabel className="formLabel">
              {t("upload_self_intro_video")}
            </FormLabel>
            <TextField
              {...register("introVideoLink", {
                pattern: {
                  value: YOUTUBE_LINK_REGEX,
                  message: t("invalid_youtube_link"),
                },
              })}
              className="formInputFiled"
              placeholder="https://youtu.be/introvideohere"
              variant="outlined"
            />
            {errors.introVideoLink && (
              <ErrorMessage msg={errors.introVideoLink?.message} />
            )}
            <Typography className="later">
              {t("or_upload__video_letter")}
            </Typography>
          </FormControl>
        </>
      ),
    },
  ];
  return (
    <>
      <Grid item xs={12} md={6} className="workingExperienceTab">
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
    </>
  );
};

export default HelperRegistrationStep6;
