import React from "react";
  const ErrorMessage = ({ msg }) => {
    return <p className="text-danger" style={{color: 'red'}}>{msg}</p>;
  };
  
  export default ErrorMessage;
  