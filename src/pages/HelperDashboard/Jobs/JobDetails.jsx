// src/components/Employers/Employers.tsx

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
  Menu,
  SelectChangeEvent,
} from "@mui/material";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenuBar from "../../../Components/Common/SideMenubar/SideMenuBar";
// import MenuIcon from './tripleDots.svg';

const employersData = [
  {
    id: 1,
    name: "Company A",
    description: "A leading company in the industry.",
    jobs: [
      { id: 101, title: "Software Engineer", location: "City X" },
      { id: 102, title: "UX Designer", location: "City Y" },
    ],
  },
  {
    id: 2,
    name: "Company B",
    description: "Innovative solutions for various sectors.",
    jobs: [
      { id: 201, title: "Data Analyst", location: "City Z" },
      { id: 202, title: "Marketing Specialist", location: "City W" },
    ],
  },
];

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

// const handleClick = (event) => {
//   setAnchorEl(event.currentTarget);
// };

const JobDetails = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <SideMenuBar />{" "}
        </Grid>
        {/* Main Content */}
        <Grid className="dashboardContentArea">
          <Box maxWidth="xl" className="dashboardCol">
            {/* Filter Component Placeholder */}
            <Typography variant="h2" className="commonTitle">
              Job Details
            </Typography>
            <Typography variant="body1" className="commonDesc">
              Find a job you love
            </Typography>
            {/* Recommended Jobs Section */}
            <Grid className="JobsListRow">
              {recommendedJobs.map((job) => (
                <Box
                  className="profileCardBox"
                  border={1}
                  borderRadius={8}
                  borderColor="#DDDDDD"
                  py={4}
                  px={4}
                  mb={2}
                  mt={2}
                >
                  <Grid key={job.id} item md={12} container>
                    <Grid item md={5}>
                      <Box className="jobsFlex jobDescription">
                        <Box className="jobsFlex">
                          <img src="/work.svg" alt="Logo" className="work" />
                          <Box className="JobTitle">
                            <Typography variant="h6">{job.title}</Typography>
                            <Typography variant="body1">
                              {job.location}
                            </Typography>
                          </Box>
                        </Box>
                        <List className="jobDescMini">
                          <ListItem>
                            <strong>Location:</strong> {job.location}
                          </ListItem>
                          <ListItem>
                            <strong>Type:</strong> {job.type}
                          </ListItem>
                          <ListItem>
                            <strong>Experience:</strong> {job.experience}
                          </ListItem>
                          <ListItem>
                            <strong>Language:</strong> {job.language}
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                    <Grid item md={7} className="ViewOptionDesc">
                      <div className="d-flex">
                        <Button
                          className="green-btn small"
                          variant="contained"
                          color="primary"
                        >
                          Apply
                        </Button>
                        <Button
                          className="small btn-transparent"
                          variant="contained"
                          color="primary"
                        >
                          <BookmarkBorderIcon /> Save Job
                        </Button>
                      </div>

                      <div className="d-flex">
                        <Button className="small btn-light" variant="contained">
                          See More Jobs
                        </Button>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth className="selectiondrop">
                            <InputLabel id="demo-simple-select-label">
                              <img
                                src="/tripleDots.svg"
                                alt="Logo"
                                className="work"
                              />
                            </InputLabel>
                            <div>
                              <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem onClick={handleClose}>
                                  Option 1
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Option 2
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Option 3
                                </MenuItem>
                              </Menu>
                            </div>
                          </FormControl>
                        </Box>
                      </div>
                    </Grid>
                  </Grid>

                  <hr className="hrSetting"></hr>

                  <Grid className="detailingJob">
                    <Typography variant="h6">Job Description</Typography>
                    <Typography variant="body1">
                      Fusce ut lacinia enim. Pellentesque porta posuere dolor
                      non varius. Mauris ultrices, nisi vitae lacinia posuere,
                      lectus purus eleifend tellus, et convallis ligula metus ut
                      sapien. Sed a maximus orci. Vestibulum vulputate venenatis
                      mi non fermentum. Sed semper metus ut finibus rhoncus.
                      Phasellus eleifend vulputate mauris, sit amet viverra est
                      malesuada tincidunt. Duis id nunc tincidunt, porta velit
                      sed, finibus ligula. In varius malesuada mauris, at
                      ultrices ipsum fermentum at. Nulla non augue eget mi
                      ultricies aliquet. Aenean blandit diam arcu.
                    </Typography>
                    <Typography variant="body1">
                      Duis leo metus, bibendum vitae porttitor eu, auctor et
                      odio. Maecenas fringilla metus vitae elit accumsan pretium
                      condimentum quis leo. Sed at posuere odio. Pellentesque
                      habitant morbi tristique senectus et netus et malesuada
                      fames ac turpis egestas. Donec ornare nulla vitae aliquam
                      tincidunt. Nunc vitae mollis erat. Interdum et malesuada
                      fames ac ante ipsum primis in faucibus. Donec fringilla
                      varius ornare. Curabitur eleifend velit sit amet aliquam
                      fermentum. Quisque eget urna diam. Curabitur molestie et
                      quam luctus fermentum. Nam sit amet augue at orci
                      malesuada feugiat. Aenean at massa rutrum, auctor nisl
                      non, laoreet sapien. Proin a viverra sap.
                    </Typography>
                  </Grid>

                  <Grid className="detailingJob">
                    <Typography variant="h6">Key Responsibilities</Typography>
                    <Typography variant="body1">
                      Etiam eget leo ut enim vehicula congue ac sit amet nunc.
                      Proin vel justo nec felis posuere hendrerit vel in eros.
                      Nullam vitae orci vitae ex feugiat molestie. Duis et est
                      urna. Vivamus id ante velit. Sed lorem lacus, vehicula
                      interdum augue eget, commodo malesuada dolor. Sed at
                      posuere nunc,{" "}
                    </Typography>
                    <List>
                      <ListItem>Sed posuere lacus vitae iaculis.</ListItem>
                      <ListItem>Nunc sapien.</ListItem>
                      <ListItem>lectus, tempus at lacus.</ListItem>
                    </List>
                  </Grid>

                  <Grid className="detailingJob">
                    <Typography variant="h6">Additional Information</Typography>
                    <Typography variant="body1">
                      Fusce ut lacinia enim. Pellentesque porta posuere dolor
                      non varius. Mauris ultrices, nisi vitae lacinia posuere,
                      lectus purus eleifend tellus, et convallis ligula metus ut
                      sapien. Sed a maximus orci. Vestibulum vulputate venenatis
                      mi non fermentum. Sed semper metus ut finibus rhoncus.
                      Phasellus eleifend vulputate mauris, sit amet viverra est
                      malesuada tincidunt. Duis id nunc tincidunt, porta velit
                      sed, finibus ligula. In varius malesuada mauris, at
                      ultrices ipsum fermentum at. Nulla non augue eget mi
                      ultricies aliquet. Aenean blandit diam arcu.
                    </Typography>
                  </Grid>

                  <Grid container className="reviewsJob">
                    <Grid item md={12}>
                      <Typography variant="h6" mb={2}>
                        Reviews
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <Box className="jobsFlex">
                        <Box className="reviewavtar">
                          <img
                            src="/profile-user.svg"
                            alt="Logo"
                            className="work"
                          />
                        </Box>
                        <Box className="JobTitle">
                          <Typography variant="h6">
                            Phil Rozek
                            <Rating name="read-only" value={4} readOnly />
                          </Typography>
                          <Typography variant="body1" className="dateReview">
                            Jan 11, 2024
                          </Typography>
                          <Typography variant="body1">
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula. Aliquam lobortis arcu in velit
                            sagittis egestas. Mauris a bibendum dolor. Donec a
                            lorem ac magna aliquam tempus at fermentum nunc. In
                            eu eros a felis mollis maximus. Vestibulum laoreet,
                            lacus sit amet facilisis luctus, lectus lectus
                            semper magna, ut tristique metus lorem vitae ipsum.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={12}>
                      <Box className="jobsFlex">
                        <Box className="reviewavtar">
                          <img
                            src="/profile-user.svg"
                            alt="Logo"
                            className="work"
                          />
                        </Box>
                        <Box className="JobTitle">
                          <Typography variant="h6">
                            Phil Rozek
                            <Rating name="read-only" value={4} readOnly />
                          </Typography>
                          <Typography variant="body1" className="dateReview">
                            Jan 11, 2024
                          </Typography>
                          <Typography variant="body1">
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula. Aliquam lobortis arcu in velit
                            sagittis egestas. Mauris a bibendum dolor. Donec a
                            lorem ac magna aliquam tempus at fermentum nunc. In
                            eu eros a felis mollis maximus. Vestibulum laoreet,
                            lacus sit amet facilisis luctus, lectus lectus
                            semper magna, ut tristique metus lorem vitae ipsum.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item md={12}>
                      <Box className="jobsFlex">
                        <Box className="reviewavtar">
                          <img
                            src="/profile-user.svg"
                            alt="Logo"
                            className="work"
                          />
                        </Box>
                        <Box className="JobTitle">
                          <Typography variant="h6">
                            Phil Rozek
                            <Rating name="read-only" value={4} readOnly />
                          </Typography>
                          <Typography variant="body1" className="dateReview">
                            Jan 11, 2024
                          </Typography>
                          <Typography variant="body1">
                            Proin a tempor velit. Maecenas mattis nisl id
                            aliquet rutrum. Quisque suscipit, sapien in ornare
                            porttitor, mi libero sagittis purus, in porta nunc
                            odio vitae ligula. Aliquam lobortis arcu in velit
                            sagittis egestas. Mauris a bibendum dolor. Donec a
                            lorem ac magna aliquam tempus at fermentum nunc. In
                            eu eros a felis mollis maximus. Vestibulum laoreet,
                            lacus sit amet facilisis luctus, lectus lectus
                            semper magna, ut tristique metus lorem vitae ipsum.
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

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
                        <Box className="JobTitle">
                          <Typography variant="h6">{job.title}</Typography>
                          <Typography variant="body1">
                            {job.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className="JobdetailBottom">
                        <List className="jobDescMini">
                          <ListItem>
                            <strong>Start Date:</strong> {job.start_date}
                          </ListItem>
                          <ListItem>
                            <strong>Type:</strong> {job.type}
                          </ListItem>
                          <ListItem>
                            <strong>Experience:</strong> {job.experience}
                          </ListItem>
                          <ListItem>
                            <strong>Location:</strong> {job.location}
                          </ListItem>
                          <ListItem>
                            <strong>Language:</strong> {job.language}
                          </ListItem>
                          <ListItem>
                            <strong>Map Location:</strong>{" "}
                            <span>
                              <i>{job.map_location}</i>{" "}
                              <Link to={"/"}>See Map</Link>
                            </span>
                          </ListItem>
                        </List>
                        <Typography className="postedTime">
                          Posted 5 mins ago
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="JobInfoRight">
                      <IconButton
                        sx={{ position: "absolute", top: 10, right: 10 }}
                      >
                        <BookmarkBorderIcon />
                      </IconButton>
                      <div className="featuredTag">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_404_4641)">
                            <path
                              d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
                              fill="#55DBA6"
                            />
                            <path
                              opacity="0.3"
                              d="M20.9992 10.465L15.8788 5.34473L5.3457 15.8778L10.4674 20.9996C10.4782 20.9996 10.4888 21 10.4995 21C16.2985 21 20.9995 16.2989 20.9995 10.5C20.9996 10.4883 20.9992 10.4767 20.9992 10.465Z"
                              fill="#0A6259"
                            />
                            <path
                              d="M6.5997 4.66699H14.401C15.4683 4.66699 16.3337 5.53231 16.3337 6.5997V14.401C16.3337 15.4683 15.4683 16.3337 14.401 16.3337H6.5997C5.53231 16.3337 4.66699 15.4683 4.66699 14.401V6.5997C4.66699 5.53231 5.53231 4.66699 6.5997 4.66699Z"
                              fill="black"
                            />
                            <path
                              d="M10.8328 6.74486L11.8969 8.6787C11.9515 8.7779 12.0475 8.84762 12.1587 8.8689L14.3268 9.28331C14.6212 9.3396 14.7378 9.69851 14.5327 9.91713L13.0223 11.5267C12.9448 11.6093 12.9082 11.7221 12.9223 11.8345L13.1981 14.0244C13.2356 14.3218 12.9303 14.5436 12.659 14.4162L10.6614 13.4771C10.559 13.4289 10.4403 13.4289 10.3378 13.4771L8.34028 14.4162C8.06898 14.5437 7.76366 14.3218 7.80114 14.0244L8.07697 11.8345C8.09111 11.7221 8.05448 11.6093 7.97699 11.5267L6.46661 9.91713C6.26149 9.69851 6.37809 9.3396 6.67251 9.28331L8.84053 8.8689C8.95175 8.84762 9.0477 8.7779 9.10236 8.6787L10.1664 6.74486C10.311 6.48218 10.6883 6.48218 10.8328 6.74486Z"
                              fill="#EFFFF9"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_404_4641">
                              <rect width="21" height="21" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Featured
                      </div>

                      <Typography variant="h6">{job.titleRight}</Typography>
                      <Typography variant="body1">{job.description}</Typography>
                      <Box className="buttonFlex">
                        <Button className="green-btn small">Contact</Button>
                        <Button className="arrowButton small">Apply Job</Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid className="dashboardContentArea footerDash">
          <Box className="copyrightArea">
            <Typography>©2024 HelperDoc. All Rights Reserved.</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default JobDetails;
