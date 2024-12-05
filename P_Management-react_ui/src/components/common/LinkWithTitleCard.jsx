import { DownloadSimple, Eye } from "@phosphor-icons/react";
import React from "react";

function LinkWithTitleCard({ title, link, view_link }) {
  return (
    <div className="flex justify-between p-3 bg-white text-paragraphcolor">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondaryGrey underline underline-offset-2"
      >
        <li className="relative px-4 ">
          {title}
        </li>
      </a>
      <div className="flex gap-2 items-center">
        {/*<a href={view_link} target="_blank" rel="noopener noreferrer">*/}
        {/*  <Eye size={24} color="#0D6EFD" className="cursor-pointer" />*/}
        {/*</a>*/}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <DownloadSimple
            size={24}
            color="#0D6EFD"
            className="cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}

export default LinkWithTitleCard;
