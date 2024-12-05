import React, { useEffect, useState } from 'react'

import { Separator } from '@/components/ui/separator'

import {
 recordSectionLinkLists,
 recordSectionContactDetails,
 PROSectionLinkLists,
 PROSectionContactDetails,
 RetiredOfficerSectionLinkLists,
 RetiredOfficerContactDetails,
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
} from "@/components/ui/accordion";
import {
 SubAccordion,
 SubAccordionContent,
 SubAccordionItem,
 SubAccordionTrigger,
} from "@/components/ui/sub-accordion";
import { faqData } from '../FAQ/FAQData.js'
import { Input } from '../../ui/input.jsx'
import { MagnifyingGlass } from '@phosphor-icons/react'

function LedgerWing() {
 const [singleFaqDetails, setSingleFaqDetails] = useState([]);
 useEffect(() => {
  setSingleFaqDetails(() =>
   faqData.filter((item) => item.name === "Ledger Wing")
  );
 }, []);

 return (
  <div>
   <Breadcrumbs title="Wings">
    <p className="text-mainprimarycolor text-lg font-light">{`> Ledger Wing`}</p>
   </Breadcrumbs>
    <div className="px-custom py-14 w-full h-full">
     <div className="flex flex-col space-y-10">
      <LeftBorderWithTitle title="Ledger Wing" className="font-semibold text-newprimaryColor text-lg"/>
      <div className="w-full flex justify-between">
       <h3 className="text-3xl font-bold text-mainprimarycolor">FAQ</h3>
       <div className="flex gap-3">
        <Input type="text" placeholder="Search" className="rounded-2xl h-full border-none bg-adminBreadCrumbsBg" />
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
              <SubAccordionTrigger>
               {subitem?.question}
              </SubAccordionTrigger>
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

      {/* Ledger Wing */}
      <TitleWithInfo
       title="Ledger Wing"
       subtitle="Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post. Record Section deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post."
      />
      <div className="grid grid-cols-3 gap-6 h-full">
       <div className="col-span-2">
        <TitleWithLinkCard title="Important Points">
         <ul className="list-disc space-y-2 list-inside overflow-y-auto">
          {recordSectionLinkLists.map((item) => (
           <LinkWithTitleCard
            key={item.id}
            title={item.name}
            link={item.link}
           />
          ))}
         </ul>
        </TitleWithLinkCard>
       </div>
       <TitleWithLinkCard title="Contact Details">
        <ul className="list-disc space-y-2 list-inside overflow-y-auto">
         {recordSectionContactDetails.map((item) => (
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
          Note: To Contact SAO/AO of the concerned Section,kindly visit
          RTI page.
         </li>
        </ul>
       </TitleWithLinkCard>
      </div>

      <Separator className="my-4 h-1" />

     </div>
    </div>
  </div>
 )
}

export default LedgerWing
