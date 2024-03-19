import React from "react";
import "./footer.css";
import { Box, Grid, Typography } from "@mui/material";

export default function PrivateFooter() {
  return (
    <Grid className="dashboardContentArea footerDash">
      <Box className="copyrightArea">
        <Typography>©2024 HelperDoc. All Rights Reserved.</Typography>
      </Box>
    </Grid>
  );
}
