import React from "react";

function ContactUsInlineTitleAndContent({ title, info, className }) {
  return (
    <div
      className={`
        flex flex-col gap-2 items-center ${className}
      `}
    >
      <p className="text-mainprimarycolor font-bold inline mr-1">{title} : </p>
      <p className="text-titleColor inline">{info}</p>
    </div>
  );
}

export default ContactUsInlineTitleAndContent;
