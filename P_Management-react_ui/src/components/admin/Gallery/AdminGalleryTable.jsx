import React, { useEffect, useState } from "react";
import { DataTableToolbar } from "../TableComponents/admin-data-table-toolbar.jsx";
import { AdminCommonDataTable } from "../TableComponents/admin-data-table.jsx";
import { galleryColumns } from "./data-table-components/admin-gallery-columns.jsx";
import apiClient from "../../../auth/ApiClient.jsx"; // Assuming a configured Axios instance is available

function AdminGalleryTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utility function to format dates
  const formatDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/gallery");
        setData(
          response.data.map((gallery) => ({
            id: gallery.id,
            event_title: gallery.eventName,
            type: gallery.type,
            year: gallery.year,
            status: gallery.isActive ? "Active" : "Inactive",
            created_by: gallery.createdBy || "API User", // Handle cases where createdBy may be null
            created_date: formatDate(gallery.createdDate), // Format the createdDate
            updated_by: gallery.updatedBy || "API User", // Handle cases where updatedBy may be null
            updated_date: formatDate(gallery.updatedDate), // Format the updatedDate
          }))
        );
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError("Failed to fetch galleries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return <div>Loading galleries...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AdminCommonDataTable data={data} columns={galleryColumns} searchInputField={"event_title"}>
        <DataTableToolbar />
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminGalleryTable;
