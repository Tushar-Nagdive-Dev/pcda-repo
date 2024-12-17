import React, { useEffect, useMemo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import TitleWithInfo from '../components/common/Downloads/TitleWithInfo'
import TitleWithLinkCard from '../components/common/TitleWithLinkCard'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '../components/ui/input.jsx'
import LinkWithTitleCard from '../components/common/LinkWithTitleCard'

import {
 centralWingContactDetails,
 checklistsDownloadLinkLists,
 circularsDownloadLinkLists,
 LedgerChecklistsDownloadLinkLists,
 ledgerDownloadLinkLists,
 LedgerWingContactDetails,
 transportationContactDetails,
} from '../components/common/Downloads/downloadLinkDummyData'

import ContactDetailsCard from '../components/common/ContactDetailsCard'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { MagnifyingGlass } from '@phosphor-icons/react'

import apiClient from '../auth/ApiClient.jsx' // Adjust the path as necessary
import { toast } from 'react-toastify'

/* Debounce Function */
const debounce = (func, delay) => {
 let timer
 return (...args) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
   func(...args)
  }, delay)
 }
}

/* Menu Tabs lists */
const navbarMenuList = [
 {
  id: 'm1',
  title: 'Ledger Wing',
 },
 {
  id: 'm2',
  title: 'Transportation Wing',
 },
 {
  id: 'm3',
  title: 'Central Wing',
 },
]

function Downloads() {
 const [documents, setDocuments] = useState([]) // Loaded documents from API
 const [currentTab, setCurrentTab] = useState('Ledger Wing')
 const [debouncedSearch, setDebouncedSearch] = useState('')
 const [searchTerm, setSearchTerm] = useState('')

 /* Fetch documents from the API */
 useEffect(() => {
  const fetchDocuments = async () => {
   try {
    const response = await apiClient.get('/document') // API call
    setDocuments(response.data)
   } catch (error) {
    console.error('Error fetching documents:', error)
    toast.error('Failed to fetch documents.')
   }
  }
  fetchDocuments()
 }, [])

 /* Handle Search */
 const handleSearch = debounce((value) => {
  setDebouncedSearch(value)
 }, 300)

 /* Memoized filtered list */
 const filteredLists = useMemo(() => {
  return documents.filter((doc) =>
   doc.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
 }, [debouncedSearch, documents])

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
   <Breadcrumbs title="Downloads" />
   <div className="px-custom py-14 w-full h-full space-y-10">
    {/* Button */}
    <div className="w-full flex">
     <div className="flex items-center h-full w-full">
      <TransitionGroup component={null}>
       {navbarMenuList.map((item) => (
        <CSSTransition
         key={item.id}
         timeout={300}
         classNames="navLink"
         unmountOnExit
        >
         <Button
          variant={currentTab === item.title ? 'default' : 'hover'}
          size="lg"
          onClick={() => setCurrentTab(item.title)}
          className="w-full h-16 text-lg"
         >
          {item.title}
         </Button>
        </CSSTransition>
       ))}
      </TransitionGroup>
     </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-10">
     {/* Ledger Wing */}
     {currentTab === 'Ledger Wing' && (
      <div className="flex flex-col space-y-10">
       <div>
        {/* <TitleWithInfo title="Ledger Wing" subtitle="" /> */}
        {/* <div className="space-y-3 text-paragraphcolor text-lg my-3">
         <p>Stepping of Pay/Bunching of Pay in respect of Army Officers.</p>
         <p>
          Revision of Pay and allowances due to AFT judgments, preparing due
          drawn statements.
         </p>
         <p>Withholding of Pay based on GoC-in-C orders/Court judgments.</p>
         <p>
          Admittance of FAMA based on Goc-in-C orders and related
          correspondence. As on date 155 FAMA cases are there which has to be
          reviewed every month.
         </p>
        </div>
        <ul className="text-lg list-disc list-inside text-paragraphcolor my-4 space-y-2 text-justify">
         <li>
          <b>Pay & Allowances:</b> Admittance, revision, and special cases such
          as UN Missions, Territorial Army, and short-service officers.
         </li>
         <li>
          <b>Claims & Reimbursements:</b> Processing medical claims, furniture,
          water bills, and various allowances.
         </li>
         <li>
          <b>Financial Adjustments:</b> Handling tax-saving proofs, advances,
          arrears, and special adjustments like pay stepping, bunching, and AFT
          judgments.
         </li>
         <li>
          <b>Grievances & Reports:</b> Addressing officer queries, grievances,
          RTI, and CPGRAM cases; preparing audit reports and LPCs.
         </li>
         <li>
          <b>Final Settlements:</b> Managing retirement benefits such as DSOP
          withdrawals, leave encashments, and gratuity.
         </li>
         <li>
          <b>SS Section:</b> Deals with stipend payments, starting of psy snd
          sllowances of newly commissioned officers,Commencement of Pay and
          allowances for the Officers seconded to Army from Navy and Air Force.
          and data updates such as personal and bank details.
         </li>
         <li>
          <b>IT Cell:</b> Uploads TDS data, manages Form 16, and resolves
          discrepancies in tax filings.
         </li>
         <li>
          <b>AFL Section:</b>Handles promotions, PRC registers, and related
          grievances.
         </li>
         <li>
          <b>Rent Cell:</b> Ensures accurate recovery of rent and allied charges
          for officers occupying govt accomodations.
         </li>
         <li>
          <b>NR Cell:</b>Maintains strength returns and processes training and
          allowance-related casualties.
         </li>
         <li>
          <b>FSR Section:</b> Reviews IRLA accounts and issues Full Pay
          Certificates for superannuation cases.
         </li>
        </ul>*/}
       </div>
       <div className="flex flex-row-reverse w-full">
        <div className="w-fit flex gap-2">
         <Input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
         />
        </div>
       </div>
       <div className="grid grid-cols-3 gap-6 h-full">
        <TitleWithLinkCard title="Govt. Orders / MoD Order">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {ledgerDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Checklist">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {LedgerChecklistsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Downloads">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {LedgerChecklistsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
       </div>

       <Separator className="my-4 h-1" />
      </div>
     )}

     {/* Transportation Wing */}
     {currentTab === 'Transportation Wing' && (
      <div className="flex flex-col space-y-10">
       <div className="w-full flex gap-2 flex-row-reverse">
        <Input
         type="text"
         placeholder="Search"
         onChange={(e) => handleSearch(e.target.value)}
         className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
        />
       </div>
       <div className="grid grid-cols-3 gap-6 h-full">
        <TitleWithLinkCard title="Govt. Orders/MoD Order">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {circularsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Checklist">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {checklistsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Downloads">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {LedgerChecklistsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
       </div>

       <Separator className="my-4 h-1" />
      </div>
     )}

     {/* Central Wing */}
     {currentTab === 'Central Wing' && (
      <div className="flex flex-col space-y-10">
       <div className="w-full flex gap-2 flex-row-reverse">
        <Input
         type="text"
         placeholder="Search"
         onChange={(e) => handleSearch(e.target.value)}
         className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
        />
       </div>
       <div className="grid grid-cols-3 gap-6 h-full">
        <TitleWithLinkCard title="Govt. Orders/MoD Order">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {circularsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Checklist">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {ledgerDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
        <TitleWithLinkCard title="Downloads">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {LedgerChecklistsDownloadLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
       </div>

       <Separator className="my-4 h-1" />
      </div>
     )}

     {/* Downloads */}
     {/* <div className="flex flex-row-reverse w-full">
      <div className="w-fit flex gap-2">
       <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg w-[350px] max-w-[450px]"
       />
      </div>
     </div>
     <div className="w-full grid grid-cols-1 gap-6 h-full">
      <TitleWithLinkCard title="Downloads">
       <ul className="grid grid-cols-2 gap-3 list-disc list-inside overflow-y-auto">
        {filteredLists.map((item) => (
         <LinkWithTitleCard
          key={item?.id}
          title={item?.title}
          link={formatUrl(item?.documentPath)}
         />
        ))}
       </ul>
      </TitleWithLinkCard>
     </div> */}
    </div>
   </div>
  </div>
 )
}

export default Downloads
