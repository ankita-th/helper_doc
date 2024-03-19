import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import "../common.css";
import BriefCaseIcon from "../../../Assets/SVGIcons/BriefCaseIcon";
import { HELPER_SIDE_BAR } from "./Constant";
import LogoutIcon from "../../../Assets/SVGIcons/LogoutIcon";
import { useTranslation } from "react-i18next";
import { toastMessage } from "../../../Utils/toastMessages";
import { successType } from "../../../Constant/Constant";

const SideMenuBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLinkClick = (link) => {
    localStorage.clear();
    // persistStore(reduxStore).purge();
    toastMessage(t("logout_successfully"), successType);
    navigate("/login");
  };

  return (
    <>
      <List className="sidebar">
        {HELPER_SIDE_BAR.map((sideBar) => (
          <ListItem
            className={
              pathname === sideBar.link ? "sidebarItem active" : "sidebarItem"
            }
            component={Link}
            to={sideBar.link}
          >
            <BriefCaseIcon />

            <ListItemText primary={t(sideBar.tab_name)} />
          </ListItem>
        ))}
        <ListItem
          className="sidebarItem logout"
          component={Button}
          onClick={() => handleLinkClick("/logout")}
        >
          <LogoutIcon />
          <ListItemText primary={t("logout")} />
        </ListItem>
      </List>
    </>
  );
};

export default SideMenuBar;
