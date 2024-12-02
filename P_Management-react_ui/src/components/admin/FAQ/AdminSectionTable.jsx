import React from 'react'
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import { faqSectionColumns } from './section-table-components/admin-faq-section-columns.jsx'

const data = [
 {
  id: "section1",
  section_name: "General",
  order: 23,
  status: "Active",
  created_by: "J N Tulekar",
  created_date: "26 Oct 2024",
  updated_by: "J N Tulekar",
  updated_date: "26 Oct 2024",
 },
 {
  id: "section2",
  section_name: "Rent Section",
  order: 25,
  status: "In-Active",
  created_by: "J N Tulekar",
  created_date: "26 Oct 2024",
  updated_by: "J N Tulekar",
  updated_date: "26 Oct 2024",
 },
];

function AdminFAQTable() {
 return (
  <div>
   <AdminCommonDataTable data={data} columns={faqSectionColumns} searchInputField={"question"}>
    <DataTableToolbar/>
   </AdminCommonDataTable>
  </div>
 )
}

export default AdminFAQTable