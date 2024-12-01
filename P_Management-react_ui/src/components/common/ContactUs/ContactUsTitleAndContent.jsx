import React from "react";

function ContactUsTitleAndContent({ title, info }) {
  return (
    <div
      className={`
        "flex flex-col gap-2" 
      `}
    >
      <p className="text-mainprimarycolor font-bold ">{title}</p>
      <p className="text-titleColor">{info}</p>
    </div>
  );
}

export default ContactUsTitleAndContent;
