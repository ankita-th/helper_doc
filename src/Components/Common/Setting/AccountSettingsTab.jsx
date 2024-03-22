import {
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import SubmitButton from "../CommonButtons/SubmitButton";
import CustomTextField from "../InputFields/CustomTextField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import DeleteModal from "../Modals/DeleteModal";
import { toastMessage } from "../../../Utils/toastMessages";
import { successType } from "../../../Constant/Constant";
import {
  deleteAccount,
  updatePassword,
} from "../../../Services/JobsServices/JobServices";
import PageLoader from "../Loader/PageLoader";
import persistStore from "redux-persist/es/persistStore";

const AccountSettingsTab = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
  });
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const schema = yup.object().shape({
    old_password: yup.string().required(t("Old password is required")),
    new_password: yup
      .string()
      .notOneOf([yup.ref("old_password"), null], t("old password and new password must not match"))
      .required("New password is required"),
  });
  const [passwordError, setPasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleDeleteAccountModal = () => {
    setShowDeleteAccountModal(!showDeleteAccountModal);
  };

  const handleDelete = () => {
    const userId = localStorage.getItem("userId");
    deleteAccount(userId)
      .then((res) => {
        localStorage.clear();
        // persistStore(reduxStore).purge();
        //verify
        toastMessage("Your Account is Successfully deleted", successType);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        //verify
        toastMessage("something went wrong");
        toggleDeleteAccountModal();
      });
  };
  const onSubmit = (data) => {
    const payload = {
      newPassword: data?.new_password,
      currentPassword: data?.old_password,
    };
    setLoader(true);
    console.log(payload, "payload");
    updatePassword(userId, payload)
      .then((res) => {
        console.log(res?.data?.data);
        toastMessage("Password Updated successfully", successType);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const handleChangePassword = (type, value) => {
    const old_password = watch("old_password");
    const new_password = watch("new_password");
    if (type === "old_password") {
      if (value === new_password) {
        if (new_password?.length > 0) {
          setError("new_password", {
            type: "manual",
            message: "Passwords and confirm password must not match",
          });
        }
      } else {
        if (new_password?.length > 0) {
          setError("new_password", {
            type: "manual",
            message: "", // Clear the error message
          });
        }
      }
    }
    if (type === "new_password") {
      if (old_password === value) {
        if (old_password?.length > 0) {
          setError("new_password", {
            type: "manual",
            message: "Passwords and confirm password must not match",
          });
        }
      } else {
        if (new_password?.length > 0) {
          setError("new_password", {
            type: "manual",
            message: "", // Clear the error message
          });
        }
      }
    }
  };
  return (
    <>
      {" "}
      {loader && <PageLoader />}
      <Box border={1} borderRadius={8} borderColor="grey.300" p={3} mb={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account Settings */}
          <Typography variant="h6" gutterBottom className="subHead">
            Account Settings
          </Typography>
          {/* <hr className="hrSetting"></hr> */}
          {/* Email Address Section */}
          {/* <Box mb={2} className="editEmail">
            <Typography variant="subtitle1" gutterBottom>
              <strong>Email Address</strong>
              <Link to="/">
                <img src="/editSet.svg" alt="Edit Email" />
              </Link>
            </Typography>
            <Typography variant="body1">
              Your email address is <Link to="/">example@gmail.com</Link>
            </Typography>
          </Box> */}
          <hr className="hrSetting"></hr>

          {/* Change Password Section */}
          <Box mb={4} className="passwordUpdate">
            <Typography variant="subtitle1" gutterBottom>
              Password
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              className="passwordinput"
            >
              <Controller
                name="old_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    onChange={(e) => {
                      handleChangePassword("old_password", e.target.value);
                      field.onChange(e);
                    }}
                    className="formInputFiled"
                    // placeholder={t("password")}
                    placeholder="Old password"
                    autoComplete="current-password"
                    type={showPassword?.old_password ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                old_password: !showPassword?.old_password,
                              })
                            }
                          >
                            {showPassword?.old_password ? (
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
              {/* <FormControl fullWidth variant="outlined">
                <FormGroup>
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={showPassword?.new_password ? "text" : "password"}
                    //   value={newPassword}
                    //   onChange={handleNewPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              new_password: !showPassword?.new_password,
                            })
                          }
                          edge="end"
                        >
                          {showPassword?.new_password ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm New Password"
                  />
                </FormGroup>
              </FormControl> */}
              {/* <FormControl fullWidth variant="outlined">
                <FormGroup>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword?.old_password ? "text" : "password"}
                    //   value={password}
                    //   onChange={handlePasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword({
                              ...showPassword,
                              old_password: !showPassword?.old_password,
                            })
                          }
                          edge="end"
                        >
                          {showPassword?.old_password ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </FormGroup>
              </FormControl> */}

              <Controller
                name="new_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    onChange={(e) => {
                      handleChangePassword("new_password", e.target.value);
                      field.onChange(e);
                    }}
                    className="formInputFiled"
                    // placeholder={t("password")}
                    placeholder="New password"
                    autoComplete="current-password"
                    type={showPassword?.new_password ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword({
                                ...showPassword,
                                new_password: !showPassword?.new_password,
                              })
                            }
                          >
                            {showPassword?.new_password ? (
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
            </Box>
            {/* <Typography variant="body2" className="resetPass" color="textSecondary">
        Can’t remember your current password? <Link to="/">Reset your password</Link>
      </Typography> */}
            {/* {passwordError && <ErrorMessage msg={t("old_password_match")} />} */}
            {errors?.new_password && (
              <ErrorMessage msg = {errors?.new_password?.message} />
            ) }
            <Box mt={2}>
              <SubmitButton
                type="submit"
                contentText={t("change_password")}
                // loader={buttonLoader}
                // disabled={showErrorMsg.show || buttonLoader}
              />
            </Box>
          </Box>
        </form>

        {/* Delete Account Section */}

        <hr className="hrSetting"></hr>
        <Box mb={2} className="editEmail">
          <Typography variant="h6" gutterBottom className="subHead">
            <strong>Delete Account</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Would you like to delete your account?
            <br />
            Deleting your account will remove all the content associated with
            it.
          </Typography>
          <Box mt={2}>
            <Button
              className="delLink"
              variant="text"
              color="error"
              style={{
                textDecoration: "underline",
                textTransform: "none",
              }}
              onClick={toggleDeleteAccountModal}
            >
              I want to delete my account.
            </Button>
          </Box>
        </Box>
      </Box>
      {showDeleteAccountModal && (
        <DeleteModal
          showModal={showDeleteAccountModal}
          toggleModal={toggleDeleteAccountModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default AccountSettingsTab;
