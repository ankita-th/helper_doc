// HelperDashboard.tsx
import React from "react";
// import Header from "../Common/HelperHeader";
// import Footer from "../Common/HelperFooter";
import JobsList from "./JobsList";

const HelperDashboard = () => {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <JobsList />
        {/* Other content specific to HelperDashboard */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HelperDashboard;
