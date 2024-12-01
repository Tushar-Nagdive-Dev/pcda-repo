import React from 'react'
import { FAQDataTable } from "./data-table-components/admin-faq-data-table";
import { adminColumns } from "./data-table-components/admin-faq-columns";

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
      <FAQDataTable data={data} columns={adminColumns} />
    </div>
  )
}

export default AdminFAQTable