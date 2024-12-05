import React, { useContext, useEffect, useState } from 'react'
import newicon from '@/assets/icons/new_icon.svg'
import { ScrollArea } from '@/components/ui/scroll-area'
import LeftBorderWithTitle from '../../LeftBorderWithTitle'
import { AccessibilityContext } from '../../../context/AccessibilityContext'
import { Link } from 'react-router-dom'
import { CalendarDots } from '@phosphor-icons/react'
import apiClient from '../../../auth/ApiClient.jsx'

const updateLists = [
 {
  id: 'list1',
  titleEnglish: 'Latest Road Mileage Allowance',
  link: 'https://pcdaopune.gov.in/downloads/newRMA.pdf',
  isNew: false,
  createdDate: '2023-11-18T20:10:01.976088',
 },
 {
  id: 'list2',
  titleEnglish: 'Tracking of Pension Document-list updated on 21-11-2024',
  link: 'https://pcdaopune.gov.in/downloads/Dsop_message.pdf',
  isNew: true,
  createdDate: '2024-11-18T20:10:01.976088',
 },
 {
  id: 'list3',
  titleEnglish: 'Handbook Pay and Allowances 2023',
  link: 'https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf',
  isNew: true,
  createdDate: '2024-12-01T20:10:01.976088',
 },
 {
  id: 'list4',
  titleEnglish: 'Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year',
  link: 'https://pcdaopune.gov.in/downloads/pensiondata.pdf',
  isNew: true,
  createdDate: '2024-12-02T20:10:01.976088',
 },
 {
  id: 'list5',
  titleEnglish: 'Handbook Pay and Allowances 2023',
  link: 'https://pcdaopune.gov.in/downloads/newmessages/Handbook_Pay_and_Allowances_2023.pdf',
  isNew: false,
  createdDate: '2023-07-17T20:10:01.976088',
 },
 {
  id: 'list6',
  titleEnglish: 'Ceiling of Rs 5 Lakh on subscription to Defence Services Officers Provident (DSOP) Fund in Financial Year',
  link: 'https://pcdaopune.gov.in/downloads/Dsop_message.pdf',
  isNew: false,
  createdDate: '2023-05-21T20:10:01.976088',
 },
]

function LatestLandingUpdateLists() {
 const accessibilityCtx = useContext(AccessibilityContext);
 const [newsData, setNewsData] = useState(updateLists)

 useEffect(() => {
  fetchNoteApi();
 }, []);

 function formatDate(dateString) {
  if (!dateString) return ""; // Handle null or undefined dates
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
   year: "numeric",
   month: "short",
   day: "2-digit",
  }); // Example: "Dec 03, 2024"
 }

 async function fetchNoteApi() {
  try {
   const response = await apiClient.get('news')
   const data = response.data.filter((item) => item.type === 'NEWS')
   if (data.length === 0) {
    setNewsData(updateLists)
   } else {
    setNewsData(data)
   }
  } catch
   (error) {
   console.error('Failed to fetch news')
   // toast.error("")
  }
 }

 return (
  <ScrollArea className="w-full min-w-[350px] max-w-[420px] max-h-[700px] bg-mainsecondarysecond p-9 gap-5 rounded-2xl">
   <div className="flex flex-col gap-5 ">
    <LeftBorderWithTitle
     textSize={`${accessibilityCtx.getFontSizeClass('text-2xl')}`}
     title="New Messages"
    />
    <div className="w-full flex flex-col space-y-2 !rounded-none overflow-y-auto">
     {newsData.map((item) => (
      <div key={item.id} className="py-2 flex flex-col border-b-2 border-b-selectedSecondary">
       <div className="flex gap-1">
        {item?.isNew ? <img src={newicon} alt="New Message" /> : <div className="min-w-6 min-h-6 w-6 h-6"></div>}
        <Link to={item.link || '#'} target="_blank" rel="noopener noreferrer">
         <p
          className={`text-newprimaryColor font-semibold p-2 m-0 ${accessibilityCtx.getFontSizeClass(
           'text-base',
          )}`}
         >
          {item.titleEnglish}
         </p>
        </Link>
        <div className="min-w-28 w-32 flex flex-col items-end justify-center gap-2 text-titleColor">
         <CalendarDots size={20} />
         <p className="text-titleColor text-xs font-semibold">{formatDate(item.createdDate)}</p>
        </div>
       </div>

      </div>
     ))}
    </div>

   </div>
  </ScrollArea>
 )
}

export default LatestLandingUpdateLists
