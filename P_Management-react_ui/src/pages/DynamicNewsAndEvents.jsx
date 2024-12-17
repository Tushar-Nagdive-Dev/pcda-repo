import React, { useEffect, useState } from 'react'
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Breadcrumbs from '../components/common/Breadcrumbs'
import LeftBorderWithTitle from '../components/LeftBorderWithTitle'
import ZoomPicCard from '../components/common/News&Events/ZoomPicCard'
import { useParams } from 'react-router-dom'
import apiClient from '../auth/ApiClient'

function DynamicNewsAndEvents() {
 const { id } = useParams()
 const [imagePaths, setImagePaths] = useState([])
 const [loading, setLoading] = useState(true)

 // Fetch images for the gallery
 const fetchGalleryImages = async () => {
  try {
   const response = await apiClient.get(`/gallery/${id}/files`)
   setImagePaths(response.data)
  } catch (error) {
   console.error('Error fetching gallery images:', error)
  } finally {
   setLoading(false)
  }
 }

 useEffect(() => {
  fetchGalleryImages()
 }, [id])

 if (loading) {
  return <div className="text-center py-10">Loading images...</div>
 }

 return (
  <div className="space-y-10 pb-20">
   {/* Breadcrumb Navigation */}
   <Breadcrumbs title="News & Events">
    <Breadcrumb>
     <BreadcrumbList>
      <BreadcrumbItem>
       <BreadcrumbLink href="/" className="text-mainprimarycolor">
        Home
       </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbLink
        href="/news-and-events"
        className="text-mainprimarycolor"
       >
        News & Events
       </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
       <BreadcrumbPage className="text-mainprimarycolor">
        Gallery Details
       </BreadcrumbPage>
      </BreadcrumbItem>
     </BreadcrumbList>
    </Breadcrumb>
   </Breadcrumbs>

   <div className="w-full flex flex-col space-y-6 px-custom">
    {/* Section Title */}
    <LeftBorderWithTitle
     textSize="text-base"
     title="Glimpse of PCDA(O)"
     className="text-mainprimarycolor"
    />
    <h4 className="text-3xl text-mainprimarycolor font-bold">
     Gallery Details
    </h4>

    {/* Images Grid */}
    <div className="grid grid-cols-4 gap-6 relative">
     {imagePaths.length > 0 ? (
      imagePaths.map((path, index) => (
       <ZoomPicCard
        key={index}
        imgs={path} // Use the path returned by the API
        title={`Image ${index + 1}`}
        allImages={imagePaths}
        currentIndex={index}
       />
      ))
     ) : (
      <p className="text-center col-span-4 text-gray-500">
       No images available for this gallery.
      </p>
     )}
    </div>
   </div>
  </div>
 )
}

export default DynamicNewsAndEvents
