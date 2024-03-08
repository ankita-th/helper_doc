import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
  Button,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useLocation } from "react-router-dom";
import SideMenuBar from "../SideMenubar/SideMenuBar";
import EmpSideBar from "../SideMenubar/EmpSideBar";

const Setting = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [latestJobPostPush, setLatestJobPostPush] = useState(true);
  const [latestJobPostEmail, setLatestJobPostEmail] = useState(true);
  const [messagePush, setMessagePush] = useState(true);
  const [messageEmail, setMessageEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { pathname } = useLocation();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event
  ) => {
    setNewPassword(event.target.value);
  };

  const handleTogglePasswordVisibility1 = () => {
    setCurrentPassword((prev) => !prev);
  };

  const handleTogglePasswordVisibility2 = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNotificationsPushToggle = () => {
    setNotificationsPush((prev) => !prev);
  };

  const handleNotificationsEmailToggle = () => {
    setNotificationsEmail((prev) => !prev);
  };

  const handleLatestJobPostPushToggle = () => {
    setLatestJobPostPush((prev) => !prev);
  };

  const handleLatestJobPostEmailToggle = () => {
    setLatestJobPostEmail((prev) => !prev);
  };

  const handleMessagePushToggle = () => {
    setMessagePush((prev) => !prev);
  };

  const handleMessageEmailToggle = () => {
    setMessageEmail((prev) => !prev);
  };

  const handleDeleteAccount = () => {
    console.log("Deleting user account...");
  };

  return (
    <>
    <Grid container className="dashboardRow">
      {/* Sidebar Component */}
      <Grid className="dashboardSidebar">
      {pathname === '/employee/settings' ? <EmpSideBar /> : <SideMenuBar />}
      </Grid>
      {/* Main Content */}
      <Grid className="dashboardContentArea">
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Box ml={2}>
                <Typography variant="h2" className="commonTitle">Settings</Typography>
                <Typography variant="body1">
                  Every job notification you've ever received.
                </Typography>
              </Box>
            </Box>
            <Tabs className="customTabs"
              value={activeTab}
              onChange={handleTabChange}
              aria-label="settings tabs"
            >
              <Tab label="Notifications Settings" />
              <Tab label="Account Settings" />
            </Tabs>
            {activeTab === 0 && (
              <Box
                border={1}
                borderRadius={8}
                borderColor="grey.300"
                p={3}
                mb={2}
              >
                <Box>
                  <Typography variant="h6" gutterBottom className="subHead">
                    Notifications
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    We may still send you important notifications about your
                    account outside of your notification settings
                  </Typography>
                </Box>
                <hr className="hrSetting"></hr>
                <Box>
                  <FormGroup row className="pushsetting">
                    <Grid className="gridsetting">
                      <Grid item md={8} className="primary">
                        <Typography variant="h6" gutterBottom className="subHead">
                          Latest Job Posts
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            These are notifications for latest job posted in one day.
                        </Typography>
                      </Grid>
                      <Grid item md={4} className="secondary">
                          <FormControlLabel
                              control={
                                <Switch
                                  checked={notificationsPush}
                                  onChange={handleNotificationsPushToggle}
                                />
                              }
                              label="Push"
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={notificationsEmail}
                                  onChange={handleNotificationsEmailToggle}
                                />
                              }
                              label="Email"
                            />
                      </Grid>
                    </Grid>
                  </FormGroup>
                    
                </Box>
                <hr className="hrSetting"></hr>
                <Box>
                  <FormGroup row className="pushsetting">
                    <Grid className="gridsetting">
                      <Grid item md={8} className="primary">
                        <Typography variant="h6" gutterBottom className="subHead">
                          Message
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          These are notifications for Message if someone message
                          you. You will get the notification.
                        </Typography>
                      </Grid>
                      <Grid item md={4} className="secondary">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={messagePush}
                              onChange={handleMessagePushToggle}
                            />
                          }
                          label="Push"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={messageEmail}
                              onChange={handleMessageEmailToggle}
                            />
                          }
                          label="Email"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Box>
                
              </Box>
            )}
            {activeTab === 1 && (
              <Box
                border={1}
                borderRadius={8}
                borderColor="grey.300"
                p={3}
                mb={2}
              >
                {/* Account Settings */}
                <Typography variant="h6" gutterBottom className="subHead">
                  Account Settings
                </Typography>
                <hr className="hrSetting"></hr>
                {/* Email Address Section */}
                <Box mb={2} className="editEmail">
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Email Address</strong><Link to="/"><img src="/editSet.svg" alt="Edit Email"/></Link>
                  </Typography>
                  <Typography variant="body1">Your email address is <Link to="/">example@gmail.com</Link></Typography>
                </Box>
                <hr className="hrSetting"></hr>

                {/* Change Password Section */}
                <Box mb={4} className="passwordUpdate">
                  <Typography variant="subtitle1" gutterBottom>
                    Password
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2} className="passwordinput">
                    <FormControl fullWidth variant="outlined">
                      <FormGroup>
                        <InputLabel htmlFor="new-password">
                          New Password
                        </InputLabel>
                        <OutlinedInput
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePasswordVisibility2}
                                edge="end"
                              >
                                {showNewPassword ? (
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
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <FormGroup>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePasswordVisibility1}
                                edge="end"
                              >
                                {showCurrentPassword ? (
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
                    </FormControl>
                  </Box>
                  {/* <Typography variant="body2" className="resetPass" color="textSecondary">
                    Can’t remember your current password? <Link to="/">Reset your password</Link>
                  </Typography> */}
                  <Box mt={2}>
                    <Button variant="contained" color="primary" className="arrowButton">
                      Change Password
                    </Button>
                  </Box>
                </Box>

                {/* Delete Account Section */}
                
                <hr className="hrSetting"></hr>
                <Box mb={2} className="editEmail">
                  <Typography variant="h6" gutterBottom className="subHead">
                    <strong>Delete Account</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      Would you like to delete your account?<br/>
                      Deleting your account will remove all the content associated with it.
                  </Typography>
                  <Box mt={2}>
                    <Button className="delLink"
                      variant="text"
                      color="error"
                      style={{
                        textDecoration: "underline",
                        textTransform: "none",
                      }}
                      onClick={handleDeleteAccount}
                    >
                      I want to delete my account.
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid> 
    </>
  );
};

export default Setting;
