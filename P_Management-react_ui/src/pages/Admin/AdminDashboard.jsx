import React from "react";
import AdminDashboardCardSection from "../../components/admin/Dashboard/AdminDashboardCardSection";
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs.jsx'

function AdminDashboard() {
  return (
    <div className="flex flex-col lg:max-mid_hd_screen:space-y-6 space-y-6">
     <AdminBreadcrumbs
      subtitle="Dashboard"
     >
     </AdminBreadcrumbs>
      <div className="p-10">
        <AdminDashboardCardSection />
      </div>
    </div>
  );
}

export default AdminDashboard;
