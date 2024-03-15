import { Fade, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const SnackBarService = ({ open }) => {
  const [showSnackBar, setShowSnackBar] = useState(open);
  useEffect(() => {
    setShowSnackBar(open);
  }, [open]);
  const handleClose = () => {
    setShowSnackBar(false);
  };
  return (
    <Snackbar
      ContentProps={{
        sx: {
          background: "#55dba6",
        },
      }}
      open={showSnackBar}
      onClose={handleClose}
      TransitionComponent={Fade}
      message="I love snacks"
      //   key={Fade.Transition.name}
      autoHideDuration={1200}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
};

export default SnackBarService;
