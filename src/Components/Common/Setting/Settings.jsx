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
import HelperDashboardSubHeader from "../Headers/HelperDashboardSubHeader";
import { useTranslation } from "react-i18next";
import AccountSettingsTab from "./AccountSettingsTab";
import NotificationSetting from "./NotificationSetting";

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
  const { t } = useTranslation();

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
    {/* <Grid container className="dashboardRow"> */}
      {/* <Grid className="dashboardContentArea"> */}
          <Box maxWidth="xl" sx={{ padding: "20px" }}>
          <HelperDashboardSubHeader
          title={t("Settings")}
          description={t("Lorem Ipsum has been the industry's standard.")}
         
        />
            <Tabs className="customTabs"
              value={activeTab}
              onChange={handleTabChange}
              aria-label="settings tabs"
            >
              <Tab label="Notifications Settings" />
              <Tab label="Account Settings" />
            </Tabs>
            {activeTab === 0 && (
              // <Box
              //   border={1}
              //   borderRadius={8}
              //   borderColor="grey.300"
              //   p={3}
              //   mb={2}
              // >
              //   <Box>
              //     <Typography variant="h6" gutterBottom className="subHead">
              //       Notifications
              //     </Typography>
              //     <Typography variant="body1" gutterBottom>
              //       We may still send you important notifications about your
              //       account outside of your notification settings
              //     </Typography>
              //   </Box>
              //   <hr className="hrSetting"></hr>
              //   <Box>
              //     <FormGroup row className="pushsetting">
              //       <Grid className="gridsetting">
              //         <Grid item md={8} className="primary">
              //           <Typography variant="h6" gutterBottom className="subHead">
              //             Latest Job Posts
              //           </Typography>
              //           <Typography variant="body1" gutterBottom>
              //               These are notifications for latest job posted in one day.
              //           </Typography>
              //         </Grid>
              //         <Grid item md={4} className="secondary">
              //             <FormControlLabel
              //                 control={
              //                   <Switch
              //                     checked={notificationsPush}
              //                     onChange={handleNotificationsPushToggle}
              //                   />
              //                 }
              //                 label="Push"
              //               />
              //               <FormControlLabel
              //                 control={
              //                   <Switch
              //                     checked={notificationsEmail}
              //                     onChange={handleNotificationsEmailToggle}
              //                   />
              //                 }
              //                 label="Email"
              //               />
              //         </Grid>
              //       </Grid>
              //     </FormGroup>
                    
              //   </Box>
              //   <hr className="hrSetting"></hr>
              //   <Box>
              //     <FormGroup row className="pushsetting">
              //       <Grid className="gridsetting">
              //         <Grid item md={8} className="primary">
              //           <Typography variant="h6" gutterBottom className="subHead">
              //             Message
              //           </Typography>
              //           <Typography variant="body1" gutterBottom>
              //             These are notifications for Message if someone message
              //             you. You will get the notification.
              //           </Typography>
              //         </Grid>
              //         <Grid item md={4} className="secondary">
              //           <FormControlLabel
              //             control={
              //               <Switch
              //                 checked={messagePush}
              //                 onChange={handleMessagePushToggle}
              //               />
              //             }
              //             label="Push"
              //           />
              //           <FormControlLabel
              //             control={
              //               <Switch
              //                 checked={messageEmail}
              //                 onChange={handleMessageEmailToggle}
              //               />
              //             }
              //             label="Email"
              //           />
              //         </Grid>
              //       </Grid>
              //     </FormGroup>
              //   </Box>
                
              // </Box>
              <NotificationSetting/>
            )}
            {activeTab === 1 && (
            <AccountSettingsTab/>
            )}
          </Box>
        {/* </Grid> */}
      {/* </Grid>  */}
    </>
  );
};

export default Setting;
