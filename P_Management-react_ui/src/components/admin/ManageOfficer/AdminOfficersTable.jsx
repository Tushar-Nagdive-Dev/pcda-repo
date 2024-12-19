import React, { useEffect, useState } from 'react';
import apiClient from '../../../auth/ApiClient';
import { AdminCommonDataTable } from '../TableComponents/admin-data-table';
import { DataTableToolbar } from '../TableComponents/admin-data-table-toolbar';
import { OfficersColumns } from './data-table-components/admin-officers-column';

function AdminOfficersTable() {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    fetchAllOfficers();
  }, []);

  const fetchAllOfficers = async () => {
    try {
      const response = await apiClient.get('/registration-processing/users');
      const data = response.data.map(mapOfficerData);
      setMappedData(data);
    } catch (error) {
      console.error('Error fetching officer data:', error);
    }
  };

  const mapOfficerData = (item) => ({
    id: String(item.id),
    officer_name: item.officer_Name,
    cdac_acc_no: item.accountno,
    email: item.email,
    user_name: item.username,
  });

  return (
    <div>
      <AdminCommonDataTable
        data={mappedData}
        columns={OfficersColumns}
        searchInputField="officer_name"
      >
        <DataTableToolbar />
      </AdminCommonDataTable>
    </div>
  );
}

export default AdminOfficersTable;
