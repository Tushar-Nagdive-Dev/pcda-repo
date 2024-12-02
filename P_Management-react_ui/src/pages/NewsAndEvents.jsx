import React from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LeftBorderWithTitle from "../components/LeftBorderWithTitle";
import GalleryCard from "../components/common/News&Events/GalleryCard";
import ceremonyImage from "../assets/images/gallery/ceremony.jpeg"

function NewsAndEvents() {
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="News & Events" />
      <div className="w-full flex flex-col space-y-6 px-custom">
        <LeftBorderWithTitle
          textSize="text-base"
          title="Glimpse of PCDA(O)"
          className="text-mainprimarycolor"
        />
        <h4 className={`text-3xl text-mainprimarycolor font-bold`}>
          Gallery
        </h4>

        <div className="grid grid-cols-4 gap-6 relative">
          <GalleryCard imgs={ceremonyImage} year="2023" title="Glimpses of the release ceremony of the house magazine Kaustubh 2023" link="/news-and-events/1"/>
          <GalleryCard imgs={ceremonyImage} year="2023" title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"/>
          <GalleryCard imgs={ceremonyImage} year="2023" title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"/>
          <GalleryCard imgs={ceremonyImage} year="2023" title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"/>
        </div>
      </div>
    </div>
  );
}

export default NewsAndEvents;