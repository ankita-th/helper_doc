import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import PublicFooter from "../Components/Common/Footer/PublicFooter";
import { Link, Navigate, Outlet } from "react-router-dom";
import { USER_ROLE } from "../Constant/Constant";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

const ApplicantLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");
  return (
    <>
      <Header />
      <Grid container className="dashboardRow">
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.employer} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.employer === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.helper === selectedRole ? (
              <Navigate to="/helper/job-dashboard" />
            ) : (
              <Navigate to="/employer/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )}
        </Grid>
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
    </>
  );
};

export default ApplicantLayout;
