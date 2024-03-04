// JobsList.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  FormLabel,
  Select,
  Tab,
  Tabs,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import SideMenuBar from "../../Common/SideMenuBar";
import LocationAutocomplete from "../../Common/LocationAutocomplete";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ResponsivePagination from "react-responsive-pagination";
import AppliedJobs from "./AppliedJobs";
import BookmarkedJobs from "./BookmarkedJobs";
import "react-responsive-pagination/themes/classic.css";
import "./HelperDashboard.css"; // Import the CSS file

const MyApplication = () => {
  // Sample data for recommended jobs
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("applied");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
  };

  const recommendedJobs = [
    {
      id: 1,
      start_date: "As soon as possible",
      language: "English",
      experience: "Expert",
      title: "Housekeeping",
      titleRight: "A proactive helper to provide excellent childcare",
      description:
        "IMPORTANT: Only apply if you have read the full advert: MUST BE ABLE TO FOLLOW INSTRUCTIONS AND HAVE COMMON SENSE! To apply: RECORD A YOUTUBE VIDEO OR A sound file if you prefer - talk about your experience with children and why you would be a good choice for us. At least 1 minute. Thanks. This is a professional job and we are professional people, so we are looking for a true professional. Thanks. Us: Western family of 5 - 2 working parents, 2 young kids at KG and 1 new baby.",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      map_location: "3km, hong kong",
    },
  ];
  const recommendedJobsSaved = [
    {
      id: 1,
      start_date: "As soon as possible",
      language: "English",
      experience: "Expert",
      title: "Housekeeping",
      titleRight: "A proactive helper to provide excellent childcare",
      description:
        "IMPORTANT: Only apply if you have read the full advert: MUST BE ABLE TO FOLLOW INSTRUCTIONS AND HAVE COMMON SENSE! To apply: RECORD A YOUTUBE VIDEO OR A sound file if you prefer - talk about your experience with children and why you would be a good choice for us. At least 1 minute. Thanks. This is a professional job and we are professional people, so we are looking for a true professional. Thanks. Us: Western family of 5 - 2 working parents, 2 young kids at KG and 1 new baby.",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
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
          {/* Filter Component Placeholder */}
          <Typography variant="h2" className="commonTitle">Applications</Typography>
          <Typography variant="body1">Find a job you love.</Typography>
          <Box className="topFilter"
            sx={{
              backgroundColor: "#f2f2f2",
              padding: "30px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <Grid container spacing={3} className="formDataInfo">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth className="queRow LocationAutocomplete">
                  <FormLabel className="formLabel" id="location">Location</FormLabel>
                  <LocationAutocomplete onSelect={handleSelectLocation} />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth className="queRow">
                  <FormLabel className="formLabel" id="employeementType">Type of employment</FormLabel>
                  {/* <InputLabel id="typeOfWork">Type of Work</InputLabel> */}
                  <Select className="formInputFiled"
                    // value={formData.gender}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //   })
                    // }
                    // label="Type of Work"
                  >
                    <MenuItem value="fullTime">Full Time</MenuItem>
                    <MenuItem value="partTime">Part Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth className="queRow">
                  <FormLabel className="formLabel" id="sortby">Sort By</FormLabel>
                  {/* <InputLabel id="sortBy">Sort By</InputLabel> */}
                  <Select className="formInputFiled"
                    // value={formData.gender}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //   })
                    // }
                    label="Sort By"
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          {/* Recommended Jobs Section */}
          <Tabs
            className="customTabs"
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="tabs for applied and saved jobs"
          >
            <Tab label="Applied Jobs" value="applied" />
            <Tab label="Saved Jobs" value="saved" />
          </Tabs>
          {/* <Grid container spacing={2}> */}
          {/* Display jobs based on active tab */}
          {activeTab === "applied" && (
            <AppliedJobs
              jobs={recommendedJobs}
              handleBookmarkToggle={handleBookmarkToggle}
              isBookmarked={isBookmarked}
            />
          )}
          {activeTab === "saved" && (
            <BookmarkedJobs
              jobs={recommendedJobsSaved}
              handleBookmarkToggle={handleBookmarkToggle}
              isBookmarked={isBookmarked}
            />
          )}
          {/* </Grid> */}
        </Box>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </Grid>
    </Grid>
    </>
  );
};

export default MyApplication;
