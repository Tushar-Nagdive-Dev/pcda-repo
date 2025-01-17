import React from "react";

function TitleWithLinkCard({ title, children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-newprimaryColor text-center py-4">
        <p className="text-white">{title}</p>
      </div>
      <div className="h-full flex flex-col justify-between p-6 bg-mainsecondarysecond w-full h-full">{children}</div>
    </div>
  );
}

export default TitleWithLinkCard;
