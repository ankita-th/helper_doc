import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApplicationIcon from "../../../Assets/SVGIcons/ApplicationIcon";
import BriefCaseIcon from "../../../Assets/SVGIcons/BriefCaseIcon";
import NotificationBellIcon from "../../../Assets/SVGIcons/NotificationBellIcon";
import ChatIcon from "../../../Assets/SVGIcons/ChatIcon";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../../Assets/SVGIcons/UserIcon";

export const HELPER_SIDE_BAR = [
  {
    tab_name: "jobs",
    link: "/helper/job-dashboard",
    subRoutes: true,
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

export const EMPLOYER_SIDE_BAR = [
  {
    tab_name: "dashboard",
    link: "/employer/dashboard",
    icon: <img src="/dashboard.svg" alt="Logo" />,
  },
  {
    tab_name: "post_a_job",
    link: "/employer/job-post",
    icon: <BriefCaseIcon />,
  },
  {
    tab_name: "my_posting",
    link: "/employer/my-job-post",
    icon: <ApplicationIcon />,
  },
  {
    tab_name: "find_applicant",
    link: "/employer/find-applicant",
    icon: <FontAwesomeIcon color="#646464" icon={faMagnifyingGlass} />,
  },
  {
    tab_name: "subscription_plan",
    link: "/employer/subscriptio-plan",
    icon: <img src="/subscription_logo.svg" alt="Logo" className="chat" />,
  },
  {
    tab_name: "chat",
    link: "/employer/chat",
    icon: <ChatIcon />,
  },
  {
    tab_name: "my_profile",
    link: "/employer/my-profile",
    icon: <UserIcon />,
  },
  {
    tab_name: "notification",
    link: "/employer/notification",
    icon: <NotificationBellIcon />,
  },
  {
    tab_name: "setting",
    link: "/employer/setting",
    icon: <FontAwesomeIcon color="#646464" icon={faGear} />,
  },
];
