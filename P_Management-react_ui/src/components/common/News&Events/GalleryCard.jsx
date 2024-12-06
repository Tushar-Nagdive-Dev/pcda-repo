import React from "react";
import { Link } from "react-router-dom";

function GalleryCard({ imgs, title, year, link, imagePaths }) {
  const handleCardClick = () => {
    console.log("Image Paths for Gallery:", imagePaths); // Debug: show all image paths
  };

  return (
    <div
      className="group/sectioncard relative cursor-pointer"
      onClick={handleCardClick}
    >
      <Link to={link} className="underline-none">
        {/* Display the first image */}
        <img
          src={imgs}
          alt={title}
          className="w-full min-w-72 h-80 min-h-56 max-h-96 rounded-xl object-cover"
        />
        {/* Overlay for title and year */}
        <div className="absolute w-full top-0 bottom-0 flex flex-col items-center justify-end bg-[#000099] bg-opacity-70 py-6 px-6 opacity-0 group-hover/sectioncard:opacity-70 z-20 rounded-xl transition-opacity duration-500"></div>
        <div className="hidden group-hover/sectioncard:block absolute bottom-2 p-4 z-30 transition-opacity duration-500">
          <p className="text-[#49F9FF] text-sm font-bold">{year}</p>
          <p className="text-white w-full font-medium">{title}</p>
        </div>
      </Link>
    </div>
  );
}

export default GalleryCard;
