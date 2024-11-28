import React from "react";

function TitleWithInfo({ title, subtitle }) {
  return (
    <div className="flex flex-col space-y-3">
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-paragraphcolor">{subtitle}</p>
    </div>
  );
}

export default TitleWithInfo;
