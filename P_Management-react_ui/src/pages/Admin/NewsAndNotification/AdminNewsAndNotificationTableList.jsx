import React from "react";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs.jsx";
import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";
import NewsAndNotificationTable from "../../../components/admin/NewsAndNotification/NewsAndNotificationTable.jsx";

function AdminNewsAndNotificationTableList() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs
        title="Website Manager > "
        subtitle="News & Notification"
      >
        <Link
          to={`/pcdao/news-and-notification/new`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
            <Plus size={24} />
            <p className="text-white font-raleway">Add News Flash</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <NewsAndNotificationTable />
      </div>
    </div>
  );
}

export default AdminNewsAndNotificationTableList;
