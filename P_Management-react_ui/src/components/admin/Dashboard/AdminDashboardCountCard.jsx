import React from 'react'
import AdminDashboardNumberCard from './AdminDashboardNumberCard'

function AdminDashboardCountCard({ title, number }) {
 return (
  <AdminDashboardNumberCard>
   <div className="h-full flex flex-col rounded-sm bg-adminCard p-6 cursor-pointer">
    <h4 className="text-adminTextColor text-lg font-raleway">{title}</h4>
    <p className="text-adminTextColor font-bold text-[56px] text-center font-raleway">
     {number}/10
    </p>
   </div>
  </AdminDashboardNumberCard>
 )
}

export default AdminDashboardCountCard
