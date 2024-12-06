import React, { useEffect, useState } from 'react';
import { DataTableToolbar } from "../TableComponents/admin-data-table-toolbar.jsx";
import { AdminCommonDataTable } from "../TableComponents/admin-data-table.jsx";
import { faqSectionColumns } from './section-table-components/admin-faq-section-columns.jsx';
import apiClient from '../../../auth/ApiClient.jsx'; // Ensure this is correctly configured for your API client

function AdminFAQTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/faqdetails/getSectionTable');
      // Use response.data if apiClient is Axios
      const result = response.data;
      console.log("API Response:", result);

      // Map API response to match the table's expected data structure
      const formattedData = result.map((item, index) => ({
        id: String(item.id),
        section_name: item.title,
        order: index + 1, // Replace with `item.order` if provided
        status: item.isActive ? "Active" : "In-Active",
        created_by: item.createdBy || "API User", // Update if the API provides `createdBy`
        created_date: new Date(item.createdDate).toLocaleDateString(),
        updated_by: item.updatedBy || "API User", // Update if the API provides `updatedBy`
        updated_date: new Date(item.updatedDate).toLocaleDateString(),
      }));
      console.log("Formatted Data:", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminCommonDataTable
          data={data}
          columns={faqSectionColumns}
          searchInputField={"section_name"}
        >
          <DataTableToolbar />
        </AdminCommonDataTable>
      )}
    </div>
  );
}

export default AdminFAQTable;
