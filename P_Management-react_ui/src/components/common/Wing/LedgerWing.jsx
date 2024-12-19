import React, { useCallback, useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'

import {
 recordSectionLinkLists,
 recordSectionContactDetails,
 PROSectionLinkLists,
 PROSectionContactDetails,
 RetiredOfficerSectionLinkLists,
 RetiredOfficerContactDetails,
 LedgerWingContactDetails,
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

function LedgerWing() {
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
    transformedData.filter((item) => item.name === 'Ledger Wing')
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
    <p className="text-mainprimarycolor text-lg font-light">{`> Ledger Wing`}</p>
   </Breadcrumbs>
   <div className="px-custom py-14 w-full h-full">
    <div className="flex flex-col space-y-10">
     <LeftBorderWithTitle
      title="Ledger Wing"
      className="font-semibold text-newprimaryColor text-lg"
     />

     {/* Ledger Wing */}
     <div>
      <TitleWithInfo
       title="Ledger Wing"
       subtitle="The Ledger Wing in the PCDA (O) is one of the pivotal wing that supports officers in managing and authorizing pay, allowances, and financial transactions. It covers a wide range of assistance, such as processing pay for officers on deputation, Territorial Army, and on UN missions; auditing medical claims; managing various allowances and reimbursements; adjusting DSOP funds; revising pay based on court judgments; and ensuring the accurate settlement of retirement-related payments."
      />
      {/* <div className='space-y-3 text-paragraphcolor text-lg my-3'>
      <p>Stepping of Pay/Bunching of Pay in respect of Army Officers.</p>
      <p>
       Revision of Pay and allowances due to AFT judgments, preparing due drawn
       statements.
      </p>
      <p>Withholding of Pay based on GoC-in-C orders/Court judgments.</p>
      <p>
       Admittance of FAMA based on Goc-in-C orders and related correspondence.
       As on date 155 FAMA cases are there which has to be reviewed every month.
      </p>
      </div> */}
       <Separator className="my-4" />
      <div className="w-full grid grid-cols-1 gap-6 h-full">
       <ul className="grid grid-cols-2 gap-3  list-outside text-justify overflow-y-auto text-paragraphcolor gap-x-6 my-4">
        <li>
         <b className='underline underline-offset-4'>Pay & Allowances:</b> Admittance, revision, and special cases such
         as UN Missions, Territorial Army, and short-service officers.
        </li>
        <li>
         <b className='underline underline-offset-4'>Claims & Reimbursements:</b> Processing medical claims, furniture,
         water bills, and various allowances.
        </li>
        <li>
         <b className='underline underline-offset-4'>Financial Adjustments:</b> Handling tax-saving proofs, advances,
         arrears, and special adjustments like pay stepping, bunching, and AFT
         judgments.
        </li>
        <li>
         <b className='underline underline-offset-4'>Grievances & Reports:</b> Addressing officer queries, grievances,
         RTI, and CPGRAM cases; preparing audit reports and LPCs.
        </li>
        <li>
         <b className='underline underline-offset-4'>Final Settlements:</b> Managing retirement benefits such as DSOP
         withdrawals, leave encashments, and gratuity.
        </li>
       </ul>
      </div>
      <Separator className="my-4" />
      <ul className="grid grid-cols-2 gap-3  list-outside  text-justify overflow-y-auto text-paragraphcolor gap-x-6 my-4">
       <li>
        <b className='underline underline-offset-4'>SS Section:</b> Deals with stipend payments, starting of psy snd
        sllowances of newly commissioned officers,Commencement of Pay and
        allowances for the Officers seconded to Army from Navy and Air Force.
        and data updates such as personal and bank details.
       </li>
       <li>
        <b className='underline underline-offset-4'>IT Cell:</b> Uploads TDS data, manages Form 16, and resolves
        discrepancies in tax filings.
       </li>
       <li>
        <b className='underline underline-offset-4'>AFL Section:</b> Handles promotions, PRC registers, and related
        grievances.
       </li>
       <li>
        <b className='underline underline-offset-4'>Rent Cell:</b> Ensures accurate recovery of rent and allied charges
        for officers occupying govt accomodations.
       </li>
       <li>
        <b className='underline underline-offset-4'>NR Cell:</b> Maintains strength returns and processes training and
        allowance-related casualties.
       </li>
       <li>
        <b className='underline underline-offset-4'>FSR Section:</b> Reviews IRLA accounts and issues Full Pay
        Certificates for superannuation cases.
       </li>
      </ul>
     </div>
     <Separator className="my-4" />
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
        {LedgerWingContactDetails.map((item) => (
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

           {/* <SubAccordionItem value="subitem-2">
                <SubAccordionTrigger>Is it accessible?</SubAccordionTrigger>
                <SubAccordionContent>this is SubAccordion</SubAccordionContent>
              </SubAccordionItem> */}
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

export default LedgerWing
