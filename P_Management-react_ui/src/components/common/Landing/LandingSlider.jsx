import React, { useRef } from "react";
import landingSliderCss from "./LandingSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation"; // Optional, if using navigation buttons
import "swiper/css/pagination"; // Optional, if using pagination
import armyGroup from "@/assets/images/army.png";
import pcdao_staff from "@/assets/images/pcdao_staff.jpg";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const slides = [
  {
    id: 1,
    image: pcdao_staff,
    text: "Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin. Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin.",
  },
  {
    id: 2,
    image: armyGroup,
    text: "Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin. Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin.",
  },
  {
    id: 3,
    image: armyGroup,
    text: "Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin. Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin.",
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
        modules={[Navigation, Pagination]} // Add required modules
        navigation={true} // Enable navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination dots
        loop={true} // Enable infinite loop
        autoplay={{ delay: 1000 }} // Autoplay every 3 seconds
        className={landingSliderCss["my-swiper"]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        lazy="true"
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
              <p className="line-clamp-2">{slide.text}</p>
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