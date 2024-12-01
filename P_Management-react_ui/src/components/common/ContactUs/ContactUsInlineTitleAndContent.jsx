import React from "react";

function ContactUsInlineTitleAndContent({ title, info }) {
  return (
    <div
      className={`
        "flex flex-col gap-2" 
      `}
    >
      <p className="text-mainprimarycolor font-bold inline mr-1">{title} : </p>
      <p className="text-titleColor inline">{info}</p>
    </div>
  );
}

export default ContactUsInlineTitleAndContent;
