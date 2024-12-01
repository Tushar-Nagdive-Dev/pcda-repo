import React from "react";
import AdminBreadcrumbs from "../../components/admin/AdminBreadcrumbs";
import { Link } from "react-router-dom";
import { ListPlus, Plus } from "@phosphor-icons/react";
import AdminFAQTable from "../../components/admin/FAQ/AdminTestimonialTable";

function AdminFAQTableList() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs title="Website Manager > " subtitle="FAQ">
        <Link
          to={`/admin/faq/add-section`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
          <ListPlus size={24} />
          <p className="text-white font-raleway">Add Section</p>
        </Link>
        <Link
          to={`/admin/faq/new`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
          <Plus size={24} />
          <p className="text-white font-raleway">Add FAQ</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <AdminFAQTable />
      </div>
    </div>
  );
}

export default AdminFAQTableList;
