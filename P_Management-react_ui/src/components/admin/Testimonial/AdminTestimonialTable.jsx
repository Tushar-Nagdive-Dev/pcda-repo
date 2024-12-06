import React, { useEffect, useState } from 'react';
import { testimonialColumns } from './data-table-components/admin-testimonial-columns';
import { AdminCommonDataTable } from '../TableComponents/admin-data-table.jsx';
import { DataTableToolbar } from '../TableComponents/admin-data-table-toolbar.jsx';
import apiClient from '../../../auth/ApiClient'; // Ensure the correct path for your apiClient

function AdminTestimonialTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true); // Set loading state
        const response = await apiClient.get('/testimonial'); // Adjust endpoint if needed
        const transformedData = response.data.map((testimonial) => ({
          id: String(testimonial.id),
          person_name: testimonial.name,
          position: testimonial.position,
          title: testimonial.testimonialBrief,
          status: testimonial.status,
          created_by: testimonial.createdBy,
          created_date: new Date(testimonial.createdDate).toLocaleDateString(),
          updated_by: testimonial.updatedBy,
          updated_date: new Date(testimonial.updatedDate).toLocaleDateString(),
        }));
        setData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to fetch testimonials. Please try again later.');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Render loading and error states
  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the data table
  return (
    <div>
      <AdminCommonDataTable data={data} columns={testimonialColumns} searchInputField="person_name">
        <DataTableToolbar />
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminTestimonialTable;
