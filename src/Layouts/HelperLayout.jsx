import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import { Grid } from "@mui/material";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";
import { USER_ROLE } from "../Constant/Constant";

const HelperLayout = () => {
  const isToken = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("selectedRole");

  return (
    <>
      <Header />
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <SideMenuBar role={USER_ROLE.helper} />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? (
            USER_ROLE.helper === selectedRole ? (
              <Outlet />
            ) : USER_ROLE.employer === selectedRole ? (
              <Navigate to="/employer/dashboard" />
            ) : (
              <Navigate to="/agent/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )}
        </Grid>
      </Grid>
      {/* <PrivateFooter /> */}
    </>
  );
};

export default HelperLayout;
