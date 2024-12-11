import React, { useEffect, useState } from 'react';
import { DataTableToolbar } from "../TableComponents/admin-data-table-toolbar.jsx";
import { AdminCommonDataTable } from "../TableComponents/admin-data-table.jsx";
import apiClient from '../../../auth/ApiClient.jsx';
import { downloadColumns } from './download-table-components/admin-download-section-columns.jsx';

function AdminDownloadTable() {
  const [mappedData, setMappedData] = useState([]); // State to hold the mapped data

  useEffect(() => {
    fetchAllDownloads(); // Fetch data when component mounts
  }, []);

  const fetchAllDownloads = async () => {
    try {
      const response = await apiClient.get("/document"); // Adjusted endpoint
      const data = response.data.map(mapDocumentData); // Map response data to table format
      setMappedData(data); // Update state with mapped data
    } catch (error) {
      console.error("Error fetching document data:", error);
    }
  };

  const mapDocumentData = (item) => ({
    id: String(item.id),
    title: item.title,
    url: item.documentPath,
    status: item.status ? "Active" : "Inactive",
    order: item.uiOrder,
    created_by: item.createdBy || "N/A",
    created_date: formatDate(item.createdDate),
    updated_by: item.updatedBy || "N/A",
    updated_date: formatDate(item.updatedDate),
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
        columns={downloadColumns(fetchAllDownloads)} // Pass refetch function for actions
        searchInputField="title" // Searchable field
      >
        <DataTableToolbar />
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminDownloadTable;
