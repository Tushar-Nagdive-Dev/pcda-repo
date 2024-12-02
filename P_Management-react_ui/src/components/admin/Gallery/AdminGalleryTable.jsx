import React from "react";
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import {galleryColumns} from "./data-table-components/admin-gallery-columns.jsx";

const data = [
  {
    id: "ga1",
    event_title:
      "Glimpses of the release ceremony of the house magazine Kaustubh 2023",
    type: "Image",
    year: "2023",
    status: "Active",
    created_by: "J N Tulekar",
    created_date: "26 Oct 2023",
    updated_by: "J N Tulekar",
    updated_date: "26 Oct 2024",
  },
  {
    id: "ga2",
    event_title:
      "Glimpses of the release ceremony of the house magazine Kaustubh 2024",
    type: "Image",
    year: "2024",
    status: "Active",
    created_by: "J N Tulekar",
    created_date: "26 Oct 2023",
    updated_by: "J N Tulekar",
    updated_date: "26 Oct 2024",
  },
];

function AdminGalleryTable() {
  return (
    <div>
      <AdminCommonDataTable data={data} columns={galleryColumns} searchInputField={"event_title"}>
        <DataTableToolbar/>
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminGalleryTable;
