import logo from "./logo.svg";
import "./App.css";
import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./Components/Common/Headers/PublicHeader";
import PublicFooter from "./Components/Common/Footer/PublicFooter";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import SubscriptionPlans from "./pages/SubscriptionPlan/SubscriptionPlans";
import Setting from "./Components/Common/Setting/Settings";
import Notification from "./Components/Common/Notification";
import Login from "./Components/Login/Login";
import News from "./Components/News/News";
import Signup from "./Components/Signup/Signup";
import RegistrationPage from "./Components/Signup/RegistrationPage";
import JobsSection from "./Components/JobsSection/JobsSection";
import Employers from "./Components/Employers/Employers";
import OurServices from "./Components/OurServices/OurServices";
import HelperRegistrationStep1 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep1";
import HelperRegistrationStep2 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep2";
import HelperRegistrationStep3 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep3";
import HelperRegistrationStep4 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep4";
import HelperRegistrationStep5 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep5";
import HelperRegistrationStep6 from "./Components/Signup/HelperRegistrationSteps/HelperRegistrationStep6";
import HelperProfileComplete from "./Components/Signup/HelperRegistrationSteps/HelperProfileComplete";
import HelperPublicProfileView from "./Components/Signup/HelperRegistrationSteps/HelperPublicProfileView";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    termsAndConditions: false,
    role: "helper",
    workExperience: {
      workingExperience: "",
      workingLocation: "",
      employerNationality: "",
      numberOfFamilyMembers: 0,
      houseArea: 0,
      startedDate: "",
      releasedDate: "",
      currency: "",
      salary: 0,
      coHelperNumber: 0,
      isAnyLetter: false,
      experinceRemark: "",
      familyMembers: [
        {
          age: 0,
          gender: "",
          requireSpecialHelp: [],
        },
      ],
    },
  });
  return (
    <>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/emp-dashboard" element={<EmployerDashboard />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/news" element={<News />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/registration_page" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobsSection />} />
          {/* stepper */}
          <Route
            path="/registration_steps/step1"
            element={
              <HelperRegistrationStep1
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/registration_steps/step2"
            element={
              <HelperRegistrationStep2
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/registration_steps/step3"
            element={
              <HelperRegistrationStep3
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/registration_steps/step4"
            element={
              <HelperRegistrationStep4
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/registration_steps/step5"
            element={
              <HelperRegistrationStep5
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/registration_steps/step6"
            element={
              <HelperRegistrationStep6
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/helper_profile_complete"
            element={
              <HelperProfileComplete
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/helper_public_profile"
            element={
              <HelperPublicProfileView
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          {/* stepper */}

          {/* <Route path="/jobs" element={<Jobs />} /> */}
        </Routes>
      </Suspense>
      <PublicFooter />
    </>
  );
}

export default App;
