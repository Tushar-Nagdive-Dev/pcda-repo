import React from "react";
import DashboardCardSection from "../../components/officer/Dashboard/DashboardCardSection";

function OfficerDashboard() {
  return (
    <div className="flex flex-col lg:max-mid_hd_screen:space-y-6 space-y-6">
      <h2 className="text-lg text-adminTextColor font-raleway">Dashboard</h2>
      <div>
        <DashboardCardSection />
      </div>
    </div>
  );
}

export default OfficerDashboard;
