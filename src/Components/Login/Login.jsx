// src/components/Login/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Link,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ReCAPTCHA from "react-google-recaptcha";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { setRole, updateFormData } from "../../redux/actions/userActions"; // Updated import path
import { FacebookIcon } from "../Common/SocialIcons";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import CustomTextField from "../Common/CustomTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { LoginUser } from "../../Models/authUserInterface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";
import CustomTextField from "../Common/InputFields/CustomTextField";
// import { loginUser } from "../../services/authServices";

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const validationSchema = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the state
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://192.168.1.155:5000/api/users/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ username, password }),
  //       }
  //     );

  //     const result = await response.json();
  //     if (result.success) {
  //       onLogin(result.user);
  //       localStorage.setItem("user", JSON.stringify(result.user));
  //       const userRole = result.user.roles[0];

  //       switch (userRole) {
  //         case "applicant":
  //           navigate("/applicant_dashboard");
  //           break;
  //         case "employer":
  //           navigate("/employer_dashboard");
  //           break;
  //         case "agency":
  //           navigate("/agency_dashboard");
  //           break;
  //         default:
  //           navigate("/");
  //       }
  //     } else {
  //       // Handle login error
  //       setErrorModalOpen(true);
  //     }
  //   } catch (error) {
  //     // Handle login error
  //     setErrorModalOpen(true);
  //   }
  // };

  const handleOnSubmit = (data) => {
    console.log(data);
    if(data.email === "helper@yopmail.com"){
      navigate("/helper_dashboard");
    } else {
      navigate("/employ-dashboard");
    }
    // setTermsAndConditions(true);
    // Dispatch the updateFormData action
    // loginUser(data)
    // dispatch(updateFormData(data));
  };

  const handleLogin = async () => {
    navigate("/helper_dashboard");
    // try {
    //   const response = await fetch(
    //     "http://192.168.1.155:5000/api/users/login",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ username, password }),
    //     }
    //   );

    //   const result = await response.json();
    //   if (result.success) {
    //     // Redirect to the employer dashboard
    //     navigate("/employer_dashboard");

    //     // Save user data to local storage if needed
    //     localStorage.setItem("user", JSON.stringify(result.user));

    //     // Optionally, perform other actions after successful login
    //   } else {
    //     // Handle login error
    //     setErrorModalOpen(true);
    //   }
    // } catch (error) {
    //   // Handle login error
    //   setErrorModalOpen(true);
    // }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  function onChange() {
    // console.log("Captcha value:", value);
  }

  return (
    <Container className="main-outer" maxWidth="lg" sx={{ padding: "20px" }}>
      <CssBaseline />
      <Paper
        className="shadow-box"
        elevation={5}
        style={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid className="formLoginSignup">
              <Typography component="h4" variant="h5">
                Login
              </Typography>
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="formDataInfo"
              >
                <CustomTextField
                  className="formInputFiled"
                  id="username"
                  placeholder="Username"
                  autoComplete="username"
                  autoFocus
                  {...register("email")}
                />

                {errors?.email && <ErrorMessage msg={errors?.email?.message} />}
                <CustomTextField
                  className="formInputFiled"
                  placeholder="Password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    // Add an end adornment for password visibility toggle
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors?.password && (
                  <ErrorMessage msg={errors?.password?.message} />
                )}
                <Grid container spacing={3} className="rememberMe">
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="forgotPassword">
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>

                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onChange}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className="green-btn"
                    type="submit"
                    variant="contained"
                    sx={{}}
                  >
                    Login
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2, // Adjust margin as needed
                  }}
                >
                  <Box
                    sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }}
                  />
                  <Typography
                    className="loginWith"
                    variant="body1"
                    sx={{ mx: 2 }}
                  >
                    Or Login With
                  </Typography>
                  <Box
                    sx={{ width: "35%", bgcolor: "#dcdcdc", height: "1px" }}
                  />
                </Box>
                <Box
                  className="socialLogin"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px", // Adjust the spacing as needed
                  }}
                >
                  {/* <FacebookLogin appId="1088597931155576">
                    <FacebookIcon />
                    Log in with Facebook
                  </FacebookLogin> */}

                  {/* <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                  /> */}
                </Box>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledImage src="/login.png" alt="Helper Image" />
          </Grid>
        </Grid>
      </Paper>

      {/* Error Modal */}
      <Dialog open={errorModalOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>{t("Error")}</DialogTitle>
        <DialogContent>
          <Typography>{t("Invalid credentials. Please try again.")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary" autoFocus>
            {t("Close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
