import { Button } from "@mui/material";
import React from "react";

const ArrowButton = ({ title }) => {
  return (
    <Button color="primary" className="arrowButton">
      {title}
    </Button>
  );
};

export default ArrowButton;
