import React, { useEffect, useRef, useState } from 'react'
import headerStyle from './Header.module.css'
import newicon from '@/assets/icons/new_icon.svg'
import { toast } from 'react-toastify'
import apiClient from '../../../auth/ApiClient.jsx'
import { id } from 'date-fns/locale'
import { Link } from 'react-router-dom'

const dummydata = [
 {
  id: '1',
  titleEnglish: 'Mssage to Army Officers regarding Income Tax Regime.',
  isNew: false,
 },
 {
  id: '2',
  titleEnglish:
   ' Statement of Account for the month of October 2024 has been uploaded.',
  isNew: true,
 },
 {
  id: '3',
  titleEnglish:
   'Form 16 for the Financial Year 2023-24 (Assessment Year 2024-25) has been uploaded.',
  isNew: true,
 },
]

function NoteHeader() {
 const marqueeRef = useRef(null)
 const [newsData, setNewsData] = useState([])

 useEffect(() => {
  fetchNoteApi()
 }, [])

 async function fetchNoteApi() {
  try {
   const response = await apiClient.get('news')
   const data = response.data.filter(
    (item) => item.type === 'NEWS_AND_NOTIFICATION'
   )
   setNewsData(data)
  } catch (error) {
   console.error('Failed to fetch news')
   // toast.error("")
  }
 }

 const handleMouseOver = (event) => {
  if (marqueeRef.current) {
   marqueeRef.current.stop() // Stops the marquee
  }
 }

 const handleMouseOut = (event) => {
  if (marqueeRef.current) {
   marqueeRef.current.start() // Resumes the marquee
  }
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
  <div className={`${headerStyle.note_header_section} px-custom`}>
   <div className="flex gap-4">
    <p className="text-lg font-semibold px-2 py-2 bg-loginButtonPrimary rounded-sm">
     <b>Key Updates:</b>
    </p>
    <marquee
     ref={marqueeRef}
     onMouseOver={handleMouseOver}
     onMouseOut={handleMouseOut}
     className="py-2"
    >
     <ul className="flex gap-5 w-full space-x-4">
      {newsData?.map((news) => (
       <li key={news?.id}>
        <a
         href={formatUrl(news?.documentUrl) || '#'}
         target="_blank"
         rel="noopener noreferrer"
         className="flex gap-2 text-lg font-semibold"
        >
         {news?.isNew && <img src={newicon} alt="New Message" />}{' '}
         {news?.titleEnglish}
        </a>
       </li>
      ))}
     </ul>
    </marquee>
   </div>
  </div>
 )
}

export default NoteHeader
