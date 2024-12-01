import { CaretRight } from "@phosphor-icons/react";
import React from "react";

// function SectionCardLogoWithTitle({ title, icon }) {
//   return (
//     <div className="min-w-72 max-w-80 h-full">
//       {/* By Default View */}
//       <div className="w-full flex flex-col justify-center items-center space-y-2 bg-white py-12 px-6 rounded-xl">
//         <img
//           src={icon}
//           alt={`${title}'s icon`}
//           className="w-[75px] md:w-[110px] lg:w-[150px] h-auto"
//         />
//         <h5 className="text-mainprimarycolor text-2xl font-bold">{title}</h5>
//       </div>
//       {/* Hover View */}
//       <div className="w-full h-full flex flex-col space-y-2 bg-mainprimarycolor py-6 px-6 rounded-xl">
//         <h5 className="text-base text-statebluecolor font-bold">{title}</h5>
//         <p className="text-white text-base">
//           {" "}
//           Record Section deals with receipt of dak/sorting, distribution to
//           concerned sections and dispatch of all dak through the post.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SectionCardLogoWithTitle;

function SectionCardLogoWithTitle({ title, icon, description }) {
  return (
    <div className="min-w-72 max-w-80 h-full group/sectioncard relative cursor-pointer">
      {/* Default View */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center space-y-4 bg-white py-12 px-6 rounded-xl transition-opacity duration-500 opacity-100 group-hover/sectioncard:opacity-0 z-10">
        <img
          src={icon}
          alt={`${title}'s icon`}
          className="w-[75px] md:w-[110px] lg:w-[150px]  h-auto max-h-36"
        />
        <h5 className="text-mainprimarycolor text-2xl font-bold text-center">
          {title
            ? title.split(" Section").map((part, index) => (
                <span key={index} className="block">
                  {part}
                  <br />
                  {index === 0 && " Section"}
                </span>
              ))
            : "No text available"}
        </h5>
      </div>
      {/* Hover View */}
      <div className="absolute top-0 w-full h-full flex flex-col  items-center justify-between space-y-2 bg-mainprimarycolor py-6 px-6 rounded-xl transition-opacity duration-500 opacity-0 group-hover/sectioncard:opacity-100 z-20">
        <div>
          <h5 className="text-base text-statebluecolor font-bold inline-block">
            {title} Section
          </h5>
          <p className="text-white text-base">
            {description}
          </p>
        </div>

        <button className="flex items-center gap-2 w-fit rounded-full bg-white h-fit py-2 px-3">
          <p className="text-titleColor">Read More </p>
          <CaretRight size={26} color="#0d6efd" />
        </button>
      </div>
    </div>
  );
}

export default SectionCardLogoWithTitle;
