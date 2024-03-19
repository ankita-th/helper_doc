import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationIcon from "../../../Assets/SVGIcons/ApplicationIcon";
import BriefCaseIcon from "../../../Assets/SVGIcons/BriefCaseIcon";
import NotificationBellIcon from "../../../Assets/SVGIcons/NotificationBellIcon";
import ChatIcon from "../../../Assets/SVGIcons/ChatIcon";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../../Assets/SVGIcons/UserIcon";

export const HELPER_SIDE_BAR = [
  {
    tab_name: "jobs",
    link: "/helper/job-dashboard",
    icon: <BriefCaseIcon />,
  },
  {
    tab_name: "my_applications",
    link: "/helper/my-applications",
    icon: <ApplicationIcon />,
  },
  {
    tab_name: "my_profile",
    link: "/helper/my-profile",
    icon: <UserIcon />,
  },
  {
    tab_name: "notification",
    link: "/helper/notification",
    icon: <NotificationBellIcon />,
  },
  {
    tab_name: "chat",
    link: "/helper/chat",
    icon: <ChatIcon />,
  },
  {
    tab_name: "setting",
    link: "/helper/setting",
    icon: <FontAwesomeIcon color="#646464" icon={faGear} />,
  },
];
