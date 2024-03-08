import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import SideMenuBar from "../../Components/Common/SideMenubar/SideMenuBar";
import ChatDetails from "../../Components/Common/Chat/chatdetails";
import EmpSideBar from "../../Components/Common/SideMenubar/EmpSideBar";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [filter, setFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { pathname } = useLocation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      message: "Hello, how are you?",
      time: "10:00 AM",
      avatar: "/john_doe_avatar.jpg",
      created_at: "1 hour ago",
    },
    {
      id: 2,
      sender: "Jane Doe",
      message: "I'm good, thank you!",
      time: "10:05 AM",
      avatar: "/jane_doe_avatar.jpg",
      created_at: "2 hours ago",
    },
  ]);

  const filteredMessages = messages.filter((message) =>
    message.message.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
        {pathname === '/employee/message' ? <EmpSideBar /> : <SideMenuBar />}
        </Grid>
        {/* Main Content */}
        <Grid className="dashboardContentArea">
          <Box maxWidth="xl" sx={{ padding: "20px" }}>
            {selectedMessage ? (
              <ChatDetails message={selectedMessage} onBack={handleBack} />
            ) : (
              <>
                <Box
                  className="topChatHeading"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box ml={2}>
                      <Typography variant="h2" className="commonTitle">
                        Chat
                      </Typography>
                      <Typography variant="body1">
                        Lorem Ipsum has been the industry's standard.
                      </Typography>
                    </Box>
                  </Box>
                  <FormControl
                    variant="outlined"
                    sx={{ minWidth: 300 }}
                    className="queRow"
                  >
                    <InputLabel id="filter-messages-label">
                      All Messages
                    </InputLabel>
                    <Select
                      className="formInputFiled"
                      labelId="filter-messages-label"
                      id="filter-messages"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      label="Filter Messages"
                    >
                      <MenuItem value="">All Messages</MenuItem>
                      <MenuItem value="John Doe">John Doe</MenuItem>
                      <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Grid>
                  {filteredMessages.map((message) => (
                    <Box
                      key={message.id}
                      onClick={() => handleClick(message)}
                      style={{ cursor: "pointer" }}
                    >
                      <Grid className="chatMemberList">
                        <Grid item md={4} className="senderInfo">
                          <Avatar
                            alt={message.sender}
                            src={message.avatar}
                            className="avatar"
                          />
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{ marginRight: "8px" }}
                          >
                            {message.sender}
                          </Typography>
                        </Grid>
                        <Grid item md={2}>
                          <Typography className="applicationDot">
                            <span></span>Application
                          </Typography>
                        </Grid>
                        <Grid item md={5} className="message">
                          <span>Domestic helpers</span>
                          <Typography
                            variant="body1"
                            gutterBottom
                            style={{ marginRight: "8px" }}
                          >
                            {message.message}
                          </Typography>
                        </Grid>
                        <Grid item md={1}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            className="timings"
                          >
                            {message.created_at}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
