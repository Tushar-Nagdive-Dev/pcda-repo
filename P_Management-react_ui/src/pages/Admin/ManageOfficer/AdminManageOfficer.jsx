import React from 'react'
import { Link } from 'react-router-dom'
import {
 DownloadSimple,
 ListPlus,
 Plus,
 UploadSimple,
} from '@phosphor-icons/react'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx'
import AdminOfficersTable from '../../../components/admin/ManageOfficer/AdminOfficersTable.jsx'

function AdminManageOfficer() {
 return (
  <div className="flex flex-col gap-2">
   <AdminBreadcrumbs title="Manage Officer's > " subtitle="View Officers">
    <Link
     to={`/pcdao/manage-officer/upload`}
     className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
    >
     <UploadSimple size={24} />
     <p className="text-white font-raleway">Upload CSV</p>
    </Link>
    <a
     href="/path-to-your-file.csv"
     download="manage_user.csv"
     className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
    >
     <DownloadSimple size={24} />
     <p className="text-white font-raleway">Download CSV</p>
    </a>
   </AdminBreadcrumbs>
   <div className="p-10">
    <AdminOfficersTable />
   </div>
  </div>
 )
}

export default AdminManageOfficer
