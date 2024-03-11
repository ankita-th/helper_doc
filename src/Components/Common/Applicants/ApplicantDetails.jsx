import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmpSideBar from "../SideMenubar/EmpSideBar";

export default function ApplicantDetails() {
  return (
    <>
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <EmpSideBar />
        </Grid>
        <Grid className="dashboardContentArea">
          <Grid container>
            <Box maxWidth="xl" sx={{ padding: "20px" }}>
              <Typography variant="h2" className="commonTitle">
                Need a office boy
              </Typography>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid container spacing={3} m={0} mt={4}>
            <Grid md={3} className="applicantSidebar Inner">
              <Box>
                <Box className="applicantAvtr">
                  <img src="/applicantImg.jpg" />
                </Box>
                <Box className="applicantInfo">
                  <Typography variant="h3">Peter J.</Typography>
                  <Typography variant="body1">
                    Is Looking For Domestic Helper
                  </Typography>
                  <List>
                    <ListItem>
                      <img src="/calendar.svg" alt="calendar" />
                      <strong>Date of Need:</strong> 30/01/2024
                    </ListItem>
                    <ListItem>
                      <img src="/hours.svg" alt="calendar" />
                      <strong>Min. hours:</strong> 10 hrs
                    </ListItem>
                  </List>
                </Box>
              </Box>

              <Box mt={3} className="helpder_details_dmc">
                <Typography variant="h4">
                  <img src="/domesticlocation.svg" /> Domestic Helper Near Me
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
              <Box>
                <Button className="green-btn small" mt={1}>
                  Edit Job
                </Button>
                <Button className="green-btn small">Delete Job</Button>
              </Box>
            </Grid>
            <Grid md={9}>
              <Box className="applicantDetails">
                <Box className="highlightsApplicant" mt={4}>
                  <Typography variant="h5">Need a office boy</Typography>
                  <Typography variant="body1">
                    Be as precise as possible in your ad in order to get
                    relevant applications. You will then be able to further
                    discuss with potential applicants through direct messages
                    and set up an interview. Be as precise as possible in your
                    ad in order to get relevant applications. You will then be
                    able to further discuss with potential applicants through
                    direct messages and set up an interview.
                  </Typography>
                  <Typography variant="h5">Job Details</Typography>
                  <List>
                    <ListItem>
                      <b>Start date </b>
                      <span>2024-01-30</span>
                    </ListItem>
                    <ListItem>
                      <b>Monthly salary</b>
                      <span>5000 SGD</span>
                    </ListItem>
                    <ListItem>
                      <b>Housing </b>
                      <span>Live in</span>
                    </ListItem>
                    <ListItem>
                      <b>Arrangement </b>
                      <span>Share with a kid</span>
                    </ListItem>
                    <ListItem>
                      <b>Day off on </b>
                      <span>Sunday</span>
                    </ListItem>
                    <ListItem>
                      <b>Flat size </b>
                      <span>900 square feets / square meters</span>
                    </ListItem>
                    <ListItem>
                      <b>Employer Nationality </b>
                      <span>Namibian</span>
                    </ListItem>
                  </List>
                  <Box className="expectedDuties">
                    <Typography variant="h5">Expected duties</Typography>
                    <Box className="dutiesList">
                      <Typography variant="body1">Care</Typography>
                      <List>
                        <ListItem>Newborn(0-1)</ListItem>
                        <ListItem>Toddler(1-3)</ListItem>
                        <ListItem>Child(4-12)</ListItem>
                        <ListItem>Teen (13-17)</ListItem>
                        <ListItem>Elderly (70)</ListItem>
                        <ListItem>Special Care</ListItem>
                        <ListItem>Pet</ListItem>
                      </List>
                    </Box>

                    <Box className="dutiesList">
                      <Typography variant="body1">Cooking</Typography>
                      <List>
                        <ListItem>Arabic</ListItem>
                        <ListItem>Chinese</ListItem>
                        <ListItem>Indian</ListItem>
                        <ListItem>Thai</ListItem>
                        <ListItem>Western</ListItem>
                        <ListItem>Vegetarian</ListItem>
                        <ListItem>Baking</ListItem>
                        <ListItem>Dessert</ListItem>
                      </List>
                    </Box>

                    <Box className="dutiesList">
                      <Typography variant="body1">Household Chore</Typography>
                      <List>
                        <ListItem>Car Washing</ListItem>
                        <ListItem>Cleaning</ListItem>
                        <ListItem>Marketing</ListItem>
                        <ListItem>Gardening</ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
