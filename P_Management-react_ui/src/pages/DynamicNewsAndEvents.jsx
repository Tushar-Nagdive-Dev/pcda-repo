import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LeftBorderWithTitle from "../components/LeftBorderWithTitle";
import GalleryCard from "../components/common/News&Events/GalleryCard";
import ceremonyImage from "../assets/images/gallery/ceremony.jpeg"
import ZoomPicCard from "../components/common/News&Events/ZoomPicCard";

function DynamicNewsAndEvents() {
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="News & Events">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-mainprimarycolor">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/news-and-events" className="text-mainprimarycolor">News & Events</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-mainprimarycolor">Glimpses of the release ceremony of the house magazine Kaustubh 2023</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Breadcrumbs>
      <div className="w-full flex flex-col space-y-6 px-custom">
        <LeftBorderWithTitle
          textSize="text-base"
          title="Glimpse of PCDA(O)"
          className="text-mainprimarycolor"
        />
        <h4 className={`text-3xl text-mainprimarycolor font-bold`}>Glimpses of the release ceremony of the house magazine Kaustubh 2023</h4>

        <div className="grid grid-cols-4 gap-6 relative">
          <ZoomPicCard
            imgs={ceremonyImage}
            title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"
          />
          <ZoomPicCard
            imgs={ceremonyImage}
            title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"
          />
          <ZoomPicCard
            imgs={ceremonyImage}
            title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"
          />
          <ZoomPicCard
            imgs={ceremonyImage}
            title="Glimpses of the release ceremony of the house magazine Kaustubh 2023"
          />
        </div>
      </div>
    </div>
  );
}

export default DynamicNewsAndEvents;
