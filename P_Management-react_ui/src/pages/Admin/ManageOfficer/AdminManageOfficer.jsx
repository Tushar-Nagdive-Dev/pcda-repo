import React from 'react';
import { Link } from 'react-router-dom';
import { DownloadSimple, UploadSimple } from '@phosphor-icons/react';
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx';
import AdminOfficersTable from '../../../components/admin/ManageOfficer/AdminOfficersTable.jsx';
import apiClient from '../../../auth/ApiClient.jsx';

function AdminManageOfficer() {
  const handleDownloadJson = async () => {
    try {
      // Make an API call to download JSON
      const response = await apiClient.get('/registration-processing/download', {
        responseType: 'blob', // Indicate that the response is a file
      });

      // Create a URL for the downloaded JSON blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registration_data.json'); // Set the filename
      document.body.appendChild(link);
      link.click(); // Trigger download
      link.remove(); // Clean up DOM
    } catch (error) {
      console.error('Error downloading JSON file:', error);
      alert('Failed to download JSON file. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs title="Manage Officer's > " subtitle="View Officers">
        <Link
          to={`/pcdao/manage-officer/upload`}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
          <UploadSimple size={24} />
          <p className="text-white font-raleway">Upload JSON</p>
        </Link>
        <button
          onClick={handleDownloadJson}
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
          <DownloadSimple size={24} />
          <p className="text-white font-raleway">Download JSON</p>
        </button>
      </AdminBreadcrumbs>
      <div className="p-10">
        <AdminOfficersTable />
      </div>
    </div>
  );
}

export default AdminManageOfficer;
