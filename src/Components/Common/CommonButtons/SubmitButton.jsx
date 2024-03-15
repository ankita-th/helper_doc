import { Button } from "@mui/material";
import React from "react";
import ButtonLoader from "../Loader/ButtonLoader";

const SubmitButton = ({contentText, type = "submit", loader, disabled}) => {
  return (
    <Button
      className="green-btn"
      type={type}
      variant="contained"
      disabled={disabled}
      sx={{
        backgroundColor: "#55dba6",
        color: "#fff",
        mt: 2,
        py: 1,
        fontSize: "14px",
      }}
    >
      {loader && <ButtonLoader />}
      {contentText}
    </Button>
  );
};

export default SubmitButton;
