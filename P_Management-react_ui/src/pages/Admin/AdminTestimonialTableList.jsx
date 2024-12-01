import React from 'react'
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs'
import { Link } from 'react-router-dom'
import { Plus } from '@phosphor-icons/react'
import NewsAndNotificationTable from '../../components/admin/NewsAndNotification/NewsAndNotificationTable'
import AdminTestimonialTable from '../../components/admin/Testimonial/AdminTestimonialTable'

function AdminTestimonialTableList() {
  return (
    <div className="flex flex-col gap-2">
    <AdminBreadcrumbs
      title="Website Manager > "
      subtitle="Testimonial"
    >
      <Link
        to={`/admin/testimonial/new`}
        className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
      >
          <Plus size={24} />
          <p className="text-white font-raleway">Add Testimonial</p>
      </Link>
    </AdminBreadcrumbs>
    <div className="p-10">
      <AdminTestimonialTable />
    </div>
  </div>
  )
}

export default AdminTestimonialTableList