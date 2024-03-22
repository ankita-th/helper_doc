import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import ErrorMessage from "../../Components/Common/ErrorMessage/ErrorMessage";
import { VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import CustomTextField from "../../Components/Common/InputFields/CustomTextField";
import SubmitButton from "../../Components/Common/CommonButtons/SubmitButton";
import { resetPassword } from "../../Services/AuthServices/AuthService";
import { toastMessage } from "../../Utils/toastMessages";
import { successType } from "../../Constant/Constant";
import SuccessModal from "../../Components/Common/Modals/SuccessModal";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 digits long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Passwords and confirm password must match"
    )
    .required("Confirm Password is required"),
});

const ResetPassword = ({ userId, setUserId, setStep, email }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const [loader, setLoader] = useState(false);
  const {
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [showErrorMsg, setShowErrorMsg] = useState({
    show: false,
    msg: "",
  });
  const [showResetPassSuccess, setShowResetPassSuccess] = useState(false);
  const toggleResetSuccess = () => {
    setShowResetPassSuccess(!showResetPassSuccess);
  };

  const handleChange = (type, value) => {
    const password = watch("password");
    const confirm_password = watch("confirm_password");
    if (type === "password") {
      if (value === confirm_password) {
        setError("confirm_password", {
          type: "manual",
          message: "", // Clear the error message
        });
      } else {
        if (confirm_password.length > 0) {
          setError("confirm_password", {
            type: "manual",
            message: "Passwords and confirm password must match",
          });
        }
      }
    }
    if (type === "confirm_password") {
      if (password === value) {
        setError("confirm_password", {
          type: "manual",
          message: "", // Clear the error message
        });
      }
    }
    if (showErrorMsg.show) {
      setShowErrorMsg({ show: false, msg: "" });
    }
  };
  const onSubmit = (data) => {
    const payload = {
      confirmPassword: data.confirm_password,
      newPassword: data.confirm_password,
      email: email,
      //have to add otp here
    };

    setLoader(true);
    //commented for future use
    // resetPassword(payload)
    //   .then((res) => {
    //     toastMessage("Password updated successfully", successType);
    //    toggleResetSuccess()
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoader(false));
  };
  const handleContinue = () => {
    //add logic here
  };
  return (
    <>
      {showResetPassSuccess ? (
        ""
        // create reset success modal
        // <SuccessModal
        //   open={showResetPassSuccess}
        //   handleClose={toggleResetSuccess}
        //   handleContinue={handleContinue}
        // />
      ) : (
        <section className="login-process-sec py-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="login-process-wrap">
                  <h3>Create new password</h3>

                  <div className="form-wrap pt-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="fieldset">
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              onChange={(e) => {
                                handleChange("password", e.target.value);
                                field.onChange(e);
                              }}
                              className="formInputFiled"
                              placeholder={"New Password"}
                              autoComplete="current-password"
                              type={
                                showPassword?.password ? "text" : "password"
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => {
                                        setShowPassword({
                                          ...showPassword,
                                          password: !showPassword.password,
                                        });
                                      }}
                                    >
                                      {showPassword.password ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                        {errors.password && (
                          <ErrorMessage msg={errors.password.message} />
                        )}
                      </div>
                      <div className="fieldset">
                        <Controller
                          name="confirm_password"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              onChange={(e) => {
                                handleChange(
                                  "confirm_password",
                                  e.target.value
                                );
                                field.onChange(e);
                              }}
                              className="formInputFiled"
                              placeholder={"Confirm New Password"}
                              autoComplete="current-password"
                              type={
                                showPassword.confirm_password
                                  ? "text"
                                  : "password"
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => {
                                        setShowPassword({
                                          ...showPassword,
                                          confirm_password:
                                            !showPassword.confirm_password,
                                        });
                                      }}
                                    >
                                      {showPassword?.confirm_password ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                        {errors.confirm_password && (
                          <ErrorMessage msg={errors.confirm_password.message} />
                        )}
                      </div>
                      <div className="fieldset">
                        <SubmitButton
                          contentText="reset password"
                          loader={loader}
                          disabled={showErrorMsg.show || loader}
                        />
                      </div>

                      <p>
                        Please create a password with at least 10 characters
                        that uses a combination of uppercase and lowercase
                        letters, numbers, and special characters (e,g .,!?$).
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResetPassword;
