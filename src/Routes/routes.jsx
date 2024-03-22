import { lazy } from "react";
import ThanksForRegister from "../pages/HelperSteps/ThanksForRegister";
import ProfilePreview from "../pages/HelperSteps/ProfilePreview";
import Setting from "../Components/Common/Setting/Settings";
const  ForgotPassword = lazy(()=>import( "../pages/ForgotPassword/ForgotPassword"));
const Chat  = lazy(()=>import("../pages/HelperDashboard/Chat"));
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const SelectRole = lazy(() => import("../pages/Registration/SelectRole"));
const SignUp = lazy(() => import("../pages/Registration/SignUp"));
const FeatureJobs = lazy(() => import("../pages/FeatureJobs/FeatureJobs"));
const FeatureEmployers = lazy(() =>
  import("../pages/FeatureEmployer/FeatureEmployers")
);
const NewsFeed = lazy(() => import("../pages/NewsFeed/NewsFeed"));
const OurServices = lazy(() => import("../pages/OurServices/OurServices"));
const HelperRegistrationStep1 = lazy(() =>
  import("../Components/HelperProfile/HelperRegistrationStep1")
);
const HelperProfileDetailsSteps = lazy(() =>
  import("../pages/HelperSteps/HelperProfileDetailsSteps")
);
const Jobs = lazy(() => import("../pages/HelperDashboard/Jobs/Jobs"));
const JobDetails = lazy(() =>
  import("../pages/HelperDashboard/Jobs/JobDetails")
);
const MyApplication = lazy(() =>
  import("../pages/HelperDashboard/MyApplication")
);
const MyProfile = lazy(() => import("../pages/HelperDashboard/MyProfile"));
const MyNotification = lazy(() => import("../pages/HelperDashboard/Notification"))

export const route = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
    public: true,
  },
  {
    path: "/register",
    element: <SelectRole />,
    public: true,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    public: true,
  },
  {
    path: "/register/helper",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/register/employer",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/register/agency",
    element: <SignUp />,
    public: true,
  },
  {
    path: "/feature-jobs",
    element: <FeatureJobs />,
  },
  {
    path: "/feature-employers",
    element: <FeatureEmployers />,
  },
  {
    path: "/our-service",
    element: <OurServices />,
  },
  {
    path: "/news-feed",
    element: <NewsFeed />,
  },
  // helper steps
  {
    path: "/register/helper/profile-steps/:step",
    element: <HelperProfileDetailsSteps />,
    stepper: true,
  },
  {
    path: "/thankyou",
    element: <ThanksForRegister />,
  },
  {
    path: "/profile-preview",
    element: <ProfilePreview />,
  },
  // Helper dashboard
  {
    path: "/helper/job-dashboard",
    element: <Jobs />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/job-detail/:id",
    element: <JobDetails />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/my-applications",
    element: <MyApplication />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/my-profile",
    element: <MyProfile />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/notification",
    element: <MyNotification />,
    path: "/helper/chat",
    element: <Chat />,
    private: true,
    helper: true,
  },
  {
    path: "/helper/setting",
    element: <Setting />,
    private: true,
    helper: true,
  },
];
