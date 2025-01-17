import React from "react";
import { Link } from "react-router-dom";

function LogoWithLinkCard({ icon, icon2, link, title }) {
  return (
    <div className="h-full  group/sectioncard relative cursor-pointer">
      {/* Default View */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center  bg-white p-10 hd_screen:p-8 rounded-xl transition-opacity duration-500 opacity-100 group-hover/sectioncard:opacity-0 z-10">
        <img src={icon} alt={`${title}'s icon`} className="h-full"/>
      </div>
      {/* Hover View */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center  bg-mainprimarycolor p-10 hd_screen:p-8 rounded-xl transition-opacity duration-500 opacity-0 group-hover/sectioncard:opacity-100 z-20">
        <img src={icon2} alt={`${title}'s icon`} className="h-full" />
      </div>
    </div>
  );
}

export default LogoWithLinkCard;
