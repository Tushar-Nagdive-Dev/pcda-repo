import React, { useEffect, useState } from 'react'
import apiClient from '../auth/ApiClient'
import newicon from '@/assets/icons/new_icon.svg'
import { Link } from 'react-router-dom'
import { CalendarDots } from '@phosphor-icons/react'
import Breadcrumbs from '../components/common/Breadcrumbs'

function NewsLists() {
 const [newsData, setNewsData] = useState([])

 useEffect(() => {
  fetchNoteApi()
 }, [])

 async function fetchNoteApi() {
  try {
   const response = await apiClient.get('news')
   const data = response.data.filter(
    (item) => item.type === 'NEWS' || item.type === 'NEWS_AND_NOTIFICATION'
   )
   setNewsData(data)
  } catch (error) {
   console.error('Failed to fetch news')
   // toast.error("")
  }
 }

 function formatDate(dateString) {
  if (!dateString) return '' // Handle null or undefined dates
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'short',
   day: '2-digit',
  }) // Example: "Dec 03, 2024"
 }

 function formatUrl(url) {
  if (url) {
   if (url?.includes('\\')) {
    let formattedUrl = url.replace(/\\\\/g, '/').replace(/\\/g, '/')
    console.log(formattedUrl)
    return formattedUrl
   }
  }
 }

 return (
  <div className="space-y-10 pb-20">
   <Breadcrumbs title="News" />
   <div className="px-custom space-y-8 my-12">
    <div className="bg-mainsecondarysecond p-9 rounded-xl">
     <div className="w-full flex flex-col space-y-2 !rounded-none">
      {newsData.map((item) => (
       <div
        key={item.id}
        className="py-2 flex flex-col border-b-2 border-b-selectedSecondary"
       >
        <div className="flex gap-1 justify-between">
         <div className="flex gap-4 items-center">
          {item?.isNew ? (
           <img
            src={newicon}
            alt="New Message"
            className="min-w-8 min-h-8 w-8 h-8"
           />
          ) : (
           <div className="min-w-6 min-h-6 w-6 h-6"></div>
          )}
          <div className="flex flex-col space-y-2">
           <Link
            to={formatUrl(item.documentUrl) || '#'}
            target="_blank"
            rel="noopener noreferrer"
           >
            <p className={`text-newprimaryColor font-semibold m-0 text-lg`}>
             {item.titleEnglish}
            </p>
           </Link>
           <div className="flex items-center gap-2 text-titleColor">
            <CalendarDots size={20} />
            <p className="text-titleColor text-sm font-semibold">
             {formatDate(item.createdDate)}
            </p>
           </div>
          </div>
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </div>
 )
}

export default NewsLists
