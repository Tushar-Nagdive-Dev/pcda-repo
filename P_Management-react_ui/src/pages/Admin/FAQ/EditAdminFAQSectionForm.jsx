import React from 'react'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import EditFAQSectionForm from '../../../components/admin/FAQ/EditFAQSectionForm.jsx'


function EditAdminFaqSectionForm() {
 return (
  <div className="flex flex-col gap-2">
   <AdminBreadcrumbs
    title="Website Manager > FAQ Manage"
    subtitle="Edit Section"
   >
    <Link
     to="/pcdao/faq/add-section"
     className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
    >
     <ChevronLeft size={24} />
     <p className="text-white font-raleway">Back</p>
    </Link>
   </AdminBreadcrumbs>
   <div className="p-10">
    <EditFAQSectionForm />
   </div>
  </div>
 )
}

export default EditAdminFaqSectionForm