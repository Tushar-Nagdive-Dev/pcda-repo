import React from "react";
import BannerPic from "../../assets/images/banner/banner.jpg";

function Breadcrumbs({ title, picture, children }) {
  return (
    <div className="w-full h-[200px] relative">
      <img
        src={picture || BannerPic}
        alt="website banner with title"
        className="w-full h-full object-cover object-right "
      />
      {/* <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-white to-transparent"></div> */}
      <div className="text-3xl full_hd_screen:text-4xl text-mainprimarycolor absolute top-1/2 -translate-y-1/2 left-8 hd_screen:left-14 full_hd_screen:left-28 z-100 font-bold space-y-3">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Breadcrumbs;
