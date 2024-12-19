import React, { useCallback, useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'

import {
 recordSectionLinkLists,
 recordSectionContactDetails,
 PROSectionLinkLists,
 PROSectionContactDetails,
 RetiredOfficerSectionLinkLists,
 RetiredOfficerContactDetails,
 centralWingContactDetails,
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

function CentralWing() {
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
    transformedData.filter((item) => item.name === 'Central Wing')
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
    <p className="text-mainprimarycolor text-lg font-light">{`> Central Wing`}</p>
   </Breadcrumbs>
   <div className="px-custom py-14 w-full h-full">
    <div className="flex flex-col space-y-10">
     <LeftBorderWithTitle
      title="Central Wing"
      className="font-semibold text-newprimaryColor text-lg"
     />

     {/* Central Wing */}
     <div>
      <TitleWithInfo
       title="Central Wing"
       subtitle="The Central Wing primarily focuses on overall administration, legal matters, accounting procedures, disbursement of payments & providing liaison and personal relation between clients and Officers and staff of this Office."
      />
      <ul className="text-lg list-disc list-inside text-paragraphcolor my-4 space-y-2">
       <li>
        <b>Admin I Section:</b> Manages recruitment, promotions, performance
        appraisals, retirements, service records, allowances, and various
        government reports.
       </li>
       <li>
        <b>Admin II Section:</b> Handles procurement, office maintenance,
        contracts, event management, and staff welfare services.
       </li>
       <li>
        <b>Admin III Section:</b> Issues pay and allowances, handles medical and
        travel claims, NPS accounts, and tax-related tasks.
       </li>
       <li>
        <b>Technical Section:</b> it reviews the policies and government orders
        and ensure the uniformity in implementation of the policy decisions.
       </li>
       <li>
        <b>Accounts Section:</b> Oversees financial records, reconciles
        transactions, and prepares monthly reports.
       </li>
       <li>
        <b>Disbursement Section:</b> Manages payment processing through
        electronic transfers.
       </li>
       <li>
        <b>Legal/RTI Cell:</b> Handles legal cases, court orders, and
        pension-related documents.
       </li>
       <li>
        <b>Records Section:</b> Manages document sorting, dispatch, and office
        supplies.
       </li>
       <li>
        <b>Internal Audit: </b>  
           Vetting of Pay Fixation on account of Ante Date Seniority.
       </li>
       <li>
        <b>SPARSH:</b> Assists pensioners with digital life certificates and
        pension issues.
       </li>
       <li>
        <b>PRO Section:</b> Provide support & help in addressing the queries of
        officers.
       </li>
       <li>
        <b>Hindi Cell:</b> Promotes the use of Hindi for official communication
        and compliance.
       </li>
       <li>
        <b>Security Section:</b> Ensures the security of office premises and
        supervision of outsourced guards.
       </li>
       <li>
        <b>Canteen Stores Department:</b> Provides services for office staff and
        local beneficiaries.
       </li>
       <li>
        <b>Departmental Wet Canteen:</b> Caters to the dietary needs of staff.
       </li>
       {/* <li>
        <b>Cash Office:</b> Manages cash and cheque transactions and
        record-keeping.
       </li> */}
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
        {centralWingContactDetails.map((item) => (
         <ContactDetailsCard
          key={item.id}
          person_name={item.person_name}
          contact_number={item.number}
          role={item.rank}
         />
        ))}
       </ul>
       {/* <ul className="list-disc list-inside">
        <li className="text-orangeIndiaPrimaryColor font-bold mt-6">
         Note: To Contact SAO/AO of the concerned Section,kindly visit RTI page.
        </li>
       </ul> */}
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

export default CentralWing
