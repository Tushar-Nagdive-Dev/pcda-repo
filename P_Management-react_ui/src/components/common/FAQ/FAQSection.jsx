// import React, { useCallback, useEffect, useState } from 'react'
// import {
//  Accordion,
//  AccordionContent,
//  AccordionItem,
//  AccordionTrigger,
// } from '@/components/ui/accordion'
// import {
//  SubAccordion,
//  SubAccordionContent,
//  SubAccordionItem,
//  SubAccordionTrigger,
// } from '@/components/ui/sub-accordion'
// import { faqData } from './FAQData'
// import apiClient from '../../../auth/ApiClient.jsx'
//
// function FAQSection({ currentTab }) {
//  const [singleFaqDetails, setSingleFaqDetails] = useState([])
//  const [faqDetails, setFaqDetails] = useState([])
//  useEffect(() => {
//   setSingleFaqDetails(() =>
//    faqData.filter((item) => item.name === currentTab),
//   )
//  }, [currentTab])
//
//  useEffect(() => {
//   fetchFAQDetails()
//  }, [])
//
//  async function fetchFAQDetails() {
//   try {
//    const response = await apiClient.get('faqdetails')
//    const data = await response.data
//    console.log(data)
//    setFaqDetails(faqDetails)
//   } catch (error) {
//    console.error(error)
//   }
//  }
//
//  const getSingleSectionDetails = useCallback(() => {
//   if (faqDetails.length > 0) {
//    // Determine wing
//    const wing =
//     currentTab === 'Ledger Wing'
//      ? 'LEDGER_WING'
//      : currentTab === 'Transportation Wing'
//       ? 'TRANSPORT_WING'
//       : 'CENTRAL_WING'
//    setSingleFaqDetails(() => faqDetails.filter(item => item.wings === wing))
//   }
//  }, [currentTab])
//
//  console.log('Single FAQ', singleFaqDetails[0])
//  return (
//   <div className="w-full flex flex-col">
//    <Accordion type="multiple" collapsible className="space-y-4">
//     {singleFaqDetails[0]?.lists.map((item) => (
//      <AccordionItem value={item?.title} key={item?.title}>
//       <AccordionTrigger>{item?.title}</AccordionTrigger>
//       <AccordionContent>
//        <SubAccordion type="multiple" collapsible className="space-y-2">
//         {item?.questions_lists?.map((subitem) => (
//          <SubAccordionItem value={subitem?.id}>
//           <SubAccordionTrigger>
//            {subitem?.question}
//           </SubAccordionTrigger>
//           <SubAccordionContent>{subitem?.content}</SubAccordionContent>
//          </SubAccordionItem>
//         ))}
//
//         {/* <SubAccordionItem value="subitem-2">
//                 <SubAccordionTrigger>Is it accessible?</SubAccordionTrigger>
//                 <SubAccordionContent>this is SubAccordion</SubAccordionContent>
//               </SubAccordionItem> */}
//        </SubAccordion>
//       </AccordionContent>
//      </AccordionItem>
//     ))}
//    </Accordion>
//   </div>
//  )
// }
//
// export default FAQSection

import React, { useCallback, useEffect, useState } from 'react'
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
import apiClient from '../../../auth/ApiClient.jsx'
import { faqData } from './FAQData'


// function transformFAQData(apiData) {
//  // Step 1: Group by wings
//  const groupedByWings = {}

//  apiData.forEach((item) => {
//   const { wings, sections, question, answers, id } = item

//   // Initialize the wing if it doesn't exist
//   if (!groupedByWings[wings]) {
//    groupedByWings[wings] = {
//     name: formatWingName(wings), // Format wing names (e.g., CENTRAL_WING -> Central Wing)
//     lists: [],
//    }
//   }

//   // Find or create the section in the current wing
//   let section = groupedByWings[wings].lists.find(
//    (section) => section.title === sections,
//   )
//   if (!section) {
//    section = {
//     title: sections,
//     questions_lists: [],
//    }
//    groupedByWings[wings].lists.push(section)
//   }

//   // Add the question to the section's questions list
//   section.questions_lists.push({
//    id: `q${id}`, // Use the existing ID or generate a unique ID
//    question: question,
//    content: answers,
//   })
//  })

//  // Step 2: Convert grouped data into an array
//  return Object.values(groupedByWings)
// }



// Helper function to format wing names
// function formatWingName(wing) {
//  return wing
//   .replace(/_/g, ' ') // Replace underscores with spaces
//   .toLowerCase() // Convert to lowercase
//   .replace(/(^|\s)\S/g, (char) => char.toUpperCase()) // Capitalize first letters
// }

const wingNamesMap = {
  LEDGER_WING: "Ledger Wing",
  TRANSPORT_WING: "Transportation Wing",
  CENTRAL_WING: "Central Wing",
};

const processFAQData = (data) => {
  return Object.values(
    data.reduce((acc, item) => {
      const wingName = wingNamesMap[item.wing.name] || item.wing.name;
      const sectionTitle = item.section.name;

      if (!acc[wingName]) {
        acc[wingName] = {
          name: wingName,
          lists: []
        };
      }

      let section = acc[wingName].lists.find((list) => list.title === sectionTitle);

      if (!section) {
        section = {
          title: sectionTitle,
          questions_lists: []
        };
        acc[wingName].lists.push(section);
      }

      section.questions_lists.push({
        id: `${wingName.toLowerCase().replace(/\s+/g, "")}_${section.questions_lists.length + 1}`,
        question: item.question,
        content: item.answer
      });

      return acc;
    }, {})
  );
};


function FAQSection({ currentTab }) {
 const [singleFaqDetails, setSingleFaqDetails] = useState(faqData)
 const [faqDetails, setFaqDetails] = useState([])

 // Fetch FAQ details from the backend API
 async function fetchFAQDetails() {
  try {
   const response = await apiClient.get('faqdetails/getFaqTableData') // Make the API call
   const data = await response.data;
   const filterData = data.filter(item => item.faqStatus)
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
    transformedData.filter((item) => item.name === currentTab),
   )
  }
 }, [currentTab, faqDetails])

 // const groupedFAQData = getSingleSectionDetails()
 console.log(faqDetails)

 // Fetch data on component mount
 useEffect(() => {
  fetchFAQDetails()
 }, [])

 // Update filtered data whenever the tab or FAQ details change
 useEffect(() => {
  getSingleSectionDetails()
 }, [currentTab, faqDetails, getSingleSectionDetails])

 return (
  <div className="w-full flex flex-col">
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
        </SubAccordion>
       </AccordionContent>
      </AccordionItem>
     ))}
    </Accordion></div>
  </div>

 )
}

export default FAQSection
