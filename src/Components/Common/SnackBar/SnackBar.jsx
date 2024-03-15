import { Alert, Fade, Icon, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarSlice } from "../../../Redux/CommonSlice";

const SnackMessageBar = () => {
  const dispatch = useDispatch();
  const { snackBar } = useSelector((state) => state.common);
  const handleClose = () => {
    dispatch(
      setSnackBarSlice({
        show: false,
        msg: "",
        type: "",
      })
    );
  };
  return (
    <Snackbar
      open={snackBar.show}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackBar.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackBar.msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackMessageBar;
