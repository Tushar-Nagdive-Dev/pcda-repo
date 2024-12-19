import React, { useEffect, useState } from 'react'
import apiClient from '../../../auth/ApiClient'
import { AdminCommonDataTable } from '../TableComponents/admin-data-table'
import { DataTableToolbar } from '../TableComponents/admin-data-table-toolbar'
import { OfficersColumns } from './data-table-components/admin-officers-column'

function AdminOfficersTable() {
 const [mappedData, setMappedData] = useState([]) // State to hold the mapped data

 useEffect(() => {
  fetchAllOfficer() // Fetch data when component mounts
 }, [])

 const fetchAllOfficer = async () => {
  try {
   const response = await apiClient.get('') // Adjusted endpoint
   const data = response.data.map(mapOfficerData) // Map response data to table format
   setMappedData(data) // Update state with mapped data
  } catch (error) {
   console.error('Error fetching FAQ table data:', error)
  }
 }

 const mapOfficerData = (item) => ({
  id: String(item.id),
  officer_name: item.officer_name,
  cdac_acc_no: item.cdac_acc_no,
  email: item.email,
  user_name: item.user_name,
 });

 return (
  <div>
   <AdminCommonDataTable
    data={mappedData}
    columns={OfficersColumns} // Pass refetch function for actions
    searchInputField="officer_name" // Searchable field
   >
    <DataTableToolbar />
   </AdminCommonDataTable>
  </div>
 )
}

export default AdminOfficersTable
