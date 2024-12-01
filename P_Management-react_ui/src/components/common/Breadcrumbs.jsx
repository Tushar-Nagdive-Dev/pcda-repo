import React from "react";
import BannerPic from "../../assets/images/title_banner.jpg";

function Breadcrumbs({ title, children }) {
  return (
    <div className="w-full h-[250px] relative">
      <img
        src={BannerPic}
        alt="website banner with title"
        className="w-full h-full object-cover object-right "
      />
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-white to-transparent"></div>
      <div className="text-3xl text-mainprimarycolor absolute top-1/2 -translate-y-1/2 left-16 z-100 font-bold space-y-3">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Breadcrumbs;
