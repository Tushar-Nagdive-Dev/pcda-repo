import React, { useEffect, useState } from 'react'
import AdminBreadcrumbs from '../../../components/admin/AdminBreadcrumbs.jsx'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import AdminSectionForm from '../../../components/admin/FAQ/AdminSectionForm.jsx'
import AdminSectionTable from '../../../components/admin/FAQ/AdminSectionTable.jsx'
import apiClient from '../../../auth/ApiClient.jsx'

function AdminFAQSectionForm() {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState(true)

 // Function to fetch data from the API
 const fetchData = async () => {
  try {
   setLoading(true)
   const response = await apiClient.get('/faqdetails/getSectionTable')
   // Use response.data if apiClient is Axios
   const result = response.data
   console.log('API Response:', result)

   // Map API response to match the table's expected data structure
   const formattedData = result.map((item, index) => ({
    id: String(item.id),
    section_name: item.title,
    order: index + 1, // Replace with `item.order` if provided
    status: item.isActive ? 'Active' : 'In-Active',
    created_by: item.createdBy || 'API User', // Update if the API provides `createdBy`
    created_date: new Date(item.createdDate).toLocaleDateString(),
    updated_by: item.updatedBy || 'API User', // Update if the API provides `updatedBy`
    updated_date: new Date(item.updatedDate).toLocaleDateString(),
   }))
   console.log('Formatted Data:', formattedData)
   setData(formattedData)
  } catch (error) {
   console.error('Error fetching data:', error)
  } finally {
   setLoading(false)
  }
 }

 useEffect(() => {
  fetchData()
 }, [])

 return (
  <div className="flex flex-col gap-2">
   <AdminBreadcrumbs
    title="Website Manager > FAQ Manage"
    subtitle="Add Section"
   >
    <Link
     to="/admin/faq"
     className="flex gap-2 lg:p-2 2xl:p-3 bg-statebluecolor text-white font-raleway no-underline rounded-md"
    >
     <ChevronLeft size={24} />
     <p className="text-white font-raleway">Back</p>
    </Link>
   </AdminBreadcrumbs>
   <div className="p-10 space-y-6">
    <AdminSectionForm callFun={fetchData}/>
    <AdminSectionTable data={data}/>
   </div>
  </div>
 )
}

export default AdminFAQSectionForm
