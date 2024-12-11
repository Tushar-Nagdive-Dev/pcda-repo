import React, {useEffect, useRef, useState} from "react";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
import recordIcons from "@/assets/icons/record_icon.svg";
import retiredOfficerIcons from "@/assets/icons/Retired_officer.svg";
import transportationIcons from "@/assets/icons/Transportation_icon.svg";
import ledgerIcons from "@/assets/icons/Ledger_icon.svg";
import proIcons from "@/assets/icons/PRO_section.svg";

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import landingSectionCss from "./LandingSection.module.css";

// import required modules
import {FreeMode, Navigation} from "swiper/modules";
import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import SectionCardLogoWithTitle from "./Section/SectionCardLogoWithTitle";

const slides = [
    {
        id: 1,
        icon: ledgerIcons,
        section: "Ledger Wing",
        description:
            "Ledger wing section maintains the IRLAs of all the Officers for prompt and correct authorization of the Pay and Allowances.",
    },
    {
        id: 2,
        icon: transportationIcons,
        section: "Transportation Wing",
        description:
            "Transportation Wing deals with Audit and Payment of Personal Claims for Temporary Duty, Leave Travel Concession, Permanent Posting, Courses, etc.",
    },
    {
        id: 3,
        icon: recordIcons,
        section: "Central Wing",
        description:
            "Record Wing deals with receipt of dak/sorting, distribution to concerned sections and dispatch of all dak through the post.",
    },
    // {
    //   id: 4,
    //   icon: proIcons,
    //   section: "PRO",
    //   description:
    //     "PRO section is a help desk for receiving the Army Officers and settling their queries, directing the officers to the concerned AOs/AAOs of the section where the queries can not be settled at the desk.",
    // },
    {
        id: 4,
        icon: retiredOfficerIcons,
        section: "Deputed Officers",
        description:
            "Post Superannuation Cell (PSC) deals with queries correspondence of officers after finalisation of account.",
    },
];

function LandingSections() {
    const swiperRef = useRef(null);
    const [isNavigationVisible, setIsNavigationVisible] = useState(true);

    // Check navigation visibility based on visible slides
    useEffect(() => {
        const updateNavigationVisibility = () => {
            if (swiperRef.current) {
                const swiperInstance = swiperRef.current;
                const totalSlides = slides.length;
                const visibleSlides = swiperInstance.params.slidesPerView;

                // Show navigation if not all slides are visible
                setIsNavigationVisible(totalSlides > visibleSlides);
            }
        };

        // Update visibility on mount and resize
        updateNavigationVisibility();
        window.addEventListener("resize", updateNavigationVisibility);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", updateNavigationVisibility);
        };
    }, [slides]);


    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <div className="w-full flex flex-col space-y-6 bg-adminCard px-custom pt-24 pb-28">
            <LeftBorderWithTitle
                textSize="text-base"
                title="Welcome to Principal Controller of Defence Accounts (officers)"
                className="text-newprimaryColor text-lg font-semibold"
            />
            <h4 className="text-3xl text-mainprimarycolor font-bold mb-9">
                Wings
            </h4>
            <div className={landingSectionCss["custom-swiper-container"]}>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={true}
                    freeMode={true}
                    modules={[FreeMode, Navigation]}
                    loop={true}
                    autoplay={{delay: 3000}}
                    className={landingSectionCss["my-swiper"]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    breakpoints={{
                        320: { // For small screens (mobile)
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: { // For medium screens (tablet)
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1440: { // For larger screens (desktop)
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className={landingSectionCss["my-slide"]}
                        >
                            <SectionCardLogoWithTitle
                                title={slide.section}
                                icon={slide.icon}
                                description={slide.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {isNavigationVisible && (
                    <>
                        <button
                            className={landingSectionCss["custom-prev"]}
                            onClick={handlePrev}
                        >
                            <CaretLeft size={32}/>
                        </button>
                        <button
                            className={landingSectionCss["custom-next"]}
                            onClick={handleNext}
                        >
                            <CaretRight size={32}/>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default LandingSections;

{
    /* <Swiper
  slidesPerView={4}
  spaceBetween={30}
  navigation={true}
  freeMode={true}
  modules={[FreeMode, Navigation]}
  loop={true} // Enable infinite loop
  autoplay={{ delay: 3000 }} // Autoplay every 3 seconds
  className={landingSectionCss["my-swiper"]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  >
  {slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      className={landingSectionCss["my-slide"]}
    >
      <div className={landingSectionCss["image-wrapper"]}>
        <img src={slide.image} alt={`Slide ${slide.id}`} />
        <div className={landingSectionCss["gradient-overlay"]}></div>
      </div>
      <p className={landingSectionCss["slide-text"]}>
        {slide.section
          ? slide.section.split(" Wing").map((part, index) => (
              <span key={index} className="block">
                {part}
                <br />
                {index === 0 && " Wing"}
              </span>
            ))
          : "No text available"}
      </p>
      <div className={landingSectionCss["slide-info"]}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
        ipsum modi possimus aliquam commodi nihil non, repellat quae
        voluptates pariatur repellendus libero voluptatum officiis
        cupiditate aliquid sequi sit vel tempora?
      </div>
    </SwiperSlide>
  ))}
  </Swiper>

*/
}

{
  /* <div class="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
        <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
          <div>
            <div class="p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
              <div class="font-bold">Jessie Watsica</div>

              <div class="opacity-60 text-sm ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio dolores error iure, perferendis sequi totam. Ad
                aliquam aperiam atque deleniti dolor dolorem enim esse et in,
                inventore itaque, pariatur reprehenderit.
              </div>
            </div>
          </div>
        </div>
        <img
          alt=""
          class="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
          src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
        />
      </div> */
}
