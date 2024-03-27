import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import "../common.css";
import { EMPLOYER_SIDE_BAR, HELPER_SIDE_BAR } from "./Constant";
import LogoutIcon from "../../../Assets/SVGIcons/LogoutIcon";
import { useTranslation } from "react-i18next";
import { toastMessage } from "../../../Utils/toastMessages";
import { USER_ROLE, successType } from "../../../Constant/Constant";

const SideMenuBar = ({ role }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sidebarList =
    role === USER_ROLE.helper ? HELPER_SIDE_BAR : EMPLOYER_SIDE_BAR;

  const handleLinkClick = (link) => {
    localStorage.clear();
    // persistStore(reduxStore).purge();
    toastMessage(t("logout_successfully"), successType);
    navigate("/login");
  };

  return (
    <>
      <List className="sidebar">
        {sidebarList.map((sideBar) => (
          <ListItem
            className={
              pathname === sideBar.link ||
              (sideBar.subRoutes && pathname.includes("/helper/job-detail/"))
                ? "sidebarItem active"
                : "sidebarItem"
            }
            component={Link}
            to={sideBar.link}
          >
            {sideBar.icon}
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
