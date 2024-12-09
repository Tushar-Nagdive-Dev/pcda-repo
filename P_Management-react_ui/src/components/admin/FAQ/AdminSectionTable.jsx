import React, { useEffect, useState } from 'react'
import { DataTableToolbar } from '../TableComponents/admin-data-table-toolbar.jsx'
import { AdminCommonDataTable } from '../TableComponents/admin-data-table.jsx'
import { faqSectionColumns } from './section-table-components/admin-faq-section-columns.jsx'
import apiClient from '../../../auth/ApiClient.jsx' // Ensure this is correctly configured for your API client

function AdminFAQTable({data, fetchData}) {
 return (
  <div>
   <AdminCommonDataTable
    data={data}
    columns={faqSectionColumns(fetchData)}
    searchInputField={'section_name'}
   >
    <DataTableToolbar />
   </AdminCommonDataTable>
  </div>
 )
}

export default AdminFAQTable
