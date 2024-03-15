import React from "react";
import Header from "../Components/Common/Headers/PublicHeader";
import { Navigate, Outlet } from "react-router-dom";
import PublicFooter from "../Components/Common/Footer/PublicFooter";

const HelperLayout = () => {
  const isToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      {isToken ? <Outlet /> : <Navigate to="/login" />}
      <PublicFooter />
    </>
  );
};

export default HelperLayout;
