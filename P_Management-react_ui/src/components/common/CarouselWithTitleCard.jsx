import React from "react";

function CarouselWithTitleCard({ title, children }) {
  return (
    <div className="flex flex-col p-0 m-0">
      <div className="bg-mainprimarycolor py-6 flex flex-row justify-center items-center text-white">
        <h5 className="text-base">{title}</h5>
      </div>
      <div className="flex flex-col border shadow-xl drop-shadow-lg p-3">
        {children}
      </div>
    </div>
  );
}

export default CarouselWithTitleCard;
