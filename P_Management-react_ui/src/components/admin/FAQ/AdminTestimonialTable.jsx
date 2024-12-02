import React from 'react'
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import {faqColumns} from "./data-table-components/admin-faq-columns.jsx";

const data = [
    {
      id: "faq1",
      question: "What are the non-monetary benefits admission..",
      status: "Active",
      wing: "Ledger",
      section: "General",
      created_by: "J N Tulekar",
      created_date: "26 Oct 2024",
      updated_by: "J N Tulekar",
      updated_date: "26 Oct 2024",
    },
    {
        id: "faq1",
        question: "What are the non-monetary benefits admission..",
        status: "Active",
        wing: "Transportation",
        section: "Air Travel",
        created_by: "J N Tulekar",
        created_date: "26 Oct 2024",
        updated_by: "J N Tulekar",
        updated_date: "26 Oct 2024",
      },
  ];

function AdminFAQTable() {
  return (
    <div>
        <AdminCommonDataTable data={data} columns={faqColumns} searchInputField={"question"}>
            <DataTableToolbar/>
        </AdminCommonDataTable>
    </div>
  )
}

export default AdminFAQTable