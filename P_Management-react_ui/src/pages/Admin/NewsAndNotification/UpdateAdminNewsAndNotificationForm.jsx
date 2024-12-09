import React from "react";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs.jsx";
import { Link } from "react-router-dom";
import NewsAndNotificationLayout from "../../../components/admin/NewsAndNotification/NewsAndNotificationTable.jsx";
import { CaretLeft } from "@phosphor-icons/react";
import EditNewsAndNotificationForm from "../../../components/admin/NewsAndNotification/EditNewsAndNotificationForm.jsx";

function UpdateAdminNewsAndNotificationForm() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs
        title="Website Manager > News & Notification"
        subtitle="Edit "
      >
        <Link
          to={`/pcdao/news-and-notification`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md cursor-pointer"
        >
          <CaretLeft size={24} />
          <p className="text-white font-raleway">Back</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <EditNewsAndNotificationForm />
      </div>
    </div>
  );
}

export default UpdateAdminNewsAndNotificationForm;
