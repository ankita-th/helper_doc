import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
// import { ChatMessage } from "../../components/Common/Chat";


const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const ChatDetails = ({ message, onBack }) => {
  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={2}>
        <Box ml={2}>
          <Typography variant="h2" className="commonTitle">Chat</Typography>
          <Typography variant="body1">
            Lorem Ipsum has been the industry's standard.
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      Back
      <Grid container spacing={3}>
        <Grid item md={3}>
          <Box className="ChatSidebar" p={2}>
            <Box textAlign="center" className="chatProfileInfo">
              <Avatar
                alt="User Avatar"
                src="/user_avatar.jpg"
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h4" textAlign="center">Jane Doe</Typography>
                <Typography className="applicationDot"><span></span>Application</Typography>
              </Box>
            </Box>
            <Box mt={2} className="bottomDetails">
              <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                />
              </LoadScript>
              <Box mt={2}>
                <Button className="green-btn" variant="contained">
                  View Profile
                </Button>
                <Button className="green-btn" variant="contained">
                  View Contact Number
                </Button>
                <Button className="green-btn" variant="contained">
                  <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5135 2.19568L16.5136 2.19585C16.893 2.57505 17.1939 3.02527 17.3993 3.52081C17.6046 4.01635 17.7103 4.54749 17.7103 5.08388C17.7103 5.62027 17.6046 6.15141 17.3993 6.64694C17.1939 7.14248 16.893 7.59271 16.5136 7.97191L16.5135 7.97199L15.6302 8.85532L9.50042 14.9851L3.37064 8.85532L2.48731 7.97199C1.72134 7.20602 1.29102 6.16713 1.29102 5.08388C1.29102 4.00063 1.72134 2.96174 2.48731 2.19576C3.25329 1.42979 4.29217 0.999469 5.37542 0.999469C6.45868 0.999469 7.49756 1.42979 8.26354 2.19576L9.14687 3.0791C9.34213 3.27436 9.65871 3.27436 9.85398 3.0791L10.7373 2.19577L10.7374 2.19568C11.1166 1.81631 11.5668 1.51536 12.0624 1.31003C12.5579 1.10471 13.089 0.999023 13.6254 0.999023C14.1618 0.999023 14.6929 1.10471 15.1885 1.31003C15.684 1.51536 16.1343 1.81631 16.5135 2.19568Z" fill="#55DBA6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> Add to Favorites
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={9}>
          <Box mt={2} border={1} borderRadius={3} p={2}>
              <Box className="jobsFlex chatDisplay">
                <img src="/building.svg" alt="Logo" className="work" />
                <Box className="JobTitle">
                  <Typography variant="h6">Full time helper for a new family</Typography>
                  <Typography variant="body1">I want to apply for this job</Typography>
                </Box>
              </Box>
            <Divider />
            <Box mt={2}>
              {/* Message Display Area */}
              <Box
                sx={{
                  maxHeight: "800px", // Adjust the maximum height as needed
                  overflowY: "auto", // Enable vertical scrollbar if messages overflow
                  marginBottom: 2, // Add margin bottom to separate input from message display area
                }}
              >
                {/* Messages will be displayed here */}
              </Box>

              {/* Chatting messages */}
              <Box className="MessageChat">
                <Box className="chatMsgs">
                  <Box className="primaryChat">
                    <Avatar alt={message.sender} src={message.avatar} className="avatar"/>
                    <Box className="messageView">
                      <Box className="Box">
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </Box>
                      <Typography variant="body2" color="textSecondary" className="timings">
                        {message.created_at}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="chatMsgs">
                  <Box className="SecondaryChat">
                    <Box className="messageView">
                      <Box className="Box">
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </Box>
                      <Typography variant="body2" color="textSecondary" className="timings">
                        {message.created_at}
                      </Typography>
                    </Box>
                    <Avatar alt={message.sender} src={message.avatar} className="avatar"/>
                  </Box>
                </Box>
                <Box className="chatMsgs">
                  <Box className="primaryChat">
                    <Avatar alt={message.sender} src={message.avatar} className="avatar"/>
                    <Box className="messageView">
                      <Box className="Box">
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </Box>
                      <Typography variant="body2" color="textSecondary" className="timings">
                        {message.created_at}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="chatMsgs">
                  <Box className="SecondaryChat">
                    <Box className="messageView">
                      <Box className="Box">
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </Box>
                      <Box className="Box">
                          Lorem Ipsum has been the industry's
                      </Box>
                      <Typography variant="body2" color="textSecondary" className="timings">
                        {message.created_at}
                      </Typography>
                    </Box>
                    <Avatar alt={message.sender} src={message.avatar} className="avatar"/>
                  </Box>
                </Box>
              </Box>
              {/* Input Field with Icons */}
              <TextField className="chatInput"
                fullWidth
                variant="outlined"
                placeholder="Type your message here"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className="attach" aria-label="attach file">
                        <AttachFileIcon />
                      </IconButton>
                      <IconButton className="sendicon" aria-label="send message">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatDetails;
