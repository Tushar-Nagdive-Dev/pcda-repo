import React from 'react'
import NewsAndNotificationFillForm from '../../../components/admin/NewsAndNotification/NewsAndNotificationFillForm.jsx'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

function CreateNewsAndNotificationForm() {
  return (
    <div className="flex flex-col gap-2">
      <AdminBreadcrumbs
        title="Website Manager > News & Notification"
        subtitle="New"
      >
        <Link
          to="/admin/news-and-notification"
          className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
        >
            <ChevronLeft size={24} />
            <p className="text-white font-raleway">Back</p>
        </Link>
      </AdminBreadcrumbs>
      <div className="p-10">
        <NewsAndNotificationFillForm />
      </div>
    </div>
  )
}

export default CreateNewsAndNotificationForm