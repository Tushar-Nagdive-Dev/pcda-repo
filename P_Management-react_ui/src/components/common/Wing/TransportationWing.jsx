import React, { useCallback, useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'

import {
 recordSectionLinkLists,
 recordSectionContactDetails,
 PROSectionLinkLists,
 PROSectionContactDetails,
 RetiredOfficerSectionLinkLists,
 RetiredOfficerContactDetails,
 transportationContactDetails,
} from './sectionData'
import LeftBorderWithTitle from '../../LeftBorderWithTitle.jsx'
import Breadcrumbs from '../Breadcrumbs.jsx'
import TitleWithInfo from '../Downloads/TitleWithInfo.jsx'
import TitleWithLinkCard from '../TitleWithLinkCard.jsx'
import LinkWithTitleCard from '../LinkWithTitleCard.jsx'
import ContactDetailsCard from '../ContactDetailsCard.jsx'
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from '@/components/ui/accordion'
import {
 SubAccordion,
 SubAccordionContent,
 SubAccordionItem,
 SubAccordionTrigger,
} from '@/components/ui/sub-accordion'
import { faqData } from '../FAQ/FAQData.js'
import { Input } from '../../ui/input.jsx'
import { MagnifyingGlass } from '@phosphor-icons/react'
import apiClient from '../../../auth/ApiClient.jsx'

import wingsBanner from '@/assets/images/banner/Wingscover.jpg'

const wingNamesMap = {
 LEDGER_WING: 'Ledger Wing',
 TRANSPORT_WING: 'Transportation Wing',
 CENTRAL_WING: 'Central Wing',
}

const processFAQData = (data) => {
 return Object.values(
  data.reduce((acc, item) => {
   const wingName = wingNamesMap[item.wing.name] || item.wing.name
   const sectionTitle = item.section.name

   if (!acc[wingName]) {
    acc[wingName] = {
     name: wingName,
     lists: [],
    }
   }

   let section = acc[wingName].lists.find((list) => list.title === sectionTitle)

   if (!section) {
    section = {
     title: sectionTitle,
     questions_lists: [],
    }
    acc[wingName].lists.push(section)
   }

   section.questions_lists.push({
    id: `${wingName.toLowerCase().replace(/\s+/g, '')}_${
     section.questions_lists.length + 1
    }`,
    question: item.question,
    content: item.answer,
   })

   return acc
  }, {})
 )
}

function TransportationWing() {
 const [singleFaqDetails, setSingleFaqDetails] = useState(faqData)
 const [faqDetails, setFaqDetails] = useState([])

 // Fetch FAQ details from the backend API
 async function fetchFAQDetails() {
  try {
   const response = await apiClient.get('faqdetails/getFaqTableData') // Make the API call
   const data = await response.data
   const filterData = data.filter((item) => item.faqStatus)
   // console.log('Fetched FAQ Data:', data)
   setFaqDetails(filterData) // Update the FAQ details state
  } catch (error) {
   console.error('Error fetching FAQ details:', error)
  }
 }

 // Filter data for the selected tab
 const getSingleSectionDetails = useCallback(() => {
  if (faqDetails.length > 0) {
   const transformedData = processFAQData(faqDetails)
   setSingleFaqDetails(() =>
    transformedData.filter((item) => item.name === 'Transportation Wing')
   )
  }
 }, [faqDetails])

 // const groupedFAQData = getSingleSectionDetails()
 console.log(faqDetails)

 // Fetch data on component mount
 useEffect(() => {
  fetchFAQDetails()
 }, [])

 // Update filtered data whenever the tab or FAQ details change
 useEffect(() => {
  getSingleSectionDetails()
 }, [faqDetails, getSingleSectionDetails])

 return (
  <div>
   <Breadcrumbs title="Wings" picture={wingsBanner}>
    <p className="text-mainprimarycolor text-lg font-light">{`> Transportation Wing`}</p>
   </Breadcrumbs>
   <div className="px-custom py-14 w-full h-full">
    <div className="flex flex-col space-y-10">
     <LeftBorderWithTitle
      title="Transportation Wing"
      className="font-semibold text-newprimaryColor text-lg"
     />

     <div>
      {/* Ledger Wing */}
      <TitleWithInfo
       title="Transportation Wing"
       subtitle="The Transportation Wing in PCDA (O) deals with the payment related to  traveling claims such as  temporary duty or permanent duty and LTC claims of the Army Officers.Furthermore, it also ensures scrutiny and clearance of payment or advance of TA/DA & LTC including those drawn from Impress holders; other Accounts offices, CsDA/ PCsDA and NE cases. "
      />
      <ul className="text-lg list-disc list-inside text-paragraphcolor my-4 space-y-2">
       {/* <li>
        Ensure prompt payment of entitlements for Army Officers' Permanent Move,
        Temporary Duty, and LTC, maintaining morale and efficiency.
       </li>
       <li>
        Prevent irregular expenditure on TA/DA, LTC journeys, Free Railway
        Warrants, and Form D/G.
       </li> */}
       <li>
        <b>Auditing of Claims:</b> Review and approve TA/DA, LTC entitlements
        of Army officers, Short Service, Territorial Army, NCC, re-employed,
        and reserve officers.
       </li>
       {/* <li>
        <b>Scrutiny & Payment:</b> Process advances and adjustments for TA/DA,
        LTC, and related claims.
       </li> */}
       <li>
        <b>Post-Audit:</b> Audit of railway warrants, Form D/G, and claims for
        transportation, daily allowances, and camp allowances.
       </li>
       <li>
        <b>Claims Processing:</b> Handle claims and  allowances under TR rules,
        including Form D and G.
       </li>
       <li>
        <b>E-Ticket Processing:</b> Manage e-ticket data for credit/debit in
        IRLA.
       </li>
       <li>
        <b>Clearance & Adjustments::</b> Track TA/DA advances, MRO adjustments,
        and issue No Demand Certificates.
       </li>
      </ul>
     </div>

     <div className="grid grid-cols-3 gap-6 h-full">
      <div className="col-span-2">
       <TitleWithLinkCard title="Important Points">
        <ul className="list-disc space-y-2 list-inside overflow-y-auto">
         {recordSectionLinkLists.map((item) => (
          <LinkWithTitleCard key={item.id} title={item.name} link={item.link} />
         ))}
        </ul>
       </TitleWithLinkCard>
      </div>
      <TitleWithLinkCard title="Contact Details">
       <ul className="list-disc space-y-2 list-inside overflow-y-auto">
        {transportationContactDetails.map((item) => (
         <ContactDetailsCard
          key={item.id}
          person_name={item.person_name}
          contact_number={item.number}
          role={item.rank}
         />
        ))}
       </ul>
       <ul className="list-disc list-inside">
        <li className="text-orangeIndiaPrimaryColor font-bold mt-6">
         Note: To Contact SAO/AO of the concerned Section,kindly visit RTI page.
        </li>
       </ul>
      </TitleWithLinkCard>
     </div>

     <Separator className="my-4 h-1" />

     <div className="w-full flex justify-between">
      <h3 className="text-3xl font-bold text-mainprimarycolor">FAQ</h3>
      <div className="flex gap-3">
       <Input
        type="text"
        placeholder="Search"
        className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg"
       />
       <button className="rounded-full text-white bg-mainprimarycolor p-3">
        <MagnifyingGlass size={20} />
       </button>
      </div>
     </div>
     <div className="w-full flex flex-col">
      <Accordion type="multiple" collapsible className="space-y-4">
       {singleFaqDetails[0]?.lists.map((item) => (
        <AccordionItem value={item?.title} key={item?.title}>
         <AccordionTrigger>{item?.title}</AccordionTrigger>
         <AccordionContent>
          <SubAccordion type="multiple" collapsible className="space-y-2">
           {item?.questions_lists?.map((subitem) => (
            <SubAccordionItem value={subitem?.id}>
             <SubAccordionTrigger>{subitem?.question}</SubAccordionTrigger>
             <SubAccordionContent>{subitem?.content}</SubAccordionContent>
            </SubAccordionItem>
           ))}
          </SubAccordion>
         </AccordionContent>
        </AccordionItem>
       ))}
      </Accordion>
     </div>
    </div>
   </div>
  </div>
 )
}

export default TransportationWing
