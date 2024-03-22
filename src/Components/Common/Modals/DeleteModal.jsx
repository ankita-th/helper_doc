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

const DeleteModal = ({ showModal, toggleModal, handleDelete }) => {
  return (
    <Container maxWidth="xl">
      <Dialog open={showModal} onClose={toggleModal} className="customModal">
        <Box
          className="innerModal"
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
          {/* <Box sx={{ mb: 3 }}>
            <img
              src="/success.svg"
              alt="Success Image"
              style={{ maxWidth: "100%", marginBottom: "20px" }}
            />
          </Box> */}
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            Are you sure you want to delete your account!
          </Typography>
          <Box style={{ display: "flex" }}>
              <Button
                onClick={handleDelete}
                variant="contained" 
                className="errorButton"
                color="error"
              >
                Confirm
              </Button>
              <Button onClick={toggleModal} color="primary" variant="contained">
                Cancel
              </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default DeleteModal;
