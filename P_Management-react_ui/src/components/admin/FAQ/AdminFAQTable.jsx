import React, { useEffect, useState } from 'react';
import { DataTableToolbar } from "../TableComponents/admin-data-table-toolbar.jsx";
import { AdminCommonDataTable } from "../TableComponents/admin-data-table.jsx";
import { faqColumns } from "./data-table-components/admin-faq-columns.jsx";
import apiClient from '../../../auth/ApiClient.jsx';

function AdminFAQTable() {
  const [mappedData, setMappedData] = useState([]); // State to hold the mapped data

  useEffect(() => {
    fetchAllFAQs(); // Fetch data when component mounts
  }, []);

  const fetchAllFAQs = async () => {
    try {
      const response = await apiClient.get("faqdetails/getFaqTableData"); // Adjusted endpoint
      const data = response.data.map(mapFAQData); // Map response data to table format
      setMappedData(data); // Update state with mapped data
    } catch (error) {
      console.error("Error fetching FAQ table data:", error);
    }
  };

  const mapFAQData = (item) => ({
    id: String(item.id),
    question: item.question || "N/A",
    wing:
      item.wing.name === "CENTRAL_WING"
        ? "Central Wing"
        : item.wing.name === "LEDGER_WING"
        ? "Ledger Wing"
        : "Transportation Wing",
    section: item.section.name || "N/A", // Handle missing or null values
    status: item.faqStatus ? "Active" : "Inactive",
    created_by: item.createdBy || "N/A",
    created_date: formatDate(item.createdDate),
    updated_by: item.updatedBy || "N/A",
    updated_date: formatDate(item.updatedDate),
    faqId: item.faqId
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle null or undefined dates
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }); // Example: "Dec 03, 2024"
  };

  return (
    <div>
      <AdminCommonDataTable
        data={mappedData}
        columns={faqColumns(fetchAllFAQs)} // Pass refetch function for actions
        searchInputField="question" // Searchable field
      >
        <DataTableToolbar />
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminFAQTable;
