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
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import SideMenuBar from "../../Components/Common/SideMenubar/SideMenuBar";
import Chat from "../../Components/Common/Chat/chat.jsx";
import ApplicantCards from "../../Components/Common/Applicants/ApplicantCards.jsx";

const EmployerDashboard = () => {
  const profiles = [
    {
      title: "dummy456789",
      age: "28",
      description: "Description for Job Title 1.",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      image: "image_5.png",
      jobrole: "DOMESTIC HELP",
      jobtitle: "Need a office boy",
      jobdescription:
        "Be as precise as possible in your ad in order to get relevant applications. You will then be able to further discuss with potential applicants through direct me...",
      application: "05",
      conversation: "03",
      status: "Active",
    },
  ];
  const savedprofiles = [
    {
      title: "dummy456789",
      age: "28",
      description: "Description for Job Title 1.",
      location: "Hong Kong",
      date: "From 27 Feb 2024",
      type: "Full Time",
      image: "image_5.png",
      jobrole: "DOMESTIC HELP",
      jobtitle: "Need a office boy",
      jobdescription:
        "Be as precise as possible in your ad in order to get relevant applications. You will then be able to further discuss with potential applicants through direct me...",
      application: "05",
      conversation: "03",
      status: "Active",
      jobOfferby: "Hiroshi Nomura",
      addedDate: "January 30, 2024",
    },
  ];

  const [activeTab, setActiveTab] = useState("Dashboard");
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
            <Box maxWidth="xl" sx={{ padding: "20px" }}>
              <Typography variant="h2" className="commonTitle">
                Hello Test
              </Typography>
              <Typography variant="body1">
                Welcome to your personal dashboard! Here you can manage your
                searches and job posting.
              </Typography>
            </Box>
            <Box>
              <Tabs
                className="customTabs"
                variant="fullWidth"
                value={activeTab}
                onChange={(event, newValue) => setActiveTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
                aria-label="tabs for employer dashboard"
              >
                <Tab label="Dashboard" value="Dashboard" />
                <Tab label="New Applications" value="new_Applications" />
                <Tab label="Conversations" value="Conversations" />
                <Tab label="Saved profiles" value="Saved_profiles" />
              </Tabs>
              {activeTab === "Dashboard" && (
                <>
                  <Grid className="findHelperTitle" item xs={12}>
                    <Typography
                      variant="h5"
                      className="title employertitle_small"
                    >
                      Can we help you?
                    </Typography>
                  </Grid>
                  <Grid container spacing={3}>
                    {/* Plans Detailing */}
                    <Grid>
                      <Grid
                        container
                        spacing={3}
                        className="subscriptionPlans_ds"
                      >
                        <Grid item md={4}>
                          <Box className="planName premium">
                            <img
                              src="./diamond-gem-icon.svg"
                              alt="Diamond Gen Icon"
                            />
                            <Typography variant="h3">
                              Premium Subscription
                            </Typography>
                            <Typography variant="body1">
                              You can search and find helpers for free, but only
                              Premium users can contact them. Discover all the
                              advantages of HelperDoc Premium.
                            </Typography>
                            <Button className="arrowButton whitebtn">
                              Upgrade to Premium
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item md={4}>
                          <Box className="planName visaServices">
                            <img
                              src="./visaService.svg"
                              alt="Diamond Gen Icon"
                            />
                            <Typography variant="h3">
                              VC Visa Service for Filipino
                            </Typography>
                            <Typography variant="body1">
                              We can process or renewl visa for your Filipino
                              domestic helper in Hong Kong, even if you have
                              found someone outside of HelperDoc.
                            </Typography>
                            <Button className="arrowButton whitebtn">
                              Process / Renew Visa
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Job Applicants */}
                    <Grid
                      container
                      spacing={3}
                      className="applicantsEmployer"
                      mt={3}
                    >
                      <Grid className="findHelperTitle" item xs={12}>
                        <Typography
                          variant="h5"
                          className="title employertitle_small"
                        >
                          Job Applicants
                        </Typography>
                      </Grid>

                    </Grid>
                    <ApplicantCards/>
                    {/* Your Job Posting */}
                    <Grid
                      container
                      spacing={3}
                      className="applicantsEmployer"
                      mt={3}
                    >
                      <Grid className="findHelperTitle" item xs={12}>
                        <Typography
                          variant="h5"
                          className="title employertitle_small"
                        >
                          Your Job Posting
                        </Typography>
                      </Grid>

                      {profiles.map((job, index) => (
                        <Grid key={index} item lg={4} md={6} xs={12}>
                          <Box className="jobPost">
                            <Box className="profileRole">
                              <Typography variant="h6">
                                {job.jobrole}
                              </Typography>
                            </Box>
                            <Box className="profileInner">
                              <Box>
                                <Typography className="job_title">
                                  {job.jobtitle}
                                </Typography>
                                <Typography className="status active">
                                  {job.status}
                                </Typography>
                              </Box>
                              <Typography className="job_desc">
                                {job.jobdescription}
                              </Typography>
                            </Box>
                            <Box className="profileInsights">
                              <Typography className="job_title">
                                <span>{job.application}</span> New Application{" "}
                              </Typography>
                              <Typography className="job_desc">
                                <span>{job.conversation}</span> Conversation
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )}
              {activeTab === "new_Applications" && (
                <>
                  <Grid container spacing={3} m={0} mt={4}>
                    <Grid md={3} className="applicantSidebar">
                      <List>
                        <ListItem className="active">
                          <Link to="/">
                            <Box className="profileUpper">
                              <Box className="helperImg">
                                <img
                                  src="images/users/image_5.png"
                                  alt="userimg"
                                />
                              </Box>
                              <Box className="helperContent">
                                <Typography variant="h5">
                                  Hiroshi Nomura
                                </Typography>
                                <Box className="locationDate">
                                  <Box className="location">Hong Kong</Box>
                                  <Box className="date">29/01/24</Box>
                                </Box>
                              </Box>
                              <Box className="arrowRight">
                                <img src="./arrowRight.svg" />
                              </Box>
                            </Box>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link to="/">
                            <Box className="profileUpper">
                              <Box className="helperImg">
                                <img
                                  src="images/users/image_5.png"
                                  alt="userimg"
                                />
                              </Box>
                              <Box className="helperContent">
                                <Typography variant="h5">
                                  Hiroshi Nomura
                                </Typography>
                                <Box className="locationDate">
                                  <Box className="location">Hong Kong</Box>
                                  <Box className="date">29/01/24</Box>
                                </Box>
                              </Box>
                              <Box className="arrowRight">
                                <img src="./arrowRight.svg" />
                              </Box>
                            </Box>
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link to="/">
                            <Box className="profileUpper">
                              <Box className="helperImg">
                                <img
                                  src="images/users/image_5.png"
                                  alt="userimg"
                                />
                              </Box>
                              <Box className="helperContent">
                                <Typography variant="h5">
                                  Hiroshi Nomura
                                </Typography>
                                <Box className="locationDate">
                                  <Box className="location">Hong Kong</Box>
                                  <Box className="date">29/01/24</Box>
                                </Box>
                              </Box>
                              <Box className="arrowRight">
                                <img src="./arrowRight.svg" />
                              </Box>
                            </Box>
                          </Link>
                        </ListItem>
                      </List>

                      <Box mt={3} className="helpder_details_dmc">
                        <Typography variant="h4">
                          <img src="./domesticlocation.svg" /> Domestic Helper
                          Near Me
                        </Typography>
                        <List>
                          <ListItem>
                            <Typography>Riyadh</Typography>
                            <Typography>11732</Typography>
                          </ListItem>

                          <ListItem>
                            <Typography>Hong Kong</Typography>
                            <Typography>6205</Typography>
                          </ListItem>

                          <ListItem>
                            <Typography>Jeddah</Typography>
                            <Typography>4427</Typography>
                          </ListItem>

                          <ListItem>
                            <Typography>Singapore</Typography>
                            <Typography>4384</Typography>
                          </ListItem>

                          <ListItem>
                            <Typography>Hong Kong Island</Typography>
                            <Typography>4037</Typography>
                          </ListItem>

                          <ListItem>
                            <Typography>Dammam</Typography>
                            <Typography>2408</Typography>
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                    <Grid md={9}>
                      <Box className="applicantDetails">
                        <Box className="employerHeader">
                          <Box className="primary">
                            <Box className="helperImg">
                              <img
                                src="images/users/image_5.png"
                                alt="userimg"
                              />
                            </Box>
                            <Box className="helperContent">
                              <Typography variant="h5">
                                Hiroshi Nomura
                              </Typography>
                              <Box className="locationDate">
                                <Box className="location">Hong Kong</Box>
                                <Box className="date">28 years</Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="secondary"></Box>
                        </Box>

                        <Box className="applicantRespond" mt={3}>
                          <Button className="green-btn small dangerbtn">
                            Decline
                          </Button>
                          <Button className="green-btn small">Respond</Button>
                        </Box>

                        <Box className="highlightsApplicant" mt={4}>
                          <Typography variant="h5">
                            Application of Hiroshi Noruma
                          </Typography>
                          <Typography variant="body1">
                            Good day mam I'm interested to apply
                          </Typography>
                          <Typography variant="body1">
                            Be as precise as possible in your ad in order to get
                            relevant applications. You will then be able to
                            further discuss with potential applicants through
                            direct messages and set up an interview. Be as
                            precise as possible in your ad in order to get
                            relevant applications. You will then be able to
                            further discuss with potential applicants through
                            direct messages and set up an interview.
                          </Typography>
                          <Typography variant="h5">
                            About Hiroshi Noruma
                          </Typography>
                          <List>
                            <ListItem>
                              <b>Nationality</b>
                              <span>Filipino</span>
                            </ListItem>
                            <ListItem>
                              <b>Monthly salary</b>
                              <span>5000 SGD</span>
                            </ListItem>
                            <ListItem>
                              <b>Experience</b>
                              <span>7 years</span>
                            </ListItem>
                            <ListItem>
                              <b>Languages</b>
                              <span>Filipino, English</span>
                            </ListItem>
                          </List>
                          <Link to="/" className="greenLink">
                            See full profile
                          </Link>
                          <Typography variant="h5">
                            Hiroshi Noruma location
                          </Typography>

                          <Button className="green-btn small">
                            See Full Profile
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
              {activeTab === "Conversations" && (
                <>
                  <Chat />
                </>
              )}
              {activeTab === "Saved_profiles" && (
                <>
                  {savedprofiles.map((job, index) => (
                    <Grid key={index} item lg={4} md={6} xs={12}>
                      <Box className="helpersCol employerapplicant savedProfile">
                        <Box className="profileUpper">
                          <Box className="helperImg">
                            <img
                              src={`images/users/${job.image}`}
                              alt={`Helpers ${index}`}
                            />
                          </Box>
                          <Box className="helperContent">
                            <Box className="wishlistIcon">
                              <img src="cross.svg" alt="unsave" />
                            </Box>
                            <Typography variant="h5">{job.title}</Typography>
                            <Box className="locationDate">
                              <Box className="location">{job.location}</Box>
                              <Box className="applicant_age">
                                {job.age} years
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box className="work_Profile">
                          <Typography className="jobOfferby">
                            Jobs offered by {job.jobOfferby}
                          </Typography>
                          <Typography className="job_role">
                            {job.jobrole}
                          </Typography>
                          <Typography className="job_date">
                            Added on {job.addedDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid className="dashboardContentArea footerDash employerFooter">
          <Box className="copyrightArea">
            <Typography>©2024 HelperDoc. All Rights Reserved.</Typography>
          </Box>
          <Box className="footerLinks">
            <List>
              <ListItem>
                <Link to="/">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link to="/">FAQ’s</Link>
              </ListItem>
              <ListItem>
                <Link to="/">Privacy Policy</Link>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployerDashboard;
