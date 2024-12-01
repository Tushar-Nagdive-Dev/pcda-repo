import React, { useEffect, useState } from "react";
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
import { faqData } from "./FAQData";

function FAQSection({ currentTab }) {
  const [singleFaqDetails, setSingleFaqDetails] = useState([]);
  useEffect(() => {
    setSingleFaqDetails(() =>
      faqData.filter((item) => item.name === currentTab)
    );
  }, [currentTab]);

  console.log("Single FAQ", singleFaqDetails[0])
  return (
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
  );
}

export default FAQSection;
