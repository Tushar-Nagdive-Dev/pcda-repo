import React, { useRef } from "react";
import LeftBorderWithTitle from "../../LeftBorderWithTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import landingTestminionalCss from "./LandingTestimonial.module.css";
import retiredOfficerIcons from "@/assets/icons/Retired_officer.svg";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import testimionalImage from "../../../assets/images/testimional.jpeg"

const slides = [
  {
    id: 1,
    // icon: recordIcons,
    comment: "Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed euismod. Duis in ultrices dolor, ac rhoncus odio. Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim posuere, congue libero quis, commodo purus. Cras iaculis massa ut elit tempor malesuada. Pellentesque dictum elit quis diam tristique, sed tincidunt velit ullamcorper. Suspendisse potenti. Nam varius varius erat. Aliquam pulvinar elit ut orci egestas tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan sit amet. Cras ut dignissim ipsum.",
    person_picture: retiredOfficerIcons,
    person_name: "Bradley Lawlor",
    person_role:
      "Commander.",
  },
  {
    id: 2,
    //icon: pro//Icons,
    comment: "Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed euismod. Duis in ultrices dolor, ac rhoncus odio. Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim posuere, congue libero quis, commodo purus. Cras iaculis massa ut elit tempor malesuada. Pellentesque dictum elit quis diam tristique, sed tincidunt velit ullamcorper. Suspendisse potenti. Nam varius varius erat. Aliquam pulvinar elit ut orci egestas tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan sit amet. Cras ut dignissim ipsum.",
    person_picture: retiredOfficerIcons,
    person_name: "Bradley Lawlor",
    person_role:
      "Lieutenant",
  },
  {
    id: 3,
    //icon: transportation//Icons,
    comment: "Donec dictum tristique porta. Etiam convallis lorem lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed euismod. Duis in ultrices dolor, ac rhoncus odio. Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim posuere, congue libero quis, commodo purus. Cras iaculis massa ut elit tempor malesuada. Pellentesque dictum elit quis diam tristique, sed tincidunt velit ullamcorper. Suspendisse potenti. Nam varius varius erat. Aliquam pulvinar elit ut orci egestas tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan sit amet. Cras ut dignissim ipsum.",
    person_picture: retiredOfficerIcons,
    person_name: "Bradley Lawlor",
    person_role:
      "Commander",
  },
];


function LandingTestimonial() {
  const swiperRef = useRef(null);

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
    <div className="w-full h-full px-custom my-24">
      <div className="flex flex-col space-y-6">
        <LeftBorderWithTitle
          textSize="text-base"
          title="Golden Words"
          className="text-mainprimarycolor"
        />
        <h4 className="text-titleColor text-3xl font-bold">Testimonial</h4>
        {/* <div className="flex flex-row gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6 justify-center">
              <img
                src="https://via.placeholder.com/50"
                alt="image"
                className="w-28 h-28 rounded-full border-2 border-white"
              />
              <div className="flex flex-col justify-center text-titleColor">
                <h5 className="text-2xl font-bold">Bradley Lawlor</h5>
                <p>Commander</p>
              </div>
            </div>
            <p className="w-full text-center text-titleColor">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
              posuere, congue libero quis, commodo purus. Cras iaculis massa ut
              elit tempor malesuada. Pellentesque dictum elit quis diam
              tristique, sed tincidunt velit ullamcorper. Suspendisse potenti.
              Nam varius varius erat. Aliquam pulvinar elit ut orci egestas
              tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan
              sit amet. Cras ut dignissim ipsum.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-6 justify-center">
              <img
                src="https://via.placeholder.com/50"
                alt="image"
                className="w-28 h-28 rounded-full border-2 border-white"
              />
              <div className="flex flex-col justify-center text-titleColor">
                <h5 className="text-2xl font-bold">Bradley Lawlor</h5>
                <p>Commander</p>
              </div>
            </div>
            <p className="w-full text-center text-titleColor">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
              posuere, congue libero quis, commodo purus. Cras iaculis massa ut
              elit tempor malesuada. Pellentesque dictum elit quis diam
              tristique, sed tincidunt velit ullamcorper. Suspendisse potenti.
              Nam varius varius erat. Aliquam pulvinar elit ut orci egestas
              tincidunt. Morbi ornare orci ante, mollis posuere lacus accumsan
              sit amet. Cras ut dignissim ipsum.
            </p>
          </div>
        </div> */}
        <div className="w-full relative rounded-lg overflow-hidden">
          {/* Image */}
          <img
            src={testimionalImage}
            alt="Testimonial"
            className="w-full max-h-96 object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 to-transparent z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full z-20">

            <div className={landingTestminionalCss["custom-swiper-container"]}>
              <Swiper
                slidesPerView={1}
                // spaceBetween={20}
                navigation={true}
                freeMode={true}
                modules={[FreeMode, Navigation]}
                loop={true}
                autoplay={{ delay: 3000 }}
                className={landingTestminionalCss["my-swiper"]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {slides.map((slide) => (
                  <SwiperSlide
                    key={slide.id}
                    className={landingTestminionalCss["my-slide"]}
                  >
                    <div className="h-full flex flex-col justify-between px-10">
                      <p className="max-h-44 overflow-y-auto scrollbar-thin text-justify text-titleColor font-semibold w-3/4">{slide.comment}</p>

                      <div className="flex gap-3 w-fit">
                        <img src={slide.person_picture} alt={`${slide.person_name}'s picture`} className="rounded-full w-14 h-14 border-2 border-statebluecolor" />
                        <div className="flex flex-col space-y-2">
                          <p className="text-lg font-bold text-statebluecolor">{slide.person_name}</p>
                          <p className="text-sm text-titleColor">{slide.person_role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className={landingTestminionalCss["custom-prev"]}
                onClick={handlePrev}
              >
                <CaretLeft size={32} />
              </button>
              <button
                className={landingTestminionalCss["custom-next"]}
                onClick={handleNext}
              >
                <CaretRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingTestimonial;
