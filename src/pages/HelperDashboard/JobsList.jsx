// JobsList.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  FormLabel,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
} from "@mui/material";
// import LocationAutocomplete from "../../Common/LocationAutocomplete";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { Link, useNavigate } from "react-router-dom";
// import Footer from "../../Common/Footer";
import SideMenuBar from "../../Components/Common/SideMenubar/SideMenuBar";
import LocationAutocomplete from "../../Components/Common/LocationAutocomplete";

const JobsList = () => {
  // Sample data for recommended jobs
  const [currentLocation, setCurrentLocation] = useState("");
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const navigate = useNavigate()
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
        {/* Main Content */}
        <Grid className="dashboardContentArea">
          <Box maxWidth="xl" className="dashboardCol">
            {/* Filter Component Placeholder */}
            <Typography variant="h2" className="commonTitle">Find Jobs</Typography>
            <Typography variant="body1" className="commonDesc">Find a job you love.</Typography>
            <Box className="topFilter">
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
                    {/* <InputLabel id="typeOfWork" className="formLabel" >Type of Work</InputLabel> */}
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
                      // label="Sort By"
                    >
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            {/* Recommended Jobs Section */}
            <Grid className="JobsListRow">
              <Grid item md={12}>
                  <Typography variant="h5">Recommended jobs</Typography>
              </Grid>
              {recommendedJobs.map((job) => (
                <Grid key={job.id} item md={12}>
                  <Box className="JobBox">
                    <Box className="JobInfoBox">
                      <Box className="jobsFlex">
                        <img src="/work.svg" alt="Logo" className="work" />
                        <Box className="JobTitle" onClick={()=>navigate("/helper/job-details")} >
                          <Typography variant="h6">{job.title}</Typography>
                          <Typography variant="body1">{job.location}</Typography>
                        </Box>
                      </Box>
                      <Box className="JobdetailBottom">
                        <List className="jobDescMini">
                          <ListItem><strong>Start Date:</strong> {job.start_date}</ListItem>
                          <ListItem><strong>Type:</strong> {job.type}</ListItem>
                          <ListItem><strong>Experience:</strong> {job.experience}</ListItem>
                          <ListItem><strong>Location:</strong> {job.location}</ListItem>
                          <ListItem><strong>Language:</strong> {job.language}</ListItem>
                          <ListItem><strong>Map Location:</strong> <span><i>{job.map_location}</i> <Link to={"/"}>See Map</Link></span></ListItem>
                        </List>
                        <Typography className="postedTime">Posted 5 mins ago</Typography>
                      </Box>
                    </Box>
                    <Box className="JobInfoRight">
                      <IconButton
                        onClick={() => handleBookmarkToggle(job.id)}
                        sx={{ position: "absolute", top: 10, right: 10 }}
                      >
                        {isBookmarked(job.id) ? (
                          <BookmarkIcon />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </IconButton>
                      <div className="featuredTag">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_404_4641)">
                            <path d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z" fill="#55DBA6"/>
                            <path opacity="0.3" d="M20.9992 10.465L15.8788 5.34473L5.3457 15.8778L10.4674 20.9996C10.4782 20.9996 10.4888 21 10.4995 21C16.2985 21 20.9995 16.2989 20.9995 10.5C20.9996 10.4883 20.9992 10.4767 20.9992 10.465Z" fill="#0A6259"/>
                            <path d="M6.5997 4.66699H14.401C15.4683 4.66699 16.3337 5.53231 16.3337 6.5997V14.401C16.3337 15.4683 15.4683 16.3337 14.401 16.3337H6.5997C5.53231 16.3337 4.66699 15.4683 4.66699 14.401V6.5997C4.66699 5.53231 5.53231 4.66699 6.5997 4.66699Z" fill="black"/>
                            <path d="M10.8328 6.74486L11.8969 8.6787C11.9515 8.7779 12.0475 8.84762 12.1587 8.8689L14.3268 9.28331C14.6212 9.3396 14.7378 9.69851 14.5327 9.91713L13.0223 11.5267C12.9448 11.6093 12.9082 11.7221 12.9223 11.8345L13.1981 14.0244C13.2356 14.3218 12.9303 14.5436 12.659 14.4162L10.6614 13.4771C10.559 13.4289 10.4403 13.4289 10.3378 13.4771L8.34028 14.4162C8.06898 14.5437 7.76366 14.3218 7.80114 14.0244L8.07697 11.8345C8.09111 11.7221 8.05448 11.6093 7.97699 11.5267L6.46661 9.91713C6.26149 9.69851 6.37809 9.3396 6.67251 9.28331L8.84053 8.8689C8.95175 8.84762 9.0477 8.7779 9.10236 8.6787L10.1664 6.74486C10.311 6.48218 10.6883 6.48218 10.8328 6.74486Z" fill="#EFFFF9"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_404_4641">
                              <rect width="21" height="21" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                        Featured
                      </div>

                      <Typography variant="h6">
                        {job.titleRight}
                      </Typography>
                      <Typography variant="body1">
                        {job.description}
                      </Typography>
                      <Box className="buttonFlex">
                        <Button className="green-btn small">
                          Contact
                        </Button>
                        <Button className="arrowButton small">Apply Job</Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
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

export default JobsList;
