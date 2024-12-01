import React from "react";
import AdminDashboardCardSection from "../../components/admin/Dashboard/AdminDashboardCardSection";

function AdminDashboard() {
  return (
    <div className="flex flex-col lg:max-mid_hd_screen:space-y-6 space-y-6">
      <h2 className="text-lg text-adminTextColor font-raleway">Dashboard</h2>
      <div>
        <AdminDashboardCardSection />
      </div>
    </div>
  );
}

export default AdminDashboard;
