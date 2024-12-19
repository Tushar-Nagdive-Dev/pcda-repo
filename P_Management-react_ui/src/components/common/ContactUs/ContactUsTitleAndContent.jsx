import React from 'react'

function ContactUsTitleAndContent({ title, info, className }) {
 return (
  <div
   className={`
        flex flex-col gap-2 ${className}
      `}
  >
   <p className="text-mainprimarycolor font-bold ">{title}</p>
   <p className="text-titleColor whitespace-pre-line leading-relaxed text-center">{info}</p>
  </div>
 )
}

export default ContactUsTitleAndContent
