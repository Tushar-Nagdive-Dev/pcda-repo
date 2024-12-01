import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import FAQMenuSection from "../components/common/FAQ/FAQMenuSection";
import FAQSection from "../components/common/FAQ/FAQSection";

function FAQ() {
  const [currentTab, setCurrentTab] = useState("Ledger Wing");
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="FAQ" />
      <div className="px-custom space-y-14">
      <FAQMenuSection currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <FAQSection currentTab={currentTab} />
      </div>
    </div>
  );
}

export default FAQ;
