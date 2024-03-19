import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Navigate, Outlet } from "react-router-dom";
import PrivateFooter from "../Components/Common/Footer/PrivateFooter";
import { Grid } from "@mui/material";
import SideMenuBar from "../Components/Common/SideMenubar/SideMenuBar";

const HelperLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Grid container className="dashboardRow">
        {/* Sidebar Component */}
        <Grid className="dashboardSidebar">
          <SideMenuBar />
        </Grid>
        <Grid className="dashboardContentArea">
          {isToken ? <Outlet /> : <Navigate to="/login" />}
        </Grid>
      </Grid>
      {/* <PrivateFooter /> */}
    </>
  );
};

export default HelperLayout;
