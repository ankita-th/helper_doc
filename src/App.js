import logo from "./logo.svg";
import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./Components/Common/Headers/PublicHeader";
import PublicFooter from "./Components/Common/Footer/PublicFooter";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";
import SubscriptionPlans from "./pages/SubscriptionPlan/SubscriptionPlans";
import Setting from "./Components/Common/Setting/Settings";
import Notification from "./Components/Common/Notification";

function App() {
  return (
    <>
    <Header  />
      <Suspense>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/emp-dashboard" element={<EmployerDashboard />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/notifications" element={<Notification />} />
        </Routes>
      </Suspense>
      <PublicFooter />
    </>
  );
}

export default App;
