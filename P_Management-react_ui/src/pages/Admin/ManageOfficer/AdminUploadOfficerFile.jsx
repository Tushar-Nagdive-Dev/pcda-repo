import { ChevronLeft } from 'lucide-react'
import React from 'react'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs'
import { Link } from 'react-router-dom'
import AdminUploadOfficerForm from '../../../components/admin/ManageOfficer/AdminUploadOfficerForm'

function AdminUploadOfficerFile() {
 return (
  <div className="flex flex-col gap-2">
   <AdminBreadcrumbs title="Manage Officer's > Upload CSV" subtitle="">
    <Link
     to="/pcdao/manage-officer"
     className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
    >
     <ChevronLeft size={24} />
     <p className="text-white font-raleway">Back</p>
    </Link>
   </AdminBreadcrumbs>
   <div className="p-10">
    <AdminUploadOfficerForm />
   </div>
  </div>
 )
}

export default AdminUploadOfficerFile
