import React from "react";
import { DataTable } from "./data-table-components/admin-news-notification-data-table";
import { adminColumns } from "./data-table-components/admin-news-notification-columns";

const data = [
  {
    id: "ne1",
    title: "Form 16 For Financial Year 2023-24",
    type: "News & Notification",
    new: "Yes",
    status: "Active",
    created_by: "J N Tulekar",
    created_date: "26 Oct 2024",
    updated_by: "J N Tulekar",
    updated_date: "26 Oct 2024",
    order: 1,
  },
  {
    id: "ne2",
    title: "Message to Army Officers regarding Income Tax Regime.",
    type: "News",
    new: "Yes",
    status: "Inactive",
    created_by: "J N Tulekar",
    created_date: "26 Nov 2023",
    updated_by: "J N Tulekar",
    updated_date: "26 Nov 2023",
    order: 1,
  },
];

function NewsAndNotificationTable() {
  return (
    <div>
      <DataTable data={data} columns={adminColumns} />
    </div>
  );
}

export default NewsAndNotificationTable;
