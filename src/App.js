import logo from "./logo.svg";
import "./App.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./Components/Common/Headers/PublicHeader";
import PublicFooter from "./Components/Common/Footer/PublicFooter";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard";

function App() {
  return (
    <>
    <Header  />
      <Suspense>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/emp-dashboard" element={<EmployerDashboard />} />
        </Routes>
      </Suspense>
      <PublicFooter />
    </>
  );
}

export default App;
