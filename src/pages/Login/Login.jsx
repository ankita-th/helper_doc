import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CssBaseline,
  Typography,
  Link as MuiLink,
  Paper,
  Container,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../Components/Common/ErrorMessage/ErrorMessage";
import CustomTextField from "../../Components/Common/InputFields/CustomTextField";
import SocialLogin from "../../Components/Common/SocialAuth/SocialLogin";
import { EMAIL_REGEX } from "../../Utils/Regex";
import { googleCaptchaID } from "../../Config/authConfig";
// import { useDispatch } from "react-redux";
// import { setPageLoader } from "../../Redux/CommonSlice";
import { loginUser } from "../../Services/AuthServices/AuthService";
import { useSnackBar } from "../../Utils/CustomHooks/useSnackBarMessages";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";

const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  // const dispatch = useDispatch();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(t("email_required"))
      .matches(EMAIL_REGEX, t("valid_email_msg")),
    password: yup.string().required(t("password_required")),
  });
  const captchaRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the state
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data) => {
    const captchaValue = captchaRef?.current?.getValue();
    if (captchaValue?.length <= 0) {
      setShowErrorMsg({ show: true, msg: t("captcha_select_msg") });
      return;
    }
    if (showErrorMsg.show) {
      return;
    }
    // dispatch(setPageLoader(true));
    setButtonLoader(true);
    loginUser(data)
      .then((res) => {
        // dispatch(setPageLoader(false));
        setButtonLoader(false);
        showSuccessSnackBar(t("login_successfully"));
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        localStorage.setItem("selectedRole", res.data.role);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setShowErrorMsg({ show: true, msg: err.response.data?.message });
          showErrorSnackBar(err.response.data?.message);
        } else {
          showErrorSnackBar(t("failure_message"));
        }
        setButtonLoader(false);
        // dispatch(setPageLoader(false));
        console.log(err, "/////");
      });
  };


  const handleChange = () => {
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };

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
                {t("login")}
              </Typography>
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="formDataInfo"
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange();
                        field.onChange(e);
                      }}
                      className="formInputFiled"
                      id="username"
                      placeholder={t("email")}
                      autoComplete="username"
                      autoFocus
                    />
                  )}
                />

                {errors?.email && <ErrorMessage msg={errors?.email?.message} />}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      onChange={(e) => {
                        handleChange();
                        field.onChange(e);
                      }}
                      className="formInputFiled"
                      placeholder={t("password")}
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors?.password && (
                  <ErrorMessage msg={errors?.password?.message} />
                )}
                {showErrorMsg.show && <ErrorMessage msg={showErrorMsg.msg} />}
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
                      label={t("remember_me")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className="forgotPassword">
                    <MuiLink variant="body2" component={Link} to="/">
                      {t("forgot_password")}
                    </MuiLink>
                  </Grid>
                </Grid>

                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={googleCaptchaID}
                  onChange={handleChange}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <SubmitButton
                    contentText={t("login")}
                    loader={buttonLoader}
                    disabled={showErrorMsg.show || buttonLoader}
                  />
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
                    {t("login_with")}
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
                  <SocialLogin />
                </Box>
                <Box
                  className="mt-4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px", // Adjust the spacing as needed
                  }}
                >
                  {t("dont_have_ac")}?{" "}
                  <MuiLink color="inherit" component={Link} to="/register">
                    {t("signup")}
                  </MuiLink>
                </Box>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledImage src="/login.png" alt="Helper Image" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
