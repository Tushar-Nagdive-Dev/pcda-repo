import React, { useRef } from "react";
import landingSliderCss from "./LandingSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation"; // Optional, if using navigation buttons
import "swiper/css/pagination"; // Optional, if using pagination
import kilkari_opening from "@/assets/images/pcdao_kilkari_opening.jpg";
import pcdao_staff from "@/assets/images/pcdao_staff.jpg";
import pcdao_award from "@/assets/images/pcdao_award.jpg"
import pcdao_meeting from "@/assets/images/pcdao_meeting.jpg"
import pcdao_building from "@/assets/images/office_building/DSC_5885.JPG"
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const slides = [
  {
    id: 1,
    image: pcdao_building,
    text: "Principal Controller of Defence Accounts (Officers), Pune",
  },
  {
    id: 2,
    image: pcdao_award,
    text: "Visit of Shri S G Dastidar, FA(DS), to the office of PCDA(O), Pune",
  },
  {
    id: 3,
    image: pcdao_meeting,
    text: "Visit of Smt, Devika Raguvamshi, CGDA, to the office of PCDA(O), Pune",
  },
  {
    id: 4,
    image: kilkari_opening,
    text: "Inaugration of créche facility(kilkari) at PCDA(O), Pune",
  },
];

function LandingSlider() {
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
    <div className={landingSliderCss["custom-swiper-container"]}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Add required modules
        navigation={true} // Enable navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination dots
        loop={true} // Enable infinite loop
        autoplay={{ delay: 5000, pauseOnInteraction: false  }} // Autoplay every 3 seconds
        className={landingSliderCss["my-swiper"]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        lazy={{ loadPrevNext: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={landingSliderCss["my-slide"]}>
            <div className={landingSliderCss["image-wrapper"]}>
              <img src={slide.image} alt={`Slide ${slide.id}`} />
              {/* <div className={landingSliderCss["gradient-overlay"]}></div> */}
            </div>
            <div
              className={`${landingSliderCss["slide-text"]} flex space-x-6 justify-between items-center`}
            >
              <button
                className="h-full bg-transparent hover:bg-mainprimarycolor rounded-lg transition-all p-2"
                onClick={handlePrev}
              >
                <CaretLeft
                  size={40}
                  className="text-statebluecolor hover:text-white "
                />
              </button>
              <p className="line-clamp-2 font-bold text-xl">{slide.text}</p>
              <button
                className="h-full bg-transparent hover:bg-mainprimarycolor rounded-lg transition-all p-2"
                onClick={handleNext}
              >
                <CaretRight
                  size={40}
                  className="text-statebluecolor hover:text-white "
                />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LandingSlider;
