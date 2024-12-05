import React, { useEffect, useState } from 'react'
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import {faqColumns} from "./data-table-components/admin-faq-columns.jsx";
import apiClient from '../../../auth/ApiClient.jsx'

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
 const [mappedData, setMappedData] = useState([]); // State to hold the mapped data

 useEffect(() => {
  getAllFAQ();
 }, []);

 const getAllFAQ = async () => {
  try {
   const response = await apiClient.get("faqdetails");
   const data = response.data.map((item) => ({
    id: String(item.id),
    question: item.question,
    wing: item.wings === "CENTRAL_WING" ? "Central Wing" : item.wings === "LEDGER_WING" ? "Ledger Wing" : "Transportation Wing",
    section: item.sections,
    status: item.isActive ? "Active" : "Inactive",
    created_by: item.createdBy,
    created_date: formatDate(item.createdDate),
    updated_by: item.updatedBy,
    updated_date: formatDate(item.updatedDate),
   }));
   setMappedData(data); // Update state
  } catch (error) {
   console.error("Error fetching news and notifications:", error);
  }
 };

 function formatDate(dateString) {
  if (!dateString) return ""; // Handle null or undefined dates
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
   year: "numeric",
   month: "short",
   day: "2-digit",
  }); // Example: "Dec 03, 2024"
 }

  return (
    <div>
        <AdminCommonDataTable data={mappedData} columns={faqColumns(getAllFAQ)} searchInputField={"question"} >
            <DataTableToolbar/>
        </AdminCommonDataTable>
    </div>
  )
}

export default AdminFAQTable