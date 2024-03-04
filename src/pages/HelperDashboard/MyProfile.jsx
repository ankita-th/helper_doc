// JobsList.tsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import SideMenuBar from "../../Common/SideMenuBar";
import LocationAutocomplete from "../../Common/LocationAutocomplete";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ResponsivePagination from "react-responsive-pagination";
import HelperProfileComplete from "../../Signup/HelperRegistrationSteps/HelperProfileComplete";
import HelperUserDetails from "../../Signup/HelperRegistrationSteps/HelperUserDetails";
import ProgressBar from "@ramonak/react-progress-bar";
import BookmarkedJobs from "./BookmarkedJobs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "react-responsive-pagination/themes/classic.css";
import "./HelperDashboard.css"; // Import the CSS file
import { Link, useLocation, useNavigate } from "react-router-dom";


const MyProfile = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState([]); // State to manage errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleProfilePicUpload = (
    event
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
  };
  const handleViewPublicProfile = () => {
    navigate("/helper_public_profile", { state: location.state });
  };

  const recommendedJobsSaved = [
    {
      id: 4,
      start_date: "3/3/24",
      language: "English",
      experience: "Expert",
      title: "Nanny / Housekeeper",
      titleRight: "Nanny / Housekeeper",
      description: "Lebanese family searching for a nanny / housekeeper",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      image: "image_5.png",
      map_location: "3km, hong kong",
    },
  ];
  const isBookmarked = (jobId) => {
    return bookmarkedJobs.includes(jobId);
  };

  const handleBookmarkToggle = (jobId) => {
    setBookmarkedJobs((prevBookmarkedJobs) => {
      if (prevBookmarkedJobs.includes(jobId)) {
        return prevBookmarkedJobs.filter((id) => id !== jobId);
      } else {
        return [...prevBookmarkedJobs, jobId];
      }
    });
  };
  return (
    <>
    
    <Grid container className="dashboardRow">
      {/* Sidebar Component */}
      <Grid className="dashboardSidebar">
        <SideMenuBar />
      </Grid>
      
      <Grid className="dashboardContentArea">
      <Box maxWidth="xl" sx={{ padding: "20px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" className="commonTitle">Profile</Typography>
                <Typography variant="body1">
                  Manage or edit your profile.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProgressBar completed={80} bgColor="#0a6259" />
                <Typography variant="body1" className="profileCompletion">
                  <strong>80%</strong> of your profile is complete {">"} <Link to={"/"}>Get Verified</Link> +20%
                </Typography>
              </Grid>
            </Grid>
            {/* <Divider sx={{ mb: 2 }} /> */}
            <Box className="profileCardBox"
              border={1}
              borderRadius={8}
              borderColor="#DDDDDD"
              py={6}
              px={10}
              mb={2}
              mt={2}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Box display="flex" alignItems="center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    style={{ display: "none" }}
                    id="profile-pic-upload"
                  />
                  <label htmlFor="profile-pic-upload" className="profileUpload">
                    <Box position="relative">
                      <IconButton component="span">
                        {profilePic ? (
                          <img
                            src={URL.createObjectURL(profilePic)}
                            alt="Profile"
                            style={{
                              borderRadius: "50%",
                              maxWidth: "130px",
                              maxHeight: "130px",
                            }}
                          />
                        ) : (
                          <Avatar sx={{ width: 130, height: 130 }}>
                            <AccountCircleIcon />
                          </Avatar>
                        )}
                      </IconButton>
                      <IconButton
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                        onClick={() => {
                          const fileInput =
                            document.getElementById("profile-pic-upload");
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                      >
                        <CameraAltIcon />
                      </IconButton>
                    </Box>
                  </label>
                  <Box ml={2} className="TopDesc">
                    <Typography variant="h5"><strong>John Smith</strong></Typography>
                    <Box display="flex" alignItems="center">
                      <Box
                        width={8}
                        height={8}
                        borderRadius="50%"
                        bgcolor="success.main"
                        mr={1}
                      />
                      <Typography variant="body2" color="textSecondary" style={{ marginBottom: 0 }}>
                        Available
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Status:</strong> <span className="dangerText">Weak</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Recently Updated on <span>19/01/2024</span>
                    </Typography>
                  </Box>
                </Box>
                <Button className="arrowButton"
                  variant="contained"
                  color="primary"
                  onClick={handleViewPublicProfile}
                >
                  View Profile
                </Button>
              </Box>
              <HelperUserDetails />
            </Box>
            <BookmarkedJobs
              jobs={recommendedJobsSaved}
              handleBookmarkToggle={handleBookmarkToggle}
              isBookmarked={isBookmarked}
            />
          </Box>
      </Grid>
    </Grid>
    {/* <Box>
      <Grid container spacing={3}>
        {/* Sidebar Component 
        <Grid item md={2}>
          <SideMenuBar />
        </Grid>
        {/* Main Content 
        <Grid item md={10} style={{ marginTop: "16px" }}>
          
        </Grid>
      </Grid>
    </Box> */}
    </>    
  );
};

export default MyProfile;