import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";

const SuccessModal = ({
  open,
  handleClose,
  handleContinue,
}) => {
  return (
    <Container maxWidth="xl">
      <Dialog open={open} onClose={handleClose}>
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
            <img
              src="/success.svg"
              alt="Success Image"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            />
          </Box>
          <Typography variant="h4">Success!</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            Your changes have been saved successfully!
          </Typography>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={handleContinue}
              color="primary"
              variant="contained"
            >
              Continue
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default SuccessModal;
