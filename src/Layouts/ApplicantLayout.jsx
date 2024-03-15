import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import PublicFooter from "../Components/Common/Footer/PublicFooter";
import { Navigate, Outlet } from "react-router-dom";

const ApplicantLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      {isToken ? <Outlet /> : <Navigate to="/login" />}
      <PublicFooter />
    </>
  );
};

export default ApplicantLayout;
