import { lazy } from "react";
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
];
