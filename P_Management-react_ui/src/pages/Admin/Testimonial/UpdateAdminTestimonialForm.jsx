import React from 'react'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import EditAdminTestiomonialForm from '../../../components/admin/Testimonial/EditAdminTestiomonialForm.jsx'

function UpdateAdminTestimonialForm() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs
        title="Website Manager > Testimonial Manage"
        subtitle="Edit Testimonial"
      >
        <Link
          to="/pcdao/testimonial"
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
            <ChevronLeft size={24} />
            <p className="text-white font-raleway">Back</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <EditAdminTestiomonialForm />
      </div>
    </div>
  )
}

export default UpdateAdminTestimonialForm