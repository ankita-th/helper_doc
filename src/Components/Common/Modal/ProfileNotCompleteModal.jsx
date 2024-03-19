import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNotCompleteModal({ open }) {
  return (
    <Container maxWidth="xl">
      <Dialog open={open} disableBackdropClick>
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            mx: "auto",
            maxWidth: 600,
            padding: 3,
            borderRadius: 8,
            boxShadow: 2,
            backgroundColor: "#fff",
            pb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 3 }}>
            {/* <img
              src="/success.svg"
              alt="Success Image"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            /> */}
          </Box>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            Your profile is not completed
          </Typography>
          <Typography variant="h4">Please complete your profile</Typography>
          <DialogActions style={{ justifyContent: "center" }}>
            <Link to={""} className="green-btn small">
              Complete Profile
            </Link>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}
