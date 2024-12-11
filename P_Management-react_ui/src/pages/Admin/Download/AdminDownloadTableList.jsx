import React from "react";
import AdminBreadcrumbs from "../../../components/admin/AdminBreadcrumbs.jsx";
import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";
import AdminDownloadTable from "../../../components/admin/Download/AdminDownloadTable.jsx";

function AdminDownloadTableList() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs
        title="Website Manager > "
        subtitle="Downloads Manager"
      >
        <Link
          to={`/pcdao/download/new`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
            <Plus size={24} />
            <p className="text-white font-raleway">Add Download</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <AdminDownloadTable />
      </div>
    </div>
  );
}

export default AdminDownloadTableList;
