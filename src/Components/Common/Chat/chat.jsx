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
import ChatDetails from "./chatdetails";

const Chat = () => {
  const [filter, setFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(
    null
  );
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
    <Box maxWidth="xl" sx={{ padding: "20px" }}>
    {selectedMessage ? (
        <ChatDetails message={selectedMessage} onBack={handleBack} />
    ) : (
        <>
        <Grid>
            {filteredMessages.map((message) => (
            <Box
            key={message.id}
            onClick={() => handleClick(message)}
            style={{ cursor: "pointer" }}
            >
                <Grid className="chatMemberList">
                <Grid item md={4} className="senderInfo">
                    <Avatar alt={message.sender} src={message.avatar} className="avatar"/>
                    <Typography 
                        variant="h5"
                        gutterBottom
                        style={{ marginRight: "8px" }}
                        >
                        {message.sender}
                    </Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography className="applicationDot"><span></span>Application</Typography>
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
                    <Typography variant="body2" color="textSecondary" className="timings">
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
    </>
  );
};

export default Chat;
