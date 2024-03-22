import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { updateNotifications } from "../../../Services/JobsServices/JobServices";
import PageLoader from "../../Common/Loader/PageLoader";


const NotificationSetting = () => {
  const userId = localStorage.getItem("userID")
  const [loader,setLoader] = useState(false);
  const [notifications, setNotifications] = useState({
    isJobPushNotificationOn: false,
    isJobEmailNotificationOn: false,
    isMessagePushNotificationOn: false,
    isMessageEmailNotificationOn: false,
  });
  const handleToggle = (field, value) => {
    setLoader(true);
    let payload = { ...notifications };
    payload = { ...payload, [field]: !payload[field] };
    setNotifications({ ...notifications, [field]: !notifications[field] });
    updateNotifications(userId,payload)
    .then((res)=>{
     console.log(res?.data?.data);
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoader(false)
    )

  };
  return (
    <div>
      {" "}
      {loader && <PageLoader/>}
      <Box border={1} borderRadius={8} borderColor="grey.300" p={3} mb={2}>
        <Box>
          <Typography variant="h6" gutterBottom className="subHead">
            Notifications
          </Typography>
          <Typography variant="body1" gutterBottom>
            We may still send you important notifications about your account
            outside of your notification settings
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
                      checked={notifications?.isJobPushNotificationOn}
                      onChange={(e) => {
                        handleToggle("isJobPushNotificationOn", e.target.value);
                      }}
                    />
                  }
                  label="Push"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isJobEmailNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isJobEmailNotificationOn",
                          e.target.value
                        );
                      }}
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
                  These are notifications for Message if someone message you.
                  You will get the notification.
                </Typography>
              </Grid>
              <Grid item md={4} className="secondary">
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isMessagePushNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isMessagePushNotificationOn",
                          e.target.value
                        );
                      }}
                    />
                  }
                  label="Push"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications?.isMessageEmailNotificationOn}
                      onChange={(e) => {
                        handleToggle(
                          "isMessageEmailNotificationOn",
                          e.target.value
                        );
                      }}
                    />
                  }
                  label="Email"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Box>
    </div>
  );
};

export default NotificationSetting;
